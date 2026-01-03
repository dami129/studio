export type ShiftType = 'Morning' | 'Evening' | 'Night' | 'Off' | 'Leave' | 'Overtime';

export type Duty = {
  date: string;
  type: ShiftType;
  hospital?: string;
  ward?: string;
};

export type Schedule = {
  next: { type: ShiftType; date: string };
  previous: { type: ShiftType; date: string };
};

export type Budget = {
  income: number;
  expenses: number;
};

export type UserProfile = {
  name: string;
  hospital: string;
  ward: string;
  shiftPreference: 'Morning' | 'Evening' | 'Night' | 'Any';
  monthlyGoal: string;
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
  | 'Card payments';

export type Expense = {
  id: string;
  date: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
};

export type IncomeSource = 'Job' | 'Side income' | 'Private practice' | 'Others';

export type Income = {
  id: string;
  date: string;
  amount: number;
  source: IncomeSource;
};
