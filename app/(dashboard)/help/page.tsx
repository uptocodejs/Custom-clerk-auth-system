import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HelpCircle, Search, FileText, MessageSquare, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default async function HelpPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Help Center</h2>
      </div>

      <Card className="bg-primary text-primary-foreground">
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 space-y-2">
            <h3 className="text-2xl font-bold">Need help with something?</h3>
            <p>Search our knowledge base or contact support for assistance.</p>
          </div>
          <div className="w-full md:w-1/3 flex items-center gap-2">
            <Input
              placeholder="Search for help..."
              className="bg-primary-foreground text-primary border-0 focus-visible:ring-primary-foreground"
            />
            <Button variant="secondary" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to common questions about our platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      To reset your password, click on the "Forgot password" link on the sign-in page. You'll receive an
                      email with instructions to reset your password. Follow the link in the email and enter your new
                      password.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How do I update my profile information?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      You can update your profile information by navigating to the Profile page. Click on your avatar in
                      the sidebar, then select "Profile". From there, you can edit your personal information and save
                      the changes.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How do I enable two-factor authentication?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      To enable two-factor authentication, go to your Profile page, then click on the "Security" tab.
                      Look for the "Two-Factor Authentication" section and click "Enable". Follow the instructions to
                      set up 2FA using an authenticator app.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>How do I change my email address?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      To change your email address, contact our support team. For security reasons, email changes
                      require verification and cannot be done directly through the platform.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>How do I delete my account?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      To delete your account, go to Settings, then scroll to the bottom of the page. Click on "Delete
                      Account" and follow the confirmation steps. Please note that this action is irreversible and all
                      your data will be permanently deleted.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Guides</CardTitle>
              <CardDescription>Step-by-step guides to help you use our platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Getting Started Guide",
                    desc: "Learn the basics of using our platform.",
                    icon: FileText,
                  },
                  {
                    title: "Security Best Practices",
                    desc: "Keep your account secure with these tips.",
                    icon: HelpCircle,
                  },
                  {
                    title: "Profile Management",
                    desc: "Learn how to manage your profile information.",
                    icon: FileText,
                  },
                  {
                    title: "Dashboard Overview",
                    desc: "Understand the features of your dashboard.",
                    icon: FileText,
                  },
                  {
                    title: "Notification Settings",
                    desc: "Configure your notification preferences.",
                    icon: FileText,
                  },
                  {
                    title: "Account Settings",
                    desc: "Manage your account settings and preferences.",
                    icon: FileText,
                  },
                ].map((guide, i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardHeader className="p-4">
                      <div className="flex items-center gap-2">
                        <guide.icon className="h-5 w-5 text-primary" />
                        <CardTitle className="text-base">{guide.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">{guide.desc}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button variant="ghost" className="w-full">
                        Read Guide
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Get in touch with our support team for assistance.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Send us a message</h3>
                    <p className="text-sm text-muted-foreground">
                      Fill out the form and we'll get back to you as soon as possible.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <Input id="name" placeholder="Your name" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input id="email" type="email" placeholder="Your email" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input id="subject" placeholder="How can we help you?" />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea id="message" placeholder="Your message" className="min-h-[120px]" />
                    </div>

                    <Button className="w-full">Send Message</Button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Contact Information</h3>
                    <p className="text-sm text-muted-foreground">
                      You can also reach us through the following channels.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Email</h4>
                      </div>
                      <div>
                        <h4 className="font-medium">Email</h4>
                        <p className="text-sm text-muted-foreground">support@authsystem.com</p>
                        <p className="text-sm text-muted-foreground">Available 24/7</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Phone</h4>
                        <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                        <p className="text-sm text-muted-foreground">Mon-Fri, 9am-5pm EST</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <MessageSquare className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Live Chat</h4>
                        <p className="text-sm text-muted-foreground">Available on our website</p>
                        <p className="text-sm text-muted-foreground">Mon-Fri, 9am-5pm EST</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium">Response Time</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      We typically respond to inquiries within 24 hours. For urgent matters, please use the live chat or
                      phone support.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

