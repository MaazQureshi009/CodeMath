import {BrowserRouter as Router , Route , Routes} from 'react-router-dom';

import './App.css';
import Display from './display';
import Products from './products';
import Users from './users';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Display />} />
          <Route path='/products' element={<Products />} />
          <Route path='/users' element={<Users />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
