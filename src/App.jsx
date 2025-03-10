import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/Dashboard/ProfilePage"
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import TeamPage from "./pages/Team/TeamPage";
import StatsPage from "./pages/Stats/StatsPage";

import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import { TeamProvider } from "./context/team.context";
import { UserProvider } from "./context/user.context"

function App() {
  return (
    <div className="App">
      <UserProvider>
        <TeamProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route
              path="/profile"
              element={
                <IsPrivate>
                  <ProfilePage />
                </IsPrivate>
              }
            />
            <Route
              path="/team/:teamId"
              element={
                <IsPrivate>
                  <TeamPage />
                </IsPrivate>
              }
            />

            <Route
              path="/stats/:teamId"
              element={
                <IsPrivate>
                  <StatsPage />
                </IsPrivate>
              }
            />

            <Route
              path="/signup"
              element={
                <IsAnon>
                  <SignupPage />
                </IsAnon>
              }
            />
            <Route
              path="/login"
              element={
                <IsAnon>
                  <LoginPage />
                </IsAnon>
              }
            />
          </Routes>
        </TeamProvider>
      </UserProvider>

    </div>
  );
}

export default App;
