import { Routes, Route } from "react-router-dom";
import MainLayout from "./component/layout/MainLayout";
import Create from "./component/views/user/Create";
import Dashboard from "./component/views/Dashboard";
import Edit from "./component/views/user/Edit";
import User from "./component/views/user/User";
import MainData from "./component/views/data/Main";
import CreateData from "./component/views/data/CreateData";
import MainTitle from "./component/views/title/Main";
import DivisiView from "./component/views/approval/DivisiView";
import HcView from "./component/views/approval/HcView";
import Login from "./component/views/Login";
import CreateDataById from "./component/views/data/CreateDataById";
import MainDaily from "./component/views/data/MainDaily";
import MainPrj from "./component/views/prj/MainPrj";
import MainDivisi from "./component/views/divisi/MainDivisi";
import MainZone from "./component/views/zone/MainZone";
import CreateDataDaily from "./component/views/data/CreateDataDaily";
import EditData from "./component/views/data/EditData";


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='data' element={<MainData />} />
          <Route path='data/edit/:id' element={<EditData />} />
          <Route path='data/harian' element={<MainDaily />} />
          <Route path='data/create' element={<CreateData />} />
          <Route path='data/create/daily' element={<CreateDataDaily />} />
          <Route path='data/create/:id' element={<CreateDataById />} />
          <Route path='user' element={<User />} />
          <Route path='user/create' element={<Create />} />
          <Route path='user/edit/:id' element={<Edit />} />
          <Route path='title' element={<MainTitle />} />
          <Route path='prj' element={<MainPrj />} />
          <Route path='waiting-to-approve-divisi' element={<DivisiView />} />
          <Route path='waiting-to-approve-hc' element={<HcView />} />
          <Route path='divisi' element={<MainDivisi />} />
          <Route path='zone' element={<MainZone />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
