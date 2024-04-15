import Login from "./components/Login";
import { DashBoard } from "./components/DashBoard";
import { Route, Routes } from "react-router-dom";


export default function App() {

  

  return (
    <main className="grid place-content-center h-[100vh]">
    <Routes>
      <Route path="/" element={ <Login /> }/>
      <Route path="/dashboard" element={ <DashBoard /> }/>
    </Routes>
    </main>
  );
}
