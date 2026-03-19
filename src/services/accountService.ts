import type { Account } from "../types/Account";

const API = "http://localhost:8080/accounts";

export const fetchAccounts = async (): Promise<Account[]> => {
  const res = await fetch(API);
  const data = await res.json();
  // return res.json();
  return data.map((acc: any) => ({
    accountNumber: acc.accountNumber,
    accountName: acc.accountHolderName,
    balance: acc.balance,
    currency: acc.currency,
  }))
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
  accountNumber: string,
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

export const transfer = async (
    fromAccount: string,
    toAccount: string,
    amount: number
): Promise<void> => {
    await fetch(`${API}/transfer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fromAccount,
            toAccount,
            amount,
        })
    });
}

export const getTransactions = async (
  accountNumber: string,
  page: number = 0,
  size: number = 20
) => {
  const response = await fetch(
    `http://localhost:8080/accounts/${accountNumber}/transactions?page=${page}&size=${size}`
  );

  const data = await response.json();

  return {
    transactions: data.content,
    totalPages: data.totalPages,
  };
};