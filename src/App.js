import { BrowserRouter, Route, Routes } from "react-router-dom";
import OnboardingPage from "./OnboardingPage";
import HomePage from "./HomePage";
import CreateNote from "./components/CreateNote";
import NoteDetailsPage from "./components/NoteDetailsPage";
import UpdateNote from "./components/UpdateNote";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OnboardingPage />} />
        <Route path="/notes" element={<HomePage />} />
        <Route path="/create-note" element={<CreateNote />} />
        <Route path="/notes/:id" element={<NoteDetailsPage />} />
        <Route path="/notes/update/:id" element={<UpdateNote />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
