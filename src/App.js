import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./component/layout/MainLayout";
import Create from "./component/views/user/Create";
import Dashboard from "./component/views/Dashboard";
import Edit from "./component/views/user/Edit";
import User from "./component/views/user/User";
import Main from "./component/views/data/Main";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='data' element={<Main />} />
            <Route path='user' element={<User />} />
            <Route path='user/create' element={<Create />} />
            <Route path='user/edit/:id' element={<Edit />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
