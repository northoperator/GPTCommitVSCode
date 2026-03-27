import { getConfiguration } from "./configuration";

const conventionalCommitPrefixPattern = /^[a-z]+(?:\([^)]+\))?!?:\s+/i;

function cleanGeneratedLine(line: string) {
  const trimmedLine = line.trim();

  if (trimmedLine.startsWith("```")) {
    return "";
  }

  return trimmedLine.replace(/^[-*+]\s+/, "").replace(/^\d+\.\s+/, "");
}

function compactBlankLines(lines: string[]) {
  const compactedLines: string[] = [];

  for (const line of lines) {
    const previousLine = compactedLines[compactedLines.length - 1];

    if (line === "" && (compactedLines.length === 0 || previousLine === "")) {
      continue;
    }

    compactedLines.push(line);
  }

  if (compactedLines[compactedLines.length - 1] === "") {
    compactedLines.pop();
  }

  return compactedLines;
}

export function trimNewLines(str: string, delimeter?: string) {
  const normalizedText = str.replace(/\r\n/g, "\n").trim();

  if (normalizedText === "") {
    return str;
  }

  let formattedStrings = compactBlankLines(
    normalizedText.split("\n").map(cleanGeneratedLine),
  );

  const nonEmptyLines = formattedStrings.filter((line) => line !== "");

  if (
    nonEmptyLines.length > 1 &&
    nonEmptyLines.every((line) => conventionalCommitPrefixPattern.test(line))
  ) {
    const [subject, ...body] = nonEmptyLines;
    formattedStrings = [
      subject,
      "",
      ...body.map((line) =>
        line.replace(conventionalCommitPrefixPattern, "").trim(),
      ),
    ];
  } else if (
    formattedStrings.length > 1 &&
    conventionalCommitPrefixPattern.test(formattedStrings[0]) &&
    formattedStrings[1] !== ""
  ) {
    formattedStrings = [formattedStrings[0], "", ...formattedStrings.slice(1)];
  }

  if (delimeter) {
    formattedStrings = formattedStrings.map((line) =>
      line === "" ? "" : `${delimeter} ${line}`,
    );
  }

  return formattedStrings.join("\n");
}

export function isValidApiKey() {
  const configuration = getConfiguration();
  return (
    configuration.openAI.apiKey !== null && configuration.openAI.apiKey !== undefined &&
    configuration.openAI.apiKey.trim().length > 0
  );
}

export function isValidGroqApiKey() {
  const configuration = getConfiguration();
  return (
    configuration.groq.apiKey !== null && configuration.groq.apiKey !== undefined &&
    configuration.groq.apiKey.trim().length > 0
  );
}
