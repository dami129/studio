
"use client"

import * as React from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Combobox } from "../ui/combobox";
import { hospitals } from "@/lib/hospitals";
import type { UserProfile } from "@/lib/types";

type ProfileFormProps = {
  user: UserProfile;
  onSave: (user: UserProfile) => void;
};

const wards = [
  "Surgical", 
  "Medical", 
  "ETU/A&E", 
  "ICU", 
  "GYN/OBS", 
  "Pediatric", 
  "Theatre", 
  "Blood Bank", 
  "Orthopaedic", 
  "Cardiology", 
  "Cardiothoracic"
];

export function ProfileForm({ user, onSave }: ProfileFormProps) {
  const [formData, setFormData] = React.useState(user);

  React.useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSelectChange = (id: keyof UserProfile, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSwitchChange = (id: keyof UserProfile['notifications']) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [id]: !prev.notifications[id],
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your name and work details.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={formData.name} onChange={handleChange} />
          </div>
           <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hospital">Hospital</Label>
            <Combobox
              items={hospitals.map(h => ({ label: h, value: h }))}
              value={formData.hospital}
              onChange={(value) => handleSelectChange('hospital', value)}
              placeholder="Select a hospital..."
              searchPlaceholder="Search hospitals..."
              noResultsMessage="No hospital found."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ward">Ward/Unit</Label>
             <Select value={formData.ward} onValueChange={(value) => handleSelectChange('ward', value)}>
              <SelectTrigger id="ward">
                <SelectValue placeholder="Select a ward/unit" />
              </SelectTrigger>
              <SelectContent>
                {wards.map((ward) => (
                  <SelectItem key={ward} value={ward}>{ward}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="monthlyGoal">Monthly Goal</Label>
            <Textarea id="monthlyGoal" value={formData.monthlyGoal} onChange={handleChange} />
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
                        <Label htmlFor="dutyReminders" className="font-normal">Duty Reminders</Label>
                        <Switch id="dutyReminders" checked={formData.notifications.dutyReminders} onCheckedChange={() => handleSwitchChange('dutyReminders')} />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="budgetAlerts" className="font-normal">Budget Alerts</Label>
                        <Switch id="budgetAlerts" checked={formData.notifications.budgetAlerts} onCheckedChange={() => handleSwitchChange('budgetAlerts')} />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="dailyMotivation" className="font-normal">Daily Motivation</Label>
                        <Switch id="dailyMotivation" checked={formData.notifications.dailyMotivation} onCheckedChange={() => handleSwitchChange('dailyMotivation')} />
                    </div>
                </div>
            </div>
            <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select value={formData.language.toLowerCase()} onValueChange={(value) => handleSelectChange('language', value)}>
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
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  )
}
