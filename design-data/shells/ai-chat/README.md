# Shell: ai-chat

AI chat/assistant app — thread sidebar, message list, model picker, composer
with **mock token streaming** (word-by-word, cancellable Stop button). No AI
SDK, no keys, no backend.

- **Run**: `npm install && npm run dev`
- **Rebrand**: rewrite `app/tokens.css` only (fonts: `app/layout.tsx`)
- **Streaming**: `lib/use-mock-stream.ts` — the UI consumes it like a real
  transport; swap the hook when the prototype graduates
- **Chat parts**: `components/chat.tsx` (sidebar, bubbles, composer, picker)
- **Variants**: replace the demo variants in `app/page.tsx`; keep
  `VariantSwitcher` + `useProtoState()`
- **Fixtures**: `lib/fixtures.ts` — threads, conversation, canned reply
- **Add components**: `npx shadcn@latest add <component>` (review what lands)
- **Dev overlays**: react-scan + agentation always; mesurer on M
- Note: the composer's send button keeps clear of the bottom-right corner
  where the agentation toolbar floats
