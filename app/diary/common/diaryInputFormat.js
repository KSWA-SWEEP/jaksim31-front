'use client';

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { useDiaryQuery } from '../../hooks/queries/useDiaryQuery';
import Loading from './loading';

export default function DiaryInputFormat(props) {  
  
  const Editor = dynamic(() => import('./Editor'), { ssr: false });

  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  
  
  const { data, isLoading, isFetching, isFetched, isError } = useDiaryQuery(props.diaryId, props.diary)

  const [editorLoaded, setEditorLoaded] = useState(false);

  if ( isLoading || isFetching || ((props.diaryId != undefined)&&(data == undefined)) ) return <Loading className="flex justify-center w-full"/>
 
  return (
    <>
      <div>
        { 
          (props.diaryId != undefined)
          ? 
            <Editor
              name="description"
              editorLoaded={editorLoaded}
              value={data.content.toString()}
              date={data.diaryDate}
              thumbnail={data.thumbnail}
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