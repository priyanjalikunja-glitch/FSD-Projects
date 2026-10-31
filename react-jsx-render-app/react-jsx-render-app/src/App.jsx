function App() {
  const name = "priya";
  const age = 20;

  return (
    <div>
      <h1>JSX Render App</h1>

      <h2>
        Hello, my name is {name} and I am {age} years old
      </h2>

      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
}

export default App;