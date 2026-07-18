"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Paperclip, Plus, Send, Square } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { useMockStream } from "@/lib/use-mock-stream";
import {
  conversation,
  models,
  streamedReply,
  threads,
  type Message,
} from "@/lib/fixtures";
import { cn } from "@/lib/utils";

export function ThreadSidebar() {
  return (
    <nav
      aria-label="Conversations"
      className="w-64 shrink-0 border-r border-border-soft bg-sidebar max-md:hidden"
    >
      <div className="p-3">
        <Button variant="outline" className="w-full justify-start">
          <Plus aria-hidden />
          New chat
        </Button>
      </div>
      <ul className="space-y-0.5 px-2">
        {threads.map((t, i) => (
          <li key={t.id}>
            <a
              href="#"
              aria-current={i === 0 ? "page" : undefined}
              className={cn(
                "block truncate rounded-sm px-2.5 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring",
                i === 0
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              {t.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function ModelPicker() {
  const [model, setModel] = useState(models[0].id);
  const current = models.find((m) => m.id === model) ?? models[0];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          {current.label}
          <ChevronDown aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuRadioGroup value={model} onValueChange={setModel}>
          {models.map((m) => (
            <DropdownMenuRadioItem key={m.id} value={m.id}>
              {m.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <div className={cn("flex gap-3", isUser && "justify-end")}>
      {!isUser && (
        <Avatar className="size-7 shrink-0">
          <AvatarFallback className="bg-primary text-xs text-primary-foreground">
            M
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[75%] text-sm leading-relaxed whitespace-pre-wrap",
          isUser
            ? "rounded-lg rounded-br-sm bg-secondary px-3.5 py-2.5"
            : "pt-1",
        )}
      >
        {msg.content}
      </div>
    </div>
  );
}

/** Message list + composer with working mock streaming (cancellable). */
export function ChatPane() {
  const [messages, setMessages] = useState<Message[]>(conversation);
  const [draft, setDraft] = useState("");
  const { streamed, streaming, start, stop } = useMockStream();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, streamed]);

  const send = () => {
    const text = draft.trim();
    if (!text || streaming) return;
    setMessages((m) => [
      ...m,
      { id: `m-${m.length + 1}`, role: "user", content: text },
    ]);
    setDraft("");
    start(streamedReply, (finalText) =>
      setMessages((m) => [
        ...m,
        { id: `m-${m.length + 1}`, role: "assistant", content: finalText },
      ]),
    );
  };

  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <header className="flex h-12 items-center gap-2 border-b border-border-soft px-3">
        <ModelPicker />
        <span className="ml-auto truncate font-mono text-xs text-muted-foreground max-sm:hidden">
          {threads[0].title}
        </span>
      </header>
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto"
        aria-live="polite"
      >
        <div className="mx-auto max-w-2xl space-y-6 px-4 py-6">
          {messages.map((m) => (
            <MessageBubble key={m.id} msg={m} />
          ))}
          {streaming && (
            <MessageBubble
              msg={{ id: "streaming", role: "assistant", content: streamed }}
            />
          )}
        </div>
      </div>
      <div className="border-t border-border-soft p-3">
        <form
          className="mx-auto flex max-w-2xl items-end gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Attach a file"
          >
            <Paperclip aria-hidden />
          </Button>
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Message Meridian…"
            aria-label="Message"
            rows={1}
            className="max-h-40 min-h-10 flex-1 resize-none"
          />
          {streaming ? (
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Stop generating"
              onClick={stop}
            >
              <Square aria-hidden />
            </Button>
          ) : (
            <Button
              type="submit"
              size="icon"
              aria-label="Send message"
              disabled={!draft.trim()}
            >
              <Send aria-hidden />
            </Button>
          )}
        </form>
        <p className="mx-auto mt-2 max-w-2xl text-xs text-muted-foreground">
          Streaming is mocked — swap `lib/use-mock-stream.ts` for a real
          transport when this graduates.
        </p>
      </div>
    </div>
  );
}
