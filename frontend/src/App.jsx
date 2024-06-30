import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Balances from "./pages/Balances.jsx";
import Transactions from "./pages/Transactions.jsx";
import Bills from "./pages/Bills.jsx";
import Expenses from "./pages/Expenses.jsx";
import Goals from "./pages/Goals.jsx";
import Settings from "./pages/Settings.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/balances" element={<Balances />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/bills" element={<Bills />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/goals" element={<Goals />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;
