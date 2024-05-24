import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home";
import Shop from "./pages/Shop";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
