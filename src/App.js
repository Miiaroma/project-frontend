import './App.css';
import PersonList from './person/PersonList';
import AddPerson from './person/AddPerson';
import SelectedPerson from './person/SelectedPerson';
import Deleteperson from './person/DeletePerson';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
<Router>
      <div>
        <ul>
          
          <li> <Link to="/personlist">Persons</Link>  </li>
          <li> <Link to="/projectlist">Projects</Link>  </li>
          <li> <Link to="/hourlist">Hours</Link>  </li>

        </ul>
        <hr />
      </div>
      <Routes>
        
        <Route exact path="/personlist" element={<PersonList/>} />
        <Route exact path="/personlist/selectedperson/:id" element={<SelectedPerson/>} />
        <Route exact path="/personlist/deleteperson/:id" element={<Deleteperson/>} />
        <Route exact path="/addperson" element={<AddPerson/>} />  
        
      </Routes>
    </Router>

  );
}

export default App;
