import LazyShow from "../../common/LazyShow";
import loginImage from "../../../public/images/tutorial/login.png"
import signUpImage from "../../../public/images/tutorial/signUp.png"
import drawerImage from "../../../public/images/tutorial/drawer.png"
import createImage from "../../../public/images/tutorial/create.png"

import Image from "next/image";

const examplePages = [
  {
    title: "로그인",
    src: loginImage,
    alt: "login",
    comment: "작심삼일 서비스는 일반 로그인과 Kakao 로그인 기능을 제공합니다. Kakao 로그인은 작심삼일 자체 서비스와 연동되어 있어, 최초 로그인 이후로는 자동 로그인으로 편리하게 접속하실 수 있습니다.",
    index: 1,
  },
  {
    title: "회원가입",
    src: signUpImage,
    alt: "signUp",
    comment: "회원가입은 이메일 기반으로 이루어집니다. 메일 인증을 통해 이메일을 보내는 계정의 소유자가 본인임을 확인하는 과정을 거칩니다.",
    index: 2,
  },
  {
    title: "바로가기",
    src: drawerImage,
    alt: "drawer",
    comment: "로그인 후 사이드 메뉴 바를 통해 대시보드, 일기 목록, 오늘의 일기 쓰기, 튜토리얼 페이지로 이동할 수 있습니다.",
    index: 3,
  },
  {
    title: "일기 작성하기",
    src: createImage,
    alt: "create",
    comment: "'오늘의 일기 쓰기' 혹은 캘린더에서 특정 날짜를 선택하시면 해당 날짜의 일기를 작성하실 수 있습니다. 작성된 일기를 바탕으로 키워드 및 감정 분석이 이루어지며 썸네일을 생성해 드립니다.",
    index: 4,
  },
  {
    title: "대시보드",
    src: loginImage,
    alt: "dashboard",
    comment: "대시보드를 통해 나의 프로필 정보와 이번 달, 지난 달의 감정 빈도 비교, 최근 일기 정보 등을 한눈에 확인하실 수 있습니다.",
    index: 5,
  },
  {
    title: "달력으로 모아보기",
    src: loginImage,
    alt: "calendar",
    comment: "작성한 일기들의 감정을 달력으로 모아볼 수 있습니다. 특정 감정들을 선택하면 해당 감정의 일기들만 조회할 수 있습니다.",
    index: 6,
  },
  {
    title: "썸네일로 모아보기",
    src: loginImage,
    alt: "grid",
    comment: "썸네일을 중심으로 작성한 일기들을 모아볼 수도 있습니다. 검색 기능과 감정별, 기간별, 날짜별 정렬 및 조회가 가능합니다. ",
    index: 7,
  },

]

const Tutorial = () => {
  return (
    <div className="relative flex justify-center pb-10 bg-white dark:bg-zinc-800 sm:pt-10 sm:pb-10 lg:pt-10 lg:pb-10 rounded-2xl">
      <div className="container relative mx-auto">
        <div>
          {examplePages.map((examplePage) => (
            <LazyShow delay={((examplePage.index)*0.5)-examplePage.index*0.3}>
              <div className="grid grid-cols-7 py-4">
                <div className="col-span-5 px-4">
                  <Image
                    src={examplePage.src}
                    alt={examplePage.alt}
                    width={800}
                    height={400}
                    sizes="100vw"
                    placeholder="blur"
                    priority
                  />
                </div>
                <div className="grid grid-cols-1 col-span-2 grid-rows-5">
                  <p className="row-span-1 pt-8 mb-2 text-3xl font-bold leading-8 dark:text-zinc-100 text-zinc-900">{examplePage.title}</p>
                  <p className="row-span-4 text-lg font-semibold leading-7 dark:text-zinc-500 text-zinc-600">{examplePage.comment}</p>
                </div>
              </div>
            </LazyShow>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
