import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "Rural Digital Transformation Initiative",
      location: "Northern Nigeria",
      status: "Active",
      startDate: "2023-01-15",
      participants: 2500,
      hubs: 45,
      description: "Establishing digital hubs in rural communities to provide internet access, digital literacy training, and e-commerce opportunities for local farmers and artisans.",
      impact: {
        trained: 2100,
        earning: 1200,
        stories: 85
      },
      skills: ["Digital Marketing", "E-commerce", "Basic Computing", "Mobile Banking"]
    },
    {
      id: 2,
      title: "Youth Entrepreneurship Digital Program",
      location: "Lagos, Nigeria",
      status: "Active",
      startDate: "2022-08-20",
      participants: 5000,
      hubs: 25,
      description: "Comprehensive digital skills training program focused on web development, graphic design, and digital marketing for urban youth aged 18-30.",
      impact: {
        trained: 4200,
        earning: 2800,
        stories: 150
      },
      skills: ["Web Development", "Graphic Design", "Digital Marketing", "Freelancing"]
    },
    {
      id: 3,
      title: "Women in Tech Empowerment",
      location: "Accra, Ghana",
      status: "Active",
      startDate: "2023-03-10",
      participants: 1800,
      hubs: 20,
      description: "Specialized program targeting women and girls, providing training in coding, data analysis, and tech entrepreneurship with mentorship support.",
      impact: {
        trained: 1500,
        earning: 900,
        stories: 65
      },
      skills: ["Programming", "Data Analysis", "Tech Entrepreneurship", "Leadership"]
    },
    {
      id: 4,
      title: "Community Health Digital Solutions",
      location: "Nairobi, Kenya",
      status: "Planning",
      startDate: "2024-02-01",
      participants: 1200,
      hubs: 15,
      description: "Training community health workers to use digital tools for patient management, telemedicine, and health data collection.",
      impact: {
        trained: 0,
        earning: 0,
        stories: 0
      },
      skills: ["Health Tech", "Data Collection", "Telemedicine", "Digital Records"]
    },
    {
      id: 5,
      title: "Agricultural Technology Hub",
      location: "Kampala, Uganda",
      status: "Completed",
      startDate: "2022-01-15",
      participants: 3200,
      hubs: 30,
      description: "Completed program that trained farmers in precision agriculture, weather monitoring, and digital marketplace access.",
      impact: {
        trained: 3200,
        earning: 2400,
        stories: 120
      },
      skills: ["Precision Agriculture", "Weather Tech", "Digital Marketplaces", "Farm Management"]
    },
    {
      id: 6,
      title: "Digital Financial Inclusion",
      location: "Dakar, Senegal",
      status: "Active",
      startDate: "2023-06-01",
      participants: 2800,
      hubs: 35,
      description: "Promoting financial inclusion through digital payment systems, mobile banking, and cryptocurrency education.",
      impact: {
        trained: 2200,
        earning: 1600,
        stories: 95
      },
      skills: ["Mobile Banking", "Digital Payments", "Cryptocurrency", "Financial Literacy"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Planning":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalStats = projects.reduce((acc, project) => ({
    participants: acc.participants + project.participants,
    hubs: acc.hubs + project.hubs,
    trained: acc.trained + project.impact.trained,
    earning: acc.earning + project.impact.earning,
    stories: acc.stories + project.impact.stories
  }), { participants: 0, hubs: 0, trained: 0, earning: 0, stories: 0 });

  return (
    <Layout>
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Our Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our ongoing and completed initiatives that are transforming communities 
            through digital empowerment and skills development across Africa and beyond.
          </p>
        </section>

        {/* Overall Statistics */}
        <section className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card className="text-center">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-primary">{totalStats.participants.toLocaleString()}</CardTitle>
              <CardDescription>Total Participants</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-primary">{totalStats.hubs}</CardTitle>
              <CardDescription>Digital Hubs</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-primary">{totalStats.trained.toLocaleString()}</CardTitle>
              <CardDescription>Youth Trained</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-primary">{totalStats.earning.toLocaleString()}</CardTitle>
              <CardDescription>Started Earning</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-primary">{totalStats.stories}</CardTitle>
              <CardDescription>Success Stories</CardDescription>
            </CardHeader>
          </Card>
        </section>

        {/* Project Filters */}
        <section className="flex justify-center space-x-4">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg">
            All Projects
          </button>
          <button className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors">
            Active
          </button>
          <button className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors">
            Completed
          </button>
          <button className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors">
            Planning
          </button>
        </section>

        {/* Projects Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription className="flex items-center space-x-2">
                      <span className="text-lg">📍</span>
                      <span>{project.location}</span>
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Project Stats */}
                <div className="grid grid-cols-2 gap-4 py-4 border-t border-b">
                  <div className="text-center">
                    <div className="text-lg font-semibold">{project.participants.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Participants</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold">{project.hubs}</div>
                    <div className="text-xs text-muted-foreground">Digital Hubs</div>
                  </div>
                </div>

                {/* Impact Metrics */}
                {project.status !== "Planning" && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Impact Achieved:</h4>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="font-semibold">{project.impact.trained.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Trained</div>
                      </div>
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="font-semibold">{project.impact.earning.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Earning</div>
                      </div>
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="font-semibold">{project.impact.stories}</div>
                        <div className="text-xs text-muted-foreground">Stories</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Skills Taught */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Skills & Training:</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Project Timeline */}
                <div className="flex justify-between items-center text-sm text-muted-foreground pt-2">
                  <span>Started: {new Date(project.startDate).toLocaleDateString()}</span>
                  {project.status === "Completed" && (
                    <span className="text-green-600 font-medium">✓ Completed</span>
                  )}
                  {project.status === "Active" && (
                    <span className="text-blue-600 font-medium">● Ongoing</span>
                  )}
                  {project.status === "Planning" && (
                    <span className="text-orange-600 font-medium">⏳ Planning</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Success Stories Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Success Stories</h2>
            <p className="text-muted-foreground mt-2">
              Real impact from our digital empowerment programs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Amina's E-commerce Success</CardTitle>
                <CardDescription>Rural Digital Transformation Initiative</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  "After completing the digital marketing training, I started selling my handmade crafts online. 
                  My monthly income increased by 300%, and I now employ 5 other women in my community."
                </p>
                <div className="mt-3 text-xs text-muted-foreground">
                  - Amina Ibrahim, Northern Nigeria
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">David's Tech Career</CardTitle>
                <CardDescription>Youth Entrepreneurship Program</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  "The web development course changed my life. I went from unemployment to earning $800/month 
                  as a freelance developer. Now I'm building my own tech startup."
                </p>
                <div className="mt-3 text-xs text-muted-foreground">
                  - David Okafor, Lagos, Nigeria
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sarah's Leadership Journey</CardTitle>
                <CardDescription>Women in Tech Empowerment</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  "The program didn't just teach me coding - it gave me confidence. I'm now leading a team 
                  of developers and mentoring other young women in tech."
                </p>
                <div className="mt-3 text-xs text-muted-foreground">
                  - Sarah Mensah, Accra, Ghana
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center space-y-6 bg-muted p-8 rounded-lg">
          <h2 className="text-3xl font-bold">Get Involved</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Want to bring digital empowerment to your community or support our mission? 
            We're always looking for partners, volunteers, and communities ready for transformation.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Start a Project
            </button>
            <button className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors">
              Become a Partner
            </button>
          </div>
        </section>
      </div>
    </Layout>
  );
}
