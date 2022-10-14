import React from 'react';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import {translate} from '../../Js/methods';


function Qm({content, title, hyperlink, lang}) {

    const translateWrapper = text => translate(text, lang);

    const getPopover = (props) => {
        return (
            <Popover>
                <Popover.Title dir='auto'>{translateWrapper(props.title)}</Popover.Title>
                <Popover.Content dir='auto'>
                    {translateWrapper(props.content)}<br />
                    {props.hyperlink && <a target='_blank' href={props.hyperlink}>{props.hyperlink}</a>}
                </Popover.Content>
            </Popover>
        )
    }

    return (
        <OverlayTrigger trigger='click' placement='auto-start' overlay={getPopover({content, hyperlink, title})} dir>
            <span className='qm'>{translateWrapper('?')}</span>
        </OverlayTrigger>
    )
}

export default Qm
