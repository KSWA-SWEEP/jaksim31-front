import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';

function Editor({ onClick, editorLoaded, name, value }) {
  const [test, setTest] = useState(value);

  return (
    <>
        <div className="mx-5 my-3 outline outline-1 outline-slate-200">
        {editorLoaded ? (
            <CKEditor
                className="overflow-clip"
                type=""
                name={name}
                editor={ClassicEditor}
                data={value}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setTest(data);
                }}
                config={{
                    mediaEmbed: {
                    previewsInData: true,
                    },
                }}
            />
        ) : (
            <div>Editor loading</div>
        )}
        </div>
        <div className='flex justify-center w-full'>
            <button className="py-1 m-2 btn btn-primary" onClick={() => onClick(test)}>내용 확인</button>
        </div>
    </>
  );
}

export default Editor;