import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayOut from "./layout/LayOut";
import Home from "./components/Home";
import OnlineClasses from "./pages/class/OnlineClasses";
import JoinTeamForm from "./components/allform/JoinTeamForm";
import Form from "./components/allform/Form";
import ContentLayout from "./pages/ContentLayout";
import AboutUs from "./components/AboutUs";
import ScrollToTop from "./components/ScrollToTop";
import ChemistryTutors from "./pages/ChemistryTutors";
import MathTutors from "./pages/MathTutors";
import BiologyTutors from "./pages/BiologyTutors";
import PhysicsTutors from "./pages/PhysicsTutors";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<LayOut />}>
          <Route path="/" element={<Home />} />
          <Route path="/online-classes" element={<OnlineClasses />} />
          <Route path="/join-form" element={<JoinTeamForm />} />
          <Route path="/form" element={<Form />} />
          {/* <Route path="/subject/:subject" element={<ContentLayout />} /> */}
          <Route path="/online-physics-tutors" element={<PhysicsTutors />} />
          <Route
            path="/online-chemistry-tutors"
            element={<ChemistryTutors />}
          />
          <Route path="/online-maths-tutors" element={<MathTutors />} />{" "}
          <Route path="/online-biology-tutors" element={<BiologyTutors />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
