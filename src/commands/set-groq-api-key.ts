import * as vscode from "vscode";

import { setConfigurationValue } from "@utils/configuration";
import { logToOutputChannel } from "@utils/output";

export async function setGroqApiKey() {
  logToOutputChannel("Starting setGroqApiKey command");
  const apiKey = await vscode.window.showInputBox({
    title: "Please enter your Groq API Key",
  });

  if (!apiKey || apiKey.trim() === "") {
    logToOutputChannel("User canceled setGroqApiKey command");
    return;
  }

  logToOutputChannel("Saving Groq API Key");
  await setConfigurationValue("groq.apiKey", apiKey);

  return apiKey;
}
