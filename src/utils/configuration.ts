import { z } from "zod";
import * as vscode from "vscode";

import { DeepKey } from "./types";

const configurationSchema = z.object({
  appearance: z.object({
    delimeter: z.string().optional(),
  }),
  general: z.object({
    generator: z
      .enum(["ChatGPT", "Groq"])
      .default("ChatGPT")
      .catch("ChatGPT")
      .optional(),
    messageApproveMethod: z
      .enum(["Quick pick", "Message file"])
      .default("Quick pick")
      .catch("Quick pick")
      .optional(),
  }),
  temperature: z.number().optional(),
  maxTokens: z.number().optional(),
  openAI: z.object({
    apiKey: z.string().optional(),
    gptVersion: z
      .enum([
        "gpt-4",
        "gpt-4-0613",
        "gpt-4-32k",
        "gpt-4-32k-0613",
        "gpt-3.5-turbo",
        "gpt-3.5-turbo-0613",
        "gpt-3.5-turbo-16k",
        "gpt-3.5-turbo-16k-0613",
      ])
      .default("gpt-3.5-turbo-16k")
      .catch("gpt-3.5-turbo-16k")
      .optional(),
    customEndpoint: z.string().optional(),
  }),
  groq: z.object({
    apiKey: z.string().optional(),
    model: z.string().default("openai/gpt-oss-120b").catch("openai/gpt-oss-120b").optional(),
  }),
});

export type Configuration = z.infer<typeof configurationSchema>;
export type SharedGenerationConfiguration = Pick<
  Configuration,
  "temperature" | "maxTokens"
>;

export async function setConfigurationValue(
  key: DeepKey<Configuration>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
) {
  const configuration = vscode.workspace.getConfiguration("gptcommit");
  await configuration.update(key, value, vscode.ConfigurationTarget.Global);
}

export function getConfiguration() {
  const configuration = vscode.workspace.getConfiguration("gptcommit");

  const openAIConfiguration = configuration.get<Configuration["openAI"]>(
    "openAI",
    {}
  );
  const groqConfiguration = configuration.get<Configuration["groq"]>("groq", {});

  return configurationSchema.parse({
    appearance: configuration.get<Configuration["appearance"]>("appearance", {}),
    general: configuration.get<Configuration["general"]>("general", {}),
    temperature: configuration.get<number>("temperature"),
    maxTokens: configuration.get<number>("maxTokens"),
    openAI: openAIConfiguration,
    groq: groqConfiguration,
  });
}
