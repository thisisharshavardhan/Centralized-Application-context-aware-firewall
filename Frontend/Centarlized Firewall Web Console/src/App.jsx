import './App.css'
// import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { NavLink, Routes,Route } from 'react-router-dom'
import Devices from './Firewall/Devices'
import Device from './Firewall/Device'
function App() {
  return (
    
    <>
    <div className="App">
        <header className="App-header lato-bold">
          <h3>Centralized Firewall Web Console</h3>
        </header>
        <div className='main'>
          <nav className='Navigation-bar'>
            <ul className='lato-light'>
              <li>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z"/></svg>
                <NavLink to='/dashboard'>Dashboard</NavLink>
              </li>
              <li>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M80-160v-120h80v-440q0-33 23.5-56.5T240-800h600v80H240v440h240v120H80Zm520 0q-17 0-28.5-11.5T560-200v-400q0-17 11.5-28.5T600-640h240q17 0 28.5 11.5T880-600v400q0 17-11.5 28.5T840-160H600Zm40-120h160v-280H640v280Zm0 0h160-160Z"/></svg>
                <NavLink to='/devices'>Devices</NavLink>
              </li>
            </ul>
          </nav>
            <div className='content'>
                <Routes>
                    <Route path='/dashboard' element={<>No files</>} />
                    <Route path='/devices' element={<Devices/>} />
                    <Route path='/devices/:id' element={<Device/>} />
                </Routes>
            </div>
        </div>
        <footer>
        </footer>
      </div>
    </>
  )
}

export default App