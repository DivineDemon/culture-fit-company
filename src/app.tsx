import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth-layout";
import GlobalLayout from "./components/global-layout";
import Dashboard from "./pages/dashboard";
import Documents from "./pages/documents";
import Login from "./pages/login";
import Profile from "./pages/profile";
import UserDetails from "./pages/user-details";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route index element={<Login />} />
      </Route>
      <Route element={<GlobalLayout />}>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/user/:id" element={<UserDetails />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/documents" element={<Documents />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
