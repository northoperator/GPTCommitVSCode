#!/usr/bin/env bash

set -euo pipefail

npm install
npm run package
code --install-extension packages/gpt-commit-1.0.5.vsix
