import "./App.css";
import ListOfStd from "./feature/Todos/ListStd";
import AddStd from "./feature/Todos/AddStd";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/add-data" element={<AddStd />} />
          <Route path="/add-data/:id" element={<AddStd />} />
          <Route path="/" element={<ListOfStd />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
