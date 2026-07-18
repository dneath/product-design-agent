import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

/** Mock login — no auth. "Continue" navigates straight into the app. */
export default function LoginPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex size-8 items-center justify-center rounded-sm bg-primary font-mono text-sm font-bold text-primary-foreground">
            M
          </div>
          <CardTitle>Sign in to Meridian</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Work email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" autoComplete="current-password" />
          </div>
          <Button className="w-full" asChild>
            <Link href="/members">Continue</Link>
          </Button>
          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/members">Continue with SSO</Link>
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Auth is mocked — both buttons enter the app as Priya (admin).
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
