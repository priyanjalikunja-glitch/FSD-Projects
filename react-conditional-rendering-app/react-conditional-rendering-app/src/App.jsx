
import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Website</h1>

        {!isLoggedIn ? (
          <>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button
              onClick={() => {
                if (name.trim() !== "") {
                  setIsLoggedIn(true);
                }
              }}
            >
              Log in
            </button>
          </>
        ) : (
          <>
            <h2>Welcome, {name}!</h2>
            <button onClick={() => setIsLoggedIn(false)}>
              Log out
            </button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
