'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';


export default function DiaryInputFormat(props) {  
  const Editor = dynamic(() => import('../../common/Editor'), { ssr: false });

  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  
  const [editorLoaded, setEditorLoaded] = useState(false);

  const resultView = useRef(null);
  
  const onClick = (str) => {
    if (resultView.current) {
      resultView.current.innerHTML = `<h2>html결과 view입니다</h2>${str}`;
    }
  };

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
              date={props.date}
            />
          :
          <Editor
            name="description"
            onClick={onClick}
            editorLoaded={editorLoaded}
            date={props.date}
          />
        }
      </div>
      <div ref={resultView} />
    </>
  );
}