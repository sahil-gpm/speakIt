import Home from "./Home/Home";
import Levels from "./level_selection/Levels";
import Hindidocs from './Learnings/documentation/Hindidocs'
import Englishdocs from './Learnings/documentation/Englishdocs'
import Frenchdocs from './Learnings/documentation/Frenchdocs'
import Germandocs from './Learnings/documentation/Germandocs'
import { Toaster } from 'react-hot-toast'

//adding the react router dom
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Navbar from "./Navigation/Navbar";
import Guessword from "./Learnings/exercise/Guessword";
import Translatesentences from "./Learnings/exercise/Translatesentences";


const App = () => {
  return (
    <div className="app-wrapper">

      <BrowserRouter>

        {/* react hot toast  */}
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            iconTheme:{
              primary:"black"
            }
          }}
        />

        <Navbar />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/select-level" Component={Levels} />
          <Route path="/guess-word" Component={Guessword} />
          <Route path="/translate-sentences" Component={Translatesentences} />

          {/* routes for docs */}
          <Route path="/docs/Hindi" Component={Hindidocs} />
          <Route path="/docs/English" Component={Englishdocs} />
          <Route path="/docs/French" Component={Frenchdocs} />
          <Route path="/docs/German" Component={Germandocs} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
