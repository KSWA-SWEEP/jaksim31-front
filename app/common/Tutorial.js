import LazyShow from "./LazyShow";
import loginImage from "../../public/images/tutorial/login.png"
import Image from "next/image";

const examplePages = [
  {
    title: "회원가입",
    src: loginImage,
    alt: "signUp",
    comment: "회원가입은 인증 메일을 통해 이루어집니다. 회원가입은 인증 메일을 통해 이루어집니다. 회원가입은 인증 메일을 통해 이루어집니다. 회원가입은 인증 메일을 통해 이루어집니다.",
    index: 1,
  },
  {
    title: "로그인",
    src: loginImage,
    alt: "login",
    comment: "회원가입은 인증 메일을 통해 이루어집니다. 회원가입은 인증 메일을 통해 이루어집니다. 회원가입은 인증 메일을 통해 이루어집니다. 회원가입은 인증 메일을 통해 이루어집니다.",
    index: 1,
  },
  {
    title: "바로가기",
    src: loginImage,
    alt: "drawer",
    comment: "회원가입은 인증 메일을 통해 이루어집니다. 회원가입은 인증 메일을 통해 이루어집니다. 회원가입은 인증 메일을 통해 이루어집니다. 회원가입은 인증 메일을 통해 이루어집니다.",
    index: 1,
  },
  {
    title: "대시보드",
    src: loginImage,
    alt: "dashboard",
    comment: "회원가입은 인증 메일을 통해 이루어집니다. 회원가입은 인증 메일을 통해 이루어집니다. 회원가입은 인증 메일을 통해 이루어집니다. 회원가입은 인증 메일을 통해 이루어집니다.",
    index: 1,
  },
  {
    title: "달력으로 모아보기",
    src: loginImage,
    alt: "calendar",
    comment: "회원가입은 인증 메일을 통해 이루어집니다. 회원가입은 인증 메일을 통해 이루어집니다. 회원가입은 인증 메일을 통해 이루어집니다. 회원가입은 인증 메일을 통해 이루어집니다.",
    index: 1,
  },
  {
    title: "썸네일로 모아보기",
    src: loginImage,
    alt: "grid",
    comment: "회원가입은 인증 메일을 통해 이루어집니다. 회원가입은 인증 메일을 통해 이루어집니다. 회원가입은 인증 메일을 통해 이루어집니다. 회원가입은 인증 메일을 통해 이루어집니다.",
    index: 1,
  },

]

const Tutorial = () => {
  return (
    <div className="relative flex justify-center pb-10 sm:pt-10 sm:pb-10 lg:pt-10 lg:pb-10 bg-white">
      <div className="container relative mx-auto">
        <div>
          {examplePages.map((examplePage) => (
            <LazyShow delay={((examplePage.index)*0.5)-examplePage.index*0.2}>
              <div className="py-4 flex items-stretch">
                <div className="pr-4">
                  <Image
                    src={examplePage.src}
                    alt={examplePage.alt}
                    placeholder={examplePage.alt}
                  />
                </div>
                <div className="grid grid-cols-1 grid-rows-4">
                  <p className="row-start-2 text-2xl font-[GmarketSansMedium] font-semibold leading-8 text-zinc-900">{examplePage.title}</p>
                  <p className="row-start-3 font-[GmarketSansLight] text-base leading-7 text-zinc-600">{examplePage.comment}</p>
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
