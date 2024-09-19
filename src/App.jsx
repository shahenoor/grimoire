import { useState } from 'react';
import Header from './components/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MonthlyView from './pages/MonthlyView/MonthlyView';
import KanbanBoard from './pages/KanbanBoard/KanbanBoard';

function App() {

  return (
    <>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path='/calendar' element={<MonthlyView/>}/>
          <Route path='/board' element={<KanbanBoard/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
