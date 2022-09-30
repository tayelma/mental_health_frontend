import "./index.css";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RegisterPage from "./pages/Register/Register";
import WelcomePage from "./pages/Welcome/WelcomePage";
import ErrorPage from "./pages/Error/ErrorPage";
import Questionnaire from "./pages/Questionnaire/Questionnaire";
import Results from "./pages/Results/Results";
import Login from "./pages/Login/Login";
import Recommendations from "./pages/Recommendations/Recommendations";
import SadPersonsScale from "./pages/SadPersonsScale/SadPersonsScale";
import BarChart from "./components/Chart/BarChart";
import PatientForm from "./pages/PatientForm/PatientFormPage";
import { DataContext } from "./context/DataContext";
import { LoginContext } from "./context/LoginContext";
import { SadPersonContext } from "./context/SadPersonContext";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "./pages/Dashboard/DashboardPage";
import Analysis from "./pages/Analysis/AnalysisPage";
import Settings from "./pages/Settings/SettingsPage";
import Reports from "./pages/Reports/Reports";
import { PatientDataContext } from "./context/PatientDataContext";
import { SymptomsContext } from "./context/SymptomsContext";

function App() {
  const [results, setResults] = useState({});
  const [login, setLogin] = useState({});
  const [sadPerson, setSadPersonValue] = useState({});
  const [patientData, setPatientData] = useState({});
  const [symptoms, setSymptoms] = useState({});
  // const [comorbidity, setComorbidity] = useState([]);

  // const useAuth = () => {
  //   const login = localStorage.getItem("token");
  //   console.log({ login });
  //   return Boolean(login);
  // };
  // const isAuth = useAuth();

  return (
    <LoginContext.Provider value={{ login, setLogin }}>
      <DataContext.Provider value={{ results, setResults }}>
        <SadPersonContext.Provider value={{ sadPerson, setSadPersonValue }}>
          <PatientDataContext.Provider value={{ patientData, setPatientData }}>
            <SymptomsContext.Provider value={{ symptoms, setSymptoms }}>
              <Router>
                <Routes>
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="*"
                    element={ErrorPage}

                    // <Navigate to={isAuth ? "/dashboard" : "/login"} replace />
                  />
                  {/* {isAuth ? (
                <> */}
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/analysis" element={<Analysis />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/welcome" element={<WelcomePage />} />
                  <Route path="/questionnaire" element={<Questionnaire />} />
                  <Route path="/results" element={<Results />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route
                    path="/sadpersonsscale"
                    element={<SadPersonsScale />}
                  />
                  <Route
                    path="/recommendations"
                    element={<Recommendations />}
                  />
                  <Route path="/patient" element={<PatientForm />} />
                  <Route path="/chart" element={<BarChart />} />
                  {/* </>
              ) : (
                <></> */}
                  {/* )} */}
                </Routes>
              </Router>
            </SymptomsContext.Provider>
          </PatientDataContext.Provider>
        </SadPersonContext.Provider>
      </DataContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;
