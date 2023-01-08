'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';


export default function DiaryInputFormat(props) {  
  const Editor = dynamic(() => import('../../common/Editor'), { ssr: false });
  const [editorLoaded, setEditorLoaded] = useState(false);
  const resultView = useRef(null);
  
  const onClick = (str) => {
    if (resultView.current) {
      resultView.current.innerHTML = `<h2>html결과 view입니다</h2>${str}`;
    }
  };
  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  return (
    <>
      <div>
        { 
          props.Contents
          ? 
            <Editor
              name="description"
              onClick={onClick}
              editorLoaded={editorLoaded}
              value={props.Contents}
            />
          :
          <Editor
            name="description"
            onClick={onClick}
            editorLoaded={editorLoaded}
          />
        }
      </div>
      <div ref={resultView} />
    </>
  );
}