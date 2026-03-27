import { trimNewLines } from "@utils/text";

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export const defaultTemperature = 0.2;
export const defaultMaxTokens = 196;

const systemPrompt = `You are to act as the author of a commit message in git. Your mission is to create clean and comprehensive commit messages in the conventional commit convention. I'll send you an output of 'git diff --staged' command, and you convert it into a commit message. Do not preface the commit with anything, use the present tense. Don't add any descriptions to the commit, only commit message. Use english language to answer.`;

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

const exampleAssistantMessage = `fix(server.ts): change port variable case from lowercase port to uppercase PORT
feat(server.ts): add support for process.env.PORT environment variable`;

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
  delimeter?: string
) {
  if (!commitMessage) {
    throw new Error("No commit message were generated. Try again.");
  }

  return trimNewLines(commitMessage, delimeter);
}
