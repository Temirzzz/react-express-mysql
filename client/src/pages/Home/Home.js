
import { useContext } from 'react'
import './Home.scss'
import { motion } from 'framer-motion'
import { postsContext } from '../../helpers/context'

const Home = () => {
  const {posts, setPosts} = useContext(postsContext)

  return (
    <div className='section'>
      <div className='home'>
        <h1>Users Posts</h1>
        <div className='home__post-block'>
          {posts.map((item) => (
            <motion.div key={item.id} className='home__post-block__posts' 
              whileHover={{ scale: 1.2 }}
            >
              <p className='home__post-block__post-title' >{ item.title }</p>
              <p className='home__post-block__post-body' >{ item.post }</p>
              <p className='home__post-block__post-body' >{ item.date }</p>
            </motion.div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default Home