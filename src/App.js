import './App.css';
import Home from './component/Home';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import SignIn from './userSignIn_Up/SignIn';
import SignUp from './userSignIn_Up/SignUp';
import MyCart from './component/MyCart';
import MyOrders from './component/MyOrders';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { store } from './Redux/ReduxStore';
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <div className="App">
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/mycart' element={<MyCart/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
      </Routes>
      <Footer/>
    </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
