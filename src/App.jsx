
import axios from 'axios';
import React, { useEffect } from 'react'
// import { asyncGetUsers } from './store/userAction';
import { useDispatch, useSelector } from 'react-redux';
import Mainroutes from './routes/Mainroutes';
import Navbar from './components/Navbar';
import { asyncCurrentUsers } from './store/action/userActions';
import { asyncLoadProducts } from './store/action/productActions';

const App = () => {
  // const data = useSelector(state => state.user)
  const dispatch = useDispatch();

  // console.log(data);
  
  useEffect(() => {
    dispatch(asyncCurrentUsers())
    dispatch(asyncLoadProducts())
  }, [])

  return (
    <div>
      <Navbar/>
      <Mainroutes/>
    
    </div>
  )
}

export default App
