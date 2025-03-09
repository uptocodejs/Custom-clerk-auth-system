import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Activity,
  CreditCard,
  DollarSign,
  Users,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  CheckCircle,
  Clock,
  Calendar,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default async function DashboardPage() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId) {
    redirect("/sign-in")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back, {user?.firstName || "User"}! Here's what's happening with your account.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            <span>April 2025</span>
          </Button>
          <Button>
            <ArrowDownRight className="mr-2 h-4 w-4" />
            <span>Download Report</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-emerald-500 flex items-center">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                +20.1%
              </span>
              <span className="text-xs text-muted-foreground ml-1">from last month</span>
            </div>
            <Progress className="mt-3" value={75} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-emerald-500 flex items-center">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                +180.1%
              </span>
              <span className="text-xs text-muted-foreground ml-1">from last month</span>
            </div>
            <Progress className="mt-3" value={90} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-rose-500 flex items-center">
                <ArrowDownRight className="mr-1 h-3 w-3" />
                -19%
              </span>
              <span className="text-xs text-muted-foreground ml-1">from last month</span>
            </div>
            <Progress className="mt-3" value={45} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-emerald-500 flex items-center">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                +201
              </span>
              <span className="text-xs text-muted-foreground ml-1">since last hour</span>
            </div>
            <Progress className="mt-3" value={60} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>View your revenue and sales over time.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[240px] flex items-center justify-center bg-muted/20 rounded-md">
              <BarChart3 className="h-16 w-16 text-muted" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <span className="text-sm text-muted-foreground">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-muted"></div>
              <span className="text-sm text-muted-foreground">Sales</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              <span className="text-sm text-muted-foreground">Growth</span>
            </div>
          </CardFooter>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: "Olivia Martin", email: "olivia@example.com", amount: "$1,999.00", status: "Success" },
                { name: "Jackson Lee", email: "jackson@example.com", amount: "$39.00", status: "Pending" },
                { name: "Isabella Nguyen", email: "isabella@example.com", amount: "$299.00", status: "Success" },
                { name: "William Kim", email: "will@example.com", amount: "$99.00", status: "Processing" },
              ].map((sale, i) => (
                <div className="flex items-center" key={i}>
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 mr-3">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium leading-none">{sale.name}</p>
                    <p className="text-sm text-muted-foreground">{sale.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{sale.amount}</p>
                    <Badge
                      variant={
                        sale.status === "Success" ? "default" : sale.status === "Pending" ? "outline" : "secondary"
                      }
                    >
                      {sale.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent account activity.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  icon: CheckCircle,
                  title: "Account verified",
                  time: "2 hours ago",
                  desc: "Your account has been verified successfully.",
                },
                {
                  icon: Bell,
                  title: "New notification",
                  time: "5 hours ago",
                  desc: "You have a new message from the support team.",
                },
                {
                  icon: Clock,
                  title: "Password changed",
                  time: "1 day ago",
                  desc: "Your password was changed successfully.",
                },
                { icon: Users, title: "New login", time: "2 days ago", desc: "New login from Chrome on Windows." },
              ].map((activity, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <activity.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.desc}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full">
              View All Activity
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Tasks that need your attention.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Review new users", priority: "High", due: "Today" },
                { title: "Prepare monthly report", priority: "Medium", due: "Tomorrow" },
                { title: "Update payment methods", priority: "Low", due: "Next week" },
                { title: "Team meeting", priority: "Medium", due: "Apr 15, 2025" },
              ].map((task, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{task.title}</p>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          task.priority === "High" ? "destructive" : task.priority === "Medium" ? "default" : "outline"
                        }
                      >
                        {task.priority}
                      </Badge>
                      <span className="text-xs text-muted-foreground">Due: {task.due}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Tasks
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used actions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-24 flex flex-col items-center justify-center">
                <Users className="h-6 w-6 mb-2" />
                <span>New User</span>
              </Button>
              <Button className="h-24 flex flex-col items-center justify-center" variant="outline">
                <DollarSign className="h-6 w-6 mb-2" />
                <span>New Sale</span>
              </Button>
              <Button className="h-24 flex flex-col items-center justify-center" variant="outline">
                <BarChart3 className="h-6 w-6 mb-2" />
                <span>Analytics</span>
              </Button>
              <Button className="h-24 flex flex-col items-center justify-center" variant="outline">
                <Bell className="h-6 w-6 mb-2" />
                <span>Notifications</span>
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full">
              View All Actions
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

