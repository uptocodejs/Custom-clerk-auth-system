import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, CheckCircle, Clock, Shield, AlertTriangle, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default async function NotificationsPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
        <Button>Mark All as Read</Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today</CardTitle>
              <CardDescription>Your notifications from today.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  icon: Shield,
                  title: "Security alert",
                  time: "2 hours ago",
                  desc: "A new device was used to sign in to your account.",
                  type: "security",
                  unread: true,
                },
                {
                  icon: Bell,
                  title: "New feature available",
                  time: "5 hours ago",
                  desc: "Check out our new dashboard features.",
                  type: "system",
                  unread: true,
                },
              ].map((notification, i) => (
                <div key={i} className="flex items-start gap-4 p-4 border rounded-lg relative">
                  {notification.unread && (
                    <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-primary"></div>
                  )}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                    <notification.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{notification.title}</p>
                      <Badge variant={notification.type === "security" ? "destructive" : "default"}>
                        {notification.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.desc}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Yesterday</CardTitle>
              <CardDescription>Your notifications from yesterday.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  icon: CheckCircle,
                  title: "Account verified",
                  time: "1 day ago",
                  desc: "Your account has been verified successfully.",
                  type: "system",
                  unread: false,
                },
                {
                  icon: Clock,
                  title: "Password changed",
                  time: "1 day ago",
                  desc: "Your password was changed successfully.",
                  type: "security",
                  unread: false,
                },
              ].map((notification, i) => (
                <div key={i} className="flex items-start gap-4 p-4 border rounded-lg relative">
                  {notification.unread && (
                    <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-primary"></div>
                  )}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                    <notification.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{notification.title}</p>
                      <Badge variant={notification.type === "security" ? "destructive" : "default"}>
                        {notification.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.desc}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Earlier</CardTitle>
              <CardDescription>Your older notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  icon: Info,
                  title: "Welcome to Auth System",
                  time: "1 week ago",
                  desc: "Welcome to your new dashboard. Get started by exploring the features.",
                  type: "system",
                  unread: false,
                },
                {
                  icon: AlertTriangle,
                  title: "Action required",
                  time: "2 weeks ago",
                  desc: "Please verify your email address to continue using all features.",
                  type: "security",
                  unread: false,
                },
              ].map((notification, i) => (
                <div key={i} className="flex items-start gap-4 p-4 border rounded-lg relative">
                  {notification.unread && (
                    <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-primary"></div>
                  )}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                    <notification.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{notification.title}</p>
                      <Badge variant={notification.type === "security" ? "destructive" : "default"}>
                        {notification.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.desc}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Unread Notifications</CardTitle>
              <CardDescription>Your unread notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  icon: Shield,
                  title: "Security alert",
                  time: "2 hours ago",
                  desc: "A new device was used to sign in to your account.",
                  type: "security",
                  unread: true,
                },
                {
                  icon: Bell,
                  title: "New feature available",
                  time: "5 hours ago",
                  desc: "Check out our new dashboard features.",
                  type: "system",
                  unread: true,
                },
              ].map((notification, i) => (
                <div key={i} className="flex items-start gap-4 p-4 border rounded-lg relative">
                  <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-primary"></div>
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                    <notification.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{notification.title}</p>
                      <Badge variant={notification.type === "security" ? "destructive" : "default"}>
                        {notification.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.desc}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Notifications</CardTitle>
              <CardDescription>Your security-related notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  icon: Shield,
                  title: "Security alert",
                  time: "2 hours ago",
                  desc: "A new device was used to sign in to your account.",
                  type: "security",
                  unread: true,
                },
                {
                  icon: Clock,
                  title: "Password changed",
                  time: "1 day ago",
                  desc: "Your password was changed successfully.",
                  type: "security",
                  unread: false,
                },
                {
                  icon: AlertTriangle,
                  title: "Action required",
                  time: "2 weeks ago",
                  desc: "Please verify your email address to continue using all features.",
                  type: "security",
                  unread: false,
                },
              ].map((notification, i) => (
                <div key={i} className="flex items-start gap-4 p-4 border rounded-lg relative">
                  {notification.unread && (
                    <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-primary"></div>
                  )}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                    <notification.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{notification.title}</p>
                      <Badge variant="destructive">{notification.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.desc}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Notifications</CardTitle>
              <CardDescription>Your system-related notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  icon: Bell,
                  title: "New feature available",
                  time: "5 hours ago",
                  desc: "Check out our new dashboard features.",
                  type: "system",
                  unread: true,
                },
                {
                  icon: CheckCircle,
                  title: "Account verified",
                  time: "1 day ago",
                  desc: "Your account has been verified successfully.",
                  type: "system",
                  unread: false,
                },
                {
                  icon: Info,
                  title: "Welcome to Auth System",
                  time: "1 week ago",
                  desc: "Welcome to your new dashboard. Get started by exploring the features.",
                  type: "system",
                  unread: false,
                },
              ].map((notification, i) => (
                <div key={i} className="flex items-start gap-4 p-4 border rounded-lg relative">
                  {notification.unread && (
                    <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-primary"></div>
                  )}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                    <notification.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{notification.title}</p>
                      <Badge>{notification.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.desc}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Manage your notification preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Email Notifications</h3>
                <p className="text-sm text-muted-foreground">Receive notifications via email.</p>
              </div>
              <Button variant="outline">Configure</Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Push Notifications</h3>
                <p className="text-sm text-muted-foreground">Receive notifications on your device.</p>
              </div>
              <Button variant="outline">Configure</Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Security Alerts</h3>
                <p className="text-sm text-muted-foreground">Receive alerts about security events.</p>
              </div>
              <Button variant="outline">Configure</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

