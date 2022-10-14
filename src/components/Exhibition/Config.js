import React, {useState} from 'react'

function Config({changeConfig, translate, user, lang, author}) {

    const [search, setSearch] = useState('');

    const sortOptions = [
        {name: translate('latest'), key: '-created'},
        {name: translate('relevance'), key: 'relevance'},
        {name: translate('trending'), key: 'trending'},
        {name: translate('mostRead'), key: 'mostViewed'}  
    ]

    const catOptions = [
        {name: translate('all'), key: ''},
        {name: 'Quest', key: 'quest'},
        {name: 'Overcoming the Monster', key: 'overcome'},
        {name: 'Rebirth', key: 'rebirth'},
        {name: 'Rags to Riches', key: 'rags'},
        {name: 'Tragedy', key: 'tragedy'},
        {name: 'Comedy', key: 'comedy'},
        {name: 'Journey Return', key: 'journey'}
    ]

    const subCatOptions = [
        {name: translate('action'), key: 'action', arKey: 'أكشن'},
        {name: translate('adventure'), key: 'adventure', arKey: 'مغامرة'},
        {name: translate('horror'), key:' horror', arKey: 'رعب'},
        {name: translate('romantic'), key: 'romantic', arKey: 'رومانسى'},
        {name: translate('myth'), key: 'myth', arKey: 'أساطير'},
        {name: translate('scienceFiction'), key: 'scienceFiction', arKey: 'خيال علمى'},
        {name: translate('thrill'), key: 'thrill', arKey: 'تشويق'}
    ]
    
    const otherOptions = [
        {name: translate('onF'), key: 'onF', type:'checkbox'}
    ]

    let sections = [
        {title: translate('sortBy'), optionsList: sortOptions, key: 'sort', default:'-created', name: 'sort'},
        {title: translate('filterCat'), optionsList: catOptions, key: 'cat', name: 'cat', default: ''},
        {title: translate('filterSubCat'), optionsList: subCatOptions, key: 'subCat', name: 'cat'},
    ]

    if (user && !author) sections = [...sections, 
        {title: translate('other'), optionsList: otherOptions, name: 'follow', key: 'other'}
    ]

    const handleSubmit = e => {
        e.preventDefault();
        if (!search) return;
        changeConfig('search', search);
    }

    const handleConfigChange = (target, sectionKey, optionKey, optionKeyAr=null) => {
        if (optionKey === 'onF') changeConfig('onF', target.checked ? user.pk : null);
        else changeConfig(sectionKey, optionKey, optionKeyAr);
    }

    const handleSearchChange = e => {
        let value = e.target.value;
        if (value === '') changeConfig('search', '');
        setSearch(value)
    }

    return (
        <form className='config' onSubmit={handleSubmit}>
            <div className='config-cont d-flex align-items-center search-container'>
                <input dir={lang === 'ar' ? 'rtl' : 'ltr'} className='form-control' name='search' id='search' type='search' placeholder={translate('search')} onChange={handleSearchChange}/>
                <button type='submit'><i className='fas fa-search' /></button>
            </div>
            {
                sections.map(section => (
                    <div className='config-cont' key={section.key}>
                        <h4>{section.title}</h4>
                        <div className='options-cont' dir='auto'>
                            {
                                section.optionsList.map(option => (
                                    <div className='form-check option' key={option.key}>
                                        <input type={option.type || 'radio'} className='form-check-input' name={section.name} onChange={e => handleConfigChange(e.target, section.key, option.key, option.arKey)} defaultChecked={option.key === section.default}/>
                                        <label className='form-check-label'>{option.name}</label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </form>
    )
}

export default Config
