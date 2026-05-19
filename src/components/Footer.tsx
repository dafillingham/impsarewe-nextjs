import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-12">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Imps Are We</h3>
            <p className="text-muted-foreground text-sm">
              Lincoln City FC News and Updates
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/articles" className="text-muted-foreground hover:text-foreground">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-muted-foreground hover:text-foreground">
                  Submit
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-muted-foreground">News</span>
              </li>
              <li>
                <span className="text-muted-foreground">Match Reports</span>
              </li>
              <li>
                <span className="text-muted-foreground">Player Profiles</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-muted-foreground">Privacy Policy</span>
              </li>
              <li>
                <span className="text-muted-foreground">Terms of Service</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 Imps Are We. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
