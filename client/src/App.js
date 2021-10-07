import Header from './components/Header/Header'
import { useContext } from 'react'
import { PostContext } from './helpers/context'

function App() {
  // const [posts, setPosts] = useContext()

  return (
    <div className="App">
      {/* <PostContext.Provider value={{ posts, setPosts }}> */}
        <Header />
      {/* </PostContext.Provider> */}

    </div>
  );
}

export default App;
