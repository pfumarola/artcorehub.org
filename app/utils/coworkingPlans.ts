export type CoworkingPlan = {
  key: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'semiannual'
  amount: string
  periodKey: 'day' | 'week' | 'month'
  oldAmount?: string
  savingPerMonth?: string
}

export const coworkingPlans: CoworkingPlan[] = [
  { key: 'daily', amount: '15€', periodKey: 'day' },
  { key: 'weekly', amount: '50€', periodKey: 'week' },
  { key: 'monthly', amount: '120€', periodKey: 'month', oldAmount: '180€' },
  { key: 'quarterly', amount: '120€', periodKey: 'month', oldAmount: '150€' },
  { key: 'semiannual', amount: '120€', periodKey: 'month', oldAmount: '180€' }
]

export function isPromoPlan(key: CoworkingPlan['key']): boolean {
  return key === 'monthly' || key === 'quarterly' || key === 'semiannual'
}
