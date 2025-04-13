
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {

  return (
    <>
       <Navbar/>    { /*it should be comman in every page ,so we are keepin it here} */}
      <Outlet/>       {/*    // shows the home page of router.jsx . it will display all the pages written in the router page*/}
      <Footer/>
    </>
  )
}

export default App
