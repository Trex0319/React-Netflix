import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home";
import MovieAdd from "./MovieAdd";
import MovieEdit from "./MovieEdit";
import TvshowAdd from "./TvshowAdd";
import TvShowEdit from "./TvshowEdit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie_add" element={<MovieAdd />} />
        <Route path="/movies/:id" element={<MovieEdit />} />
        <Route path="/tvshow_add" element={<TvshowAdd />} />
        <Route path="/tvshows/:id" element={<TvShowEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
