import {Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Login } from './components/login/Login';
import { NotFound } from './components/notFound/NotFound';
import { SendCase } from './components/sendCase/SendCase';
import { Cases } from './components/cases/Cases';


const Posts = () => <div>prices</div>

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="/prices" element={<Posts />} />
          <Route path="/report" element={<SendCase />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    
  );
}

export default App;
