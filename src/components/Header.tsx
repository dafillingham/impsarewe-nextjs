"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">IA</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">Imps Are We</span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link href="/articles" className="text-foreground hover:text-primary transition-colors">
              Articles
            </Link>
            <Link href="/submit" className="text-foreground hover:text-primary transition-colors">
              Submit
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>

            {user?.role === "admin" && (
              <Link href="/admin" className="text-foreground hover:text-primary transition-colors">
                Admin
              </Link>
            )}

            {isAuthenticated && user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground hidden sm:inline">{user.email}</span>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
