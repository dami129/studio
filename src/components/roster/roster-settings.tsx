
"use client"

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ShiftType, ShiftColors } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Palette } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

const colorOptions = [
    { name: "Blue", class: "bg-blue-200 text-blue-800 hover:bg-blue-200/80" },
    { name: "Orange", class: "bg-orange-200 text-orange-800 hover:bg-orange-200/80" },
    { name: "Indigo", class: "bg-indigo-200 text-indigo-800 hover:bg-indigo-200/80" },
    { name: "Yellow", class: "bg-yellow-300 text-yellow-900 hover:bg-yellow-300/80" },
    { name: "Green", class: "bg-green-200 text-green-800 hover:bg-green-200/80" },
    { name: "Purple", class: "bg-purple-200 text-purple-800 hover:bg-purple-200/80" },
    { name: "Gray", class: "bg-gray-200 text-gray-800 hover:bg-gray-200/80" },
    { name: "Pink", class: "bg-pink-200 text-pink-800 hover:bg-pink-200/80" },
    { name: "Red", class: "bg-red-200 text-red-800 hover:bg-red-200/80" },
];

export function RosterSettings({
  shiftColors,
  onColorsChange,
}: {
  shiftColors: ShiftColors;
  onColorsChange: (newColors: ShiftColors) => void;
}) {
  const { t } = useLanguage();

  const handleColorChange = (shiftType: ShiftType, colorClass: string) => {
    onColorsChange({ ...shiftColors, [shiftType]: colorClass });
  };

  const shiftTypes = Object.keys(shiftColors) as ShiftType[];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-primary" />
          <span>{t("roster_settings_title")}</span>
        </CardTitle>
        <CardDescription>{t("roster_settings_desc")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {shiftTypes.map((shiftType) => (
          <div key={shiftType} className="flex items-center justify-between">
            <Label>{t(`shift_${shiftType}`)}</Label>
            <Select
              value={shiftColors[shiftType]}
              onValueChange={(value) => handleColorChange(shiftType, value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t("select_color_placeholder")} />
              </SelectTrigger>
              <SelectContent>
                {colorOptions.map((color) => (
                  <SelectItem key={color.class} value={color.class}>
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "w-4 h-4 rounded-full",
                          color.class.split(" ")[0]
                        )}
                      ></div>
                      <span>{t(`color_${color.name.toLowerCase()}`)}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
