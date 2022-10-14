import React, {useEffect, useState} from 'react';
import {endpoint} from '../../API';
import Paginator from '../Paginator/Paginator';
import FetchPreloader from '../FetchPreloader/FetchPreloader';
import {useSelector} from 'react-redux';
import {translate} from '../../Js/methods';
import AuthorCover from './AuthorCover';

function Authors() {
    const lang = useSelector(state => state.lang);
    const user = useSelector(state => state.auth);

    const [authors, setAuthors] = useState([]);
    const [total, setTotal] = useState(0);
    const [error, setErorr] = useState('');
    const [config, setConfig] = useState({p: 1, search: null});
    const [fetching, setFetching] = useState(true);
    const [search, setSearch] = useState('');

    const translateWrapper = text => translate(text, lang);

    const fetchAuthors = () => {
        setFetching(true);
        let url = `${endpoint}/auth/authors?`;
        let fetchUrl = url;
        if (user) fetchUrl += `user=${user.pk}&`;

        for (let [key, value] of Object.entries(config)) {
            if (value) fetchUrl += `${key}=${value}&`;
        }

        fetch(fetchUrl)
            .then(res => res.json())
            .then(data => {
                setFetching(false);
                if (data.results) {
                    setAuthors(data.results);
                    setTotal(data.total);
                    fetch(url);
                }
            })
            .catch(() =>{
                setErorr('wentWrong');
                setFetching(false);
            });
    }

    const changeAuthorFunc = (pk, newFollowers, state) => {
        const newAuthors = [...authors];
        let author = newAuthors.find(author => author.user.pk === pk);
        author.followers = newFollowers;
        author.inFollowers = state;
        setAuthors(newAuthors);
    }

    const handlePageChange = p => setConfig({...config, p: p.selected + 1});

    const handleSearchChange = e => {
        const value = e.target.value;
        setSearch(value);
        if (!value) setConfig({...config, search: null, p: 1});
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (search) setConfig({...config, search: search, p: 1});
    }

    useEffect(() => {
        fetchAuthors();
    }, [config, user])

    return (
        <div className='authors'>
            <h2>{translateWrapper('gpAuthors')}</h2>
            <form onSubmit={handleSubmit}>
                <input type='search' className='form-control' name='search' id='search' onChange={handleSearchChange} placeholder={translateWrapper('search')}/>
                <button type='submit'>
                    <span><i className='fas fa-search' /></span>
                </button>
            </form>
            <div className='authors-container'>
                {
                    (!fetching && !error) ?
                    <React.Fragment>
                        {
                            authors.length < 1 ?
                            <p className='text-center mt-5 text-secondary w-100'>{translateWrapper('noMatchFound')}</p>
                            :
                            authors.map(author => (
                                <AuthorCover user={user} author={author} key={author.user.pk} setFunc={changeAuthorFunc}/>
                            ))
                        }
                    </React.Fragment>
                    :
                    <div className='w-100'>
                        <FetchPreloader error={translateWrapper(error)} />
                    </div>
                }
            </div>
            <div className='justify-content-center' style={{display: (fetching || error || authors.length < 1) ? 'none' : 'flex', fontFamily: 'Lato'}}>
                <Paginator total={total} handleChange={handlePageChange} lang={lang}/>
            </div>
        </div>
    )
}

export default Authors
