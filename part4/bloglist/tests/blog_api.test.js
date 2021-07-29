const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

const initialUsers = [
  {
    username: "gimp",
    name: "Basement Gimp",
    _id: "61029a67f9ec343774a96529",
    passwordHash: "$2b$10$3p3gA2McRU1wd4Z5TTELAuDeGC9zC9TZqMrwDrxcZNB1fK3ZLFKpi",
    __v: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  for (const initialBlog of initialBlogs) {
    let initialBlogObject = new Blog(initialBlog)
    await initialBlogObject.save()
  }

  await User.deleteMany({})

  for (const initialUser of initialUsers) {
    let initialUserObject = new User(initialUser)
    await initialUserObject.save()
  }
})

describe("tests for 'blogs'", () => {
  test('blogs returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('all blogs returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })
  
  test("has unique identifier property named 'id'", async () => {
    const response = await api.get('/api/blogs')
    // logger.info("GET /api/blogs response body:\n", response.body)
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
  
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: "Joel On Software",
      author: "Joel Spolsky",
      url: "https://www.joelonsoftware.com/",
      likes: 1
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const getResponse = await api.get('/api/blogs')
    const titles = getResponse.body.map(r => r.title)
  
    expect(getResponse.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain('Joel On Software')
  })
  
  test("if 'likes' not defined, it defaults to 0", async () => {
    const newBlog = {
      title: "Joel On Software",
      author: "Joel Spolsky",
      url: "https://www.joelonsoftware.com/"
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const getResponse = await api.get('/api/blogs')
    const titles = getResponse.body.map(r => r.title)
  
    expect(getResponse.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain('Joel On Software') 
    const newlyAddedBlog = getResponse.body.find(blog => blog.title === 'Joel On Software')
    // logger.info('newly added blog:\n', newlyAddedBlog)
    expect(newlyAddedBlog.likes).toBe(0)
  })
  
  test("if 'title' or 'url' missing from POST request, status 400 Bad Request", async () => {
    let newBlog = {
      title: "Joel On Software",
      author: "Joel Spolsky"
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    
    newBlog = {
      author: "Joel Spolsky",
      url: "https://www.joelonsoftware.com/"
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe("tests for 'users'", () => {
  test('no password', async () => {
    const newUser = {
      username: "ivan",
      name: "Ivan Hu"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('password too short', async () => {
    const newUser = {
      username: "ivan",
      name: "Ivan Hu",
      password: "pw"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('username must be unique', async () => {
    const newUser = {
      username: "gimp",
      name: "Basement Gimp",
      password: "pasdsaw"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})