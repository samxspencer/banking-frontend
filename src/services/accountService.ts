import type { Account } from "../types/Account";

const API = "http://localhost:8080/accounts";

export const fetchAccounts = async (): Promise<Account[]> => {
  const res = await fetch(API);
  return res.json();
};

export const createAccount = async (
  name: string,
  currency: string
): Promise<void> => {
  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, currency }),
  });
};

export const transact = async (
  accountNumber: number,
  type: "deposit" | "withdraw",
  amount: number
): Promise<void> => {
  await fetch(`${API}/${accountNumber}/${type}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount }),
  });
};