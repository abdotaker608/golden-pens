import React, {useRef, useState} from 'react';
import moment from 'moment';
import ar from 'moment/locale/ar';
import DropDown from '../Dropdown/Dropdown';
import {useSelector} from 'react-redux';
import {translate} from '../../Js/methods';
import ReplyTE from '../TextEditor/ReplyTE';
import {endpoint} from '../../API';
import ProcessingButton from '../ProcessingButton/ProcessingButton';
import {Link} from 'react-router-dom';


function Comment({comment, editComment, deleteComment}) {

    const lang = useSelector(state => state.lang);
    const user = useSelector(state => state.auth);

    const [editContent, setEditContent] = useState(comment.content);
    const [processing, setProcessing] = useState(false);

    const editor = useRef(null);

    const translateWrapper = text => translate(text, lang);

    const getPicture = user => {
        if (user.picture) return user.picture;
        else if (user.social_picture) return user.social_picture;
        return require('../../static/images/avatar.svg').default;
    }

    const deleteRequest = () => {
        if (processing) return;

        setProcessing(true);
        
        fetch(`${endpoint}/stories/replies/update/${comment.id}`, {
            headers: {
                'Authorization': `Token ${user.token}`,
            },
            method: 'DELETE',
        })
            .then(res => {
                setProcessing(false);
                if (res.status === 204) deleteComment(comment.id);
            })
            .catch(() => setProcessing(false));
    }

    const btns = [
        {name: translateWrapper('edit'), icon: 'fas fa-edit', onClick: () => editComment(comment.id)},
        {name: translateWrapper('delete'), icon: 'fas fa-trash', onClick: deleteRequest}
    ]

    const btnElems = btns.map(btn => (
        <button onClick={btn.onClick} key={btn.name}><span className='mx-2'><i className={btn.icon} /></span>{btn.name}</button>
    ))

    const handleChange = content => setEditContent(content);

    const saveChanges = () => {
        if (processing) return;

        setProcessing(true);

        fetch(`${endpoint}/stories/replies/update/${comment.id}`, {
            headers: {
                'Authorization': `Token ${user.token}`,
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({content: editContent})
        })
            .then(res => res.json())
            .then(data => {
                setProcessing(false);
                if (data.id) {
                    editComment(comment.id, false, data.content);
                }
            })
            .catch(() => {
                setProcessing(false);
            })
    }


    return (
        <div className='comment'>
            {
                comment.editing ?
                <div className='editing-container'>
                    <ReplyTE initialValue={comment.content} getEditor={editor} onEditorChange={handleChange} />
                    <div className='d-flex justify-content-center align-items-center mt-3'>
                        <ProcessingButton onClick={saveChanges} processing={processing}>{translateWrapper('post')}</ProcessingButton>
                        <button onClick={() => editComment(comment.id, false)} className='cancel-btn'>{translateWrapper('cancel')}</button>
                    </div>
                </div>
                :
                <React.Fragment>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className='user d-flex'>
                            <img src={getPicture(comment.user)} />
                            <div className='mx-3 mt-2'>
                                <Link to={`/profile/${comment.user.pk}`}>
                                    <h5 className='text-capitalize font-weight-bold' dir='auto'>{comment.user.fullname}</h5>
                                </Link>
                                <h6 className='text-capitalize text-secondary'>{moment(comment.created).locale(lang).fromNow()}</h6>
                            </div>
                        </div>
                        {user && comment.user.pk === user.pk && <DropDown items={btnElems} />}
                    </div>
                    <p dir='auto' dangerouslySetInnerHTML={{__html: comment.content}}></p>
                </React.Fragment>
            }

        </div>
    )
}

export default Comment
