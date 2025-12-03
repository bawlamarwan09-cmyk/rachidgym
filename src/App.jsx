import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import FinancePage from "./FinancePage";
import AddMember from "./AddMember";
import CoachesMembers from "./CoachesMembers";
import AppLayout from "./AppLayout";
import Login from "./Login";
import AddSport from "./AddSport";
import CoachAbsence from "./CoachAbsence";
import AdminRoute from "./AdminRoute";
import Caisier from "./Caisier";
import AddCaisier from "./AddCaisier";
import GymOfficial from "./GymOfficial";
export default function App() {
  return (
    <Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/coach-absence" element={<CoachAbsence />} />
    <Route path="/caisier" element={<Caisier/> }/>
    <Route path="/" element={<GymOfficial/>}/>
 <Route element={<AppLayout />}>

  <Route
    path="/dashboard "
    element={
      <AdminRoute>
        <Dashboard />
      </AdminRoute>
    }
  />

  <Route
    path="/members"
    element={
      <AdminRoute>
        <AddMember />
      </AdminRoute>
    }
  />

  <Route
    path="/addcaisier"
    element={
      <AdminRoute>
        <AddCaisier />
      </AdminRoute>
    }
  />

  <Route
    path="/finance"
    element={
      <AdminRoute>
        <FinancePage />
      </AdminRoute>
    }
  />

  <Route
    path="/coaches-members"
    element={
      <AdminRoute>
        <CoachesMembers />
      </AdminRoute>
    }
  />

  <Route
    path="/add-sport"
    element={
      <AdminRoute>
        <AddSport />
      </AdminRoute>
    }
  />

</Route>

</Routes>
  );
}
