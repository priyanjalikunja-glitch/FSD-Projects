import { useState } from "react";

function AddEditForm({ currentTransaction, saveFormData }) {
  const [title, setTitle] = useState(
    currentTransaction ? currentTransaction.title : ""
  );

  const [amount, setAmount] = useState(
    currentTransaction ? currentTransaction.amount : ""
  );

  const [date, setDate] = useState(
    currentTransaction ? currentTransaction.date : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title,
      amount: Number(amount),
      date,
    };

    if (currentTransaction) {
      payload.id = currentTransaction.id;
    }

    saveFormData(payload);
  };

  return (
    <div className="form-container">
      <h2>{currentTransaction ? "Edit Expense" : "Add Expense"}</h2>

      <form onSubmit={handleSubmit}>
        <label>Expense Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter expense title"
          required
        />

        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          min="0.01"
          step="0.01"
          required
        />

        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default AddEditForm;