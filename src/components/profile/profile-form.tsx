
"use client"

import * as React from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Combobox } from "../ui/combobox";
import { hospitals } from "@/lib/hospitals";
import type { UserProfile } from "@/lib/types";
import { useLanguage } from "@/hooks/use-language";

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
  const { t } = useLanguage();
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
          <CardTitle>{t('personal_information')}</CardTitle>
          <CardDescription>{t('personal_information_desc')}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">{t('full_name')}</Label>
            <Input id="name" value={formData.name} onChange={handleChange} />
          </div>
           <div className="space-y-2">
            <Label htmlFor="email">{t('email')}</Label>
            <Input id="email" type="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hospital">{t('hospital')}</Label>
            <Combobox
              items={hospitals.map(h => ({ label: h, value: h }))}
              value={formData.hospital}
              onChange={(value) => handleSelectChange('hospital', value)}
              placeholder={t('select_hospital_placeholder')}
              searchPlaceholder={t('search_hospitals_placeholder')}
              noResultsMessage={t('no_hospital_found')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ward">{t('ward_unit')}</Label>
             <Select value={formData.ward} onValueChange={(value) => handleSelectChange('ward', value)}>
              <SelectTrigger id="ward">
                <SelectValue placeholder={t('select_ward_placeholder')} />
              </SelectTrigger>
              <SelectContent>
                {wards.map((ward) => (
                  <SelectItem key={ward} value={ward}>{t(`ward_${ward.toLowerCase().replace(/[^a-z0-9]/g, '_')}`)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('settings')}</CardTitle>
          <CardDescription>{t('settings_desc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label>{t('notifications')}</Label>
                <div className="space-y-3 rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="dutyReminders" className="font-normal">{t('duty_reminders')}</Label>
                        <Switch id="dutyReminders" checked={formData.notifications.dutyReminders} onCheckedChange={() => handleSwitchChange('dutyReminders')} />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="budgetAlerts" className="font-normal">{t('budget_alerts')}</Label>
                        <Switch id="budgetAlerts" checked={formData.notifications.budgetAlerts} onCheckedChange={() => handleSwitchChange('budgetAlerts')} />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="dailyMotivation" className="font-normal">{t('daily_motivation')}</Label>
                        <Switch id="dailyMotivation" checked={formData.notifications.dailyMotivation} onCheckedChange={() => handleSwitchChange('dailyMotivation')} />
                    </div>
                </div>
            </div>
            <div className="space-y-2">
            <Label htmlFor="language">{t('language')}</Label>
            <Select value={formData.language} onValueChange={(value) => handleSelectChange('language', value)}>
              <SelectTrigger id="language">
                <SelectValue placeholder={t('select_language_placeholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Sinhala">Sinhala (සිංහල)</SelectItem>
                <SelectItem value="Tamil">Tamil (தமிழ்)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button type="submit">{t('save_changes')}</Button>
      </div>
    </form>
  )
}
