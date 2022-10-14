import React, {useState} from 'react'

function Tag(props) {

    const [hovered, setHovered] = useState(0);

    const styles = {
        background: '#dfe6e0',
        borderRadius: '25px',
        width: 'fitContent',
        padding: '3px 10px',
        fontSize: '12px',
        maxWidth: '100px',
        overflow: 'hidden',
        position: 'relative',
        textOverflow: 'ellipsis',
        textTransform: 'capitalize'
    }

    const overlayStyle = {
        opacity: hovered,
        background: 'rgba(0, 0, 0, .6)',
        transition: '150ms ease-out',
        cursor: 'pointer',
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200,
        top: 0,
        left: 0,
        color: 'white',
    }

    return (
        <div className='tag' style={styles} title={props.children}>
            {props.children}
            <div style={overlayStyle} onClick={props.close ? () => props.close() : null} onMouseEnter={props.close ? () => setHovered(1) : null} onMouseLeave={props.close ? () => setHovered(0) : null}><span><i className='fas fa-times' /></span></div>
        </div>
    )
}

export default Tag
