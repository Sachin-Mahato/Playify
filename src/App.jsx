import { BrowserRouter,  Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import LogOut from "./components/LogOut";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login  />}
        />
        <Route
          path="/logout"
          element={<LogOut  />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


