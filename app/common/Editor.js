import React, { useState, Fragment, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { Dialog, Transition } from '@headlessui/react';
import { ArrowPathIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import Spinner from '../../public/svgs/spinner.svg'

function Editor({ onClick, editorLoaded, name, value, date }) {

    let [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

    let [keywords, setKeywords] = useState([]);
    let [emotion, setEmotion] = useState("");

    // 작성한 일기 내용
    const [text, setText] = useState(value);

    // unsplash API
    // thumbnail 저장 변수들
    let [regularThumbnailLink, setRegularThumbnailLink] = useState("");
    let [smallThumbnailLink, setSmallThumbnailLink] = useState("");
    let [thumbnailId, setThumbnailId] = useState("imgId");
    // 이미지 출처 저장 변수들
    let [userProfileLink, setUserProfileLink] = useState("");
    let [userName, setUserName] = useState("");
    // unsplash API access key
    const Access_Key = process.env.NEXT_PUBLIC_UNSPLASH_ACCESSKEY; 
  
    // async로 인해 setKeywords가 getThumbnail보다 늦게 실행되는 현상 있음 => useEffect 사용하여 keywords 변경되면 getThumbnail 실행
    useEffect(() => {
        getThumbnail();
    }, [keywords])

    const router = useRouter();

    function closeSaveModal() { setIsSaveModalOpen(false) }
    function openSaveModal() { setIsSaveModalOpen(true) }

    // 작성한 일기 내용 분석하여 키워드 및 감정 가져오는 함수
    function analyzeDiary() {

        // TODO 키워드 및 감정 분석 API 호출 추가
        setKeywords(["apple", "orange", "kiwi", "grape"]);
        setEmotion("Sad")
    }

    const getThumbnail = async () => {
        // keywords 에 하나 이상의 keyword 있을 경우에 thumbnail 가져오기
        if(keywords.length != 0)
        {
            // keyword + 감정 목록 중 1개의 단어를 랜덤으로 골라 썸네일 생성
            let randNum = Math.floor(Math.random() * (keywords.length + 1));
            let randKeywordList=[]
            randKeywordList.push(...keywords)
            randKeywordList.push(emotion)
            console.log("Find image with keyword "+randKeywordList[randNum])

            // thumbnail 가져오는 부분 - token당 API 호출 횟수 정해져 있으니 개발시 아래 API 호출 부분과 setState 부분들 주석처리 해서 진행
            let res = await fetch(`https://api.unsplash.com/photos/random?query=${randKeywordList[randNum]}&client_id=${Access_Key}`);
            
            // 키워드 랜덤으로 돌렸을 때 오류나면 emotion으로 검색하도록
            if(res.status != 200) {
                res = await fetch(`https://api.unsplash.com/photos/random?query=${emotion}&client_id=${Access_Key}`);
            }
            let jsonData = await res.json();
            setRegularThumbnailLink(jsonData.urls.regular);
            setSmallThumbnailLink(jsonData.urls.small);
            setUserProfileLink(jsonData.user.links.html);
            setUserName(jsonData.user.username);
            setThumbnailId(jsonData.id);
        }
    };

    // 일기 내용 저장 함수
    function saveDiary() {

        let data = new Object();

        // date : 날짜
        // 일기 수정의 경우 YYYY. MM. DD의 형식으로 날짜 전달
        if(date.includes('.'))
        {
            date = date.replace(/\./g, '');
            date = date.replace(/ /g, '-');
        }
        // 일기 생성의 경우 YYYYMMDD의 형식으로 날짜 전달
        else {
            date = date.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
        }
        data.date = date;

        // 일기 내용
        data.content = text;

        // emotion : 감정
        data.emotion = emotion;

        // keywords
        data.keywords = keywords;

        // thumbnail에 이미지 url 넣기
        data.thumbnail = regularThumbnailLink;
        // 사용 X - thumbnail에 file object(blob) 넣기
        // let thumbnailFile = urlToObject(regularThumbnailLink);
        // data.thumbnail = thumbnailFile;
        
        // TODO 일기 저장 API 호출 추가
        
    };

    // // 사용 X - 이미지 url => File Object 변환 함수
    // const urlToObject= async(imgUrl)=> {
    //     const response = await fetch(imgUrl);
    //     // here image is url/location of image
    //     const blob = await response.blob();
    //     const file = new File([blob], thumbnailId, {type: blob.type});
    //     console.log(file)
    //     return file;
    // }

    return (
        <>
            <div className="mx-5 my-3 outline outline-1 outline-zinc-200">
            {editorLoaded ? (
                <CKEditor
                    className="overflow-clip"
                    type=""
                    name={name}
                    editor={ClassicEditor}
                    data={value}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setText(data);
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
            
            <div className='flex justify-center w-full mb-2'>
                <button className="inline-flex justify-center px-3 py-2 mr-2 text-sm font-medium text-red-700 duration-200 bg-red-200 border border-transparent rounded-md mt-7 hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2" onClick={() => { analyzeDiary(); openSaveModal(); }}>저장하기</button>
                <button className="inline-flex justify-center px-3 py-2 ml-2 text-sm font-medium duration-200 border border-transparent rounded-md text-zinc-700 bg-zinc-200 mt-7 hover:bg-zinc-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2" onClick={() => router.push('/diary/list/grid')}>취소하기</button>
            </div>
            
            {/* 저장하기 Modal */}
            <Transition className="z-50 overflow-auto" appear show={isSaveModalOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeSaveModal}>
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <div className="fixed inset-0 bg-black bg-opacity-50" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-full p-4 text-center">
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                    >
                    <Dialog.Panel className="z-50 w-full max-w-xl p-6 pt-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl lg:px-10 lg:max-w-2xl rounded-2xl">
                        
                        <div className='flex justify-end mt-4'>
                            <XMarkIcon
                                className="w-6 h-6 text-sm text-zinc-500 "
                                onClick={closeSaveModal}
                            />
                        </div>
                        
                        <Dialog.Title as="h3" className="mb-2 text-xl font-bold text-center text-zinc-900" >
                            일기 저장하기
                        </Dialog.Title>

                        {/* 날짜 */}
                        <div className="text-center text-zinc-600">{date.replace(/(\d{4})(\d{2})(\d{2})/g, '$1. $2. $3.')}</div>

                        {/* 감정 분석이 제대로 이루어져 keywords 값이 들어있는 상태에서만 키워드 및 썸네일 표시 */}
                        {
                            keywords
                            ?
                            <div>
                                {/* keywords */}
                                <div className='px-3 my-2 sm:mt-5 '>
                                    <p className='pb-2 pl-2'>💡 키워드</p>
                                    <div className="flex flex-wrap my-2">
                                        {keywords.map((keyword) => (
                                            <div key={keyword} className="px-2 py-1 mb-3 mr-2 font-medium sm:px-3 sm:text-base w-fit text-zinc-500 bg-zinc-200 rounded-3xl dark:bg-zinc-200 dark:text-zinc-800 ">
                                                #{keyword}
                                            </div>
                                        ))}
                                        
                                    </div>

                                    {/* thumbnail */}
                                    <p className='pb-2 pl-2'>📷 자동 생성 썸네일</p>
                                    <div className="w-full text-center aspect-video">
                                        <div className='w-full h-full bg-zinc-400'>
                                            <div className="flex flex-col justify-center h-full text-center justify-items-center">
                                                    {
                                                        regularThumbnailLink != ""
                                                        ?
                                                        <div className="relative top-0 flex items-start w-full h-full group">
                                                            <img className='object-cover w-full h-full' src={regularThumbnailLink} />
                                                            <div onClick={getThumbnail} className='absolute top-0 flex items-center justify-center w-full h-full bg-black opacity-0 hover:opacity-50'>
                                                                <div className='relative flex items-center'>
                                                                    <ArrowPathIcon className='hidden text-white w-7 h-7 group-hover:block'/> <p className='ml-3 text-white'>다른 이미지 가져오기</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className='relative flex items-center justify-center'>
                                                            <Spinner className="w-12 sm:w-24"/>
                                                            <div className='text-sm text-white sm:text-lg'>썸네일을 생성하고 있습니다</div>
                                                        </div>
                                                    }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 이미지에 대한 출처 표기 부분 */}
                                {
                                    userProfileLink != ""
                                    ?
                                    <p className='text-xs text-center text-zinc-400'>
                                        Photo by <a href={`${userProfileLink}`} target="_blank" className='underline'> {userName}</a> on <a href="https://unsplash.com/ko" target="_blank" className='underline'> Unsplash</a>
                                    </p>
                                    :
                                    <></>
                                }
                                {/* 작성한 내용 미리보기 */}
                                <div className='px-5 py-3 mx-2 my-3 overflow-y-scroll text-sm border border-red-100 max-h-36 min-h-16 rounded-xl' dangerouslySetInnerHTML={{__html: text}}></div>
                            </div>
                            :
                            <></>
                        }

                        <div className='flex justify-center w-full mt-6 mb-2'>
                            {/* 썸네일 제대로 생성될 경우에만 저장하기 버튼 활성화 */}
                            {
                                regularThumbnailLink != ""
                                ?
                                <button className="inline-flex justify-center px-3 py-2 mr-2 text-sm font-medium text-red-700 duration-200 bg-red-200 border border-transparent rounded-md hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 " onClick={() => saveDiary()}>저장하기</button>
                                :
                                <></>
                            }
                            <button className="inline-flex justify-center px-3 py-2 ml-2 text-sm font-medium duration-200 border border-transparent rounded-md text-zinc-700 bg-zinc-200 hover:bg-zinc-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2" onClick={() => closeSaveModal()}>돌아가기</button>
                        </div>
                    </Dialog.Panel>
                    </Transition.Child>
                </div>
                </div>
            </Dialog>
            </Transition>
        </>
    );
}

export default Editor;