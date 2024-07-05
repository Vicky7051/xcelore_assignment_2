import react, { useEffect } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './Components/Login/Login'
import Registration from './Components/Registration/Registration'
import Welcome from './Components/Welcome/Welcome'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { AUTOLOGIN } from './Service/ApiHandler'
import { useDispatch, useSelector } from 'react-redux'
import { setProfile } from './Redux/StoreSlice'
import Users from './Components/Users/Users'
import DeleteConfirm from './Components/Dailog/DeleteConfirm'
import AddDailog from './Components/Dailog/AddDailog'
import EditDailog from './Components/Dailog/EditDailog'

function App() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isDeleteDialog = useSelector(state => state.dailog.delete)
    const isAddDialog = useSelector(state => state.dailog.add)
    const isEditDialog = useSelector(state => state.dailog.edit)
    const profile = useSelector(state => state.profile.data) 

    const autoLoginHandler = async() => {
      const reponse = await AUTOLOGIN()
      if(reponse.status) dispatch(setProfile(reponse.profile))
    }

    useEffect(() => {
      if(localStorage.getItem('token')) autoLoginHandler()
      else navigate('/auth/login')
    }, [profile])
  return (
    <div className='container-fluid pageBody'>
      <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition: Bounce/>

      {isDeleteDialog && <DeleteConfirm />}
      {isAddDialog && <AddDailog />}
      {isEditDialog && <EditDailog />}

      <Navbar />
      <div className=''>
        <Routes>
          <Route path='/' element={<Welcome />}/>
          <Route path='/users' element={<Users />}/>
          <Route path='/auth/login' element={<Login />}/>
          <Route path='/auth/registration' element={<Registration />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
