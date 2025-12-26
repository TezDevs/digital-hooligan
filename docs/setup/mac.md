# Digital Hooligan — macOS Dev Setup (Apple Silicon)

This document defines the canonical macOS development environment
for Digital Hooligan LLC. All machines must conform to this setup.

Target hardware:
- Apple Silicon (M-series)
- Homebrew in /opt/homebrew
- zsh + iTerm2
- Node via nvm
- pnpm workspaces

---

## 1. System Baseline

- Trackpad: Tap to click
- Keyboard repeat: Fast
- Display scaling: More Space
- Disable smart quotes, spellcheck, auto-correct
- Allow apps from identified developers

---

## 2. Homebrew (Apple Silicon)

\`\`\`bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
\`\`\`

Verify:
\`\`\`bash
brew config | grep CPU
# CPU: arm64
\`\`\`

---

## 3. Shell Configuration

### ~/.zprofile
\`\`\`bash
export PATH="/usr/bin:/bin:/usr/sbin:/sbin"
eval "$(/opt/homebrew/bin/brew shellenv)"
export NVM_DIR="$HOME/.nvm"
export PATH="$HOME/bin:$PATH"
\`\`\`

### ~/.zshrc
\`\`\`bash
export EDITOR="code"
export VISUAL="code"

HISTSIZE=10000
SAVEHIST=10000
setopt share_history
setopt hist_ignore_dups
setopt hist_reduce_blanks

autoload -Uz colors && colors
eval "$(starship init zsh)"

alias ll='ls -alh'
alias gs='git status'
alias ga='git add'
alias gc='git commit'
alias gco='git checkout'
alias gl='git log --oneline --decorate --graph'

source ~/.fzf.zsh

export NVM_DIR="$HOME/.nvm"
[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"
\`\`\`

---

## 4. Core Tools

\`\`\`bash
brew install git nvm fzf starship
npm install -g pnpm
\`\`\`

After fzf install:
\`\`\`bash
$(brew --prefix)/opt/fzf/install
\`\`\`

---

## 5. Git Identity

\`\`\`bash
git config --global user.name "Tez"
git config --global user.email "tez@digitalhooligan.io"
git config --global user.useConfigOnly true
\`\`\`

---

## 6. Workspace

\`\`\`bash
mkdir -p ~/Projects
cd ~/Projects
git clone git@github.com:YOUR_ORG/Digital-Hooligan.git
cd Digital-Hooligan
pnpm install
pnpm dev
\`\`\`

---

## 7. Verification Checklist

- No shell startup errors
- /usr/local/bin NOT in PATH
- brew CPU = arm64
- starship + fzf load cleanly
- pnpm dev runs
