import { trimNewLines } from "@utils/text";

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export const defaultTemperature = 0.3;
export const defaultMaxTokens = 512;

const systemPrompt = `You are the author of a git commit message. I will send you the output of 'git diff --staged', and you must convert it into a single conventional commit message in English.

Return exactly one conventional-commit subject line on the first line.
If extra context is useful, add a blank line followed by a short descriptive body of 1-3 lines.
Use the imperative mood and present tense.
Do not return multiple conventional-commit headlines.
Do not use bullets, markdown, code fences, or any explanatory preface.`;

const exampleUserMessage = `diff --git a/src/server.ts b/src/server.ts
    index ad4db42..f3b18a9 100644
    --- a/src/server.ts
    +++ b/src/server.ts
    @@ -10,7 +10,7 @@ import {
      initWinstonLogger();

      const app = express();
    -const port = 7799;
    +const PORT = 7799;

      app.use(express.json());

    @@ -34,6 +34,6 @@ app.use((_, res, next) => {
      // ROUTES
      app.use(PROTECTED_ROUTER_URL, protectedRouter);

    -app.listen(port, () => {
    -  console.log(\`Server listening on port \${port}\`);
    +app.listen(process.env.PORT || PORT, () => {
    +  console.log(\`Server listening on port \${PORT}\`);
      });`;

const exampleAssistantMessage = `feat(server): support PORT environment variable

Rename the port constant to PORT for consistency.
Allow process.env.PORT to override the default port when starting the server.`;

export function buildCommitPromptMessages(diff: string): Array<ChatMessage> {
  return [
    { role: "system", content: systemPrompt },
    { role: "user", content: exampleUserMessage },
    { role: "assistant", content: exampleAssistantMessage },
    { role: "user", content: diff },
  ];
}

export function normalizeCommitMessage(
  commitMessage: string | null | undefined,
  delimeter?: string,
) {
  if (!commitMessage) {
    throw new Error("No commit message were generated. Try again.");
  }

  return trimNewLines(commitMessage, delimeter);
}
