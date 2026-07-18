import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { owner, work } from "@/lib/fixtures";

export default function HomePage() {
  const published = work.filter((w) => w.published);

  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight">{owner.role}</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">{owner.intro}</p>
      </section>
      <section aria-labelledby="work-heading" className="space-y-4">
        <h2 id="work-heading" className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          Selected work
        </h2>
        {published.map((w) => (
          <Card key={w.slug} className="transition-colors hover:border-border-strong">
            <CardContent>
              <Link
                href={`/work/${w.slug}`}
                className="group block outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-medium group-hover:underline group-hover:underline-offset-4">
                    {w.title}
                  </h3>
                  <span className="font-mono text-xs text-muted-foreground">
                    {w.year}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{w.blurb}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {w.tags.map((t) => (
                    <Badge key={t} variant="outline">
                      {t}
                    </Badge>
                  ))}
                </div>
              </Link>
            </CardContent>
          </Card>
        ))}
        {work.some((w) => !w.published) && (
          <p className="text-sm text-muted-foreground">
            One more case study is being written — ask me about FreightDesk.
          </p>
        )}
      </section>
    </div>
  );
}
