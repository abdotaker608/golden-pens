import React from 'react'

function ProcessingButton(props) {

    const {processing} = props;

    return (
        <button type='submit' disabled={processing ? 1 : 0} className='processing' data-testid='processing-btn' onClick={props.onClick}>
            <span>{props.children}</span>
            <div className='spinner spinner-border'></div>
        </button>
    )
}

export default ProcessingButton
