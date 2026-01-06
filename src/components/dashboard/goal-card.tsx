"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Edit, Check } from "lucide-react";
import * as React from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

type GoalCardProps = {
  goal: string;
  onGoalChange: (newGoal: string) => void;
};

export function GoalCard({ goal, onGoalChange }: GoalCardProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedGoal, setEditedGoal] = React.useState(goal);

  const handleSave = () => {
    onGoalChange(editedGoal);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedGoal(goal);
    setIsEditing(false);
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-xl">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            <span>Monthly Goal</span>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? <span className="text-xs" onClick={handleCancel}>Cancel</span> : <Edit className="w-4 h-4" />}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow justify-center">
        {isEditing ? (
          <div className="space-y-2">
            <Textarea
              value={editedGoal}
              onChange={(e) => setEditedGoal(e.target.value)}
              className="text-lg font-semibold text-center"
            />
            <Button onClick={handleSave} size="sm" className="w-full">
              <Check className="w-4 h-4 mr-2" />
              Save Goal
            </Button>
          </div>
        ) : (
          <p className="text-lg font-semibold text-center text-foreground/80" onClick={() => setIsEditing(true)}>
            "{goal}"
          </p>
        )}
      </CardContent>
    </Card>
  );
}
