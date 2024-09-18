import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import SignupForm from "./components/LoginPage";
import TodoDashboard from "./components/TodoDashboard";
import PrivateRoute from "./components/PrivateRoute";
import MyAccount from "./components/AccountPage";
function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect / to /signup */}
        <Route
          path="/"
          element={
            <PrivateRoute Component={TodoDashboard} redirectPath="/signup" />
          }
        />

        {/* Define the /signup route */}
        <Route path="/signup" element={<SignupForm initialPage="signup" />} />
        <Route path="/login" element={<SignupForm initialPage="login" />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute Component={TodoDashboard} />}
        />
        <Route path="/me" element={<PrivateRoute Component={MyAccount} />} />
      </Routes>
    </Router>
  );
}

export default App;
