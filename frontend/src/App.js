import React from "react";
import UserList from "./components/UserList";
import TeamDetails from "./components/TeamDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<UserList />} />
        <Route path="/team/:id" element={<TeamDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
