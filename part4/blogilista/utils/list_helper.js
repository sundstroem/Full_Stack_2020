const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, item) => item.likes + acc, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((acc, item) => item.likes >= acc.likes ? item : acc, {likes: 0})
}

const mostBlogs = (blogs) => {
  const authors = blogs.reduce((acc, item) => {
    return acc.includes(item.author) ? acc : acc.concat(item.author)
  }, [])

  const blogsPerAuthor = authors.map(a => [a ,
    blogs.reduce((acc, item) => {
      return item.author === a ? acc+1 : acc
    }, 0)
  ])

  const authorBlogPair = blogsPerAuthor.reduce((acc, item) => {
    return item[1] >= acc[1] ? item : acc
  }, ['', 0])

  return {
    author: authorBlogPair[0],
    blogs: authorBlogPair[1]
  }
}

const mostLikes = (blogs) => {
  const authors = blogs.reduce((acc, item) => {
    return acc.includes(item.author) ? acc : acc.concat(item.author)
  }, [])

  const likesPerAuthor = authors.map(a => [a ,
    blogs.reduce((acc, item) => {
      return item.author === a ? acc + item.likes : acc
    }, 0)
  ])

  const authorLikesPair = likesPerAuthor.reduce((acc, item) => {
    return item[1] >= acc[1] ? item : acc
  }, ['', 0])

  return {
    author: authorLikesPair[0],
    likes: authorLikesPair[1]
  }
}



module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}