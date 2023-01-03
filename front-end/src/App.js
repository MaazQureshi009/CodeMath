import {BrowserRouter as Router , Route , Routes} from 'react-router-dom';

import './App.css';
import Display from './display';
import Products from './products';
import Users from './users';
import Login from './Login';
import Workshops from './addWorkshops';
import EditProduct from './editProduct'
import EditWorkshop from './editWorkshops';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Display />} />
          <Route path='/products' element={<Products />} />
          <Route path='/users' element={<Users />} />
          <Route path='/addWorkshops' element={<Workshops />} />
          <Route path='/editProducts' element={<EditProduct />} />
          <Route path='/editWorkshops' element={<EditWorkshop />} />
          <Route path="/Login" element={<Login/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
