'use client';

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';


export default function DiaryInputFormat(props) {  
  const Editor = dynamic(() => import('./Editor'), { ssr: false });

  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  
  const [editorLoaded, setEditorLoaded] = useState(false);

  return (
    <>
      <div>
        { 
          props.content
          ? 
            <Editor
              name="description"
              editorLoaded={editorLoaded}
              value={props.content}
              date={props.date}
              diaryId={props.diaryId}
            />
          :
          <Editor
            name="description"
            editorLoaded={editorLoaded}
            date={props.date}
          />
        }
      </div>
    </>
  );
}