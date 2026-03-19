export interface Transaction {
  id: number;
  type: "DEPOSIT" | "WITHDRAW" | "TRANSFER";
  amount: number;
  timestamp: string;
}