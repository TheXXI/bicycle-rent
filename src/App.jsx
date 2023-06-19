import {Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Auth } from './components/auth/Auth';
import { NotFound } from './components/notFound/NotFound';
import { Report } from './components/report/Report';


const Posts = () => <div>prices</div>

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Auth />} />
          <Route path="/prices" element={<Posts />} />
          <Route path="/report" element={<Report />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    
  );
}

export default App;
