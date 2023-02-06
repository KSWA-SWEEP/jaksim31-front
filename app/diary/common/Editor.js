import React, { useState, Fragment, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '../../../ckeditor5';
import { Dialog, Transition } from '@headlessui/react';
import { ArrowPathIcon, XMarkIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { useRouter, usePathname } from 'next/navigation';
import Spinner from '../../../public/svgs/spinner.svg'
import { useQueryClient } from 'react-query';
import { useDiarySave } from '../../hooks/mutations/useDiarySave';
import moment from 'moment';
import { getCookie } from "cookies-next";
import { uploadImg } from '../../api/uploadImg';
import Image from 'next/image';
import { analyzeDiary } from '../../api/analyzeDiary';

function Editor({ editorLoaded, name, value, date, diaryId, thumbnail }) {
    
    let userId = getCookie("userId");

    let [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const [isThumbnailLoading, setIsThumbnailLoading] = useState(false);

    let [englishKeywords, setEnglishKeywords] = useState([]);
    let [koreanKeywords, setKoreankeywords] = useState([]);
    let [englishEmotion, setEnglishEmotion] = useState("");
    let [koreanEmotion, setKoreanEmotion] = useState("");
    
    // 일기 생성/수정 구분을 위해 pathname 확인할 변수 선언
    let pathname = usePathname();

    // 작성한 일기 내용
    const [text, setText] = useState((value != undefined ? value : "일기를 작성해주세요😉"));

    // unsplash API
    // thumbnail 저장 변수들
    let [regularThumbnailLink, setRegularThumbnailLink] = useState((thumbnail != undefined) ? thumbnail : "");
    let [smallThumbnailLink, setSmallThumbnailLink] = useState("");
    let [thumbnailDirectory, setThumbnailDirectory] = useState((thumbnail != undefined) ? thumbnail : "");

    // 이미지 출처 저장 변수들
    let [userProfileLink, setUserProfileLink] = useState("userProfile");
    let [userName, setUserName] = useState("");

    // unsplash API access key
    const Access_Key = process.env.NEXT_PUBLIC_UNSPLASH_ACCESSKEY;
    // thumbnail 저장 안내 메세지
    const [saveMessage, setSaveMessage] = useState(((thumbnail != undefined) ? '저장되었던 썸네일을 가져왔어요!😎' : '썸네일을 선택해주세요😲'));
    const [isSaved, setIsSaved] = useState(((thumbnail != undefined) ? true : false));
  
    // async로 인해 setEnglishKeywords가 getThumbnail보다 늦게 실행되는 현상 있음 => useEffect 사용하여 englishKeywords 변경되면 getThumbnail 실행
    useEffect(() => {
        // 일기 수정의 경우 모달 열자 마자 자동적으로 썸네일 가져오지 않도록 함
        if(thumbnailDirectory == "") {
            getThumbnail();
        }
    }, [englishKeywords])



    const router = useRouter();

    function closeSaveModal() { setIsSaveModalOpen(false) }
    function openSaveModal() {        
        // 일기 수정의 경우 기존의 thumbnail이 초기값으로 설정되어 변경하지 않고도 저장할 수 있도록 함
        setIsSaved((thumbnail != undefined) ? true : false)
        setSaveMessage((thumbnail != undefined) ? '저장되었던 썸네일을 가져왔어요!😎' : '썸네일을 선택해주세요😲');
        setRegularThumbnailLink((thumbnail != undefined) ? thumbnail : "");
        setThumbnailDirectory((thumbnail != undefined) ? thumbnail : "");
        setIsSaveModalOpen(true);
    }

    function openSuccessModal() { setIsSuccessModalOpen(true) }
    function closeSuccessModal() { 
        setIsSuccessModalOpen(false);               
        queryClient.invalidateQueries(["DIARY_LIST"]);
        queryClient.invalidateQueries(["USER_INFO"]);
        queryClient.invalidateQueries(["EMOTION_COUNT"]);
        router.replace('diary/list/grid');
    }
    

    // react-query query client (mutation에서 사용하기 위함)
    const queryClient = useQueryClient();

    // 일기 수정/생성을 구분하기 위한 saveType 설정
    let saveType = ""
    if(pathname.includes("create")) {
        saveType = "create"
    } else {
        saveType = "modify"
    }
    
    // diary data 저장을 위한 useMutation
    const { error, mutate, status } = useDiarySave(queryClient, saveType, diaryId)

    useEffect(() => {
        if(status == "success"){
            openSuccessModal()
        }
    }, [status])

    // 작성한 일기 내용 분석하여 키워드 및 감정 가져오는 함수
    async function analyze() {

        let data = new Object();

        data.sentences = [text.replace(/<[^>]*>/g, '')];
        
        const res = await analyzeDiary(data);
        
        if (res == undefined){
            // Error handling - 분석 내용이 비어있을 경우 감정없음, EXECPTION_NO_KEYWORD으로 설정 
            setEnglishKeywords(["EXECPTION_NO_KEYWORD"]);
            setKoreankeywords(["EXECPTION_NO_KEYWORD"]);
            setEnglishEmotion("no emotion");
            setKoreanEmotion("감정없음");
        } else  {
            // 분석 내용으로부터 키워드, 감정 설정
            // Error handling - 길이가 짧거나 다른 이유로 키워드 및 감정 추출이 제대로 이루어지지 않을 경우 감정없음, EXECPTION_NO_KEYWORD으로 설정 
            setEnglishKeywords((res.hasOwnProperty('englishKeywords')) ? res.englishKeywords : ["EXECPTION_NO_KEYWORD"]);
            setKoreankeywords((res.hasOwnProperty('koreanKeywords')) ? res.koreanKeywords.slice(0, 3) : ["EXECPTION_NO_KEYWORD"]);
            setEnglishEmotion((res.hasOwnProperty('englishEmotion')) ? res.englishEmotion : "no emotion");
            setKoreanEmotion((res.hasOwnProperty('koreanEmotion')) ? res.koreanEmotion : "감정없음");
        }
    }

    const getThumbnail = async () => {
        
        setThumbnailDirectory("");
        setIsSaved(false);
        setSaveMessage('썸네일을 선택해주세요😲');
        setRegularThumbnailLink("");

        // englishKeywords 에 하나 이상의 keyword 있을 경우에 thumbnail 가져오기
        if(((englishKeywords != undefined)||(englishKeywords != ""))&&(englishKeywords.length > 0))
        {
            // keyword + 감정 목록 중 1개의 단어를 랜덤으로 골라 썸네일 생성
            let randNum = Math.floor(Math.random() * (englishKeywords.length + 1));
            let randKeywordList=[]
            randKeywordList.push(...englishKeywords)
            randKeywordList.push(englishEmotion)

            // space를 _로 대체 (검색시 url에 사용하기 위함)
            randKeywordList = randKeywordList.map(word => word.replace(' ', '%20'));

            // thumbnail 가져오는 부분
            let res = await fetch(`https://api.unsplash.com/photos/random?query=${randKeywordList[randNum]}&client_id=${Access_Key}`);

            // 키워드 랜덤으로 돌렸을 때 오류나면 englishEmotion으로 검색하도록
            if(res.status != 200) {
                res = await fetch(`https://api.unsplash.com/photos/random?query=${englishEmotion}&client_id=${Access_Key}`);
                
                // 영어로도 없으면 koreanEmotion 검색
                if(res.status != 200) {
                    res = await fetch(`https://api.unsplash.com/photos/random?query=${koreanEmotion}&client_id=${Access_Key}`);
                     
                    // 다 안되면 diary라는 단어 넣어서 이미지 얻기
                    if(res.status != 200) {
                        res = await fetch(`https://api.unsplash.com/photos/random?query=diary&client_id=${Access_Key}`);                       
                    }
                }
            }

            let jsonData = await res.json();
            setRegularThumbnailLink(jsonData.urls.regular);
            setSmallThumbnailLink(jsonData.urls.small);
            setUserProfileLink(jsonData.user.links.html+"?utm_source=jaksim31&utm_medium=referral");
            setUserName(jsonData.user.username);

        }
        // 키워드 추출이 안되었을 경우 
        else {
            // diary라는 단어 넣어서 이미지 얻기
            let res = await fetch(`https://api.unsplash.com/photos/random?query=diary&client_id=${Access_Key}`);             

            let jsonData = await res.json();
            setRegularThumbnailLink(jsonData.urls.regular);
            setSmallThumbnailLink(jsonData.urls.small);
            setUserProfileLink(jsonData.user.links.html+"?utm_source=jaksim31&utm_medium=referral");
            setUserName(jsonData.user.username);
        }
    };

    function addEmoji() {
        let val = "";
        switch (koreanEmotion){
            case "싫음": 
                setKoreanEmotion("😕 싫음");
                val = "😕 싫음";
                break; 
            case "지루함":
                setKoreanEmotion("😑 지루함");
                val = "😑 지루함";
                break;
            case "창피함":
                setKoreanEmotion("🤢 창피함");
                val = "🤢 창피함";
                break;
            case "좋음":
                setKoreanEmotion("🥰 좋음");
                val = "🥰 좋음";
                break; 
            case "감정없음":
                setKoreanEmotion("😶 감정없음");
                val = "😶 감정없음";
                break; 
            case "놀람":
                setKoreanEmotion("😯 놀람");
                val = "😯 놀람";
                break; 
            case "두려움":
                setKoreanEmotion("😬 두려움");
                val = "😬 두려움";
                break; 
            case "슬픔":
                setKoreanEmotion("😭 슬픔");
                val = "😭 슬픔";
                break; 
            case "불확실":
                setKoreanEmotion("🤔 불확실");
                val = "🤔 불확실";
                break;
            default:
                val = "😶 감정없음"
                break;        
        }
        return val;
    }

    // 일기 내용 저장 함수
    function saveDiary() {

        // 저장할 일기 데이터를 담을 Object
        let data = new Object();
        
        // userId
        data.userId = userId;

        // 일기 날짜
        data.date = date.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');

        // 일기 내용
        data.content = text;

        // emotion : 감정
        // 감정 저장 전에 emoji 붙이기
        let emotionWithEmoij = addEmoji();
        data.emotion = emotionWithEmoij;

        // keywords
        data.keywords = koreanKeywords;

        // thumbnail에 이미지 url (object storage) 넣기
        data.thumbnail = thumbnailDirectory;
        
        // 일기 생성/수정에 따른 mutation 실행
        mutate({data})
    };

    // 이미지 url => File blob 변환 함수
    const urlToBlob= async(imgUrl)=> {
        const response = await fetch(imgUrl);
        const blob = await response.blob();
        return blob;
    }

    // kic object storage에 썸네일 이미지 업로드
    async function saveThumbnail() {
        
        // regularThumbnailLink을 blob으로 변환
        let file = await urlToBlob(regularThumbnailLink)
        setThumbnailDirectory("");
        setIsThumbnailLoading(true);

        // 이미지 업로드 API 호출
        const fileUpload = await uploadImg(file, date.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3'))

        // 저장 실패 시
        if (fileUpload.status != 201) {
            setIsThumbnailLoading(false);
            alert("썸네일 저장에 실패하였습니다.\n잠시 후 다시 시도해주세요😭");
            closeSaveModal();
        } 
        // 저장 성공 시
        else {
            setIsThumbnailLoading(false);
            
            // 이미지 저장 후 message 변경
            setSaveMessage("썸네일이 생성되었습니다. \"저장하기\" 버튼을 눌러 일기 작성을 마무리하세요🤗");
            setIsSaved(true);

            // Thumbnail Directory 설정
            setThumbnailDirectory(process.env.NEXT_PUBLIC_KAKAO_FILE_VIEW_URL+"/"+userId+"/"+date.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')+"_r_640x0_100_0_0.jpeg");
        }
    }

    return (
        <>
            <div className="mx-5 my-3 outline outline-1 outline-zinc-200" data-testid="editorParent">
            {editorLoaded ? (
                <CKEditor
                    className="overflow-clip"
                    type=""
                    name={name}
                    editor={ClassicEditor}
                    data={(value != undefined ? value : "일기를 작성해주세요😉")}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setText(data);
                    }}
                    config={{
                        mediaEmbed: {
                        previewsInData: true,
                        },
                    }}
                    data-testid="editor"
                />
            ) : (        
                <div className='relative flex items-center justify-center'>
                    <Spinner className="w-12 sm:w-24"/>
                    <div className='text-sm text-white sm:text-lg'>에디터를 로딩하고 있습니다</div>
                </div>
            )}
            </div>
            
            <div className='flex justify-center w-full mb-2'>
                <button className={"inline-flex justify-center px-3 py-2 mr-2 text-sm font-medium border border-transparent rounded-md mt-7" +
                                    ((text == undefined||text == "")
                                        ? " text-zinc-700 bg-zinc-200"
                                        : " text-red-700 duration-200 bg-red-200 hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                    )
                                }
                        disabled={((text == undefined)||(text == ""))}
                        onClick={() => { analyze(); openSaveModal(); }}
                        data-testid="saveDiaryButton">
                    저장하기
                </button>
                <button className="inline-flex justify-center px-3 py-2 ml-2 text-sm font-medium duration-200 border border-transparent rounded-md text-zinc-700 bg-zinc-200 mt-7 hover:bg-zinc-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2" onClick={() => router.back()}>취소하기</button>
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
                    <Dialog.Panel data-testid="saveDiaryModal" className="z-50 w-full max-w-xl p-6 pt-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl lg:px-10 lg:max-w-2xl rounded-2xl">
                        
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
                        <div className="text-center text-zinc-600">{moment(date).format("YYYY. MM. DD.")}</div>

                        {/* 감정 분석이 제대로 이루어져 englishKeywords 값이 들어있는 상태에서만 키워드 및 썸네일 표시 */}
                        {
                            (englishKeywords != [])
                            ?
                            <div>
                                <div className='px-3 my-2 sm:mt-5 '>
                                    {/* keywords */}
                                    <div className='grid grid-cols-3 mb-2'>
                                        <div className='col-span-3 sm:col-span-2'>
                                            <p className='pb-2 pl-2'>💡 키워드</p>
                                            <div className="flex flex-wrap my-2">
                                                {koreanKeywords.map((keyword) => (
                                                    (keyword == "EXECPTION_NO_KEYWORD")
                                                    ?
                                                    <div key={keyword} className='relative flex items-center mb-3'>
                                                        {/* 분석된 키워드가 없을 경우 */}
                                                        <div className="ml-2 font-medium sm:text-sm w-fit text-zinc-500 dark:bg-zinc-200 dark:text-zinc-800 ">
                                                            분석된 키워드가 없습니다
                                                        </div>
                                                        {/* 키워드 관련 info tooltip */}
                                                        <div className='tooltip tooltip-bottom' data-tip="일기가 너무 짧으면 키워드 분석이 어려울 수 있습니다😥">
                                                            <QuestionMarkCircleIcon className='w-4 h-4 ml-1 duration-200 text-zinc-500 hover:text-zinc-700'/>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div key={keyword} className="px-2 py-1 mb-3 mr-2 font-medium sm:px-3 sm:text-sm w-fit text-zinc-500 bg-zinc-200 rounded-3xl dark:bg-zinc-200 dark:text-zinc-800 ">
                                                        #{keyword}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className='col-span-3 sm:col-span-1'>
                                            <p className='pb-2 pl-2'>👀 감정</p>
                                            <div className="flex ml-4 text-lg font-bold">
                                                {koreanEmotion}
                                            </div>
                                        </div>
                                    </div>

                                    {/* thumbnail */}
                                    <div className='flex items-stretch'>
                                        <p className='pb-2 pl-2'>📷 자동 생성 썸네일</p>
                                        <p className={`py-1 pl-3 float:right message ${isSaved ? 'success text-xs text-blue-500' : 'error text-xs text-red-500'}`}>{saveMessage}</p>
                                    </div>
                                    <div className="w-full text-center aspect-video">
                                        <div className='w-full h-full bg-zinc-400'>
                                            <div className="flex flex-col justify-center h-full text-center justify-items-center">
                                                    {
                                                        regularThumbnailLink != ""
                                                        ?
                                                        <div className="relative top-0 flex items-start w-full h-full group">
                                                            <Image data-testid="thumbnailImage" className='object-cover w-full h-full' sizes='mas-width: 60vw, max-height: 50vh' fill placeholder={blur} alt="thumbnail" src={regularThumbnailLink} />
                                                            {/*thumbnail 저장 시 onClick 비활성화 및 Hover effect 제거*/}
                                                            {
                                                                (!isSaved || (isSaved && ((thumbnail != undefined) || (thumbnail != ""))))
                                                                ?
                                                                <div data-testid="getNewThumbnailButton" onClick={getThumbnail} className='absolute top-0 flex items-center justify-center w-full h-full bg-black opacity-0 hover:opacity-50'>
                                                                    <div className='relative flex items-center'>
                                                                        <ArrowPathIcon className='hidden text-white w-7 h-7 group-hover:block'/> <p className='ml-3 text-white'>다른 이미지 가져오기</p>
                                                                    </div>
                                                                </div> 
                                                                :
                                                                <div className='absolute top-0 flex items-center justify-center w-full h-full bg-black opacity-0'>
                                                                    <div className='relative flex items-center'>
                                                                        <ArrowPathIcon className='hidden text-white w-7 h-7 group-hover:block'/>
                                                                    </div>
                                                                </div>
                                                            }

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
                                    regularThumbnailLink != ""
                                    ?
                                    <p className='text-xs text-center text-zinc-400'>
                                        Photo by <a href={`${userProfileLink}`} target="_blank" className='underline'> {userName}</a> on <a href="https://unsplash.com/ko?utm_source=jaksim31&utm_medium=referral" target="_blank" className='underline'> Unsplash</a>
                                    </p>
                                    :
                                    <></>
                                }
                                <div className='flex justify-center w-full mt-2 mb-2'>
                                    {/* 썸네일 저장 버튼 */}
                                    {
                                        regularThumbnailLink != ""
                                            ?
                                            <button className={"inline-flex justify-center px-3 py-2 mr-2 text-sm font-medium rounded-xl " + ( thumbnailDirectory == "" ? "btn-secondary rounded-md":("border border-transparent rounded-md "+(isThumbnailLoading ? "text-zinc-600 bg-zinc-400" : "text-sky-700 bg-sky-200")))}
                                                data-testid="uploadThumbnailButton" onClick={() => { if( !isSaved ){ setIsThumbnailLoading(true); saveThumbnail() } }}>
                                                {
                                                    isSaved
                                                    ?
                                                    <>
                                                        {
                                                            isThumbnailLoading
                                                            ?
                                                            <div className='relative flex items-center justify-center cursor-progress'><Spinner className="w-5 h-5"/>저장중입니다</div>
                                                            :
                                                            <div className='cursor-not-allowed'>썸네일 생성 완료👍</div>
                                                        }
                                                    </>
                                                    :
                                                    <>이 사진으로 결정✅</>
                                                }
                                            </button>
                                            :
                                            <></>
                                    }
                                </div>
                                {/* 작성한 내용 미리보기 */}
                                <div data-testid="diaryPreview" className='px-5 py-3 mx-2 my-3 overflow-y-scroll text-sm border border-red-100 max-h-36 min-h-16 rounded-xl' dangerouslySetInnerHTML={{__html: text}}></div>
                            </div>
                            :
                            <div className='relative flex items-center justify-center'>
                                <Spinner className="w-12 sm:w-24 text-zinc-600"/>
                                <div className='text-sm text-white sm:text-lg'>일기를 분석중입니다</div>
                            </div>
                        }

                        <div className='flex justify-center w-full mt-6 mb-2'>
                            {/* 썸네일 제대로 저장 되었을 경우에만 저장하기 버튼 활성화 */}
                            <button
                                className={"inline-flex w-full justify-center px-3 py-2 mr-2 text-sm font-medium "+ (thumbnailDirectory == ""
                                    ?"text-zinc-700 duration-200 bg-zinc-200 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2"
                                    :"text-red-700 duration-200 bg-red-200 border border-transparent rounded-md hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2")}
                                disabled={(thumbnailDirectory == "")}
                                onClick={() => {
                                    saveDiary();
                                    closeSaveModal();
                                }}
                                data-testid="uploadDiaryButton"
                                >
                                저장하기
                            </button>
                        </div>
                    </Dialog.Panel>
                    </Transition.Child>
                </div>
                </div>
            </Dialog>
            </Transition>
            

            <Transition appear show={isSuccessModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeSuccessModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                        <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl" data-testid="diarySaveSuccessModal">
                        <Dialog.Title
                            as="h3"
                            className="text-base font-extrabold leading-6 text-zinc-900"
                        >
                            일기 저장 성공
                        </Dialog.Title>
                        <div className="mt-2">
                            <p className="text-lg text-zinc-500">
                            일기가 성공적으로 저장되었습니다!
                            </p>
                        </div>

                        <div className="flex justify-center mt-4">
                            <button
                                type="button"
                                className="justify-center px-2 py-1.5 mx-2 text-base font-semibold text-green-700 duration-200 bg-green-200 border border-transparent rounded-md hover:bg-green-300 focus:outline-none "
                                onClick={closeSuccessModal}
                                data-testid="closeSaveDiarySuccessModalButton"
                                >
                                확인
                            </button>
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