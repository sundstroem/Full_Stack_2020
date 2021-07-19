import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import './components/index.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null) //this is the user token
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)
  const [errorStatus, setErrorStatus] = useState(false)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
    }
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)

    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      modifyNotification(`Login failed! Wrong username or password.`, true)

      //setTimeout(() => {
        //setErrorMessage(null)
      //}, 5000)
    }
  }

  const handleBlog = async (event) => {
    event.preventDefault()
    setBlogFormVisible(false)
    const blog = { title: title, author: author, url: url, user: user, id: blogs.length + 1} //this id is only temporary
    if(!title || !author || !url) {
      modifyNotification('A blog must have a title, an author and an url!', true)
      return
    }
    try {
      blogService.setToken(user.token)
      blogService.create(blog)
      //window.location.reload()
      modifyNotification(`A new blog ${blog.title} by ${blog.author} has been added!`, false)
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs(blogs.concat(blog))
    } catch {
      console.log('something went wrong [handleBlog]')
    }
  }
  const modifyNotification = (notification, isError) => {
    setNotification(notification)
    setErrorStatus(isError)
    setTimeout(() => {
      setNotification(null)
      setErrorStatus(false)
    }, 5000)
  }


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>login</h2>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
    <form onSubmit={handleBlog}>
      <div>
        title: 
          <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author: 
          <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url: 
          <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create blog</button>
    </form>
  )

  const logout = () => {
    console.log('logout function called')
    window.localStorage.removeItem('loggedBloglistUser')
    window.location.reload()
  }

  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' } 

  return (
    <div>
      <Notification message={notification} isError={errorStatus} />
      {user === null ?
        loginForm() :
        <div>You are logged in as {user.name}.  
          <button onClick={logout}>Log out</button> 
          <h2>blogs</h2>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
          <div style={hideWhenVisible}>
            <button onClick={() => setBlogFormVisible(true)}>Add a blog</button>
          </div>
          <div style={showWhenVisible}> 
            {blogForm()}
            <button onClick={() => setBlogFormVisible(false)}>Cancel</button>
          </div>
        </div>

      }
    </div>
  )
}

export default App 