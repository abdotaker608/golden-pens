import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {translate} from '../../Js/methods';


function SA({path}) {

    const lang = useSelector(state => state.lang);

    const translateWrapper = text => translate(text, lang);

    return (
        <Link className='s-a' to={path}>
            {translateWrapper('seeAll')}
            {lang === 'ar' ?  <span>&larr;</span> :  <span>&rarr;</span>}
        </Link>
    )
}

export default SA
