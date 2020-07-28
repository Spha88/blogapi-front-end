import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const EditorComponent = ({ handleChange, initialValue }) => {
    return (
        <Editor initialValue={initialValue}
            apiKey="ai699snc143x5hzvy14avs6c55797aecmxofnkhl0pg6sc5f"
            init={{
                height: 500,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help'
                ],
                toolbar: 'undo redo | formatselect | bold italic backcolor |alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
            }}
            onEditorChange={handleChange}
        />
    )
}

export default EditorComponent;
