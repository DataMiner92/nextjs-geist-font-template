import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Digital Hub Management System
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empowering communities through technology. Our platform manages over 1000 digital hubs, 
            tracking performance, impact, and vital statistics to create meaningful change.
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild size="lg">
              <Link href="/about">Learn More</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">View Projects</Link>
            </Button>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-primary">1000+</CardTitle>
              <CardDescription>Digital Hubs Managed</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                Comprehensive management of digital infrastructure across communities
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-primary">50,000+</CardTitle>
              <CardDescription>Youth Trained (18-35 years)</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                Empowering young people with digital skills and opportunities
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-primary">25,000+</CardTitle>
              <CardDescription>Started Earning</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                Creating sustainable income opportunities through digital literacy
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Features Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Platform Features</h2>
            <p className="text-muted-foreground mt-2">
              Comprehensive tools for digital hub management and impact tracking
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">📊</span>
                  <span>Interactive Dashboards</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Real-time tracking of hub status, performance metrics, and impact measurements
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">🏢</span>
                  <span>Hub Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Complete CRUD operations for managing digital hubs, assets, and staff assignments
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">🗺️</span>
                  <span>Geographic Mapping</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Interactive maps showing hub locations, coverage areas, and regional impact
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">📈</span>
                  <span>Impact Tracking</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Comprehensive KPI monitoring including youth training, earnings, and success stories
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">📋</span>
                  <span>Report Generation</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Multi-format exports (PDF, Excel, Word) for comprehensive reporting and analysis
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">💾</span>
                  <span>Data Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Secure database integration with automated backup and data persistence
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center space-y-6 bg-muted p-8 rounded-lg">
          <h2 className="text-3xl font-bold">Ready to Make an Impact?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join our mission to empower communities through digital literacy and technology access. 
            Together, we can create sustainable change and opportunities for growth.
          </p>
          <Button asChild size="lg">
            <Link href="/projects">Explore Our Work</Link>
          </Button>
        </section>
      </div>
    </Layout>
  );
}
