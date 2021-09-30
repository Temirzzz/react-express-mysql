
import { useEffect, useState } from 'react'
import axios from 'axios'
import './Home.scss'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [fetching, setFetching] = useState(true)
  const [totalCount, setTotalCount] = useState(0)


  const getPost = () => {
    if(fetching) {
      // console.log('загрузка ' + result.data);
      axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=20&_page=${currentPage}`)
      .then((result) => {
        setPosts([...posts, ...result.data])
        setCurrentPage(prevState => prevState + 1)
        setTotalCount(result.headers['x-total-count'])
      })
      .finally(() => setFetching(false))
    }
  }

  const scrollHandler = (e) => {
    if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && posts.length < totalCount) {
      setFetching(true)
    }
  }


  const lazyLoad = () => {
    document.addEventListener('scroll', scrollHandler)

    return function() {
      document.removeEventListener('scroll', scrollHandler)
    }
  }

  useEffect(() => {
    getPost()
    lazyLoad()
  }, [fetching])

  return (
    <div className='section'>
      <div className='home'>
        <h1>Users Posts</h1>
        <div className='home__post-block'>
          {posts.map((item) => (
            <div key={item.id} className='home__post-block__posts' >
              <p className='home__post-block__post-title' >{ item.title }</p>
              <p className='home__post-block__post-body' >{ item.body }</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home