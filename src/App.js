import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import OrganizeElection from "./components/OrganizeElection";
import EditOrganizeElection from "./components/EditOrganizeElection";
import PeopleAssembly from "./components/PeopleAssembly";
import Login from "./components/Login";
import AddAdmin from "./components/AddAdmin";
import AdminList from "./components/AdminList";
import EmailPage from "./components/EmailPage";
import CandidateDetails from "./components/CandidateDetails";
import FilePage from "./components/FilePage";
import ProblemPage from "./components/ProblemPage";
import ContactPage from "./components/ContactPage";
import ReplyPage from "./components/ReplyPage";
import AcceptedPage from "./components/AcceptedPage"
import ElectoralDistrictPage from "./components/ElectoralDistrictPage";
import DistrictForm from "./components/DistrictForm";
import VotePage from "./components/VotePage";
import VoterPage from "./components/VoterPage";
import "./App.css";

function MainLayout({ children }) {
  return (
    <div className="app">
      <Sidebar />
      {children}
    </div>
  );
}

function App() {

 const [, setRefused] = useState([]);
   
  const refuseCandidate = (candidate) => {
  setRefused((prev) => [...prev, candidate]);
};




  const [candidates, ] = useState([
  { id: 1, name: "Mohamed" },
]);

const [accepted, setAccepted] = useState([]);

const acceptCandidate = (candidate) => {
  const newCandidate = {
    ...candidate,
    id: Date.now(), // id مختلف كل مرة
  };

  setAccepted((prev) => [...prev, newCandidate]);
};
const deleteAccepted = (id) => {
  setAccepted((prev) =>
    prev.filter((candidate) => candidate.id !== id)
  );
};







  
  const deleteAdmin = (id) => {
  setAdmins((prev) => prev.filter((admin) => admin.id !== id));
};
    
 const [admins, setAdmins] = useState([]);
    
 const addAdmin = (admin) => {
  const newAdmin = {
    id: Date.now(), 
    ...admin,
  };

  setAdmins((prev) => [...prev, newAdmin]);
};

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/home"
          element={
            <MainLayout>
              <OrganizeElection />
            </MainLayout>
          }
        />
        <Route
          path="/people-assembly"
          element={
            <MainLayout>
              <PeopleAssembly />
            </MainLayout>
          }
        />
         <Route
          path="/edit"
          element={
            <MainLayout>
              <EditOrganizeElection />
            </MainLayout>
          }
        />

        <Route
          path="/add-admin"
          element={
            <MainLayout>
              <AddAdmin addAdmin={addAdmin}/>
            </MainLayout>
          }
        />

        <Route
          path="/admin-list"
          element={
            <MainLayout>
              <AdminList  admins={admins} deleteAdmin={deleteAdmin}/>
            </MainLayout>
          }
        />

        <Route
          path="/email"
          element={
            <MainLayout>
              <EmailPage />
            </MainLayout>
          }
        />

        <Route
  path="/candidate"
  element={
    <MainLayout>
      <CandidateDetails
        candidates={candidates}
        acceptCandidate={acceptCandidate}
        refuseCandidate={refuseCandidate}
        
      />
    </MainLayout>
  }
/>

        <Route
          path="/file/:name"
          element={
            <MainLayout>
              <FilePage />
            </MainLayout>
          }
        />

        <Route
          path="/problem"
          element={
            <MainLayout>
              <ProblemPage />
            </MainLayout>
          }
        />

        <Route
          path="/problem/details"
          element={
            <MainLayout>
              <ContactPage />
            </MainLayout>
          }
        />

        <Route
          path="/reply"
          element={
            <MainLayout>
              <ReplyPage />
            </MainLayout>
          }
        />
        

<Route
  path="/accepted"
  element={
    <MainLayout>
      <AcceptedPage accepted={accepted}   deleteAccepted={deleteAccepted}/>
    </MainLayout>
  }
/>

<Route
          path="/ElectoralDistrictPage"
          element={
            <MainLayout>
              <ElectoralDistrictPage/>
            </MainLayout>
          }
        />

        <Route
          path="/DistrictForm"
          element={
            <MainLayout>
              <DistrictForm/>
            </MainLayout>
          }
        />

        <Route
          path="/VotePage"
          element={
            <MainLayout>
              <VotePage/>
            </MainLayout>
          }
        />

         <Route
          path="/VoterPage"
          element={
            <MainLayout>
              <VoterPage/>
            </MainLayout>
          }
        />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;