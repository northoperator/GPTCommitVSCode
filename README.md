# GPT Commit

VS Code extension which helps to generate AI commit messages using ChatGPT or Groq.

## Features

You can generate commit message by pressing 'Generate AI commit' button in source control tab:

![Example of usage](assets/images/example.gif)

> Tip: You could also generate commit from command pallete by calling 'Generate AI commit' command.

## Requirements

An API key for your chosen generator (OpenAI or Groq).

- OpenAI API key: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
- Groq API key: [console.groq.com/keys](https://console.groq.com/keys)

## Extension Settings

### Appearance

- `gptcommit.appearance.delimeter`: Optional prefix added to each generated commit line

### General

- `gptcommit.general.generator`: Generator used to create commit messages. Available options: `ChatGPT`, `Groq` (default: `ChatGPT`)
- `gptcommit.general.messageApproveMethod`: How generated commit messages are handled. `Quick pick` inserts directly into the SCM input box, while `Message file` opens a temp file for review and editing.

### OpenAI

- `gptcommit.openAI.apiKey`: OpenAI API key
- `gptcommit.openAI.gptVersion`: GPT model version (default: `gpt-3.5-turbo-16k`)
- `gptcommit.openAI.customEndpoint`: Custom endpoint URL for OpenAI-compatible APIs
- `gptcommit.openAI.temperature`: Sampling temperature (default: `0.2`)
- `gptcommit.openAI.maxTokens`: Maximum tokens to generate (default: `196`)

### Groq

- `gptcommit.groq.apiKey`: Groq API key
- `gptcommit.groq.model`: Groq model (default: `openai/gpt-oss-120b`)
- `gptcommit.groq.temperature`: Sampling temperature (default: `0.2`)
- `gptcommit.groq.maxTokens`: Maximum tokens to generate (default: `196`)

## Release Notes

### 1.0.0

Initial release of GPT Commit

### 1.0.1

Updated icons

### 1.0.2

Fixed UX

### 1.0.3

Added Open AI API Key input prompt

### 1.0.4

Updated commit formatting. Added new setting

### 1.0.5

Added new advanced configuration for ChatGPT.\
Added new option to accept and edit generated commit via temp message file. (Thanks for help [chenweiyi](https://github.com/chenweiyi))\
Added option to set custom ChatGPT endpoint URL. (Thanks for help [aiyogg](https://github.com/aiyogg))\
Fixed issue with git on windows (Issue [#5](https://github.com/dmytrobaida/GPTCommitVSCode/issues/5))\
Added option to select different ChatGPT version (Issue [#6](https://github.com/dmytrobaida/GPTCommitVSCode/issues/6))\
Set default ChatGPT version to gpt-3.5-turbo-16k

### 1.0.6

Added Groq as a generator option (default model: `openai/gpt-oss-120b`)

## License

Released under [MIT](/LICENSE) by [@dmytrobaida](https://github.com/dmytrobaida).
