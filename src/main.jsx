import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Betakat from "./pages/betakat";
import "../input.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/betakat" element={<Betakat />} />
        <Route path="/" element={<Navigate to="/betakat" replace />} />
        <Route path="*" element={<Navigate to="/betakat" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
