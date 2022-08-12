import { Route, Routes } from 'react-router-dom'
import PostList from './components/PostList'

function App() {
  return (
    <div className="App">
       <Routes>
          <Route path='/' element={<PostList/>} />
          <Route path='/posts/:id' element={<PostList/>} />
       </Routes>
    </div>
  )
}

export default App
