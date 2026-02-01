import React, { useState } from 'react'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Footer from "./components/Footer/Footer"
import AddForm from './components/AddForm/AddForm'
import { FaRegCalendarPlus } from "react-icons/fa";
import StorageProvider from "./store/ContextStore"
import { BrowserRouter } from 'react-router-dom'

export default function App() {
  let [modalIsOpen, setModalIsOpen] = useState(false)
  return (
    <BrowserRouter>
    <StorageProvider>
      <Header/>
      <Main/>
      <Footer/>
      {modalIsOpen && <AddForm open={setModalIsOpen}/>}
      <button className='addButton' onClick={()=>setModalIsOpen(true)}>
        <FaRegCalendarPlus />
      </button>
    </StorageProvider>
    </BrowserRouter>
  )
}
