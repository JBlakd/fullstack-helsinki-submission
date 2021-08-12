import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const users = [
  {
    "blogs": [
      {
        "author": "Quentin Tarantino",
        "title": "gimp blog",
        "url": "https://www.indiewire.com/2020/04/pulp-fiction-gimp-backstory-tarantino-1202226996/",
        "id": "610f8772817e664aa08525c5"
      },
      {
        "author": "Joel Spolsky",
        "title": "Joel on Software",
        "url": "https://www.joelonsoftware.com/",
        "id": "6110d77c7ab3ed5a58575d5c"
      },
      {
        "author": "u/hybrid--",
        "title": "Legend of the East Outfit/Challenges as ARTHUR Tips & Resources",
        "url": "https://www.reddit.com/r/reddeadredemption/comments/lfxi8y/legend_of_the_east_outfitchallenges_as_arthur/",
        "id": "6110da417ab3ed5a58575d82"
      },
      {
        "author": "u/FeelingReallyBadTA",
        "title": "I am absolutely mortified and embarrassed beyond belief and I have zero idea what to do",
        "url": "https://www.reddit.com/r/cscareerquestions/comments/95dgrx/i_am_absolutely_mortified_and_embarrassed_beyond/",
        "id": "6110dc477ab3ed5a58575da6"
      }
    ],
    "username": "JBlakd",
    "name": "Ivan Hu",
    "id": "610f85b5ef11201a708f02c8"
  },
  {
    "blogs": [
      {
        "author": "Saroop Ijaz",
        "title": "‘Honor’ Killings Continue in Pakistan Despite New Law",
        "url": "https://www.hrw.org/news/2017/09/25/honor-killings-continue-pakistan-despite-new-law",
        "id": "6110b639c95f0601e4914012"
      },
      {
        "author": "NDTV",
        "title": "A Few Tips To Guide You With Your First Cryptocurrency Investment",
        "url": "https://www.ndtv.com/business/a-few-tips-to-guide-you-with-your-first-cryptocurrency-investment-2504827",
        "id": "6110d85a7ab3ed5a58575d6b"
      },
      {
        "author": "Anias Stambolis-D’Agostino",
        "title": "The Chinese Internet Slang You Need to Know in 2021",
        "url": "https://studycli.org/learn-chinese/chinese-internet-slang/",
        "id": "6112559a861eb809b0cbfdc3"
      },
      {
        "author": "Australian Federal Police",
        "title": "Perth man arrested for heroin hidden in mascara bottles",
        "url": "https://www.afp.gov.au/news-media/media-releases/perth-man-arrested-heroin-hidden-mascara-bottles",
        "id": "61125d1e861eb809b0cbfe11"
      }
    ],
    "username": "belvita",
    "name": "Benjamin Potts",
    "id": "610f862def11201a708f02cd"
  }
]

const blogs = [
  {
    "author": "Quentin Tarantino",
    "likes": 17,
    "title": "gimp blog",
    "url": "https://www.indiewire.com/2020/04/pulp-fiction-gimp-backstory-tarantino-1202226996/",
    "user": {
      "username": "JBlakd",
      "name": "Ivan Hu",
      "id": "610f85b5ef11201a708f02c8"
    },
    "id": "610f8772817e664aa08525c5"
  },
  {
    "author": "Saroop Ijaz",
    "likes": 4,
    "title": "‘Honor’ Killings Continue in Pakistan Despite New Law",
    "url": "https://www.hrw.org/news/2017/09/25/honor-killings-continue-pakistan-despite-new-law",
    "user": {
      "username": "belvita",
      "name": "Benjamin Potts",
      "id": "610f862def11201a708f02cd"
    },
    "id": "6110b639c95f0601e4914012"
  },
  {
    "author": "Joel Spolsky",
    "likes": 5,
    "title": "Joel on Software",
    "url": "https://www.joelonsoftware.com/",
    "user": {
      "username": "JBlakd",
      "name": "Ivan Hu",
      "id": "610f85b5ef11201a708f02c8"
    },
    "id": "6110d77c7ab3ed5a58575d5c"
  },
  {
    "author": "NDTV",
    "likes": 1,
    "title": "A Few Tips To Guide You With Your First Cryptocurrency Investment",
    "url": "https://www.ndtv.com/business/a-few-tips-to-guide-you-with-your-first-cryptocurrency-investment-2504827",
    "user": {
      "username": "belvita",
      "name": "Benjamin Potts",
      "id": "610f862def11201a708f02cd"
    },
    "id": "6110d85a7ab3ed5a58575d6b"
  },
  {
    "author": "u/hybrid--",
    "likes": 2,
    "title": "Legend of the East Outfit/Challenges as ARTHUR Tips & Resources",
    "url": "https://www.reddit.com/r/reddeadredemption/comments/lfxi8y/legend_of_the_east_outfitchallenges_as_arthur/",
    "user": {
      "username": "JBlakd",
      "name": "Ivan Hu",
      "id": "610f85b5ef11201a708f02c8"
    },
    "id": "6110da417ab3ed5a58575d82"
  },
  {
    "author": "u/FeelingReallyBadTA",
    "likes": 0,
    "title": "I am absolutely mortified and embarrassed beyond belief and I have zero idea what to do",
    "url": "https://www.reddit.com/r/cscareerquestions/comments/95dgrx/i_am_absolutely_mortified_and_embarrassed_beyond/",
    "user": {
      "username": "JBlakd",
      "name": "Ivan Hu",
      "id": "610f85b5ef11201a708f02c8"
    },
    "id": "6110dc477ab3ed5a58575da6"
  },
  {
    "author": "Anias Stambolis-D’Agostino",
    "likes": 0,
    "title": "The Chinese Internet Slang You Need to Know in 2021",
    "url": "https://studycli.org/learn-chinese/chinese-internet-slang/",
    "user": {
      "username": "belvita",
      "name": "Benjamin Potts",
      "id": "610f862def11201a708f02cd"
    },
    "id": "6112559a861eb809b0cbfdc3"
  },
  {
    "author": "Australian Federal Police",
    "likes": 0,
    "title": "Perth man arrested for heroin hidden in mascara bottles",
    "url": "https://www.afp.gov.au/news-media/media-releases/perth-man-arrested-heroin-hidden-mascara-bottles",
    "user": {
      "username": "belvita",
      "name": "Benjamin Potts",
      "id": "610f862def11201a708f02cd"
    },
    "id": "61125d1e861eb809b0cbfe11"
  }
]

let gimpBlog
let ivanUser
let component
let togglableContentDiv
let viewButton
let cancelViewButton
let mockHandler

beforeEach(() => {
  gimpBlog = blogs.find(element => element.title === 'gimp blog')

  ivanUser = users.find(element => element.username === 'JBlakd')

  mockHandler = jest.fn()
  component = render(
    <Blog blog={gimpBlog} user={ivanUser} setBlogs={mockHandler}/>
  )

  togglableContentDiv = component.container.querySelector('.togglableContent')
  viewButton = component.container.querySelector('.viewButton')
  cancelViewButton = component.container.querySelector('.cancelViewButton')
})

test('renders content initially', () => {
  expect(component.container).toHaveTextContent('gimp blog')
  expect(component.container).toHaveTextContent('Quentin Tarantino')
  expect(togglableContentDiv).toHaveStyle('display: none')
  // component.debug()
})

test('before and after clicking view button', () => {
  expect(togglableContentDiv).toHaveStyle('display: none')
  fireEvent.click(viewButton)
  expect(togglableContentDiv).not.toHaveStyle('display: none')
  fireEvent.click(cancelViewButton)
  expect(togglableContentDiv).toHaveStyle('display: none')
})

// test('clicking the like button twice calls event handler twice', () => {
//   fireEvent.click(viewButton)
//   const likeButton = component.getByText('like')
//   fireEvent.click(likeButton)
//   // fireEvent.click(likeButton)
//   expect(mockHandler.mock.calls).toHaveLength(1)
// })