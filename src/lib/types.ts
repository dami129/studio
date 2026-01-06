export type ShiftType = 
  | 'Morning' 
  | 'Evening' 
  | 'Night' 
  | 'Off (Day Off)' 
  | 'Leave (CL/VL/SL)' 
  | 'Training'
  | 'Overtime (Morning)'
  | 'Overtime (Evening)'
  | 'Overtime (Night)';

export type Duty = {
  date: string; // "yyyy-MM-dd"
  type: ShiftType;
  hospital?: string;
  ward?: string;
};

export type Schedule = {
  next: { type: ShiftType; date: string } | null;
  previous: { type: ShiftType; date: string } | null;
};

export type Budget = {
  income: number;
  expenses: number;
};

export type UserProfile = {
  name: string;
  email: string;
  hospital: string;
  ward: string;
  monthlyGoal: string;
  language: string;
  theme: "light" | "dark" | "system";
  notifications: {
      dutyReminders: boolean;
      budgetAlerts: boolean;
      dailyMotivation: boolean;
  };
};

export type ExpenseCategory = 
  | 'Food' 
  | 'Transport' 
  | 'Mobile bills' 
  | 'Groceries' 
  | 'Health' 
  | 'Education' 
  | 'Shopping' 
  | 'Salon' 
  | 'Card payments'
  | 'Others';

export type Expense = {
  id: string;
  date: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
};

export type IncomeSource = 'jobSalary' | 'sideIncome' | 'privatePractice' | 'others';

export type Income = {
  [key in IncomeSource]: number;
};


export type ShiftColors = {
  [key in ShiftType]: string;
};
