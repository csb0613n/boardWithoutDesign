import './App.css';

import Header from './layout/header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Detail from './component/Detail';
import Main from './component/Main';
import Newinsert from './component/Newinsert';
import Modify from './component/Modify';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/detail/:id' element={<div><Detail /></div>}/>
        <Route path='/new' element={<Newinsert />}/>
        <Route path='/modify' element={<Modify />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
