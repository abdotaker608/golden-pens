import React, {useState} from 'react';
import Config from './Config';
import {translate} from '../../Js/methods';
import {useSelector} from 'react-redux';
import Stories from './Stories';

function Exhibition({author=null, title='exhibition'}) {

    const lang = useSelector(state => state.lang);
    const user = useSelector(state => state.auth);

    const translateWrapper = text => translate(text, lang);

    const [config, setConfig] = useState(
        {sort: null, search: null, cat: null, subCat: null, subCatAr: null, page: 1, onF: null, author: author}
        );

    const changeConfig = (key, value, arValue) => {
        let page = value;
        if (key !== 'page') page = 1;
        
        if (key === 'cat') setConfig({...config, [key]: value || null, subCat: null, page: page, subCatAr: arValue});
        else if (key === 'subCat') setConfig({...config, [key]: value || null, cat: null, page: page, subCatAr: arValue});
        else setConfig({...config, [key]: value || null, page: page, subCatAr: arValue});
    }

    return (
        <div className='exhibition'>
            {title && <h2>{translateWrapper(title)}</h2>}
            <div className='cont mt-5'>
                <Config changeConfig={changeConfig} translate={translateWrapper} user={user} lang={lang} author={author}/>
                <Stories config={config} translate={translateWrapper} lang={lang} changeConfig={changeConfig}/>
            </div>
        </div>
    )
}

export default Exhibition
