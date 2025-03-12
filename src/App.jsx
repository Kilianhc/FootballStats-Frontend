import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/Dashboard/ProfilePage";
import TeamPage from "./pages/Team/TeamPage";
import StatsPage from "./pages/Stats/StatsPage";
import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import { TeamProvider } from "./context/team.context";
import { AuthProviderWrapper } from "./context/auth.context"; // Importa AuthProviderWrapper

function App() {
  const location = useLocation();

  useEffect(() => {
    const noScrollPages = ["/", "/login", "/signup"];

    if (noScrollPages.includes(location.pathname)) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [location.pathname]);

  return (
    <div className="App">
      <AuthProviderWrapper> {/* Envuélvelo en AuthProviderWrapper dentro de App.jsx */}
        <TeamProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<IsAnon><HomePage /></IsAnon>} />
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
            
            
          </Routes>
        </TeamProvider>
      </AuthProviderWrapper>
    </div>
  );
}

export default App;
