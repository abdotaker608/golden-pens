import React, {useState, useRef, useEffect} from 'react';
import Tag from './Tag';
import ProcessingButton from '../ProcessingButton/ProcessingButton';
import {validateRequired} from '../../Js/methods';
import {endpoint} from '../../API';
import {useHistory} from 'react-router-dom';
import Qm from '../Qm/Qm';


function InfoForm({translate, lang, cover, user, method='POST', cat='quest', story={}, tagList=[]}) {

    const [tags, setTags] = useState(tagList);
    const [storyInfo, setStoryInfo] = useState({category: cat, tags:''});
    const [errorMessages, setErrorMessages] = useState({});
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState('');

    const history = useHistory();
    const canSubmit = useRef(method === 'PUT');

    const plots = [
        {key: 'quest', name: 'Quest'},
        {key: 'overcome', name: 'Overcoming the Monster'},
        {key: 'rebirth', name: 'Rebirth'},
        {key: 'rags', name: 'Rags to Riches'},
        {key: 'tragedy', name: "Tragedy"},
        {key: 'comedy', name: 'Comedy'},
        {key: 'journey', name: 'Journey Return'}
    ]

    const handleChange = e => {
        setStoryInfo({...storyInfo, [e.target.name]: e.target.value});
        if (storyInfo.title && storyInfo.category) canSubmit.current = true;
        if (e.target.name === 'title' || e.target.name === 'category'){
            const feedback = validateRequired(e.target);
            if (feedback) {
                canSubmit.current = false;
                setErrorMessages({...errorMessages, title: feedback});
            }
        }
    }

    useEffect(() => {
        
        if (tagList.length && tagList[0]) setTags(tagList);
        if (cat !== 'quest') setStoryInfo({...storyInfo, category: cat});
    }, [tagList, cat])

    const removeTag = key => {
        setTags(tags.filter(tag => tag !== key));
    }

    const addTag = () => {
        setTags([...tags, storyInfo.tags]);
        setStoryInfo({...storyInfo, tags: ''});
    }

    const publishStory = async () => {
        setProcessing(true);

        const data = new FormData();
        data.append('author', user.pk);
        data.append('tags', tags);
        if (cover.slice(0, 4) === 'data') {
            const results = await fetch(cover);
            const blob = await results.blob();
            const type = cover.split(';')[0].split(':')[1];
            data.append('cover', new File([blob], `${storyInfo.title}.${type.split('/')[1]}`, {type: type}));
        }
        for (let i in storyInfo) {
            if (i === 'tags') continue;
            data.append(i, storyInfo[i]);
        }
        const endDir = method === 'PUT' ? `update/${story.id}` : 'create';
        fetch(`${endpoint}/stories/${endDir}`, {
            headers: {
                'Authorization': `Token ${user.token}`
            },
            method: method,
            body: data
        })
            .then(res => res.json())
            .then(data => {
                setProcessing(false);
                if (data.id){
                    history.push(`/story/${data.id}`);
                }
            })
            .catch(() => {
                setProcessing(false);
                setError('wentWrong')
            })
    }

    const handleSubmit = e => {
        e.preventDefault();
        
        if (document.activeElement.name === 'tags' || document.activeElement.className === 'tag-add') {
            if (tags.length === 30 || tags.indexOf(storyInfo.tags) !== -1) return;
            addTag();
            return;
        }

        if (!cover) {
            setError('coverRequired');
            document.querySelector('form').scrollIntoView({behavior: 'smooth', block: 'start'});
            return;
        }

        if (!canSubmit.current || processing) return;
    
        publishStory();
    }


    return (
        <form noValidate onSubmit={handleSubmit} role='form'>
            {error && <div className='my-4 text-danger text-center font-weight-bold'>{translate(error)}</div>}
            <div className='my-4'>
                <div className='d-flex align-items-center'>
                    <label className='form-label' htmlFor='title'>{translate("title")}</label>
                </div>
                <input dir='auto' className='form-control' name='title' id='title' type='text' onChange={handleChange} defaultValue={story.title}/>
                <div className='text-danger my-1 invalid-feedback'>{translate(errorMessages.title)}</div>
            </div>
            <div className='my-4'>
                <div className='d-flex align-items-center'>
                    <label className='form-label' htmlFor='category'>{translate('plot')}</label>
                    <Qm content='plotTip' hyperlink='https://en.wikipedia.org/wiki/The_Seven_Basic_Plots' title='plot' lang={lang}/>
                </div>
                <select dir='auto' className='form-select form-control' name='category' id='category' onChange={handleChange} value={storyInfo.category}>
                    {
                        plots.map(plot => (
                            <option value={plot.key} key={plot.key}>{plot.name}</option>
                        ))
                    }
                </select>
                <div className='text-danger my-1 invalid-feedback'>{translate(errorMessages.category)}</div>
            </div>
            <div className='my-4'>
                <div className='d-flex align-items-center'>
                    <label className='form-label' htmlFor='tags'>{translate('tags')}</label>
                    <Qm content='tagsTip' title='tags' lang={lang}/>
                </div>
                <div className='tags-container mb-3 mt-1'>
                    {
                        tags.map(tag => (
                            <Tag key={tag} close={() => removeTag(tag)}>{tag}</Tag>
                        ))
                    }
                    <button disabled={!storyInfo.tags} className='tag-add' type='submit'><span><i className='fas fa-plus' /></span></button>
                </div>
                <input dir='auto' className='form-control' name='tags' id='tags' maxLength='20' type='text' onChange={handleChange} value={storyInfo.tags}/>
            </div>
            <div className='my-4'>
                <div className='d-flex align-items-center'>
                    <label className='form-label' htmlFor='desc'>{translate('description')}</label>
                    <Qm content='descTip' title='description' lang={lang}/>
                </div>
                <textarea dir='auto' name='description' id='description' className='form-control' onChange={handleChange} defaultValue={story.description}/>
            </div>
            <div className='mt-5 mb-3 text-center'>
                <ProcessingButton processing={processing}>{translate('publish')}</ProcessingButton>
            </div>
        </form>
    )
}

export default InfoForm
