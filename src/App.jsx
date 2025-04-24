import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayOut from "./layout/LayOut";
import Home from "./components/Home";
import OnlineClasses from "./pages/class/OnlineClasses";
import JoinTeamForm from "./pages/JoinTeamForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayOut />}>
          <Route path="/" element={<Home />} />
          <Route path="/online-classes" element={<OnlineClasses />} />
          <Route path="/join-form" element={<JoinTeamForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
