const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()

  const login = await api
    .post('/api/login')
    .send({
      username: user.username,
      password: 'sekret'
    })
  const token = `Bearer ${login.body.token}`
  

  await Blog.deleteMany({})
  
  let blogObject = new Blog(helper.initialBlogs[0])

  await api
    .post('/api/blogs')
    .set("Authorization", token)
    .send(blogObject)

  blogObject = new Blog(helper.initialBlogs[1])
  
  await api
    .post('/api/blogs')
    .set("Authorization", token)
    .send(blogObject)
  
  
})


describe('GET tests for blogs', () => {
  test('the application returns the correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('the key for the returned blogs is called id (instead of _id)', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
  test('if the likes is left undefined, its value ought to be set to 0', async () => {
    //likes is not defined by initialBlogs[1] which is already added to the db
    const blogs = await helper.blogsInDb()
    expect(blogs[1].likes).toEqual(0)
  })

})
describe('POST tests for blogs', () => {
  test('a valid blog can be added', async () => {
    const blogToBeAdded = {
      title: "testblog (http post)",
      author: "testauthor1",
      url: "testurl1",
      likes: 23
    }
    const login = await api
    .post('/api/login')
    .send({
      username: 'root',
      password: 'sekret'
    })
    const token = `Bearer ${login.body.token}`

    await api
      .post('/api/blogs')
      .send(blogToBeAdded)
      .set("Authorization", token)
      .expect(200)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('if a blog without title or url is being added, 400 Bad Request ought to occur', async () => {
    const badBlog = {
      author: "kfo"
    }
    const login = await api
    .post('/api/login')
    .send({
      username: 'root',
      password: 'sekret'
    })
    const token = `Bearer ${login.body.token}`

    await api
      .post('/api/blogs')
      .send(badBlog)
      .set("Authorization", token)
      .expect(400)
  })

  test('a new blog may not be added without a token', async () => {
    const initialBlogs = await helper.blogsInDb()
    const newBlog = {
      title: "testblog (token",
      author: "testauthor",
      url: "testurl",
    }
    
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toEqual(initialBlogs.length)
  })
  
})
describe('DELETE tests for blogs', () => {
  test('a blog can be deleted', async () => {
    const initialBlogs = await helper.blogsInDb()
    const id = initialBlogs[1].id
    const login = await api
    .post('/api/login')
    .send({
      username: 'root',
      password: 'sekret'
    })
    const token = `Bearer ${login.body.token}`
  
    await api
      .delete(`/api/blogs/${id}`)
      .set("Authorization", token)
      

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toEqual(helper.initialBlogs.length - 1)
  })
})
describe('PUT tests for blogs', () => {
  test('a blog can be modified', async () => {
    const initialBlogs = await helper.blogsInDb()
    const updatedBlog = initialBlogs[1]
    updatedBlog.likes = 69
    const id = initialBlogs[1].id
    
    const login = await api
    .post('/api/login')
    .send({
      username: 'root',
      password: 'sekret'
    })
    const token = `Bearer ${login.body.token}`
  
    await api
      .put(`/api/blogs/${id}`)
      .send(updatedBlog)
      .set("Authorization", token)

    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[1].likes).toBe(69)
  })
})

describe('tests for handling users', () => {
  test('a user may be added to the db', async () => {
    const usersAtStart = await helper.usersInDb()
  
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }
  
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
  
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('a user is not created if the user object is faulty, error is displayed correctly', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser1 = {
      username: 'root',
      name: 'Matti Luukkainen',
      password: 'asdasdad',
    }
    const newUser2 = {
      username: 'root2',
      name: 'Matti Luukkainen',
      password: '2',
    }
  
    await api
      .post('/api/users')
      .send(newUser1)
      .expect(400)
  
    await api
      .post('/api/users')
      .send(newUser2)
      .expect(400)
    const usersAtEnd = await helper.usersInDb()
  
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})












