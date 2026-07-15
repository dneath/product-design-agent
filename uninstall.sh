#!/bin/bash

# Product Design Partner — Uninstall Script (v2)
# Removes everything install.sh creates (v2 AND legacy v1.x artifacts), for:
# opencode | claude | cursor | codex | custom | all
#
# Safety:
#   - Removes ONLY files this agent installs (matched by name), never unrelated user files.
#   - Preserves your generated design output (design-data/projects) by default.
#     Use --purge to also delete that output and the whole bundle.
#   - Use --dry-run to print what would be removed without removing anything.

set -e

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; NC='\033[0m'
print_header()  { echo -e "${BLUE}================================================${NC}"; echo -e "${BLUE}  Product Design Partner — Uninstaller (v2)${NC}"; echo -e "${BLUE}================================================${NC}"; echo ""; }
print_success() { echo -e "${GREEN}✓${NC} $1"; }
print_warning() { echo -e "${YELLOW}⚠${NC} $1"; }
print_error()   { echo -e "${RED}✗${NC} $1"; }
print_info()    { echo -e "${BLUE}ℹ${NC} $1"; }

BUNDLE_DIR="$HOME/.product-design-partner"
DRY_RUN=false
PURGE=false

# Codex AGENTS.md marker block (MUST match install.sh exactly)
PDP_BEGIN='<!-- >>> product-design-partner v2 >>> -->'
PDP_END='<!-- <<< product-design-partner v2 <<< -->'

# --- known artifacts ---
# v2 names (also used as fallback when the repo isn't present at run time)
COMMANDS_V2="brainstorm critique design flows handoff prototype research"
AGENTS_V2="design product-design-partner prototype-variants"
# legacy names no longer in the repo — always swept so a current uninstall cleans older installs
# (includes v2.1 features removed in v2.2: deck, design-system, figma-export)
COMMANDS_LEGACY="annotate deck design-converter design-system diagram figma-export interface mentor portfolio strategy ux-audit ux-flows"
AGENTS_LEGACY="figma-export interface-design"
PLUGINS_LEGACY="product-design.js design-validator.mjs design-migrator.js csv-converter.mjs path-resolver.mjs sync-commands.mjs sync-agents.mjs"
SCRIPTS_INSTALLED="dev-server.mjs path-resolver.mjs test.sh"
FALLBACK_PROMPTS="goal-mode.md README.md"

detect_target() {
    if   [ -d "$HOME/.config/opencode" ]; then echo "opencode"
    elif [ -d "$HOME/.claude" ];          then echo "claude"
    elif [ -d "$HOME/.cursor" ];          then echo "cursor"
    elif [ -d "$HOME/.codex" ];           then echo "codex"
    else echo "unknown"; fi
}

# rm_path <path>
rm_path() {
    local p="$1"
    [ -e "$p" ] || [ -L "$p" ] || return 0
    if [ "$DRY_RUN" = true ]; then echo "  would remove: $p"; return 0; fi
    rm -rf "$p"
    print_success "removed $p"
}

# Remove a directory only if we own it and it's now empty (never touches shared dirs).
rmdir_if_empty() {
    local d="$1"
    [ -d "$d" ] || return 0
    if [ "$DRY_RUN" = true ]; then
        [ -z "$(ls -A "$d" 2>/dev/null)" ] && echo "  would remove empty dir: $d"
        return 0
    fi
    rmdir "$d" 2>/dev/null && print_success "removed empty dir $d" || true
}

# Does a directory hold real user content (anything besides .gitkeep)?
has_user_content() {
    local d="$1"
    [ -d "$d" ] || return 1
    local n
    n=$(find "$d" -type f ! -name '.gitkeep' 2>/dev/null | head -1)
    [ -n "$n" ]
}

# remove_names <destdir> <suffix> <name-list>
remove_names() {
    local destdir="$1" suffix="$2" names="$3" name
    [ -d "$destdir" ] || return 0
    for name in $names; do
        case "$name" in *"$suffix") rm_path "$destdir/$name" ;; *) rm_path "$destdir/$name$suffix" ;; esac
    done
}

# remove_mirrored <source-dir> <suffix> <dest-dir> <fallback-list>
# Removes dest-dir/<basename> for every file in source-dir (when the repo is present),
# or for every name in the fallback list otherwise.
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
        remove_names "$destdir" "$suffix" "$fallback"
    fi
}

remove_bundle() {
    local root="$1"
    [ -d "$root" ] || { print_info "No bundle at $root"; return 0; }
    if [ "$PURGE" = true ]; then
        rm_path "$root"
        return 0
    fi
    if has_user_content "$root/design-data/projects"; then
        print_warning "$root/design-data/projects contains generated output — preserving it. Re-run with --purge to delete the whole bundle."
        rm_path "$root/agent"
        rm_path "$root/plugins"        # legacy v1.x
        rm_path "$root/scripts"
        rm_path "$root/prompts"
        rm_path "$root/agents"
        rm_path "$root/design-data/references"
        rm_path "$root/design-data/templates"
        rm_path "$root/commands"       # custom-target copy
        rmdir_if_empty "$root/design-data"
        rmdir_if_empty "$root"
    else
        rm_path "$root"
    fi
}

uninstall_opencode() {
    local cfg="$HOME/.config/opencode"
    print_info "Uninstalling from OpenCode at $cfg"
    rm_path "$cfg/agents/product-design-partner.md"
    rm_path "$cfg/agents/product-design-partner"   # legacy v2.1 module dir (was under agents/)
    rm_path "$cfg/product-design-partner"          # v2.2 module dir (moved out of agents/)
    remove_names "$cfg/plugins" "" "$PLUGINS_LEGACY"
    remove_names "$cfg/scripts" "" "$SCRIPTS_INSTALLED"
    remove_mirrored "opencode/command" ".md" "$cfg/command" "$COMMANDS_V2"
    remove_names "$cfg/command" ".md" "$COMMANDS_LEGACY"
    remove_mirrored "prompts" ".md" "$cfg/prompts" "$FALLBACK_PROMPTS"
    rm_path "$cfg/design-data/references"
    rm_path "$cfg/design-data/templates"
    if [ "$PURGE" = true ]; then
        rm_path "$cfg/design-data/projects"; rm_path "$cfg/design-data/components"
        rm_path "$cfg/design-data/tokens"; rm_path "$cfg/design-data/validation-history"
    elif has_user_content "$cfg/design-data/projects"; then
        print_warning "$cfg/design-data/projects preserved (generated output). Use --purge to delete it."
    else
        rm_path "$cfg/design-data/projects"
    fi
    rmdir_if_empty "$cfg/design-data"
    rmdir_if_empty "$cfg/scripts"
    rmdir_if_empty "$cfg/plugins"
    print_success "OpenCode uninstall complete"
}

uninstall_claude() {
    print_info "Uninstalling from Claude Code"
    remove_mirrored "commands" ".md" "$HOME/.claude/commands" "$COMMANDS_V2"
    remove_names "$HOME/.claude/commands" ".md" "$COMMANDS_LEGACY"
    remove_mirrored "agents" ".md" "$HOME/.claude/agents" "$AGENTS_V2"
    remove_names "$HOME/.claude/agents" ".md" "$AGENTS_LEGACY"
    remove_bundle "$BUNDLE_DIR"
    # Plugin-route install: detect and instruct (cached dirs removed only under --purge).
    local plugin_dirs
    plugin_dirs=$(find "$HOME/.claude/plugins" -maxdepth 3 -type d -iname '*product-design*' 2>/dev/null || true)
    if [ -n "$plugin_dirs" ]; then
        print_warning "Found a Claude Code plugin install:"
        echo "$plugin_dirs" | sed 's/^/    /'
        print_info "Remove it with:  claude plugin uninstall product-design-partner   (or via /plugin in Claude Code)"
        if [ "$PURGE" = true ]; then
            echo "$plugin_dirs" | while IFS= read -r d; do rm_path "$d"; done
        fi
    fi
    print_success "Claude Code uninstall complete"
}

uninstall_cursor() {
    print_info "Uninstalling from Cursor"
    remove_mirrored "cursor/commands" ".md" "$HOME/.cursor/commands" "$COMMANDS_V2"
    remove_names "$HOME/.cursor/commands" ".md" "$COMMANDS_LEGACY"
    remove_mirrored "cursor/agents" ".md" "$HOME/.cursor/agents" "$AGENTS_V2"
    remove_names "$HOME/.cursor/agents" ".md" "$AGENTS_LEGACY"
    rm_path "$HOME/.cursor/rules/product-design-partner.mdc"
    remove_bundle "$BUNDLE_DIR"
    print_warning "Also remove product-design-partner.mdc from any project .cursor/rules/ you copied it into."
    print_success "Cursor uninstall complete"
}

# Strip the marker block from ~/.codex/AGENTS.md, or remove the file if it's exactly ours.
uninstall_codex_agents_md() {
    local user_agents="$HOME/.codex/AGENTS.md"
    [ -f "$user_agents" ] || return 0
    if [ -f "codex/AGENTS.md" ] && cmp -s "codex/AGENTS.md" "$user_agents"; then
        rm_path "$user_agents"
    elif grep -qF "$PDP_BEGIN" "$user_agents"; then
        if [ "$DRY_RUN" = true ]; then
            echo "  would strip the Product Design Partner block from: $user_agents"
            return 0
        fi
        awk -v begin="$PDP_BEGIN" -v end="$PDP_END" '
            index($0, begin) { skipping=1; next }
            index($0, end)   { skipping=0; next }
            !skipping { print }
        ' "$user_agents" > "$user_agents.pdp-tmp" && mv "$user_agents.pdp-tmp" "$user_agents"
        # If nothing but whitespace remains, the file was only ours — remove it.
        if ! grep -q '[^[:space:]]' "$user_agents"; then rm_path "$user_agents"; fi
        print_success "stripped the Product Design Partner block from $user_agents"
    else
        print_warning "$user_agents has no Product Design Partner marker block and differs from the shipped version — NOT touching it."
        print_info "Remove any old Product Design Partner section by hand if present."
    fi
}

uninstall_codex() {
    print_info "Uninstalling from Codex"
    remove_mirrored "codex/prompts" ".md" "$HOME/.codex/prompts" "$COMMANDS_V2"
    remove_names "$HOME/.codex/prompts" ".md" "$COMMANDS_LEGACY"
    uninstall_codex_agents_md
    remove_bundle "$BUNDLE_DIR"
    print_success "Codex uninstall complete"
}

uninstall_custom() {
    if [ -z "$CUSTOM_PATH" ]; then print_error "No path provided (use --path with --target custom)"; exit 1; fi
    print_info "Uninstalling bundle from custom path $CUSTOM_PATH"
    remove_mirrored "commands" ".md" "$CUSTOM_PATH/commands" "$COMMANDS_V2"
    remove_names "$CUSTOM_PATH/commands" ".md" "$COMMANDS_LEGACY"
    rmdir_if_empty "$CUSTOM_PATH/commands"
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
                echo "Removes v2 AND legacy v1.x artifacts. Your design-data/projects output is"
                echo "preserved by default (use --purge to delete it)."
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
