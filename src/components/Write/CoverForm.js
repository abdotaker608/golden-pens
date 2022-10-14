import React, {useState} from 'react'
import {CSSTransition} from 'react-transition-group';
import {useDropzone} from 'react-dropzone';
import {validateImgs} from '../../Js/methods';

function CoverForm({translate, cover, setCover}) {

    const [errorMessage, setErrorMessage] = useState('');

    const uploadCover = file => {
        const reader = new FileReader();
        reader.onload = ev => setCover(ev.target.result);
        reader.onerror = () => setErrorMessage('wentWrong');
        reader.readAsDataURL(file);
    }

    const uploadFile = files => {
        const error = validateImgs(files);
        if (error) {
            setErrorMessage(error);
            return;
        }
        setErrorMessage('');
        uploadCover(files[0]);
    }

    const {getInputProps, getRootProps, isDragActive, inputRef} = useDropzone({onDrop: uploadFile});


    return (
        <div className='builder' {...getRootProps()} onClick={e => e.preventDefault()}>
            <input {...getInputProps()} accept='.jpg,.jpeg,.png' />
            <div className='img-main-container'>
                {errorMessage && <div className='text-center text-danger my-2 font-weight-bold'>{translate(errorMessage)}</div>}
                <div className='img-container' onClick={() => inputRef.current.click()}>
                    <CSSTransition in={isDragActive} timeout={250} classNames='fade' unmountOnExit>
                        <div className='dragging-preview'><span><i className='fas fa-arrow-circle-down' /></span></div>
                    </CSSTransition>
                    {
                        cover ?
                        <img src={cover} alt='Story Cover' />
                        :
                        <div className='img-placeholder'>
                            <div>
                                <h4>{translate('storyCover')}</h4>
                                <p>{translate('dropInstruct')}</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default CoverForm
