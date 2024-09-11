export interface GameControlsProps {
  onDecision: (decision: 'merge' | 'reject' | 'needsWork') => void
  onCoffeeBoost: () => void
  coffeeBoost: boolean
}
