import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayOut from "./layout/LayOut";
import Home from "./components/Home";
import OnlineClasses from "./pages/class/OnlineClasses";
import JoinTeamForm from "./components/allform/JoinTeamForm";
import Form from "./components/allform/Form";
import ContentLayout from "./pages/ContentLayout";
import AboutUs from "./components/AboutUs";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Routes>
        <Route element={<LayOut />}>
          <Route path="/" element={<Home />} />
          <Route path="/online-classes" element={<OnlineClasses />} />
          <Route path="/join-form" element={<JoinTeamForm />} />
          <Route path="/form" element={<Form />} />
          <Route path="/subject/:subject" element={<ContentLayout />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
