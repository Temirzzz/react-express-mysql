
import { useEffect, useState } from 'react'
import axios from 'axios'
import './Home.scss'

const Home = () => {
  const [posts, setPosts] = useState([])


  const getPost = async () => {
    const res = await axios.get(`http://localhost:3500/api/user/posts`)
    setPosts(res.data)
  }


  useEffect(() => {
    getPost()
  }, [])

  return (
    <div className='section'>
      <div className='home'>
        <h1>Users Posts</h1>
        <div className='home__post-block'>
          {posts.map((item) => (
            <div key={item.id} className='home__post-block__posts' >
              <p className='home__post-block__post-title' >{ item.title }</p>
              <p className='home__post-block__post-body' >{ item.post }</p>
              <p className='home__post-block__post-body' >{ item.date }</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home