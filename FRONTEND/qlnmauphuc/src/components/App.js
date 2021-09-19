import { BrowserRouter as Router } from "react-router-dom";
import './../css/App.css';
import Header from './header/Header';
import Footer from "./footer/Footer";
import RouterURL from "../router/RouterURL";
import Dashboard from "./dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Header></Header>
      <RouterURL></RouterURL> 
      <Footer></Footer>
      {/* <Dashboard></Dashboard> */}
    </Router>
  );
}

export default App;
