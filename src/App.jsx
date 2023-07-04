import {Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Login } from './components/login/Login';
import { NotFound } from './components/notFound/NotFound';
import { CreateCase } from './components/createCase/createCase';
import { Cases } from './components/cases/Cases';
import { Officers } from './components/officers/Officers';

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="/report" element={<CreateCase />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/officers" element={<Officers />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    
  );
}

export default App;
