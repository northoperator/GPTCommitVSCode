/*
 * This code includes portions of code from the opencommit project, which is
 * licensed under the MIT License. Copyright (c) Dima Sukharev.
 * The original code can be found at https://github.com/di-sukharev/opencommit/blob/master/src/generateCommitMessageFromGitDiff.ts.
 */

import OpenAI from "openai";

import { Configuration as AppConfiguration } from "@utils/configuration";

import { MsgGenerator } from "./msg-generator";
import {
  buildCommitPromptMessages,
  defaultMaxTokens,
  defaultTemperature,
  normalizeCommitMessage,
} from "./shared-prompt";

const defaultModel = "gpt-3.5-turbo-16k";

export class ChatgptMsgGenerator implements MsgGenerator {
  openAI: OpenAI;
  config?: AppConfiguration["openAI"];

  constructor(config: AppConfiguration["openAI"]) {
    this.openAI = new OpenAI({
      apiKey: config.apiKey,
      baseURL: config.customEndpoint?.trim() || undefined,
    });
    this.config = config;
  }

  async generate(diff: string, delimeter?: string) {
    const completion = await this.openAI.chat.completions.create({
      model: this.config?.gptVersion || defaultModel,
      messages: buildCommitPromptMessages(diff),
      temperature: this.config?.temperature || defaultTemperature,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      max_tokens: this.config?.maxTokens || defaultMaxTokens,
    });

    return normalizeCommitMessage(
      completion.choices[0]?.message?.content,
      delimeter
    );
  }
}
