import React, {useState, useRef} from 'react';
import ReplyTE from '../TextEditor/ReplyTE';
import ProcessingButton from '../ProcessingButton/ProcessingButton';
import Replies from './Replies';
import {endpoint} from '../../API';
import {useSelector} from 'react-redux';

function Reply({user, chapter, translate}) {

    const [reply, setReply] = useState('');
    const [posting, setPosting] = useState(false);
    const [newComment, setNewComment] = useState(null);

    const lang = useSelector(state => state.lang);

    const editor = useRef(null);

    const handleChange = content => {
        setReply(content);
    }

    const postReply = e => {
        e.preventDefault();
        if (!reply || posting) return;
        editor.current.setContent('');
        setPosting(true);
        const data = {
            user: user.pk,
            content: reply,
            chapter: chapter.id
        }
        fetch(`${endpoint}/stories/replies/create`, {
            headers: {
                'Authorization': `Token ${user.token}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                setPosting(false);
                data.user = {...user, fullname: `${user.first_name} ${user.last_name}`};
                if (data.id) setNewComment(data);
            })
            .catch(() => setPosting(false))
    }

    return (
        <div className='reply-container'>
            {
                user &&
                <React.Fragment>
                    <h3>{translate('leaveReply')}</h3>
                    <form onSubmit={postReply}>
                        <ReplyTE onEditorChange={handleChange} getEditor={editor} lang={lang}/>
                        <ProcessingButton processing={posting}>{translate('post')}</ProcessingButton>
                    </form>
                </React.Fragment>
            }
            <Replies chapter={chapter} newComment={newComment} translate={translate}/>
        </div>
    )
}

export default Reply
