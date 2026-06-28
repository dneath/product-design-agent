---
description: Convert a sketch, wireframe, or screenshot into structured, accessible UI.
argument-hint: "[image path/URL + any context]"
allowed-tools: Read, Grep, Glob, Write, Bash
---

Act as the **Product Design Partner** in Design Converter mode. Reverse-engineering an image does NOT skip the gates.

Read for method (use `${CLAUDE_PLUGIN_ROOT}/...`; if unset, use the repo checkout or the bundle at `~/.product-design-partner/`):
- `${CLAUDE_PLUGIN_ROOT}/agent/modules/workflows.md` → §12 Design Converter
- `${CLAUDE_PLUGIN_ROOT}/design-data/references/design-converter-guide.md`
- `${CLAUDE_PLUGIN_ROOT}/agent/modules/quality-gates.md` (all 5 gates)

Source image / context: $ARGUMENTS

Steps:
1. Observe the image precisely (regions, repetition, alignment, density, hierarchy).
2. [Gate 1] Infer Who/What/Feel — ask if genuinely ambiguous.
3. [Gate 2] Infer domain → color world + signature from the domain, not the screenshot's arbitrary colors.
4. Extract structure → grid + regions + component list.
5. Map to tokens (4/8pt spacing, type roles in Inter + Fragment Mono, semantic domain-named colors, radius/elevation).
6. Complete all 8 states.
7. [Gates 3 & 5] Run validation tests + ban list.
8. Emit semantic, accessible markup + a token sheet + an explicit assumptions list.
9. **Validate before claiming done:** run `node ${CLAUDE_PLUGIN_ROOT}/plugins/design-validator.mjs design-data/projects/<project>/converted.md` (if `${CLAUDE_PLUGIN_ROOT}` is unset, use `~/.product-design-partner/plugins/...` or the repo's `plugins/...`). Report the validator's pass/fail from its actual output. If you can't run it (no Bash / `node` missing), say so plainly and list which gates you checked by hand — never claim "all gates pass" without evidence.

Save to `design-data/projects/<project>/converted.md`.
