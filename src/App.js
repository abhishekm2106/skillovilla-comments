import { useEffect, useState } from 'react';
import Comment from './components/comments/Comment'
import './App.css';

function App() {
  const [comments, setComments] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    let i = JSON.parse(localStorage.getItem('comments'))
    console.log(i)
    setComments(i ? i : undefined)
  }, [])

  useEffect(() => {
    if (comments.length)
      localStorage.setItem("comments", JSON.stringify(comments))
  }, [comments])

  const addComment = (e) => {
    e.preventDefault()
    let k = Math.random() * 99
    let nc = [...comments, { input: input, key: k, id: k }]
    setComments(nc)
    setInput('')
  }

  const deleteComment = (c) => {
    let updatedComments = comments.filter(i => { console.log(i, c); return !(i.key === c) })
    setComments(updatedComments)
  }

  const updateComment = (id, text) => {
    setComments(comments.map(item => {
      if (item.id === id) return { ...item, input: text }
      return item
    }))
  }

  return (
    <div className="App">
      <form onSubmit={(e) => { addComment(e) }}>
        <input className='main-input' type="text" placeholder='join the discussion' value={input} onChange={(e) => setInput(e.target.value)} />
      </form>
      <div className='comments'>
        {
          comments.map(data => <Comment key={data.key} id={data.key} data={data.input} deleteComment={deleteComment} updateComment={updateComment} />)
        }
      </div>
    </div>
  );
}

export default App;
