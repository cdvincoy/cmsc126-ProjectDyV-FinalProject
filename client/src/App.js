import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          {/* <Route path="/authpage" element={<AuthPage />} /> */}
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>          
    </div>
  );
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<DashboardPage />} />
//         <Route path="/authpage" element={<AuthPage />} />
//         <Route path="/dashboard" element={<DashboardPage />} />
//       </Routes>
//     </BrowserRouter>          
//   );
}

export default App;