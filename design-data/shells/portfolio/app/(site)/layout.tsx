import Link from "next/link";
import { owner } from "@/lib/fixtures";
import "../docs.css";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-proto-root className="flex min-h-dvh flex-col">
      <header className="border-b border-border-soft">
        <nav
          aria-label="Site"
          className="mx-auto flex h-14 max-w-3xl items-center gap-6 px-4"
        >
          <Link href="/" className="font-semibold">
            {owner.name}
          </Link>
          <div className="ml-auto flex gap-4 text-sm">
            <Link
              href="/"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Work
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </Link>
            <a
              href={`mailto:${owner.email}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Email
            </a>
          </div>
        </nav>
      </header>
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
        {children}
      </main>
      <footer className="border-t border-border-soft py-6">
        <p className="mx-auto max-w-3xl px-4 text-sm text-muted-foreground">
          © 2026 {owner.name} · Set in Inter & Fragment Mono
        </p>
      </footer>
    </div>
  );
}
