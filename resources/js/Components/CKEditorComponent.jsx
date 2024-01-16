import React, { useEffect, useState } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CKEditorComponent = ({ value, onChange }) => {
    const [editor, setEditor] = useState();

    useEffect(() => {
        if (editor) {
            editor.setData(value);
        }
    }, [value, editor]);

    return (
        <CKEditor
            editor={ClassicEditor}
            data={value}
            onInit={(editor) => {
                setEditor(editor);
            }}
            onChange={(event, editor) => {
                const data = editor.getData();
                onChange(data);
            }}
        />
    );
};

export default CKEditorComponent;
