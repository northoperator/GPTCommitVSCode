import * as vscode from "vscode";

import { generateAiCommitCommand, setOpenaiApiKey, setGroqApiKey } from "@commands";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "gptcommit.generateAICommit",
      generateAiCommitCommand
    )
  );
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "gptcommit.setOpenAIApiKey",
      setOpenaiApiKey
    )
  );
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "gptcommit.setGroqApiKey",
      setGroqApiKey
    )
  );
}

export function deactivate() {}
