import { Route, Routes } from 'react-router-dom';
import PokemonPage from './pages/Pokemon';
import PostDetail from './pages/PostDetail';
import Posts from './pages/Posts';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Posts />} />
        <Route path='/posts/:id' element={<PostDetail />} />
        <Route path='/pokemon' element={<PokemonPage />} />
      </Routes>
    </div>
  );
}

export default App;
