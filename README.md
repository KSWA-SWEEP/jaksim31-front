
<br/>

# 작심삼일📙

<br/>

## 📖  Intro

### **작심삼일** 다이어리 서비스 프론트엔드 프로젝트
**2022. 08 ~ 2023. 02**


<br/>

## 🚩 Demo

### 🎞 Video
[![Video Label](http://img.youtube.com/vi/2ceimJjuKbw/0.jpg)](https://youtu.be/2ceimJjuKbw)
<br/> [YOUTUBE 바로가기 링크](https://youtu.be/2ceimJjuKbw)

<br/>

### 🖥 Screenshots
![image](https://user-images.githubusercontent.com/64126621/222623356-c5b16180-d9d0-4ddb-8167-d964cd011b5a.png)
![image](https://user-images.githubusercontent.com/64126621/222623363-5ec72203-9e44-4192-b664-94451ef6a90c.png)
![image](https://user-images.githubusercontent.com/64126621/222623378-14fa9a3d-3175-4bd3-9267-d5aa8eb7ea21.png)
![image](https://user-images.githubusercontent.com/64126621/222623388-cd5db0d4-559d-40a7-8193-db411a47aa33.png)
![image](https://user-images.githubusercontent.com/64126621/222623398-09702ed2-0912-482b-a1f2-30bfa760ba48.png)
![image](https://user-images.githubusercontent.com/64126621/222623406-266fcfa9-5c69-4c18-a410-b037173c9565.png)
![image](https://user-images.githubusercontent.com/64126621/222623413-317743f2-20f1-4baa-92e2-f5bcf5536fd0.png)
![image](https://user-images.githubusercontent.com/64126621/222623421-334588a6-c126-4514-83fc-03d2ae52f74a.png)

<br/>

## 🚀 Quick Start

### 🖇 Git clone

```bash
git clone https://github.com/KSWA-SWEEP/jaksim31-front.git
```

### 📥 Install dependencies

```bash
cd jaksim31-front
npm install
```

### ⚙ Set environment variables

프로젝트 루트 경로에 환경 변수 파일 설정

⇒ 기본적으로 env 파일 만들어서 설정해주면 되며, `.env.local` 등 환경에 맞는 파일 추가하여 환경에 따른 변수 설정 가능

📋 *.env*

```yaml
NEXT_PUBLIC_UNSPLASH_ACCESSKEY=${Unsplash API Access Key}
NEXT_PUBLIC_BASE_URL=${Backend url - local일 경우 http://localhost:8080}
NEXT_PUBLIC_API_URL=${Frontend url - local일 경우 http://localhost:3000}

# Kakao 로그인을 위한 변수
NEXT_PUBLIC_KAKAO_CLIENT_ID=${Kakao Client ID}
NEXT_PUBLIC_KAKAO_REDIRECT_URL=${Kakao 로그인 후 이동할 redirect url}

# KiC Object Storage
NEXT_PUBLIC_KAKAO_API_AUTH_URL=https://iam.kakaoi.io/identity/v3/auth/tokens
NEXT_PUBLIC_KAKAO_API_AUTH_ACCESSKEY=${Kakao i Cloud API Access Key}
NEXT_PUBLIC_KAKAO_API_AUTH_SECRET=${Kakao i Cloud Auth Secret}
NEXT_PUBLIC_KAKAO_FILE_UPLOAD_URL=${이미지 업로드 경로}
NEXT_PUBLIC_KAKAO_FILE_VIEW_URL=${이미지 조회 경로}
NEXT_PUBLIC_DEFAULT_PROFILE=${default 프로필 이미지 url}

# Google Analytics
NEXT_PUBLIC_GA_TRACKING_ID=${Google Analytics Tracking ID}
```

- API Key 및 기타 설정 참고
    - Unsplash API
        [Unsplash Image API | Free HD Photo API](https://unsplash.com/developers)
        
    - Kakao 로그인
        [Kakao Developers](https://developers.kakao.com/docs/latest/ko/kakaologin/common)
        
    - Object Storage
        [Object Storage](https://console.kakaoi.io/docs/posts/os/2021-03-30-os_ov/os_ov#object-storage)
        

### 🛫 run app

```bash
# development 환경 실행 시
npm run dev

# production 환경 실행 시
npm run build
npm start
```



<br/>

## 🛠 Skills

### **Languages**

- JavaScript
- CSS

### **Dependencies**

*📋 package.json*

```json
...

"dependencies": {
    // Next.js - 13 버전 사용
    "next": "13.1.1", 
    // React - 18 버전 사용
    "react": "18.2.0",]
    "react-dom": "18.2.0",

    // 📄 UI
    // Tailwind Component Library - modal, popup 등 사용
    "daisyui": "^2.46.1",
    "@headlessui/react": "^1.7.7",
    // SVG icon Library
    "@heroicons/react": "^2.0.13",
    // 일기 작성을 위한 Editor Library
    "@ckeditor/ckeditor5-react": "^5.0.5",
    "ckeditor5-custom-build": "file:ckeditor5",
    // nextjs 13의 next/font
    "@next/font": "^13.1.1",
    // Positioning Library - 툴팁 및 팝오버 요소가 컴포넌트 영역 밖에서 잘리는 현상 해결
    "@popperjs/core": "^2.11.6",
    // SVG 이미지를 사용하기 위한 Library
    "@svgr/webpack": "^6.5.1",
    // 대시보드의 차트들을 그리기 위한 Library
    "chart.js": "^2.9.4",
    // Animation Library
    "framer-motion": "^8.2.4",
    "react-transition-group": "^4.4.5",
    // 스크롤바 숨기기 Library
    "tailwind-scrollbar-hide": "^1.1.7"

    // 📄 기타 기능
    // Classname joining library - 케이스에 따라 클래스명 변경하거나 조건 추가할 경우 사용
    "classnames": "^2.3.2",
    // 쿠키 값을 읽거나 변경하기 위한 Library
    "cookies-next": "^2.1.1",
    // 환경변수 설정(.env 파일)을 위한 Library
    "dotenv": "^16.0.3",
    "dotenv-webpack": "^8.0.1",
    // 이메일 인증 Library - 회원 가입 시 이메일 인증 사용
    "emailjs-com": "^3.2.0",
    // 날짜 Library
    "moment": "^2.29.4",
    // SEO - sitemap 자동 생성 Library
    "next-sitemap": "^3.1.50",
    // Calendar Library - custom 디자인 해서 사용
    "react-calendar": "^4.0.0",
    // Datepicker Library
    "react-datepicker": "^4.8.0",
    // Pagination Library - 
    "react-js-pagination": "^3.0.3",
    // Data Fetching Library
    "react-query": "^3.39.2",
    // Image Optimization Library
    "sharp": "^0.31.3",

    
    // 📄 Test
    // E2E Test
    "@cypress/react18": "^2.0.0",
    // Mocking Library
    "intersection-observer": "^0.12.2",
    // Type check Library
    "prop-types": "^15.8.1",
}

...
```


<br/>

## 🗂 Directory

```markup
📙 jaksim31-front
    ├─ 📁 app
    │  ├─ common
    │  │  ├─ Drawer.jsx
    │  │  ├─ header
    │  │  │  ├─ Header.jsx
    │  │  │  ├─ loading.js
    │  │  │  ├─ Login.js
    │  │  │  └─ Profile.js
    │  │  ├─ LazyShow.js
    │  │  └─ Tutorial.js
    │  ├─ home
    │  │  ├─ landing
    │  │  │  ├─ ExampleScreen.js
    │  │  │  └─ page.jsx
    │  │  ├─ page.jsx
    │  │  └─ tutorial
    │  │     └─ page.jsx
    │  ├─ diary
    │  │  ├─ common
    │  │  │  ├─ backButton.js
    │  │  │  ├─ diaryInputFormat.js
    │  │  │  ├─ Editor.js
    │  │  │  └─ loading.js
    │  │  ├─ create
    │  │  │  └─ [date]
    │  │  │     ├─ createDiary.js
    │  │  │     └─ page.jsx
    │  │  ├─ dashboard
    │  │  │  ├─ BarChartCard.js
    │  │  │  ├─ DonutChartCard.js
    │  │  │  ├─ layout.jsx
    │  │  │  ├─ page.jsx
    │  │  │  ├─ ProfileCard.js
    │  │  │  └─ RecentDiaryCard.js
    │  │  ├─ list
    │  │  │  ├─ calendar
    │  │  │  │  ├─ Calendar.css
    │  │  │  │  ├─ calendarList.js
    │  │  │  │  ├─ loading.js
    │  │  │  │  └─ page.jsx
    │  │  │  ├─ DateRangePicker.js
    │  │  │  ├─ grid
    │  │  │  │  ├─ error.js
    │  │  │  │  ├─ gridList.js
    │  │  │  │  ├─ loading.js
    │  │  │  │  ├─ page.jsx
    │  │  │  │  └─ Pagination.css
    │  │  │  ├─ layout.jsx
    │  │  │  ├─ ListBox.js
    │  │  │  ├─ page.jsx
    │  │  │  └─ ViewTypeTab.js
    │  │  ├─ page.jsx
    │  │  └─ [diaryId]
    │  │     ├─ diaryContents.js
    │  │     ├─ loading.js
    │  │     ├─ modify
    │  │     │  ├─ date.js
    │  │     │  ├─ loading.js
    │  │     │  └─ page.jsx
    │  │     └─ page.jsx
    │  ├─ globals.css
    │  ├─ head.jsx
    │  ├─ layout.jsx
    │  ├─ loading.js
    │  ├─ page.module.css
    │  ├─ page.jsx
    │  ├─ api
    │  │  ├─ addDiary.js
    │  │  ├─ analyzeDiary.js
    │  │  ├─ checkIsMember.js
    │  │  ├─ checkPassword.js
    │  │  ├─ deleteDiary.js
    │  │  ├─ getDiary.js
    │  │  ├─ getDiaryList.js
    │  │  ├─ getEmotionCount.js
    │  │  ├─ getKakaoApiAccessKey.js
    │  │  ├─ getUserInfo.js
    │  │  ├─ login.js
    │  │  ├─ logout.js
    │  │  ├─ modifyDiary.js
    │  │  ├─ signUp.js
    │  │  ├─ updatePassword.js
    │  │  ├─ updateUserInfo.js
    │  │  └─ uploadImg.js
    │  ├─ hooks
    │  │  ├─ mutations
    │  │  │  ├─ useDiaryDelete.js
    │  │  │  ├─ useDiarySave.js
    │  │  │  ├─ useLogin.js
    │  │  │  ├─ useLogout.js
    │  │  │  └─ useUserInfoUpdate.js
    │  │  └─ queries
    │  │     ├─ useDiaryListPageQuery.js
    │  │     ├─ useDiaryListQuery.js
    │  │     ├─ useDiaryQuery.js
    │  │     ├─ useEmotionCountQuery.js
    │  │     └─ useUserInfoQuery.js
    │  └─ ReactQueryWrapper.jsx
    │  
    ├─ 😺 .github
    │  └─ workflows
    │     └─ github-action.yml
    │  
    ├─ 🧪 cypress
    │  ├─ downloads
    │  ├─ e2e
    │  │  ├─ diary
    │  │  │  ├─ diaryEdit.cy.js
    │  │  │  ├─ diaryList.cy.js
    │  │  │  └─ diarySave.cy.js
    │  │  └─ member
    │  │     ├─ userInfo.cy.js
    │  │     └─ userLogin.cy.js
    │  ├─ fixtures
    │  │  └─ example.json
    │  └─ support
    │     ├─ commands.js
    │     └─ e2e.js
    │  
    ├─ 📦 public
    │  ├─ jaksim31.ico
    │  ├─ images
    │  │  ├─ emotion
    │  │  │  ├─ bad-small.png
    │  │  │  ├─ bad.png
    │  │  │  ├─ bored-small.png
    │  │  │  ├─ bored.png
    │  │  │  ├─ embarrassed-small.png
    │  │  │  ├─ embarrassed.png
    │  │  │  ├─ good-small.png
    │  │  │  ├─ good.png
    │  │  │  ├─ nothing-small.png
    │  │  │  ├─ nothing.png
    │  │  │  ├─ sad-small.png
    │  │  │  ├─ sad.png
    │  │  │  ├─ scared-small.png
    │  │  │  ├─ scared.png
    │  │  │  ├─ surprised-small.png
    │  │  │  ├─ surprised.png
    │  │  │  ├─ unsure-small.png
    │  │  │  └─ unsure.png
    │  │  ├─ gradient.jpg
    │  │  ├─ kakaoLogin.png
    │  │  ├─ landing-example.webp
    │  │  ├─ paperTexture.jpg
    │  │  └─ tutorial
    │  │     ├─ calendar.webp
    │  │     ├─ create.webp
    │  │     ├─ drawer.webp
    │  │     ├─ dashboard.webp
    │  │     ├─ grid.webp
    │  │     ├─ login.webp
    │  │     └─ signUp.webp
    │  ├─ next.svg
    │  ├─ svgs
    │  │  └─ spinner.svg
    │  ├─ thirteen.svg
    │  └─ vercel.svg
    │  
    ├─ 📖 README.md
    ├─ 🐳 Dockerfile
    ├─ package.json
    ├─ next.config.js
    ├─ cypress.config.js
    ├─ postcss.config.js
    └─ tailwind.config.js
```


<br/>


## ⚖ License
![image](https://user-images.githubusercontent.com/64126621/222623865-e2fb98e6-5b4e-4a16-ad1d-3d330c5a4795.png)
            

<br/>

## 🤳🏻 Mobile App
![image](https://user-images.githubusercontent.com/64126621/222624673-08a2fc69-c577-4a05-b915-12b481cc99c8.png)
작심삼일은 **반응형 웹**으로 구현되었기에, React Native를 통해 앱으로도 구현 및 출시가 진행되었습니다.
Google Play Sotre에서 다운로드 할 수 있으며, 웹앱으로 구현되어 웹사이트에서 사용할 수 있는 모든 기능들을 동일하게 사용할 수 있습니다.
[Google Play - Jaksim31 링크](https://play.google.com/store/apps/details?id=com.jongleur.jaksim31app)


<br/>

### 📌 TODO
- 키워드 Custom 기능 - 추출된 키워드에 대해 수정 및 추가하는 기능
- 일기 공유 및 공개 게시 기능 - 작성한 일기를 공유하거나 공개 게시하는 등의 기능
- 친구 & 댓글, 좋아요 기능 - 사용자간 친구를 맺어 서로의 일기를 조회하고 댓글, 좋아요 등을 남길 수 있는 기능


<br/>

## 🔥 Features

### 📙 Diary

- **썸네일 이미지 생성**
    - 사용자들에게 다양한 썸네일 이미지를 제공하기 위해 Unsplash 의 **[Search photos by keyword](https://unsplash.com/documentation#search-photos)** API를 사용하여 이미지 가져옴
        - Application  등록
            ![image](https://user-images.githubusercontent.com/64126621/222623952-c021d312-5759-4d1c-901a-eb71861b5f81.png)
            ![image](https://user-images.githubusercontent.com/64126621/222623967-0577669e-7246-437b-af84-fe1309b9caa3.png)
            Jaksim31은 현재 Unsplash 개발자 사이트에 등록하여 인증 받은 상태 (Production)
            
        - 사용
            
            📋 **`Editor.js`**
               
            ![image](https://user-images.githubusercontent.com/64126621/222624002-63f858b3-d026-46ac-9117-4944afbb6cbd.png)
            추출된 키워드 와 감정 중 랜덤으로 단어 하나 선택하여 API 호출함
            ![image](https://user-images.githubusercontent.com/64126621/222624033-202f5c11-d6c4-42ac-82ef-0d4b71410f3b.png)
            
        
- **일기 작성 ( CKEditor )**
    - 사용자들이 일기에 다양한 글씨 크기, 색상, 폰트 등을 설정할 수 있도록 JavaScript 기반의 에디터인 CKEditor를 적용함 (버전 5)
        - CKEditor Customize
            필요 기능들을 넣어 CKEditor Customize하여 사용
            ![image](https://user-images.githubusercontent.com/64126621/222624066-20cb58b5-0c86-40a1-a650-022f631ba56d.png)            
            [CKEditor5 Online Builder 링크](https://ckeditor.com/ckeditor-5/online-builder/)
            
        - 사용
            📋 **`Editor.js`**
            
            ![image](https://user-images.githubusercontent.com/64126621/222624121-a1fac05f-3bc2-4266-bc01-3f967a151149.png)
            ![image](https://user-images.githubusercontent.com/64126621/222624149-0f5c9ded-c7dd-4dbc-8bf9-70295da65173.png)
            

### ✨ Other

- **Responsive & Dark Mode**
    - 다양한 디바이스 환경 및 모드에서 유연한 작동을 할 수 있도록 UI 프레임워크인 Tailwindcss를 통해 반응형 및 다크모드 대응
    - **`Responsice web`**
        - PC, Tablet, Mobile 등 여러 화면 크기에 따라 적절한 크기로 보여지도록 `sm:` , `md:` , `lg:` 등의 옵션을 설정해두어 반응형 적용
            ![image](https://user-images.githubusercontent.com/64126621/222624171-bea78225-6169-4675-a7db-74ac84e0dd2b.png)
        
        - 적용
            **📋 `gridList.js`**
            
            ![image](https://user-images.githubusercontent.com/64126621/222624203-4d344ae4-d9e1-46c5-82b4-986d35eafa1c.png)
            ![image](https://user-images.githubusercontent.com/64126621/222624241-bb227134-1432-46ce-8507-7c3674920795.png)

        
    - **`Dark Mode`**
        - 다크모드 적용 시 변경될 색상 및 옵션을 `dark:` 로 설정해두어 다크모드 적용
            ![image](https://user-images.githubusercontent.com/64126621/222624287-b84d28ba-7a03-42ca-9ef1-a694b5606469.png)

            - 적용
                📋 **`ProfileCard.js`**
                ![image](https://user-images.githubusercontent.com/64126621/222624308-ffd5e393-f64a-4c6a-895d-6c139bf444aa.png)
                ![image](https://user-images.githubusercontent.com/64126621/222624328-b926438e-d50d-4d15-83bb-90b503ee1701.png)
                
- Server State 관리
    - 서버로부터 data fetching을 통해 가져오는 Server state에 대한 전역 상태 관리를 위해 Data fetching 라이브러리인 React Query를 적용하여 Server State 관리
        - 적용
            📋 **`app/layout.jsx`**
            
            ![image](https://user-images.githubusercontent.com/64126621/222624357-96ed4ad6-aa77-464d-9089-74e830c70f01.png)
            루트 경로의 layout(📄 **`app/layout.jsx`**)에서 하위 컴포넌트들에 대해 자체적으로 만든 React Query 컴포넌트인 **`<ReactQueryWrapper>`**로 감싸주어 모든 페이지에 대해 하나의 query client를 갖는 상태 적용
            
            📋 **`app/ReactQueryWrapper.js`**
            
            ![image](https://user-images.githubusercontent.com/64126621/222624383-3c83ae26-9316-4068-b69e-206dd528bdfb.png)
            **`QueryClientProvider`**를 통해 queryClient default 설정을 해주고, 개발 시 편리를 위해 **`ReactQueryDevtools`**를 설정하였으며, queryClient 설정 시 query client에 대한 기본 설정
            
            - **React Query hooks**
                ![image](https://user-images.githubusercontent.com/64126621/222624398-b0935c25-243c-4cba-b713-9075049ba202.png)
                📁 **`app/hooks`** 경로 내에 React Query hook들에 대한 함수를 만들어두어 해당 hook이 필요한 컴포넌트들 내에서 간단하게 가져다 쓸 수 있도록 함
                
            
            📋 **`useDiaryListQuery.js`**
            
            ![image](https://user-images.githubusercontent.com/64126621/222624427-f2257a98-07ec-41ae-b592-acc87737c1ee.png)
            api fetch 한 이후 만약 response를 제대로 받아오지 못한 경우(= 에러 발생의 경우 = response data에  errorCode가 포함된 경우) error throw
            
            📋 **`calendarList.js`**
            
            ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ec6ad340-fdf3-4da8-b7c4-ebc618076c68/Untitled.png)
            
            useDiaryListQuery 선언 시 error 메세지를 받아올 error와 error 상태에 대한 isError 값 선언
            
            ![image](https://user-images.githubusercontent.com/64126621/222624452-e7643d44-d5b9-49e0-afd5-0d41d9f84e05.png)
            isError 일 경우 error 메세지를 보여주는 UI 구성
            
- 이미지 Object Stroage 저장
    - 사용자가 일기를 저장할 경우 생성되는 썸네일 이미지와 사용자의 프로필 이미지를 KiC Object Storage 저장하여 사용
        - 적용
            
            📋 **`uploadImg.js`**
            
            ![image](https://user-images.githubusercontent.com/64126621/222624483-6b4c1d7d-49e7-4ec9-82a0-b11134f9fc3d.png)            
            KiC API 요청을 허용받기 위한 Access key 발급 이후, 해당 key를 사용하여 Object Storage에 이미지 upload 요청
            
            - UI
                저장에 시간이 좀 걸리기 때문에 일기 저장 모달에서 **저장 전**(썸네일 선택) / **저장중** / **저장 완료** 상태에 따라 UI 및 저장 버튼 비활성화를 다르게 하여 사용자가 일기 최종 저장의 과정에서 기다리게 되는 시간을 줄임! (사용자 경험 향상↑)
                - *썸네일 저장 과정*
                    - 저장 전
                        ![image](https://user-images.githubusercontent.com/64126621/222624508-42944f6e-db56-4849-a5e8-75e60cc5302e.png)                        
                        **`이 사진으로 결정`**⇒ 버튼 표시 / **`저장하기`** ⇒ 버튼 비활성화
                        
                    - 저장중
                        ![image](https://user-images.githubusercontent.com/64126621/222624529-4a7df440-f2a8-4332-a45b-6e4ffe77bb30.png)                       
                        `**저장중입니다**` ⇒ 버튼 표시 / **`저장하기`** ⇒ 버튼 비활성화
                        
                    
                    - 저장 완료
                        ![image](https://user-images.githubusercontent.com/64126621/222624555-75a2b6f0-9c74-49ad-8d21-8526a1dc3054.png)                        
                        **`썸네일 생성 완료`** ⇒ 버튼 표시 / **`저장하기`** ⇒ 버튼 활성화
                        
- SEO
    - 웹사이트가 검색 엔진에서 쉽게 노출될 수 있도록 검색 엔진 최적화 적용
        - 적용
            - **NAVER**
                
                **📋 `DefaultTags.jsx`**
                
                ![image](https://user-images.githubusercontent.com/64126621/222624579-ef33e82c-5313-4b6d-9f2c-9b269d79e79a.png)
                header.js 파일에 공통적으로 들어가는 **`DefaultTags.jsx`** 파일에 naver에서 제공하는 meta tag 추가
                
            - **Google**
                
                ![image](https://user-images.githubusercontent.com/64126621/222624600-db5f440e-5b41-4373-9a93-89259b94b9f2.png)
                도메인 구입한 사이트에서 제공하는 txt 레코드 추가하여 인증
                
            - **OpenGraph**
                - 웹사이트의 메타정보를 쉽게 표시하기 위해서 메타정보에 해당하는 제목, 설명, 문서의 타입, 대표 URL 등 다양한 요소들에 대해서 사람들이 통일해서 쓸 수 있도록 Open Graph 태그를 정의함
                    - 적용
                        📋 **`DefaultTags.jsx`**
                        
                        ![image](https://user-images.githubusercontent.com/64126621/222624616-83fe8f62-00f7-48cb-88e4-fad64829c53f.png)
                        
            - **robots.txt & sitemap.xml**
                - 웹사이트에서 크롤링하며 정보를 수집하는 검색엔진 크롤러가 웹페이지를 수집할 수 있도록 하는 `**robots.txt**` 파일과 `**sitemap.xml**` 파일을 설정함
                
                **📋 `robots.txt`**
                
                ![image](https://user-images.githubusercontent.com/64126621/222624626-b630db02-aafa-4e94-8449-dde2b4812097.png)
                
                **📋 `sitemap.xml`**
                
                ![image](https://user-images.githubusercontent.com/64126621/222624644-d36552f3-eeb2-47a1-8299-a43fe316f324.png)                
                ⇒ `next-sitemap` 라이브러리를 사용하여 프로젝트 빌드 시 자동 생성되도록 설정
                
- Google Analytics
    - 방문자의 유입 출처를 확인하거나, 사용자 행동을 파악하는 등 유용한 정보를 수집하고 저장하여 분석하고자 구글에서 무료로 제공하는 웹 로그분석 툴인 Google Analytics 적용
        - 적용
            
            📋 **`layout.jsx`**
            
            ```jsx
            export default function RootLayout({ children }) {  
            
              return (
                <html>
                  <head />
                  <body>
            
                    ...
            
                    **{/* Google Analytics */}
                    <script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`} />
                    <script
                      id="gtag-init"
                      strategy="afterInteractive"
                      dangerouslySetInnerHTML={{
                        __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
                        page_path: window.location.pathname,
                      });
                    `
                      }}
                    />**
            
            				...
            
                  </body>
                </html>
              )
            }
            ```
            ![image](https://user-images.githubusercontent.com/64126621/222624659-b796bf63-62d1-4c58-a7f0-c98f6402589a.png)
