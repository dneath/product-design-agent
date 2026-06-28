#!/bin/bash

# Product Design Partner Agent - Uninstall Script
# Removes everything install.sh creates, for: opencode | claude | cursor | codex | custom | all
#
# Safety:
#   - Removes ONLY the files this agent installs (matched by name), never unrelated user files.
#   - Preserves your generated design output (design-data/projects, components, tokens) by default.
#     Use --purge to also delete that output and the whole bundle.
#   - Use --dry-run to print what would be removed without removing anything.

set -e

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; NC='\033[0m'
print_header()  { echo -e "${BLUE}================================================${NC}"; echo -e "${BLUE}  Product Design Partner Agent - Uninstaller${NC}"; echo -e "${BLUE}================================================${NC}"; echo ""; }
print_success() { echo -e "${GREEN}✓${NC} $1"; }
print_warning() { echo -e "${YELLOW}⚠${NC} $1"; }
print_error()   { echo -e "${RED}✗${NC} $1"; }
print_info()    { echo -e "${BLUE}ℹ${NC} $1"; }

BUNDLE_DIR="$HOME/.product-design-partner"
DRY_RUN=false
PURGE=false

# --- known artifacts (fallbacks used when the repo isn't present at run time) ---
FALLBACK_COMMANDS="annotate brainstorm critique design-converter design-system diagram figma-export handoff interface mentor portfolio prototype research strategy ux-audit ux-flows"
FALLBACK_AGENTS="product-design-partner interface-design prototype-variants figma-export"
FALLBACK_PLUGINS="product-design.js design-validator.mjs design-migrator.js csv-converter.mjs path-resolver.mjs sync-commands.mjs sync-agents.mjs"
FALLBACK_PROMPTS="goal-mode.md README.md"

detect_target() {
    if   [ -d "$HOME/.config/opencode" ]; then echo "opencode"
    elif [ -d "$HOME/.claude" ];          then echo "claude"
    elif [ -d "$HOME/.cursor" ];          then echo "cursor"
    elif [ -d "$HOME/.codex" ];           then echo "codex"
    else echo "unknown"; fi
}

# rm_path <path> [label]
rm_path() {
    local p="$1"
    [ -e "$p" ] || [ -L "$p" ] || return 0
    if [ "$DRY_RUN" = true ]; then echo "  would remove: $p"; return 0; fi
    rm -rf "$p"
    print_success "removed $p"
}

# Does a directory hold real user content (anything besides .gitkeep)?
has_user_content() {
    local d="$1"
    [ -d "$d" ] || return 1
    local n
    n=$(find "$d" -type f ! -name '.gitkeep' 2>/dev/null | head -1)
    [ -n "$n" ]
}

# remove_mirrored <source-dir> <suffix> <dest-dir> <fallback-list>
# Removes dest-dir/<basename> for every <basename><suffix> in source-dir,
# or for every "<name>" in the fallback list (with <suffix>) when source-dir is absent.
remove_mirrored() {
    local srcdir="$1" suffix="$2" destdir="$3" fallback="$4"
    [ -d "$destdir" ] || return 0
    if [ -d "$srcdir" ]; then
        local f base
        for f in "$srcdir"/*"$suffix"; do
            [ -e "$f" ] || continue
            base=$(basename "$f")
            rm_path "$destdir/$base"
        done
    else
        local name
        for name in $fallback; do
            case "$name" in *"$suffix") rm_path "$destdir/$name" ;; *) rm_path "$destdir/$name$suffix" ;; esac
        done
    fi
}

remove_bundle() {
    local root="$1"
    [ -d "$root" ] || { print_info "No bundle at $root"; return 0; }
    if [ "$PURGE" = true ]; then
        rm_path "$root"
        return 0
    fi
    if has_user_content "$root/design-data/projects" || has_user_content "$root/design-data/components" || has_user_content "$root/design-data/tokens"; then
        print_warning "$root/design-data contains generated output — preserving it. Re-run with --purge to delete the whole bundle."
        # Remove only the agent's own files, keep design-data.
        rm_path "$root/agent"
        rm_path "$root/plugins"
        rm_path "$root/scripts"
        rm_path "$root/prompts"
        rm_path "$root/agents"
        rm_path "$root/design-data/references"
    else
        rm_path "$root"
    fi
}

uninstall_opencode() {
    local cfg="$HOME/.config/opencode"
    print_info "Uninstalling from OpenCode at $cfg"
    rm_path "$cfg/agents/product-design-partner.md"
    rm_path "$cfg/agents/product-design-partner"
    remove_mirrored "plugins" "" "$cfg/plugins" "$FALLBACK_PLUGINS"
    remove_mirrored "scripts" "" "$cfg/scripts" "dev-server.mjs"
    remove_mirrored "opencode/command" ".md" "$cfg/command" "$FALLBACK_COMMANDS"
    remove_mirrored "prompts" ".md" "$cfg/prompts" "$FALLBACK_PROMPTS"
    rm_path "$cfg/design-data/references"
    if [ "$PURGE" = true ]; then
        rm_path "$cfg/design-data/projects"; rm_path "$cfg/design-data/components"
        rm_path "$cfg/design-data/tokens"; rm_path "$cfg/design-data/validation-history"
    elif has_user_content "$cfg/design-data/projects"; then
        print_warning "$cfg/design-data/projects preserved (generated output). Use --purge to delete it."
    fi
    print_success "OpenCode uninstall complete"
}

uninstall_claude() {
    print_info "Uninstalling from Claude Code"
    remove_mirrored "commands" ".md" "$HOME/.claude/commands" "$FALLBACK_COMMANDS"
    remove_mirrored "agents" ".md" "$HOME/.claude/agents" "$FALLBACK_AGENTS"
    remove_bundle "$BUNDLE_DIR"
    print_info "If you installed via the Claude Code plugin (/plugin), remove it there too."
    print_success "Claude Code uninstall complete"
}

uninstall_cursor() {
    print_info "Uninstalling from Cursor"
    remove_mirrored "cursor/commands" ".md" "$HOME/.cursor/commands" "$FALLBACK_COMMANDS"
    remove_mirrored "cursor/agents" ".md" "$HOME/.cursor/agents" "$FALLBACK_AGENTS"
    rm_path "$HOME/.cursor/rules/product-design-partner.mdc"
    remove_bundle "$BUNDLE_DIR"
    print_warning "Also remove product-design-partner.mdc from any project .cursor/rules/ you copied it into."
    print_success "Cursor uninstall complete"
}

uninstall_codex() {
    print_info "Uninstalling from Codex"
    remove_mirrored "codex/prompts" ".md" "$HOME/.codex/prompts" "$FALLBACK_COMMANDS"
    # AGENTS.md: only remove if it's exactly ours; never delete a file the user customized.
    local user_agents="$HOME/.codex/AGENTS.md"
    if [ -f "$user_agents" ]; then
        if [ -f "codex/AGENTS.md" ] && cmp -s "codex/AGENTS.md" "$user_agents"; then
            rm_path "$user_agents"
        else
            print_warning "~/.codex/AGENTS.md differs from the shipped version (you may have customized it) — NOT removing."
            print_info "Remove the Product Design Partner section by hand if you no longer want it."
        fi
    fi
    remove_bundle "$BUNDLE_DIR"
    print_success "Codex uninstall complete"
}

uninstall_custom() {
    if [ -z "$CUSTOM_PATH" ]; then print_error "No path provided (use --path with --target custom)"; exit 1; fi
    print_info "Uninstalling bundle from custom path $CUSTOM_PATH"
    remove_mirrored "commands" ".md" "$CUSTOM_PATH/commands" "$FALLBACK_COMMANDS"
    remove_bundle "$CUSTOM_PATH"
    print_success "Custom uninstall complete"
}

uninstall_all() {
    print_info "Uninstalling from ALL detected harnesses"
    [ -d "$HOME/.config/opencode" ] && uninstall_opencode
    [ -d "$HOME/.claude" ]          && uninstall_claude
    [ -d "$HOME/.cursor" ]          && uninstall_cursor
    [ -d "$HOME/.codex" ]           && uninstall_codex
    remove_bundle "$BUNDLE_DIR"
}

main() {
    print_header
    TARGET=""; CUSTOM_PATH=""; ASSUME_YES=false
    while [[ $# -gt 0 ]]; do
        case $1 in
            --target)  TARGET="$2"; shift 2 ;;
            --path)    CUSTOM_PATH="$2"; shift 2 ;;
            --yes|-y)  ASSUME_YES=true; shift ;;
            --purge)   PURGE=true; shift ;;
            --dry-run) DRY_RUN=true; shift ;;
            --help|-h)
                echo "Usage: $0 [OPTIONS]"
                echo ""
                echo "Options:"
                echo "  --target <opencode|claude|cursor|codex|custom|all>  What to uninstall"
                echo "  --path <path>      Custom install path (with --target custom)"
                echo "  --purge            Also delete generated design output + the whole bundle"
                echo "  --dry-run          Print what would be removed, remove nothing"
                echo "  --yes, -y          Skip the confirmation prompt"
                echo "  --help, -h         Show this help"
                echo ""
                echo "By default your design-data/projects output is preserved (use --purge to delete it)."
                exit 0
                ;;
            *) print_error "Unknown option: $1"; exit 1 ;;
        esac
    done

    if [ -z "$TARGET" ]; then
        print_info "No target specified, detecting environment..."
        TARGET=$(detect_target)
        if [ "$TARGET" = "unknown" ]; then
            print_warning "Could not detect environment"
            echo "Specify a target: --target <opencode|claude|cursor|codex|custom|all>"
            exit 1
        fi
        print_info "Detected target: $TARGET"
    fi

    case $TARGET in
        opencode|claude|cursor|codex|custom|all) ;;
        *) print_error "Unknown target: $TARGET"; exit 1 ;;
    esac

    [ "$DRY_RUN" = true ] && print_warning "DRY RUN — nothing will be deleted"
    [ "$PURGE" = true ]   && print_warning "PURGE — generated design output and the full bundle WILL be deleted"

    if [[ "$ASSUME_YES" != true && "$DRY_RUN" != true ]]; then
        read -p "Uninstall '$TARGET'? (y/n) " -n 1 -r; echo ""
        [[ ! $REPLY =~ ^[Yy]$ ]] && { print_warning "Uninstall cancelled"; exit 0; }
    fi

    case $TARGET in
        opencode) uninstall_opencode ;;
        claude)   uninstall_claude ;;
        cursor)   uninstall_cursor ;;
        codex)    uninstall_codex ;;
        custom)   uninstall_custom ;;
        all)      uninstall_all ;;
    esac

    echo ""
    if [ "$DRY_RUN" = true ]; then
        print_info "Dry run complete — no changes made."
    else
        print_success "Uninstall complete."
        print_info "Removed the Product Design Partner files for '$TARGET'."
    fi
    echo ""
}

main "$@"
