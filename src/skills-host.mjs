// 本插件只读技能服务：复用宿主 SkillRegistry，不新增发现、启停或文件写入能力。
// 客户端通过 codexStyleSkills 命名空间读取当前会话/工作区范围内的技能目录与正文。
export const name = 'codex-style-skills';

const METHODS = ['catalog', 'content'];

// lease 形态按现包 native scopeFor：acquireScope 返回带 dispose 语义的租约，优先 async dispose。
async function releaseLease(lease) {
  if (lease === undefined || lease === null) return;
  if (typeof lease[Symbol.asyncDispose] === 'function') return await lease[Symbol.asyncDispose]();
  if (typeof lease[Symbol.dispose] === 'function') return lease[Symbol.dispose]();
  if (typeof lease.release === 'function') return await lease.release();
  throw new Error('preset scope lease exposes no release operation');
}

function disposeObservation(observation) {
  if (typeof observation?.[Symbol.dispose] === 'function') observation[Symbol.dispose]();
  else if (typeof observation?.dispose === 'function') observation.dispose();
}

function summaryOf(skill) {
  return {
    name: skill.name,
    description: skill.description,
    ...(skill.whenToUse === undefined ? {} : { whenToUse: skill.whenToUse }),
    ...(skill.path === undefined ? {} : { path: skill.path }),
    invocation: { modelInvocable: skill.invocation?.modelInvocable === true, userInvocable: skill.invocation?.userInvocable === true },
    source: skill.source,
    provider: skill.provider
  };
}

function definitionOf(skill) {
  return { ...summaryOf(skill), content: skill.content };
}

/**
 * @param ctx - Host plugin context.
 * @param dependencies - Remote decorator and service base borrowed from the current runtime SDK.
 */
export function apply(ctx, dependencies) {
  const { Remote, TypertRemoteService } = dependencies;
  const initializers = [];
  class CodexStyleSkills extends TypertRemoteService {
    constructor(inner) {
      super(inner, 'codexStyleSkills');
      for (const initialize of initializers) initialize.call(this);
    }

    /**
     * Resolve the registry a Session composition would use. Failures propagate: a caller must be able
     * to distinguish "no skills" from "this Session or preset could not be read".
     */
    async resolve(request, signal) {
      request = request ?? {};
      const agents = this.ctx.get('agents');
      const presets = this.ctx.get('agentPresets');
      const sessionQuery = this.ctx.get('sessionQuery');
      const workingDirectory = this.ctx.get('workingDirectory');
      const sessionId = typeof request.sessionId === 'string' && request.sessionId !== '' ? request.sessionId : undefined;
      let cwd = typeof request.cwd === 'string' && request.cwd !== '' ? request.cwd : undefined;
      let presetId;
      let live;
      if (sessionId !== undefined) {
        live = agents?.get?.(sessionId);
        if (live === undefined) {
          if (sessionQuery === undefined) throw new Error(`session "${sessionId}" cannot be inspected: sessionQuery is unavailable`);
          const observation = await sessionQuery.observeSession(sessionId);
          try {
            if (observation?.projections?.values === undefined) throw new Error(`session "${sessionId}" has no readable projections`);
            cwd = observation.projections.values.workingDirectory ?? observation.header?.cwd ?? cwd;
            presetId = observation.projections.values.agentPreset;
          } finally {
            disposeObservation(observation);
          }
          if (cwd === undefined) throw new Error(`session "${sessionId}" has no working directory`);
        } else if (workingDirectory !== undefined) {
          cwd = await workingDirectory.ensure(live, signal);
        }
      }
      // preset 自带的 registry 优先；不能因全局 skills 缺失就拒绝该视图。
      const registry = (live !== undefined ? presets?.serviceFor?.(live, 'skills') : undefined) ?? this.ctx.get('skills');
      if (registry === undefined) throw new Error('skill registry is not mounted');
      let lease;
      if (live === undefined && presetId !== undefined) {
        if (presets?.acquireScope === undefined) throw new Error(`agent preset "${presetId}" cannot be scoped`);
        lease = await presets.acquireScope(presetId);
      }
      return { registry, cwd, scope: live ?? lease?.key, lease, sessionId, presetId };
    }

    /** Read the invocation-neutral catalog for one Session composition or workspace. */
    async catalog(request, signal) {
      const view = await this.resolve(request, signal);
      try {
        const snapshot = await view.registry.snapshot({ cwd: view.cwd, scope: view.scope, signal });
        return {
          skills: snapshot.skills.map(summaryOf),
          complete: snapshot.complete === true,
          scope: { cwd: view.cwd, session: view.sessionId !== undefined, preset: view.presetId }
        };
      } finally {
        await releaseLease(view.lease);
      }
    }

    /** Read one skill definition, including its Markdown body, from the same registry view. */
    async content(request, signal) {
      const name = request?.name;
      if (typeof name !== 'string' || name === '') return null;
      const view = await this.resolve(request, signal);
      try {
        const skill = await view.registry.get(name, { cwd: view.cwd, scope: view.scope, signal });
        return skill === undefined ? null : definitionOf(skill);
      } finally {
        await releaseLease(view.lease);
      }
    }
  }
  for (const method of METHODS) {
    Remote(CodexStyleSkills.prototype[method], { kind: 'method', name: method, static: false, private: false, addInitializer: initialize => initializers.push(initialize) });
  }
  ctx.plugin(CodexStyleSkills);
}
