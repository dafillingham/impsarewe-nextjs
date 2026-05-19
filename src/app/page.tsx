import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Imps Are We</h1>
          <p className="text-xl mb-8 opacity-90">
            Your source for Lincoln City FC news, updates, and insights
          </p>
          <div className="flex gap-4">
            <Link href="/articles">
              <Button size="lg" variant="secondary">
                Read Articles
              </Button>
            </Link>
            <Link href="/submit">
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Submit Article
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">What We Offer</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Latest News</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Stay updated with the latest Lincoln City FC news and announcements
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Join our community and share your thoughts in the comments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Submit Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Share your own articles and insights with our readers
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start reading articles, leave comments, and become part of our Lincoln City FC community today.
          </p>
          <Link href="/articles">
            <Button size="lg">Get Started</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
