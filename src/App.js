import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./component/layout/MainLayout";
import Create from "./component/views/Create";
import Dashboard from "./component/views/Dashboard";
import Edit from "./component/views/Edit";
import User from "./component/views/User";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
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
