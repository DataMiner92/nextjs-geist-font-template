import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  return (
    <Layout>
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            About Digital Hub Management
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We are dedicated to empowering communities through technology, creating sustainable 
            digital infrastructure, and fostering economic opportunities for young people across the globe.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To bridge the digital divide by establishing and managing comprehensive digital hubs 
                that provide technology access, digital literacy training, and economic opportunities 
                to underserved communities worldwide.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                A world where every community has access to digital technology and the skills needed 
                to participate fully in the digital economy, creating sustainable pathways out of poverty 
                and into prosperity.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Our Impact */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Our Impact</h2>
            <p className="text-muted-foreground mt-2">
              Measurable change in communities worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-primary">1000+</CardTitle>
                <CardDescription>Digital Hubs Established</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Comprehensive digital infrastructure deployed across rural and urban communities
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-primary">50,000+</CardTitle>
                <CardDescription>Youth Trained</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Young people aged 18-35 equipped with essential digital skills and entrepreneurship training
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-primary">25,000+</CardTitle>
                <CardDescription>Economic Opportunities Created</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Sustainable income streams established through digital skills and online opportunities
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Our Approach */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Our Approach</h2>
            <p className="text-muted-foreground mt-2">
              A comprehensive strategy for sustainable digital transformation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">🏗️</span>
                  <span>Infrastructure</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Establishing robust digital infrastructure with computers, internet connectivity, 
                  and essential technology resources.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">📚</span>
                  <span>Training</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Comprehensive digital literacy programs covering basic computer skills, 
                  internet usage, and advanced technical training.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">💼</span>
                  <span>Employment</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Connecting trained individuals with remote work opportunities, 
                  freelancing platforms, and digital entrepreneurship.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">🤝</span>
                  <span>Support</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Ongoing mentorship, technical support, and community building 
                  to ensure long-term success and sustainability.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Key Features */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Platform Features</h2>
            <p className="text-muted-foreground mt-2">
              Advanced tools for comprehensive hub management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="text-2xl">📊</div>
                <div>
                  <h3 className="font-semibold">Real-time Analytics</h3>
                  <p className="text-muted-foreground text-sm">
                    Comprehensive dashboards tracking hub performance, user engagement, and impact metrics
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-2xl">🗺️</div>
                <div>
                  <h3 className="font-semibold">Geographic Mapping</h3>
                  <p className="text-muted-foreground text-sm">
                    Interactive maps showing hub locations, coverage areas, and regional impact visualization
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-2xl">📱</div>
                <div>
                  <h3 className="font-semibold">Mobile Responsive</h3>
                  <p className="text-muted-foreground text-sm">
                    Fully responsive design ensuring accessibility across all devices and platforms
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="text-2xl">📋</div>
                <div>
                  <h3 className="font-semibold">Comprehensive Reporting</h3>
                  <p className="text-muted-foreground text-sm">
                    Multi-format report generation (PDF, Excel, Word) for stakeholders and funders
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-2xl">🔒</div>
                <div>
                  <h3 className="font-semibold">Secure Data Management</h3>
                  <p className="text-muted-foreground text-sm">
                    Enterprise-grade security with automated backups and data protection protocols
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-2xl">⚡</div>
                <div>
                  <h3 className="font-semibold">Real-time Updates</h3>
                  <p className="text-muted-foreground text-sm">
                    Live data synchronization and instant notifications for critical events and milestones
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Values */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Our Values</h2>
            <p className="text-muted-foreground mt-2">
              The principles that guide our work and impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Accessibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We believe technology should be accessible to everyone, regardless of location, 
                  economic status, or background.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sustainability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our programs are designed for long-term impact, creating self-sustaining 
                  communities that can thrive independently.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We continuously evolve our approach, leveraging cutting-edge technology 
                  and best practices to maximize impact.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center space-y-6 bg-muted p-8 rounded-lg">
          <h2 className="text-3xl font-bold">Join Our Mission</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Whether you're a community leader, technology partner, or passionate individual, 
            there are many ways to contribute to our mission of digital empowerment.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Partner With Us
            </button>
            <button className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors">
              Learn More
            </button>
          </div>
        </section>
      </div>
    </Layout>
  );
}
