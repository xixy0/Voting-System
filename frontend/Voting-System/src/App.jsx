import React, { useState } from 'react'
import './App.css'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import ElectionDetails from '../components/ElectionDetails'
import ElectionResults from '../components/ElectionResults'
import CastVote from '../components/Voter/CastVote'
import NewVoter from '../components/Voter/NewVoter'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Login from '../components/Login'
import CreateElection from '../components/Admin/CreateElection'
import AddCandidate from '../components/Admin/AddCandidate'
import UpdateCandidate from '../components/Admin/UpdateCandidate'
import CandidateDetails from '../components/Admin/CandidateDetails'
import UpdateElection from '../components/Admin/UpdateElection'
import AllCandidates from '../components/Admin/AllCandidates'


function App() {


  return (
    <React.Fragment>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <AuthProvider>
          <Navbar />

          <Routes>
            <Route path='/' element={<Login />} />
            <Route path="/election/details" element={<ElectionDetails />} />
            <Route path="/election/results/:electionId" element={<ElectionResults />} />
            <Route path="/election/update/:electionId" element={<UpdateElection />} />

            <Route path="/vote/:electionId" element={<CastVote />} />
            <Route path='/registerVoter' element={<NewVoter />} />
            <Route path='/election/create' element={<CreateElection />} />
            <Route path='/candidate/add/:electionId' element={<AddCandidate />} />
            <Route path='/candidate/:candidateId/election/:electionId' element={<UpdateCandidate />} />
            <Route path='/candidate/details/:electionId' element={<CandidateDetails />} />
            <Route path='/candidate/getAll' element={<AllCandidates />} />
          </Routes>



          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </React.Fragment>

  )
}

export default App
