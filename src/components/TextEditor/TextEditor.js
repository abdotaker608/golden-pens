import React, {useEffect, useRef, useState} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import {endpoint} from '../../API';
import FetchPreloader from '../FetchPreloader/FetchPreloader';

function TextEditor({onEditorChange, initialValue, authToken, displayValue='', lang}) {

    const [initializing, setInitializing] = useState(true);
    const [error, setError] = useState(null);

    const apiKey = '4y4b286jw86hk72olwztvdlruvduz3pvoxq3p3n59qdpb3ju'

    const blockPaste = (plugin, content) => {
        content.content = '';
        return content;
    }

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
        setInitializing(false);
    }


    return (
        <React.Fragment>
            {
                !error &&
                    <Editor
                        apiKey={apiKey}
                        init={{
                            resize: 'y',
                            height: 500,
                            mobile: {
                                toolbar_mode: 'floating'
                            },
                            placeholder: initialValue,
                            directionality: lang === 'ar' ? 'rtl' : 'ltr',
                            plugins: 'paste emoticons fullscreen preview wordcount charmap',
                            paste_preprocess: blockPaste,
                            menubar: false,
                            toolbar: 'undo redo | formatselect | emoticons charmap | alignleft aligncenter alignright aligntjustify | preview fullscreen',
                            setup: setEditor,
                            // images_upload_handler: uploadHandler,
                            toolbar_location: 'bottom',
                        }}
                        onEditorChange={onEditorChange}
                        initialValue={displayValue}
                    />
            }
            {(initializing || error) && <FetchPreloader error={error}/>}
        </React.Fragment>
    )
}

export default TextEditor
