import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Contacts from "./components/features/Contacts";

const CreateContact = lazy(() => import("./components/features/CreateContact"));
const Charts = lazy(() => import("./components/features/Charts"));

const App = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/contacts/edit" element={<CreateContact edit />} />
        <Route path="/contacts/create" element={<CreateContact />} />
        <Route path="/" element={<Charts />} />
      </Routes>
      <ToastContainer />
    </Suspense>
  );
};

export default App;
