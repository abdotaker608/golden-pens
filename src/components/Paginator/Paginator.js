import React, {useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';

function Paginator({total, lang, handleChange, current}) {

    const [small, setSmall] = useState(window.innerWidth < 576 ? true : false);

    const changeWidth = () => {
        let width = window.innerWidth;
        if (width >= 576) setSmall(false);
        else setSmall(true);
    }

    useEffect(() => {
        window.addEventListener('resize', changeWidth);

        return () => {
            window.removeEventListener('resize', changeWidth);
        }
    }, [])

    const getPrevLabel = () => {
        return (
            <span>
                <i className={`fas fa-chevron-${lang === 'ar' ? 'right' : 'left'}`} />
            </span>
        )
    }

    const getNextLabel = () => {
        return (
            <span>
                <i className={`fas fa-chevron-${lang === 'ar' ? 'left' : 'right'}`} />
            </span>
        )
    }

    return (
        <ReactPaginate
            key={lang}
            pageCount={total || 0}
            marginPagesDisplayed={2}
            pageRangeDisplayed={small ? 1 : 5}
            activeClassName='active page-item'
            activeLinkClassName='active page-link'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            containerClassName='pagination'
            disabledClassName='page-item disabled'
            nextClassName='page-item'
            nextLinkClassName='page-link'
            pageClassName='page-item'
            pageLinkClassName='page-link'
            previousClassName='page-item'
            previousLinkClassName='page-link'
            previousLabel={getPrevLabel()}
            nextLabel={getNextLabel()}
            onPageChange={handleChange}
        />
    )
}

export default Paginator
