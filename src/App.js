import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./component/layout/MainLayout";
import Create from "./component/views/user/Create";
import Dashboard from "./component/views/Dashboard";
import Edit from "./component/views/user/Edit";
import User from "./component/views/user/User";
import MainData from "./component/views/data/Main";
import CreateData from "./component/views/data/CreateData";
import MainTitle from "./component/views/title/Main";
import CreateTitle from "./component/views/title/CreateTitle";
import EditTitle from "./component/views/title/EditTitle";
import ManagerView from "./component/views/approval/ManagerView";
import DirectorView from "./component/views/approval/DirectorView";
import Login from "./component/views/Login";
import { useAuthContext } from "./hooks/useAuthContext";
import CreateDataById from "./component/views/data/CreateDataById";
import MainDaily from "./component/views/data/MainDaily";
import MainPrj from "./component/views/prj/MainPrj";
import MainDivisi from "./component/views/divisi/MainDivisi";
import MainZone from "./component/views/zone/MainZone";


function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
        <Route path="/" element={user ? <MainLayout /> : <Navigate to='/login' />}>
          <Route index element={<Dashboard />} />
          <Route path='data' element={user ? <MainData /> : <Navigate to='/login' />} />
          <Route path='data/harian' element={user ? <MainDaily /> : <Navigate to='/login' />} />
          <Route path='data/create' element={user ? <CreateData /> : <Navigate to='/login' />} />
          <Route path='data/create/:id' element={user ? <CreateDataById /> : <Navigate to='/login' />} />
          <Route path='user' element={user ? <User /> : <Navigate to='/login' />} />
          <Route path='user/create' element={user ? <Create /> : <Navigate to='/login' />} />
          <Route path='user/edit/:id' element={user ? <Edit /> : <Navigate to='/login' />} />
          <Route path='title' element={user ? <MainTitle /> : <Navigate to='/login' />} />
          <Route path='title/create' element={user ? <CreateTitle /> : <Navigate to='/login' />} />
          <Route path='title/edit/:id' element={user ? <EditTitle /> : <Navigate to='/login' />} />
          <Route path='prj' element={user ? <MainPrj /> : <Navigate to='/login' />} />
          <Route path='waiting-to-approve-manager' element={user ? <ManagerView /> : <Navigate to='/login' />} />
          <Route path='waiting-to-approve-director' element={user ? <DirectorView /> : <Navigate to='/login' />} />
          <Route path='divisi' element={user ? <MainDivisi /> : <Navigate to='/login' />} />
          <Route path='zone' element={user ? <MainZone /> : <Navigate to='/login' />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
