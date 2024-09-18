import { useState } from 'react';
import Header from './components/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MonthlyView from './pages/MonthlyView/MonthlyView';

function App() {

  return (
    <>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path='/calendar' element={<MonthlyView/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
