import Login from "./components/Login";
import Signup from './components/Signup'
import {NavLink,Routes,Route} from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="d-flex">
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <NavLink className="navbar-brand" to={'/sign-in'}>
          OurWebisteName
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to={'/sign-in'}>
                Sign in
              </NavLink>
              
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={'/sign-up'}>
                Sign up
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </div>
    <div className="outer">
      <div className="inner">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
        </Routes>
      </div>
    </div>
  </div>
  );
}

export default App;
