
import './App.css';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Layout from './components/Layout'
import Comentarios from './components/Comentarios'
import Home from './components/Home'

function App() {
  return (
    <div>
        
        <Routes>
              <Route path="/" element={<Layout/>}>
                    <Route path='coment' element={<Comentarios/>}/>
                    <Route path='/' element={<Home/>}/>
                    <Route path='*' element={<Home/>}/>
              </Route>
        </Routes>
    </div>
  );
}

export default App;
