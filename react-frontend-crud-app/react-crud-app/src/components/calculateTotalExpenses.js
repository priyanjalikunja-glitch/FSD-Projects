function calculateTotalExpenses(transactions) {
  return transactions.reduce(
    (total, transaction) => total + Number(transaction.amount),
    0
  );
}

export default calculateTotalExpenses;