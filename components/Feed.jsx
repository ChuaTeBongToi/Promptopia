'use client'

import { useState, useEffect } from 'react'

import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const [filledPost, setFilledPost] = useState([]);

  const Filled = (text) => {
    var t = [];

    for (var i = 0; i < posts.length; i = i + 1) {
      if (posts[i].prompt.indexOf(text) > -1 || posts[i].tag.indexOf(text) > -1 || posts[i].creator.username.indexOf(text) > -1) {
        t = [...t, posts[i]];
      }
    }

    return t;
  }

  const FilledByTagOnly = (text) => {
    var t = [];

    for (var i = 0; i < posts.length; i = i + 1) {
      if (posts[i].tag.indexOf(text) > -1) {
        t = [...t, posts[i]];
      }
    }

    return t;
  }

  const handleSearchChange = (e) => {
    e.preventDefault();

    setSearchText(e.target.value);

    console.log('Handled searching :', searchText);

    setFilledPost(Filled(e.target.value));
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
      setFilledPost(data);

      console.log('Fetched data :', data);
    }

    fetchPosts();
  }, [])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={e => handleSearchChange(e)}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList
        data={filledPost}
        handleTagClick={(t) => {
          setSearchText(t);
          setFilledPost(FilledByTagOnly(t));
        }}
      />
    </section>
  )
}

export default Feed