"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

type ProfileFormProps = {
  user: {
    name: string;
    hospital: string;
    ward: string;
    monthlyGoal: string;
    language: string;
    notifications: {
      dutyReminders: boolean;
      budgetAlerts: boolean;
      dailyMotivation: boolean;
    };
  };
};

export function ProfileForm({ user }: ProfileFormProps) {
  return (
    <form className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your name and work details.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue={user.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hospital">Hospital</Label>
            <Input id="hospital" defaultValue={user.hospital} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ward">Ward/Unit</Label>
            <Input id="ward" defaultValue={user.ward} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="goal">Monthly Goal</Label>
            <Textarea id="goal" defaultValue={user.monthlyGoal} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Manage notifications and language.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label>Notifications</Label>
                <div className="space-y-3 rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="duty-reminders" className="font-normal">Duty Reminders</Label>
                        <Switch id="duty-reminders" defaultChecked={user.notifications.dutyReminders} />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="budget-alerts" className="font-normal">Budget Alerts</Label>
                        <Switch id="budget-alerts" defaultChecked={user.notifications.budgetAlerts} />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="daily-motivation" className="font-normal">Daily Motivation</Label>
                        <Switch id="daily-motivation" defaultChecked={user.notifications.dailyMotivation} />
                    </div>
                </div>
            </div>
            <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select defaultValue={user.language.toLowerCase()}>
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="sinhala">Sinhala (සිංහල)</SelectItem>
                <SelectItem value="tamil">Tamil (தமிழ்)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </form>
  )
}
