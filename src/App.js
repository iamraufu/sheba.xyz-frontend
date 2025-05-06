import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './context/AuthProvider';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Dashboard from './pages/User/Dashboard';
import NotFound from './components/NotFound';
import PrivateOutlet from './components/PrivateOutlet';
import Services from './pages/Services/Services';
import Staffs from './pages/Staffs/Staffs';
import SignUp from './pages/SignUp/SignUp';
import AdminDashboard from './pages/Admin/AdminDashboard';
import EditUser from './pages/User/EditUser';
import EditCategory from './pages/Category/EditCategory';
import ServiceDetails from './pages/Services/ServiceDetails';
import StaffDetails from './pages/Staffs/StaffDetails';
import StaffDashboard from './pages/Staffs/StaffDashboard';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/services' element={<Services />} />
        <Route path='/staffs' element={<Staffs />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/service-details/:id' element={<ServiceDetails />} />
        <Route path='/staff-details/:id' element={<StaffDetails />} />
        <Route path='*' element={<NotFound />} />

        <Route path='/' element={<PrivateOutlet />}>
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/staff' element={<StaffDashboard />} />
          <Route path='/edit-user/:id' element={<EditUser />} />
          <Route path='/edit-category/:id' element={<EditCategory />} />
        </Route>

      </Routes>
    </AuthProvider>
  );
}

export default App;
