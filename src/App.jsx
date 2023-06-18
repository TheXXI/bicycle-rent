import {Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Auth } from './components/auth/Auth';
import { NotFound } from './components/notFound/NotFound';


const About = () => <div>report</div>
const Posts = () => <div>prices</div>

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Auth />} />
          <Route path="/prices" element={<Posts />} />
          <Route path="/report" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    
  );
}

export default App;
