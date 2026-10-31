
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function Home() {
  return <h2>Welcome to Home Page</h2>;
}

function About() {
  return <h2>This is About Page</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <div>
        <h1>React Router Example</h1>

        <Link to="/">Home</Link>
        {" | "}
        <Link to="/about">About</Link>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
