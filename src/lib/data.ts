import type { Duty, Expense, Income } from './types';

export const mockDuties: Duty[] = [
  { id: '2024-08-01_Morning', date: '2024-08-01', type: 'Morning' },
  { id: '2024-08-02_Morning', date: '2024-08-02', type: 'Morning' },
  { id: '2024-08-03_Evening', date: '2024-08-03', type: 'Evening' },
  { id: '2024-08-04_Off (Day Off)', date: '2024-08-04', type: 'Off (Day Off)' },
  { id: '2024-08-05_Off (Day Off)', date: '2024-08-05', type: 'Off (Day Off)' },
  { id: '2024-08-06_Night', date: '2024-08-06', type: 'Night' },
  { id: '2024-08-07_Night', date: '2024-08-07', type: 'Night' },
  { id: '2024-08-08_Morning', date: '2024-08-08', type: 'Morning' },
  { id: '2024-08-09_Training', date: '2024-08-09', type: 'Training' },
  { id: '2024-08-11_Leave (CL/VL/SL)', date: '2024-08-11', type: 'Leave (CL/VL/SL)' },
  { id: '2024-08-12_Evening', date: '2024-08-12', type: 'Evening' },
  { id: '2024-08-13_Evening', date: '2024-08-13', type: 'Evening' },
  { id: '2024-08-13_Overtime (Night)', date: '2024-08-13', type: 'Overtime (Night)' },
  { id: '2024-08-14_Night', date: '2024-08-14', type: 'Night' },
  { id: '2024-08-15_Night', date: '2024-08-15', type: 'Night' },
  { id: '2024-08-18_Overtime (Morning)', date: '2024-08-18', type: 'Overtime (Morning)' },
  { id: '2024-08-22_Morning', date: '2024-08-22', type: 'Morning' },
  { id: '2024-08-23_Morning', date: '2024-08-23', type: 'Morning' },
  { id: '2024-08-28_Off (Day Off)', date: '2024-08-28', type: 'Off (Day Off)' },
  { id: '2024-08-29_Off (Day Off)', date: '2024-08-29', type: 'Off (Day Off)' },
];

export const mockExpenses: Expense[] = [
    { id: '1', date: '2024-08-01', category: 'Transport', amount: 350, description: 'Bus fare' },
    { id: '2', date: '2024-08-01', category: 'Food', amount: 800, description: 'Lunch' },
    { id: '3', date: '2024-08-02', category: 'Groceries', amount: 4500, description: 'Weekly shopping' },
    { id: '4', date: '2024-08-03', category: 'Food', amount: 1200, description: 'Dinner with friends' },
    { id: '5', date: '2024-08-05', category: 'Mobile bills', amount: 1500, description: 'Monthly bill' },
    { id: '6', date: '2024-08-07', category: 'Health', amount: 2000, description: 'Pharmacy' },
    { id: '7', date: '2024-08-10', category: 'Shopping', amount: 3000, description: 'New shoes' },
];

export const mockIncome: Income = {
  jobSalary: 120000,
  sideIncome: 15000,
  privatePractice: 0,
  others: 0,
};
