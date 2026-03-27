import Groq from "groq-sdk";

import {
  Configuration as AppConfiguration,
  SharedGenerationConfiguration,
} from "@utils/configuration";

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
  sharedConfig?: SharedGenerationConfiguration;

  constructor(
    config: AppConfiguration["groq"],
    sharedConfig?: SharedGenerationConfiguration
  ) {
    this.groq = new Groq({ apiKey: config.apiKey });
    this.config = config;
    this.sharedConfig = sharedConfig;
  }

  async generate(diff: string, delimeter?: string) {
    const completion = await this.groq.chat.completions.create({
      model: this.config?.model || defaultModel,
      messages: buildCommitPromptMessages(diff),
      temperature: this.sharedConfig?.temperature ?? defaultTemperature,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      max_completion_tokens: this.sharedConfig?.maxTokens ?? defaultMaxTokens,
    });

    return normalizeCommitMessage(
      completion.choices[0]?.message?.content,
      delimeter
    );
  }
}
