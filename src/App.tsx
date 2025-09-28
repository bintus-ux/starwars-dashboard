import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Overview from "./pages/overview";
import Starships from "./pages/starships";
import Species from "./pages/species";
import SpeciesDetail from "./pages/species/[id]";
import People from "./pages/people";
import FilmDetail from "./pages/overview/[id]";
import PersonDetail from "./pages/people/[id]";
import StarshipDetail from "./pages/starships/[id]";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Overview />} />
        <Route path="/films/:id" element={<FilmDetail />} />
        <Route path="/starships" element={<Starships />} />
        <Route path="/starships/:id" element={<StarshipDetail />} />
        <Route path="/people" element={<People />} />
        <Route path="/people/:id" element={<PersonDetail />} />
        <Route path="/species" element={<Species />} />
        <Route path="/species/:id" element={<SpeciesDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
