import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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


function App() {

  const { user } = useAuthContext()

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
          <Route path="/" element={user ? <MainLayout /> : <Navigate to='/login' />}>
            <Route index element={user ? <Dashboard /> : <Navigate to='/login' />} />
            <Route path='data' element={<MainData />} />
            <Route path='data/harian' element={<MainDaily />} />
            <Route path='data/create' element={<CreateData />} />
            <Route path='data/create/:id' element={<CreateDataById />} />
            <Route path='user' element={<User />} />
            <Route path='user/create' element={<Create />} />
            <Route path='user/edit/:id' element={<Edit />} />
            <Route path='title' element={<MainTitle />} />
            <Route path='title/create' element={<CreateTitle />} />
            <Route path='title/edit/:id' element={<EditTitle />} />
            <Route path='prj' element={<MainPrj />} />
            <Route path='waiting-to-approve-manager' element={<ManagerView />} />
            <Route path='waiting-to-approve-director' element={<DirectorView />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
