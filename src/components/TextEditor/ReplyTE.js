import React, {useRef, useState, useEffect} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import {endpoint} from '../../API';
import FetchPreloader from '../FetchPreloader/FetchPreloader';

function ReplyTE({onEditorChange, getEditor, initialValue='', lang}) {

    const [initializing, setInitializing] = useState(true);
    const [error, setError] = useState(null);

    const apiKey = '4y4b286jw86hk72olwztvdlruvduz3pvoxq3p3n59qdpb3ju'

    const editor = useRef(null);

    useEffect(() => {
        if (editor.current && editor.current.getBody()) {
            editor.current.getBody().dir = lang === 'ar' ? 'rtl' : 'ltr';
        }
    }, [lang])

    //For future use
    // const uploadHandler = (blob, success, failure, progress) => {
    //     const file = blob.blob();
    //     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
    //     if (allowedTypes.indexOf(file.type) === -1) {
    //         failure('Only JPG and PNG images are allowed!');
    //         return;
    //     }
    //     if (file.size / 1024 / 1024 > 2) {
    //         failure('Only files up to 2MB are allowed!');
    //         return;
    //     }
         
    //     const xhr = new XMLHttpRequest();
    //     xhr.open('POST', `${endpoint}/stories/upload`);
    //     xhr.setRequestHeader('Authorization', `Token ${authToken}`);
    //     const data = new FormData();
    //     data.append('file', file);
    //     xhr.onload = () => {
    //         if (xhr.status === 200) {
    //             success(JSON.parse(xhr.response).location);
    //         }
    //         failure("Couldn't upload this image");
    //     }
    //     xhr.onerror = () => failure("Couldn't upload this image");
    //     xhr.upload.onprogress = e => progress(Math.floor((e.loaded / e.total)*100));
    //     xhr.send(data);
    // }

    const setEditor = instance => {
        instance.on('PluginLoadError', () => setError("TinyMCE editor didn't load properly, Please try reloading the page!"));
        instance.on('SkinLoadError', () => setError("TinyMCE editor didn't load properly, Please try reloading the page!"));
        editor.current = instance;
        getEditor.current = instance;
        setInitializing(false)
    }


    return (
        <React.Fragment>
            {
                !error &&
                    <Editor
                        apiKey={apiKey}
                        init={{
                            resize: false,
                            height: 200,
                            mobile: {
                                toolbar_mode: 'floating'
                            },
                            directionality: lang === 'ar' ? 'rtl' : 'ltr',
                            plugins: 'emoticons charmap',
                            menubar: false,
                            toolbar: 'undo redo | emoticons charmap | alignleft aligncenter alignright aligntjustify',
                            setup: setEditor,
                            // images_upload_handler: uploadHandler,
                        }}
                        onEditorChange={onEditorChange}
                        initialValue={initialValue}
                    />
            }
            {(initializing || error) && <FetchPreloader minHeight='200px' error={error}/>}
        </React.Fragment>
    )
}

export default ReplyTE
