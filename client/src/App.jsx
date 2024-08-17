import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Auth } from "./pages/Auth";
import { SavedRecipes } from "./pages/saved-recipes";
import { CreateRecipes } from "./pages/Create-recipes";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div className="App text-center">
      <Router>
        <Navbar /> 

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/Saved-recipes" element={<SavedRecipes />} />
          <Route path="/create-recipes" element={<CreateRecipes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
