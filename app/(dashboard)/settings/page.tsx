"use client"

import type React from "react"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Bell, Moon, Zap, Globe, Lock, Eye, Palette, Laptop } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useTheme } from "next-themes"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  const { isLoaded, user } = useUser()
  const { theme, setTheme } = useTheme()
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  if (!isLoaded || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const handleUpdateSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setIsUpdating(true)
      setError("")
      setSuccess("")

      // In a real app, you would save these settings to your database

      setSuccess("Settings updated successfully!")
    } catch (err: any) {
      console.error("Error updating settings:", err)
      setError(err.message || "Something went wrong. Please try again.")
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your general account settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleUpdateSettings} className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="ja">Japanese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="UTC">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="auto-update" className="flex flex-col space-y-1">
                      <span>Automatic Updates</span>
                      <span className="font-normal text-sm text-muted-foreground">
                        Automatically update the application when new versions are available.
                      </span>
                    </Label>
                    <Switch id="auto-update" defaultChecked />
                  </div>
                </div>

                <Button type="submit" disabled={isUpdating}>
                  {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Settings
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how the application looks.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    <h4 className="font-medium">Theme</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">Select the theme for the dashboard.</p>
                  <RadioGroup defaultValue={theme} onValueChange={setTheme} className="grid grid-cols-3 gap-4 pt-2">
                    <div>
                      <RadioGroupItem value="light" id="theme-light" className="sr-only peer" />
                      <Label
                        htmlFor="theme-light"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Moon className="mb-3 h-6 w-6" />
                        Light
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="dark" id="theme-dark" className="sr-only peer" />
                      <Label
                        htmlFor="theme-dark"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Moon className="mb-3 h-6 w-6" />
                        Dark
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="system" id="theme-system" className="sr-only peer" />
                      <Label
                        htmlFor="theme-system"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Laptop className="mb-3 h-6 w-6" />
                        System
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="animations" className="flex flex-col space-y-1">
                    <span>Animations</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Enable animations throughout the application.
                    </span>
                  </Label>
                  <Switch id="animations" defaultChecked />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="compact-mode" className="flex flex-col space-y-1">
                    <span>Compact Mode</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Reduce the size of UI elements for a more compact view.
                    </span>
                  </Label>
                  <Switch id="compact-mode" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Manage how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                    <span>Email Notifications</span>
                    <span className="font-normal text-sm text-muted-foreground">Receive notifications via email.</span>
                  </Label>
                  <Switch id="email-notifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="marketing-emails" className="flex flex-col space-y-1">
                    <span>Marketing Emails</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Receive emails about new features and updates.
                    </span>
                  </Label>
                  <Switch id="marketing-emails" />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="security-emails" className="flex flex-col space-y-1">
                    <span>Security Emails</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Receive emails about your account security.
                    </span>
                  </Label>
                  <Switch id="security-emails" defaultChecked />
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    <h4 className="font-medium">Push Notifications</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">Configure push notification preferences.</p>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="push-all" />
                      <Label htmlFor="push-all">All notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="push-mentions" defaultChecked />
                      <Label htmlFor="push-mentions">Mentions</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="push-messages" defaultChecked />
                      <Label htmlFor="push-messages">Direct messages</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Security</CardTitle>
              <CardDescription>Manage your privacy and security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="two-factor" className="flex flex-col space-y-1">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      <span>Two-Factor Authentication</span>
                    </div>
                    <span className="font-normal text-sm text-muted-foreground">
                      Add an extra layer of security to your account.
                    </span>
                  </Label>
                  <Button variant="outline" size="sm">
                    Enable
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="activity-log" className="flex flex-col space-y-1">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      <span>Activity Log</span>
                    </div>
                    <span className="font-normal text-sm text-muted-foreground">View your account activity log.</span>
                  </Label>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="data-sharing" className="flex flex-col space-y-1">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <span>Data Sharing</span>
                    </div>
                    <span className="font-normal text-sm text-muted-foreground">
                      Control how your data is shared with third parties.
                    </span>
                  </Label>
                  <Switch id="data-sharing" />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="analytics" className="flex flex-col space-y-1">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      <span>Analytics</span>
                    </div>
                    <span className="font-normal text-sm text-muted-foreground">
                      Allow us to collect anonymous usage data to improve our service.
                    </span>
                  </Label>
                  <Switch id="analytics" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

