# AGENTS.md

This file provides guidance to coding agents working in this repository, including Codex and similar tools.

## Commands

```bash
npm run build        # one-time esbuild bundle (with sourcemaps)
npm run watch        # rebuild on file changes (use during development)
npm run typecheck    # tsc --noEmit (type-check without emitting files)
npm run lint         # eslint src
```

There are no automated tests. To run the extension manually, open the repo in VS Code and press **F5** — this launches an Extension Development Host with the extension loaded. Reload the host window (`Cmd+R`) to pick up new builds.

## Architecture

This is a VS Code extension (TypeScript, bundled via esbuild to `out/extension.js`). The entry point is `src/extension.ts`, which registers two command groups: commit generation and API key setup.

**Request flow** when the user clicks "Generate AI commit":
1. `src/commands/generate-ai-commit.ts` — validates the git extension is active, checks the correct API key is set (based on the selected generator), instantiates the right `MsgGenerator`, and wires everything into `GenerateCompletionFlow`.
2. `src/flows/generate-completion-flow.ts` — orchestrates: get diff → generate message → prompt user to approve/edit → write to git input box.
3. `src/gptcommit/scm/diff-providers/` — `VscodeGitDiffProvider` (primary) uses the VS Code Git extension API; `ExecaGitDiffProvider` is a deprecated fallback using `git` CLI via `execa`.
4. `src/gptcommit/commit-msg-gen/generators/` — `ChatgptMsgGenerator` (OpenAI) and `GroqMsgGenerator` share prompt logic via `shared-prompt.ts` (`buildCommitPromptMessages`, `normalizeCommitMessage`).
5. `src/gptcommit/scm/commit-message-writers/GitCommitMessageWriter` — writes the final string into the SCM input box via the VS Code Git extension API.

**Adding a new LLM provider** requires: a new generator in `generators/`, exporting it from `commit-msg-gen/index.ts`, adding config fields to the Zod schema in `src/utils/configuration.ts` and `package.json` contributes, a `setXxxApiKey` command, and a branch in `generate-ai-commit.ts`.

**Configuration** is read via `getConfiguration()` in `src/utils/configuration.ts`, which parses VS Code workspace config through a Zod schema. All settings live under the `gptcommit.*` namespace. The `DeepKey<T>` utility type (`src/utils/types.ts`) enforces type-safe keys when writing config values.

**Path aliases** (`@utils/*`, `@gptcommit/*`, `@commands`, `@flows`) are resolved by both `tsconfig.json` (for the type checker) and esbuild (bundler). If you add a new alias, update both.
