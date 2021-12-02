import React from 'react'
// import { useContext } from 'react'
// import { postsContext } from '../../helpers/context'
import './About.scss'

const About = () => {
  // const {posts, setPosts} = useContext(postsContext)

  return (
    <div className='section'>
      <div className='about'>
        <h1>About</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        {/* {posts.map((item) => (
          <motion.div key={item.id} className='home__post-block__posts' 
            whileHover={{ scale: 1.2 }}
          >
            <p className='home__post-block__post-title' >{ item.title }</p>
            <p className='home__post-block__post-body' >{ item.post }</p>
            <p className='home__post-block__post-body' >{ item.date }</p>
          </motion.div>
        ))} */}

      </div>
    </div>

  )
}

export default About