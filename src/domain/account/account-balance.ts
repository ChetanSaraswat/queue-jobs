import { InsufficientBalanceException } from "src/infrastructure/exception/custom-exception";

export class Balance {
    private readonly amount: number;
  
    constructor(amount: number) {
      if (amount < 0) {
        throw new Error('Balance cannot be less than 0');
      }
  
      this.amount = this.validateBalance(amount);
    }
  
    private validateBalance(amount: number): number {
        const validAmount = Number(amount) || 0;
      const roundedAmount = parseFloat(validAmount?.toFixed(2));
  
      if (roundedAmount.toString().length > 12) {
        throw new Error('Balance exceeds the allowed precision of 12 digits');
      }
      return roundedAmount;
    }

    static add(balance:Balance,amount: number): Balance {
        return new Balance(balance.getValue() + amount);
      }
    
    static subtract(balance:Balance,amount: number): Balance {
        if (balance.getValue() - amount < 0) {
          throw new InsufficientBalanceException();
        }
        return new Balance(balance.getValue() - amount);
      }
  
    public getValue(): number {
      return this.amount;
    }

  }
  