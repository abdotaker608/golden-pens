import React, {useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {validateImgs} from '../../Js/methods';
import ProcessingButton from '../ProcessingButton/ProcessingButton';
import {endpoint} from '../../API';

function Media({media, closeMedia, setPicture, setCover, translate, user}) {

    const [error, setError] = useState('');
    const [picturePlaceholder, setPicturePlaceholder] = useState(null);
    const [coverPlaceholder, setCoverPlaceholder] = useState(null);
    const [uploading, setUploading] = useState(false);

    const updateMedia = file => {
        const reader = new FileReader();
        reader.onerror = () => setError('wentWrong');
        reader.onload = e => {
            const result = e.target.result;
            if (media === 'picture') setPicturePlaceholder(result);
            else setCoverPlaceholder(result);
        }
        reader.readAsDataURL(file)
    }

    const onDrop = files => {
        const error = validateImgs(files);
        if (error) setError(error);
        else updateMedia(files[0]);
    }

    const {isDragActive, getInputProps, getRootProps} = useDropzone({onDrop});

    const uploadMedia = async () => {
        setUploading(true);
        const toFetchMedia = media ==='picture' ? picturePlaceholder : coverPlaceholder;
        const results = await fetch(toFetchMedia);
        const blob = await results.blob();
        const type = toFetchMedia.split(';')[0].split('/')[1];
        const file = new File([blob], `${user.pk}_${media}.${type}`);
        const data = new FormData();
        data.append('user', user.pk);
        data.append(media, file);
        fetch(`${endpoint}/auth/profile/media`, {
            headers: {
                'Authorization': `Token ${user.token}`
            },
            method: 'POST',
            body: data
        })  
            .then(res => res.json())
            .then(data => {
                setUploading(false);
                if (data.success) {
                    media === 'picture' ? setPicture(picturePlaceholder) : setCover(coverPlaceholder);
                    closeMedia();
                }
            })
            .catch(() => {
                setUploading(false);
                setError('wentWrong');
            })
    }


    return (
        <div className='media'>
            <div className='media-container'>
                <div className='d-flex justify-content-end align-items-center text-secondary p-4'>
                    <span style={{cursor: 'pointer'}} onClick={closeMedia}><i className='fas fa-times' /></span>
                </div>
                {error && <p className='text-danger text-center font-weight-bold'>{translate(error)}</p>}
                <div className='op-container'>
                    {
                        picturePlaceholder || coverPlaceholder ?
                        <div className='preview'>
                            <img className={picturePlaceholder ? 'pic-prev' : 'cover-prev'} src={picturePlaceholder || coverPlaceholder}/>
                            <div className='btns-container mt-5 d-flex justify-content-center'>
                                <ProcessingButton processing={uploading} onClick={uploadMedia}>{translate('save')}</ProcessingButton>
                                <button className='cancel-btn' onClick={() => media === 'cover' ? setCoverPlaceholder(null) : setPicturePlaceholder(null)}>{translate('cancel')}</button>
                            </div>
                        </div>
                        :
                        <div className='placeholder' {...getRootProps()}>
                            <h2>{translate(isDragActive ? 'dropHere' : 'dropInstruct')}</h2>
                            <input {...getInputProps()} />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Media
