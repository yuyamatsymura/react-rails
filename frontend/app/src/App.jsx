import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Calender from './components/Calender';
import CleateSpace from './components/CleateSpace';
import Header from './components/Header';

const App = () => {
  return (
    <>
    <Header/>
    <Router>
      <Routes>
        <Route path='/' element={<CleateSpace />} />
        <Route path='/:id' element={<Calender />} />
        <Route path="*" element={<div>404　ページが見つかりません。</div>} />
      </Routes>
    </Router>
    </>
  );
};
export default App;