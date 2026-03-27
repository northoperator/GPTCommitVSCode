import Groq from "groq-sdk";

import { Configuration as AppConfiguration } from "@utils/configuration";

import { MsgGenerator } from "./msg-generator";
import {
  buildCommitPromptMessages,
  defaultMaxTokens,
  defaultTemperature,
  normalizeCommitMessage,
} from "./shared-prompt";

const defaultModel = "openai/gpt-oss-120b";

export class GroqMsgGenerator implements MsgGenerator {
  groq: Groq;
  config?: AppConfiguration["groq"];

  constructor(config: AppConfiguration["groq"]) {
    this.groq = new Groq({ apiKey: config.apiKey });
    this.config = config;
  }

  async generate(diff: string, delimeter?: string) {
    const completion = await this.groq.chat.completions.create({
      model: this.config?.model || defaultModel,
      messages: buildCommitPromptMessages(diff),
      temperature: this.config?.temperature || defaultTemperature,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      max_completion_tokens: this.config?.maxTokens || defaultMaxTokens,
    });

    return normalizeCommitMessage(
      completion.choices[0]?.message?.content,
      delimeter
    );
  }
}
