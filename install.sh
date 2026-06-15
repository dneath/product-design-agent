#!/bin/bash

# Product Design Partner Agent - Installation Script
# Targets: opencode | claude (Claude Code) | cursor | codex | custom

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_header() {
    echo -e "${BLUE}================================================${NC}"
    echo -e "${BLUE}  Product Design Partner Agent - Installer${NC}"
    echo -e "${BLUE}================================================${NC}"
    echo ""
}

print_success() { echo -e "${GREEN}✓${NC} $1"; }
print_warning() { echo -e "${YELLOW}⚠${NC} $1"; }
print_error()   { echo -e "${RED}✗${NC} $1"; }
print_info()    { echo -e "${BLUE}ℹ${NC} $1"; }

# Shared bundle location for cursor/codex/claude personal installs
BUNDLE_DIR="$HOME/.product-design-partner"

# Detect installation target
detect_target() {
    if [ -d "$HOME/.config/opencode" ]; then
        echo "opencode"
    elif [ -d "$HOME/.claude" ]; then
        echo "claude"
    elif [ -d "$HOME/.cursor" ]; then
        echo "cursor"
    elif [ -d "$HOME/.codex" ]; then
        echo "codex"
    else
        echo "unknown"
    fi
}

# Copy the full bundle (agent + modules + reference data + plugins + prompts)
# to a root directory, mirroring the repo layout.
copy_bundle() {
    local root=$1
    print_info "Copying bundle to $root ..."
    mkdir -p "$root/agent/modules" "$root/design-data/references" \
             "$root/design-data/projects" "$root/design-data/components" \
             "$root/design-data/tokens" "$root/design-data/validation-history" \
             "$root/plugins" "$root/prompts"
    cp agent/product-design-partner.md "$root/agent/"
    cp agent/modules/*.md "$root/agent/modules/"
    cp design-data/references/*.md design-data/references/*.json "$root/design-data/references/"
    cp plugins/*.js plugins/*.mjs "$root/plugins/" 2>/dev/null || true
    cp prompts/*.md "$root/prompts/" 2>/dev/null || true
    mkdir -p "$root/agents"
    cp agents/*.md "$root/agents/" 2>/dev/null || true
    touch "$root/design-data/projects/.gitkeep" "$root/design-data/components/.gitkeep" \
          "$root/design-data/tokens/.gitkeep" "$root/design-data/validation-history/.gitkeep"
    print_success "Bundle copied"
}

install_opencode() {
    local cfg="$HOME/.config/opencode"
    print_info "Installing for OpenCode at $cfg"
    mkdir -p "$cfg/agents/product-design-partner/modules" "$cfg/plugins" \
             "$cfg/command" "$cfg/prompts" "$cfg/design-data/references" \
             "$cfg/design-data/projects" "$cfg/design-data/components" \
             "$cfg/design-data/tokens" "$cfg/design-data/validation-history"
    cp agent/product-design-partner.md "$cfg/agents/"
    cp agent/modules/*.md "$cfg/agents/product-design-partner/modules/"
    cp plugins/*.js plugins/*.mjs "$cfg/plugins/" 2>/dev/null || true
    cp opencode/command/*.md "$cfg/command/"
    cp prompts/*.md "$cfg/prompts/" 2>/dev/null || true
    cp design-data/references/*.md design-data/references/*.json "$cfg/design-data/references/"
    print_success "OpenCode install complete"
}

install_claude() {
    print_info "Installing for Claude Code"
    copy_bundle "$BUNDLE_DIR"
    mkdir -p "$HOME/.claude/commands" "$HOME/.claude/agents"
    cp commands/*.md "$HOME/.claude/commands/"
    cp agents/*.md "$HOME/.claude/agents/"
    print_success "Claude Code install complete (personal commands + subagents)"
    print_info "Preferred alternative: install as a plugin — run /plugin in Claude Code and add this repo (uses .claude-plugin/plugin.json; enables the UserPromptSubmit hook)."
}

install_cursor() {
    print_info "Installing for Cursor"
    copy_bundle "$BUNDLE_DIR"
    mkdir -p "$HOME/.cursor/commands" "$HOME/.cursor/rules" "$HOME/.cursor/agents"
    cp cursor/commands/*.md "$HOME/.cursor/commands/"
    cp cursor/rules/*.mdc "$HOME/.cursor/rules/" 2>/dev/null || true
    cp cursor/agents/*.md "$HOME/.cursor/agents/" 2>/dev/null || true
    print_success "Cursor install complete (global commands + agents)"
    print_info "For per-project use, also copy cursor/rules/product-design-partner.mdc into the project's .cursor/rules/ (rules attach per-project)."
}

install_codex() {
    print_info "Installing for Codex"
    copy_bundle "$BUNDLE_DIR"
    mkdir -p "$HOME/.codex/prompts"
    cp codex/prompts/*.md "$HOME/.codex/prompts/"
    if [ -f "$HOME/.codex/AGENTS.md" ]; then
        print_warning "~/.codex/AGENTS.md already exists — NOT overwriting."
        print_info "Append codex/AGENTS.md to it manually:  cat codex/AGENTS.md >> ~/.codex/AGENTS.md"
    else
        cp codex/AGENTS.md "$HOME/.codex/AGENTS.md"
        print_success "Installed ~/.codex/AGENTS.md"
    fi
    print_success "Codex install complete (custom prompts)"
}

install_custom() {
    if [ -z "$CUSTOM_PATH" ]; then
        print_error "No installation path provided (use --path with --target custom)"
        exit 1
    fi
    print_info "Installing bundle to custom path $CUSTOM_PATH"
    copy_bundle "$CUSTOM_PATH"
    mkdir -p "$CUSTOM_PATH/commands"
    cp commands/*.md "$CUSTOM_PATH/commands/"
}

validate_installation() {
    print_info "Validating installation..."
    local errors=0
    case $TARGET in
        opencode)
            [ -f "$HOME/.config/opencode/agents/product-design-partner.md" ] || { print_error "Agent file missing"; ((errors++)); }
            [ -d "$HOME/.config/opencode/design-data/references" ] || { print_error "Reference data missing"; ((errors++)); }
            ;;
        claude)
            [ -f "$BUNDLE_DIR/agent/product-design-partner.md" ] || { print_error "Bundle agent missing"; ((errors++)); }
            [ -f "$HOME/.claude/commands/interface.md" ] || { print_error "Commands missing"; ((errors++)); }
            [ -f "$HOME/.claude/agents/interface-design.md" ] || { print_error "Subagents missing"; ((errors++)); }
            ;;
        cursor)
            [ -f "$BUNDLE_DIR/agent/product-design-partner.md" ] || { print_error "Bundle agent missing"; ((errors++)); }
            [ -f "$HOME/.cursor/commands/interface.md" ] || { print_error "Commands missing"; ((errors++)); }
            [ -f "$HOME/.cursor/agents/interface-design.md" ] || { print_error "Subagents missing"; ((errors++)); }
            ;;
        codex)
            [ -f "$BUNDLE_DIR/agent/product-design-partner.md" ] || { print_error "Bundle agent missing"; ((errors++)); }
            [ -f "$HOME/.codex/prompts/interface.md" ] || { print_error "Prompts missing"; ((errors++)); }
            ;;
        custom)
            [ -f "$CUSTOM_PATH/agent/product-design-partner.md" ] || { print_error "Bundle agent missing"; ((errors++)); }
            ;;
    esac
    if [ $errors -eq 0 ]; then
        print_success "Installation validated successfully"
        return 0
    fi
    print_error "Installation validation failed with $errors errors"
    return 1
}

print_usage_instructions() {
    echo ""
    echo -e "${GREEN}================================================${NC}"
    echo -e "${GREEN}  Installation Complete!${NC}"
    echo -e "${GREEN}================================================${NC}"
    echo ""
    case $TARGET in
        opencode)
            echo "OpenCode:  @product-design-partner Help me design a dashboard"
            echo "Commands:  /interface, /prototype, /brainstorm, /diagram, /annotate, …"
            echo "Plugins enforce the 5 gates and track variance automatically."
            ;;
        claude)
            echo "Claude Code:  /interface, /prototype, /brainstorm, /diagram, /annotate, …"
            echo "Subagent:     'Use the product-design-partner agent to …'"
            echo "Bundle:       $BUNDLE_DIR (modules + reference data)"
            ;;
        cursor)
            echo "Cursor:   /interface, /prototype, /brainstorm, /diagram, /annotate, …"
            echo "Rule:     ~/.cursor/rules/product-design-partner.mdc (copy into a project's .cursor/rules/ to attach it)"
            echo "Bundle:   $BUNDLE_DIR (modules + reference data)"
            ;;
        codex)
            echo "Codex:    /interface, /prototype, /brainstorm, /diagram, /annotate, …"
            echo "Global:   ~/.codex/AGENTS.md defines the agent for every session"
            echo "Bundle:   $BUNDLE_DIR (modules + reference data)"
            ;;
        custom)
            echo "Bundle installed at: $CUSTOM_PATH"
            echo "Load agent/product-design-partner.md as the system prompt; keep design-data/ readable."
            echo "Validate outputs:  node $CUSTOM_PATH/plugins/design-validator.mjs output.md"
            ;;
    esac
    echo ""
    echo ""
    case $TARGET in
        claude)   echo "macOS guide: docs/installation-claude-code-macos.md" ;;
        cursor)   echo "macOS guide: docs/installation-cursor-macos.md" ;;
        codex)    echo "macOS guide: docs/installation-codex-macos.md" ;;
        opencode) echo "macOS guide: docs/installation-opencode-macos.md" ;;
    esac
    echo "Docs hub: docs/installation.md · macOS hub: docs/installation-macos.md · Examples: examples/"
    echo ""
}

main() {
    print_header

    TARGET=""
    CUSTOM_PATH=""
    ASSUME_YES=false

    while [[ $# -gt 0 ]]; do
        case $1 in
            --target) TARGET="$2"; shift 2 ;;
            --path)   CUSTOM_PATH="$2"; shift 2 ;;
            --yes|-y) ASSUME_YES=true; shift ;;
            --help|-h)
                echo "Usage: $0 [OPTIONS]"
                echo ""
                echo "Options:"
                echo "  --target <opencode|claude|cursor|codex|custom>  Installation target"
                echo "  --path <path>                                   Custom installation path (with --target custom)"
                echo "  --yes, -y                                       Skip confirmation prompt"
                echo "  --help, -h                                      Show this help message"
                echo ""
                echo "macOS: see docs/installation-macos.md (Homebrew Node, Cursor/Claude/Codex paths)"
                exit 0
                ;;
            *) print_error "Unknown option: $1"; exit 1 ;;
        esac
    done

    if [ -z "$TARGET" ]; then
        print_info "No target specified, detecting environment..."
        TARGET=$(detect_target)
        if [ "$TARGET" == "unknown" ]; then
            print_warning "Could not detect environment"
            echo "Please specify target with --target <opencode|claude|cursor|codex|custom>"
            exit 1
        fi
        print_info "Detected target: $TARGET"
    fi

    case $TARGET in
        opencode|claude|cursor|codex|custom) ;;
        *) print_error "Unknown target: $TARGET"; exit 1 ;;
    esac

    if [[ "$ASSUME_YES" != true ]]; then
        read -p "Install for '$TARGET'? (y/n) " -n 1 -r
        echo ""
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_warning "Installation cancelled"
            exit 0
        fi
    else
        print_info "Installing for '$TARGET' (--yes)"
    fi

    case $TARGET in
        opencode) install_opencode ;;
        claude)   install_claude ;;
        cursor)   install_cursor ;;
        codex)    install_codex ;;
        custom)   install_custom ;;
    esac

    if validate_installation; then
        print_usage_instructions
    else
        print_error "Installation completed with errors"
        exit 1
    fi
}

main "$@"
