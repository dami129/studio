import { DutyCard } from "@/components/dashboard/duty-card";
import { BudgetCard } from "@/components/dashboard/budget-card";
import { GoalCard } from "@/components/dashboard/goal-card";
import { QuoteCard } from "@/components/dashboard/quote-card";
import { Frown } from "lucide-react";

export default function Home() {
  const user = {
    name: "Ayesha Perera",
    hospital: "General Hospital, Colombo",
    ward: "Surgical",
    shiftPreference: "Night",
    monthlyGoal: "Complete my advanced CPR certification.",
    budget: {
      income: 120000,
      expenses: 45000,
    },
    schedule: {
      next: { type: "Night", date: "2024-08-15T20:00:00" },
      previous: { type: "Night", date: "2024-08-14T08:00:00" },
    },
  };

  const initialAiState = {
    quote: null,
    error: null,
  };

  const recentActivities = [
    { value: 'long-shift', label: 'Had a long and tiring shift', icon: <Frown className="w-4 h-4 mr-2" /> },
    { value: 'difficult-patient', label: 'Dealt with a difficult patient interaction', icon: <Frown className="w-4 h-4 mr-2" /> },
    { value: 'feeling-unmotivated', label: 'Feeling a bit unmotivated lately', icon: <Frown className="w-4 h-4 mr-2" /> },
    { value: 'great-teamwork', label: 'Experienced great teamwork with colleagues', icon: <Frown className="w-4 h-4 mr-2" /> },
    { value: 'patient-recovery', label: 'Witnessed a heartwarming patient recovery', icon: <Frown className="w-4 h-4 mr-2" /> },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-3">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground/90">
          Welcome back, {user.name.split(" ")[0]}
        </h1>
        <p className="text-muted-foreground mt-1">
          Here’s your daily overview. Stay strong and inspired.
        </p>
      </div>

      <DutyCard schedule={user.schedule} />
      <BudgetCard budget={user.budget} />
      <GoalCard goal={user.monthlyGoal} />
      
      <div className="md:col-span-2 lg:col-span-3">
        <QuoteCard 
          user={user}
          initialAiState={initialAiState}
          recentActivities={recentActivities}
        />
      </div>
    </div>
  );
}
