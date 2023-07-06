import {Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Login } from './components/login/Login';
import { NotFound } from './components/notFound/NotFound';
import { CreateCase } from './components/createCase/createCase';
import { Cases } from './components/cases/Cases';
import { Officers } from './components/officers/Officers';
import { SingleOfficer } from './components/singleOfficer/SingleOfficer';
import { SingleCase } from './components/singleCase/SingleCase';

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="/report" element={<CreateCase />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/cases/:id" element={<SingleCase />} />
          <Route path="/officers" element={<Officers />} />
          <Route path="/officers/:id" element={<SingleOfficer />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    
  );
}

export default App;
