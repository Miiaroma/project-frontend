import './App.css';
import Login from './Login';
import PersonList from './person/PersonList';
import AddPerson from './person/AddPerson';
import SelectedPerson from './person/SelectedPerson';
import DeletePerson from './person/DeletePerson';
import ProjectList from './project/ProjectList';
import AddProject from './project/AddProject';
import SelectedProject from './project/SelectedProject';
import DeleteProject from './project/DeleteProject';
import HourList from './hour/HourList';
import AddHour from './hour/AddHour';
import SelectedHour from './hour/SelectedHour';
import DeleteHour from './hour/DeleteHour';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
<Router>
      <div>
        <ul>
          <li> <Link to="/login">Login</Link>  </li>
          <li> <Link to="/personlist">Persons</Link>  </li>
          <li> <Link to="/projectlist">Projects</Link>  </li>
          <li> <Link to="/hourlist">Hours</Link>  </li>

        </ul>
        <hr />
      </div>
      <Routes>
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/personlist" element={<PersonList/>} />
        <Route exact path="/personlist/selectedperson/:id" element={<SelectedPerson/>} />
        <Route exact path="/personlist/deleteperson/:id" element={<DeletePerson/>} />
        <Route exact path="/addperson" element={<AddPerson/>} />  

        <Route exact path="/projectlist" element={<ProjectList/>} />
        <Route exact path="/projectlist/selectedproject/:id" element={<SelectedProject/>} />
        <Route exact path="/projectlist/deleteproject/:id" element={<DeleteProject/>} />
        <Route exact path="/addproject" element={<AddProject/>} /> 

        <Route exact path="/hourlist" element={<HourList/>} />
        <Route exact path="/hourlist/selectedhour/:id" element={<SelectedHour/>} />
        <Route exact path="/hourlist/deletehour/:id" element={<DeleteHour/>} />
        <Route exact path="/addhour" element={<AddHour/>} /> 
        
      </Routes>
    </Router>

  );
}

export default App;
