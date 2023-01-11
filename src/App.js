import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import ManagerView from "./component/views/manager/Main";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='data' element={<MainData />} />
            <Route path='data/create' element={<CreateData />} />
            <Route path='user' element={<User />} />
            <Route path='user/create' element={<Create />} />
            <Route path='user/edit/:id' element={<Edit />} />
            <Route path='title' element={<MainTitle />} />
            <Route path='title/create' element={<CreateTitle />} />
            <Route path='title/edit/:id' element={<EditTitle />} />
            <Route path='list-perdin' element={<ManagerView />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
