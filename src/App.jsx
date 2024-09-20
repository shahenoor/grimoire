import { useState } from 'react';
import Header from './components/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MonthlyView from './pages/MonthlyView/MonthlyView';
import KanbanBoard from './pages/KanbanBoard/KanbanBoard';
import Footer from './components/Footer/Footer';

function App() {

  return (
    <>
      <div className="app-container">
      <BrowserRouter>
      <Header/>
      <main className="main-content">
        <Routes>
          <Route path='/calendar' element={<MonthlyView/>}/>
          <Route path='/board' element={<KanbanBoard/>}/>
        </Routes>
      </main>
        <Footer/>
      </BrowserRouter>
      </div>
    </>
  )
}

export default App
