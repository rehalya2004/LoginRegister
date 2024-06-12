import Info from "./components/Info"
import Login from "./components/Login"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Register from "./components/Register";
import ProtectedRoutes from "./components/protectedRoutes";
import Home from "./components/Home"

function App() {
  return (
    <div className="App">
     <Router>
      <Routes>

        <Route path="/" element ={<Home/>}/>

        <Route path="/login" element = {<Login/>}/>

        <Route path="/signup" element = {<Register/>}/>

        <Route element={<ProtectedRoutes />}>
        <Route path="/home" element = {<Info/>}/>
        </Route>


      </Routes>
     </Router>
    </div>
  );
}

export default App;
