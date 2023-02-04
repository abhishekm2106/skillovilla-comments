import { useEffect, useState } from 'react'
import './comment.css'

function Comment(props) {
    const [editedComment, setEditedComment] = useState(props.data)
    const [editing, setEditing] = useState(false)
    const [reply, setReply] = useState(false)
    const [replyinp, setReplyinp] = useState('')
    const [replies, setReplies] = useState([])

    const commentSubmit = (e) => {
        e.preventDefault()
        let k = Math.random() * 99
        setReplies([...replies, { input: replyinp, key: k, id: k }])
        setReplyinp('')
        setReply(false)
    }

    return (
        <div className='comment'>
            <div className='main-comment'>
                <img className='comment-image' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU" alt="" />
                <div className='comment-data'>
                    <div className='username'>Username</div>
                    {
                        editing ?
                            <form onSubmit={(e) => { e.preventDefault(); setEditing(false); props.updateComment(props.id, editedComment) }}>
                                <input type="text" value={editedComment} onChange={(e) => setEditedComment(e.target.value)} />
                            </form> :
                            <div>{editedComment} </div>
                    }

                    <div className='comment-buttons'>
                        {
                            props.nested ? <></> :
                                <>
                                    <button className='cb' onClick={() => setReply(true)}>reply</button>
                                    <button className='cb' onClick={() => props.deleteComment(props.id)}>delete</button>
                                    <button className='cb' onClick={() => setEditing(true)}>edit</button>
                                </>
                        }

                        {
                            reply ?
                                <form onSubmit={(e) => { e.preventDefault(); commentSubmit(e) }}>
                                    <input value={replyinp} onChange={(e) => setReplyinp(e.target.value)} />
                                </form>
                                :
                                <></>
                        }
                    </div>
                </div>
            </div>
            <div className='replies'>
                {
                    replies.map(data => <Comment nested key={data.key} id={data.key} data={data.input} deleteComment={props.deleteComment} />)
                }
            </div>

        </div>
    )
}

export default Comment