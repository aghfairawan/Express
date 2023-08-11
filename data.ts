export interface Transaction {
    id: number;
    name: string;
    detail: string;
};

// movies
export let transaction: Transaction[] = [
    {
        id: 1,
        name: "Asep",
        detail: "jajan ciki"
    },
    {
        id: 2,
        name: "Usep",
        detail: "beli rumah"
    },
    {
        id: 3,
        name: "Udin",
        detail: "beli rumah orang"
    },
    {
        id: 4,
        name: "Uded",
        detail: "beli beli aja gabut hehehe"
    },
];

export function updateTransaction(id: number, updatedTransaction: Partial<Transaction>): Transaction | null {
    const indexToUpdate = transaction.findIndex(item => item.id === id);
  
    if (indexToUpdate === -1) {
      return null; // Transaction not found
    }
  
    transaction[indexToUpdate] = {
      ...transaction[indexToUpdate],
      ...updatedTransaction,
    };
  
    return transaction[indexToUpdate];
  };

  export function patchTransaction(id: number, updatedFields: Partial<Transaction>): Transaction | null {
    const indexToUpdate = transaction.findIndex(item => item.id === id);
  
    if (indexToUpdate === -1) {
      return null; // Transaction not found
    }
  
    transaction[indexToUpdate] = {
      ...transaction[indexToUpdate],
      ...updatedFields,
    };
  
    return transaction[indexToUpdate];
  }

