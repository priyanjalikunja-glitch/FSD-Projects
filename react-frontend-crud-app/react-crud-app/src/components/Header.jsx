function Header({ handleAdd }) {
  return (
    <header>
      <h1>Expense Tracker</h1>
      <button onClick={handleAdd}>Add Expense</button>
    </header>
  );
}

export default Header;