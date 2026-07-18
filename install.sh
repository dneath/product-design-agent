#!/bin/bash

# Product Design Partner — Installation Script (v2)
# Targets: opencode | claude (Claude Code) | cursor | codex | custom

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_header() {
    echo -e "${BLUE}================================================${NC}"
    echo -e "${BLUE}  Product Design Partner — Installer (v2)${NC}"
    echo -e "${BLUE}================================================${NC}"
    echo ""
}

print_success() { echo -e "${GREEN}✓${NC} $1"; }
print_warning() { echo -e "${YELLOW}⚠${NC} $1"; }
print_error()   { echo -e "${RED}✗${NC} $1"; }
print_info()    { echo -e "${BLUE}ℹ${NC} $1"; }

# Shared bundle location for cursor/codex/claude personal installs
BUNDLE_DIR="$HOME/.product-design-partner"

# Codex AGENTS.md marker block (MUST match uninstall.sh exactly)
PDP_BEGIN='<!-- >>> product-design-partner v2 >>> -->'
PDP_END='<!-- <<< product-design-partner v2 <<< -->'

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

# Remove v1.x artifacts (enforcement plugins, validators) left by older installs.
sweep_legacy() {
    local dir=$1
    local removed=0
    for f in product-design.js design-validator.mjs design-migrator.js csv-converter.mjs \
             path-resolver.mjs sync-commands.mjs sync-agents.mjs; do
        if [ -f "$dir/plugins/$f" ]; then rm -f "$dir/plugins/$f"; removed=1; fi
    done
    rmdir "$dir/plugins" 2>/dev/null || true
    if [ "$removed" -eq 1 ]; then
        print_info "Removed legacy v1.x plugin files from $dir/plugins/"
    fi
}

# Copy prototype shells, excluding anything a local test run may have left behind.
copy_shells() {
    local dest=$1
    rm -rf "$dest/design-data/shells"
    cp -r design-data/shells "$dest/design-data/"
    rm -rf "$dest"/design-data/shells/*/node_modules "$dest"/design-data/shells/*/.next \
           "$dest"/design-data/shells/*/package-lock.json "$dest"/design-data/shells/*/.dev-server.json \
           "$dest"/design-data/shells/*/.dev-server.log 2>/dev/null || true
}

# Copy the full bundle (agent + modules + references + templates + shells + scripts + agents)
copy_bundle() {
    local root=$1
    print_info "Copying bundle to $root ..."
    mkdir -p "$root/agent/modules" "$root/design-data/references" \
             "$root/design-data/templates" "$root/design-data/projects" \
             "$root/scripts" "$root/agents"
    cp agent/product-design-partner.md "$root/agent/"
    cp agent/modules/*.md "$root/agent/modules/"
    cp design-data/references/*.md "$root/design-data/references/"
    cp design-data/templates/*.md "$root/design-data/templates/"
    copy_shells "$root"
    cp design-data/projects/README.md "$root/design-data/projects/" 2>/dev/null || true
    cp scripts/dev-server.mjs scripts/path-resolver.mjs "$root/scripts/"
    cp agents/*.md "$root/agents/"
    touch "$root/design-data/projects/.gitkeep"
    sweep_legacy "$root"
    print_success "Bundle copied"
}

install_opencode() {
    local cfg="$HOME/.config/opencode"
    print_info "Installing for OpenCode at $cfg"
    # Modules live OUTSIDE agents/ so OpenCode doesn't register each one as a phantom subagent.
    mkdir -p "$cfg/agents" "$cfg/product-design-partner/modules" "$cfg/command" \
             "$cfg/scripts" "$cfg/design-data/references" \
             "$cfg/design-data/templates" "$cfg/design-data/projects"
    cp agent/product-design-partner.md "$cfg/agents/"
    cp agent/modules/*.md "$cfg/product-design-partner/modules/"
    cp scripts/dev-server.mjs scripts/path-resolver.mjs "$cfg/scripts/"
    cp opencode/command/*.md "$cfg/command/"
    cp design-data/references/*.md "$cfg/design-data/references/"
    cp design-data/templates/*.md "$cfg/design-data/templates/"
    copy_shells "$cfg"
    sweep_legacy "$cfg"
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
    cp cursor/rules/*.mdc "$HOME/.cursor/rules/"
    cp cursor/agents/*.md "$HOME/.cursor/agents/"
    print_success "Cursor install complete (global commands + agents)"
    print_info "For per-project use, also copy cursor/rules/product-design-partner.mdc into the project's .cursor/rules/."
}

# Codex AGENTS.md: create, append the marked block, or replace it in place (idempotent).
install_codex_agents_md() {
    local target="$HOME/.codex/AGENTS.md"
    if [ ! -f "$target" ]; then
        cp codex/AGENTS.md "$target"
        print_success "Installed ~/.codex/AGENTS.md"
    elif grep -qF "$PDP_BEGIN" "$target"; then
        # Replace the existing marked block in place.
        awk -v begin="$PDP_BEGIN" -v end="$PDP_END" -v src="codex/AGENTS.md" '
            index($0, begin) { while ((getline line < src) > 0) print line; close(src); skipping=1; next }
            index($0, end)   { skipping=0; next }
            !skipping { print }
        ' "$target" > "$target.pdp-tmp" && mv "$target.pdp-tmp" "$target"
        print_success "Updated the Product Design Partner block in ~/.codex/AGENTS.md"
    else
        { echo ""; cat codex/AGENTS.md; } >> "$target"
        print_success "Appended the Product Design Partner block to ~/.codex/AGENTS.md"
    fi
}

install_codex() {
    print_info "Installing for Codex"
    copy_bundle "$BUNDLE_DIR"
    mkdir -p "$HOME/.codex/prompts"
    cp codex/prompts/*.md "$HOME/.codex/prompts/"
    install_codex_agents_md
    print_success "Codex install complete (custom prompts + AGENTS.md block)"
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
            [ -f "$HOME/.config/opencode/product-design-partner/modules/prototyping.md" ] || { print_error "Modules missing"; ((errors++)); }
            [ ! -d "$HOME/.config/opencode/agents/product-design-partner" ] || { print_error "Modules leaked into agents/ (would show as phantom subagents)"; ((errors++)); }
            [ -f "$HOME/.config/opencode/design-data/templates/handoff-template.md" ] || { print_error "Templates missing"; ((errors++)); }
            [ -f "$HOME/.config/opencode/command/design.md" ] || { print_error "Commands missing"; ((errors++)); }
            ;;
        claude)
            [ -f "$BUNDLE_DIR/agent/product-design-partner.md" ] || { print_error "Bundle agent missing"; ((errors++)); }
            [ -f "$BUNDLE_DIR/design-data/templates/handoff-template.md" ] || { print_error "Templates missing"; ((errors++)); }
            [ -f "$HOME/.claude/commands/design.md" ] || { print_error "Commands missing"; ((errors++)); }
            [ -f "$HOME/.claude/agents/design.md" ] || { print_error "Subagents missing"; ((errors++)); }
            ;;
        cursor)
            [ -f "$BUNDLE_DIR/agent/product-design-partner.md" ] || { print_error "Bundle agent missing"; ((errors++)); }
            [ -f "$HOME/.cursor/commands/design.md" ] || { print_error "Commands missing"; ((errors++)); }
            [ -f "$HOME/.cursor/agents/design.md" ] || { print_error "Subagents missing"; ((errors++)); }
            ;;
        codex)
            [ -f "$BUNDLE_DIR/agent/product-design-partner.md" ] || { print_error "Bundle agent missing"; ((errors++)); }
            [ -f "$HOME/.codex/prompts/design.md" ] || { print_error "Prompts missing"; ((errors++)); }
            grep -qF "$PDP_BEGIN" "$HOME/.codex/AGENTS.md" || { print_error "AGENTS.md block missing"; ((errors++)); }
            ;;
        custom)
            [ -f "$CUSTOM_PATH/agent/product-design-partner.md" ] || { print_error "Bundle agent missing"; ((errors++)); }
            [ -f "$CUSTOM_PATH/agent/modules/prototyping.md" ] || { print_error "Modules missing"; ((errors++)); }
            [ -f "$CUSTOM_PATH/design-data/templates/handoff-template.md" ] || { print_error "Templates missing"; ((errors++)); }
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
    local cmds="/design · /prototype · /brainstorm · /critique · /handoff · /research · /flows"
    case $TARGET in
        opencode)
            echo "OpenCode:  @product-design-partner Help me design a dashboard"
            echo "Commands:  $cmds"
            ;;
        claude)
            echo "Claude Code:  $cmds"
            echo "Subagents:    product-design-partner · design · prototype-variants"
            echo "Bundle:       $BUNDLE_DIR"
            ;;
        cursor)
            echo "Cursor:   $cmds"
            echo "Rule:     ~/.cursor/rules/product-design-partner.mdc (copy into a project's .cursor/rules/ to attach it)"
            echo "Bundle:   $BUNDLE_DIR"
            ;;
        codex)
            echo "Codex:    $cmds"
            echo "Global:   ~/.codex/AGENTS.md (Product Design Partner block)"
            echo "Bundle:   $BUNDLE_DIR"
            ;;
        custom)
            echo "Bundle installed at: $CUSTOM_PATH"
            echo "Load agent/product-design-partner.md as the system prompt; keep design-data/ readable."
            ;;
    esac
    echo ""
    echo "Docs: docs/install.md (install/uninstall/troubleshooting) · docs/architecture.md · examples/"
    echo "Uninstall: ./uninstall.sh --target $TARGET"
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
