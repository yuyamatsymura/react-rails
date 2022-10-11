import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Calender from './components/Calender';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/:id' element={<Calender />} />
      </Routes>
    </Router>
  );
};
export default App;