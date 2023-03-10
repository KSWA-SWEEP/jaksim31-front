
<br/>

# ์์ฌ์ผ์ผ๐

<br/>

## ๐  Intro

### **์์ฌ์ผ์ผ** ๋ค์ด์ด๋ฆฌ ์๋น์ค ํ๋ก ํธ์๋ ํ๋ก์ ํธ
**2022. 08 ~ 2023. 02**


<br/>

## ๐ฉ Demo

### ๐ Video
[![Video Label](http://img.youtube.com/vi/2ceimJjuKbw/0.jpg)](https://youtu.be/2ceimJjuKbw)
<br/> [YOUTUBE ๋ฐ๋ก๊ฐ๊ธฐ ๋งํฌ](https://youtu.be/2ceimJjuKbw)

<br/>

### ๐ฅ Screenshots
![image](https://user-images.githubusercontent.com/64126621/222623356-c5b16180-d9d0-4ddb-8167-d964cd011b5a.png)
![image](https://user-images.githubusercontent.com/64126621/222623363-5ec72203-9e44-4192-b664-94451ef6a90c.png)
![image](https://user-images.githubusercontent.com/64126621/222623378-14fa9a3d-3175-4bd3-9267-d5aa8eb7ea21.png)
![image](https://user-images.githubusercontent.com/64126621/222623388-cd5db0d4-559d-40a7-8193-db411a47aa33.png)
![image](https://user-images.githubusercontent.com/64126621/222623398-09702ed2-0912-482b-a1f2-30bfa760ba48.png)
![image](https://user-images.githubusercontent.com/64126621/222623406-266fcfa9-5c69-4c18-a410-b037173c9565.png)
![image](https://user-images.githubusercontent.com/64126621/222623413-317743f2-20f1-4baa-92e2-f5bcf5536fd0.png)
![image](https://user-images.githubusercontent.com/64126621/222623421-334588a6-c126-4514-83fc-03d2ae52f74a.png)

<br/>

## ๐ Quick Start

### ๐ Git clone

```bash
git clone https://github.com/KSWA-SWEEP/jaksim31-front.git
```

### ๐ฅ Install dependencies

```bash
cd jaksim31-front
npm install
```

### โ Set environment variables

ํ๋ก์ ํธ ๋ฃจํธ ๊ฒฝ๋ก์ ํ๊ฒฝ ๋ณ์ ํ์ผ ์ค์ 

โ ๊ธฐ๋ณธ์ ์ผ๋ก env ํ์ผ ๋ง๋ค์ด์ ์ค์ ํด์ฃผ๋ฉด ๋๋ฉฐ, `.env.local` ๋ฑ ํ๊ฒฝ์ ๋ง๋ ํ์ผ ์ถ๊ฐํ์ฌ ํ๊ฒฝ์ ๋ฐ๋ฅธ ๋ณ์ ์ค์  ๊ฐ๋ฅ

๐ *.env*

```yaml
NEXT_PUBLIC_UNSPLASH_ACCESSKEY=${Unsplash API Access Key}
NEXT_PUBLIC_BASE_URL=${Backend url - local์ผ ๊ฒฝ์ฐ http://localhost:8080}
NEXT_PUBLIC_API_URL=${Frontend url - local์ผ ๊ฒฝ์ฐ http://localhost:3000}

# Kakao ๋ก๊ทธ์ธ์ ์ํ ๋ณ์
NEXT_PUBLIC_KAKAO_CLIENT_ID=${Kakao Client ID}
NEXT_PUBLIC_KAKAO_REDIRECT_URL=${Kakao ๋ก๊ทธ์ธ ํ ์ด๋ํ  redirect url}

# KiC Object Storage
NEXT_PUBLIC_KAKAO_API_AUTH_URL=https://iam.kakaoi.io/identity/v3/auth/tokens
NEXT_PUBLIC_KAKAO_API_AUTH_ACCESSKEY=${Kakao i Cloud API Access Key}
NEXT_PUBLIC_KAKAO_API_AUTH_SECRET=${Kakao i Cloud Auth Secret}
NEXT_PUBLIC_KAKAO_FILE_UPLOAD_URL=${์ด๋ฏธ์ง ์๋ก๋ ๊ฒฝ๋ก}
NEXT_PUBLIC_KAKAO_FILE_VIEW_URL=${์ด๋ฏธ์ง ์กฐํ ๊ฒฝ๋ก}
NEXT_PUBLIC_DEFAULT_PROFILE=${default ํ๋กํ ์ด๋ฏธ์ง url}

# Google Analytics
NEXT_PUBLIC_GA_TRACKING_ID=${Google Analytics Tracking ID}
```

- API Key ๋ฐ ๊ธฐํ ์ค์  ์ฐธ๊ณ 
    - Unsplash API
        [Unsplash Image API | Free HD Photo API](https://unsplash.com/developers)
        
    - Kakao ๋ก๊ทธ์ธ
        [Kakao Developers](https://developers.kakao.com/docs/latest/ko/kakaologin/common)
        
    - Object Storage
        [Object Storage](https://console.kakaoi.io/docs/posts/os/2021-03-30-os_ov/os_ov#object-storage)
        

### ๐ซ run app

```bash
# development ํ๊ฒฝ ์คํ ์
npm run dev

# production ํ๊ฒฝ ์คํ ์
npm run build
npm start
```



<br/>

## ๐  Skills

### **Languages**

- JavaScript
- CSS

### **Dependencies**

*๐ package.json*

```json
...

"dependencies": {
    // Next.js - 13 ๋ฒ์  ์ฌ์ฉ
    "next": "13.1.1", 
    // React - 18 ๋ฒ์  ์ฌ์ฉ
    "react": "18.2.0",]
    "react-dom": "18.2.0",

    // ๐ UI
    // Tailwind Component Library - modal, popup ๋ฑ ์ฌ์ฉ
    "daisyui": "^2.46.1",
    "@headlessui/react": "^1.7.7",
    // SVG icon Library
    "@heroicons/react": "^2.0.13",
    // ์ผ๊ธฐ ์์ฑ์ ์ํ Editor Library
    "@ckeditor/ckeditor5-react": "^5.0.5",
    "ckeditor5-custom-build": "file:ckeditor5",
    // nextjs 13์ next/font
    "@next/font": "^13.1.1",
    // Positioning Library - ํดํ ๋ฐ ํ์ค๋ฒ ์์๊ฐ ์ปดํฌ๋ํธ ์์ญ ๋ฐ์์ ์๋ฆฌ๋ ํ์ ํด๊ฒฐ
    "@popperjs/core": "^2.11.6",
    // SVG ์ด๋ฏธ์ง๋ฅผ ์ฌ์ฉํ๊ธฐ ์ํ Library
    "@svgr/webpack": "^6.5.1",
    // ๋์๋ณด๋์ ์ฐจํธ๋ค์ ๊ทธ๋ฆฌ๊ธฐ ์ํ Library
    "chart.js": "^2.9.4",
    // Animation Library
    "framer-motion": "^8.2.4",
    "react-transition-group": "^4.4.5",
    // ์คํฌ๋กค๋ฐ ์จ๊ธฐ๊ธฐ Library
    "tailwind-scrollbar-hide": "^1.1.7"

    // ๐ ๊ธฐํ ๊ธฐ๋ฅ
    // Classname joining library - ์ผ์ด์ค์ ๋ฐ๋ผ ํด๋์ค๋ช ๋ณ๊ฒฝํ๊ฑฐ๋ ์กฐ๊ฑด ์ถ๊ฐํ  ๊ฒฝ์ฐ ์ฌ์ฉ
    "classnames": "^2.3.2",
    // ์ฟ ํค ๊ฐ์ ์ฝ๊ฑฐ๋ ๋ณ๊ฒฝํ๊ธฐ ์ํ Library
    "cookies-next": "^2.1.1",
    // ํ๊ฒฝ๋ณ์ ์ค์ (.env ํ์ผ)์ ์ํ Library
    "dotenv": "^16.0.3",
    "dotenv-webpack": "^8.0.1",
    // ์ด๋ฉ์ผ ์ธ์ฆ Library - ํ์ ๊ฐ์ ์ ์ด๋ฉ์ผ ์ธ์ฆ ์ฌ์ฉ
    "emailjs-com": "^3.2.0",
    // ๋ ์ง Library
    "moment": "^2.29.4",
    // SEO - sitemap ์๋ ์์ฑ Library
    "next-sitemap": "^3.1.50",
    // Calendar Library - custom ๋์์ธ ํด์ ์ฌ์ฉ
    "react-calendar": "^4.0.0",
    // Datepicker Library
    "react-datepicker": "^4.8.0",
    // Pagination Library - 
    "react-js-pagination": "^3.0.3",
    // Data Fetching Library
    "react-query": "^3.39.2",
    // Image Optimization Library
    "sharp": "^0.31.3",

    
    // ๐ Test
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

## ๐ Directory

```markup
๐ jaksim31-front
    โโ ๐ app
    โ  โโ common
    โ  โ  โโ Drawer.jsx
    โ  โ  โโ header
    โ  โ  โ  โโ Header.jsx
    โ  โ  โ  โโ loading.js
    โ  โ  โ  โโ Login.js
    โ  โ  โ  โโ Profile.js
    โ  โ  โโ LazyShow.js
    โ  โ  โโ Tutorial.js
    โ  โโ home
    โ  โ  โโ landing
    โ  โ  โ  โโ ExampleScreen.js
    โ  โ  โ  โโ page.jsx
    โ  โ  โโ page.jsx
    โ  โ  โโ tutorial
    โ  โ     โโ page.jsx
    โ  โโ diary
    โ  โ  โโ common
    โ  โ  โ  โโ backButton.js
    โ  โ  โ  โโ diaryInputFormat.js
    โ  โ  โ  โโ Editor.js
    โ  โ  โ  โโ loading.js
    โ  โ  โโ create
    โ  โ  โ  โโ [date]
    โ  โ  โ     โโ createDiary.js
    โ  โ  โ     โโ page.jsx
    โ  โ  โโ dashboard
    โ  โ  โ  โโ BarChartCard.js
    โ  โ  โ  โโ DonutChartCard.js
    โ  โ  โ  โโ layout.jsx
    โ  โ  โ  โโ page.jsx
    โ  โ  โ  โโ ProfileCard.js
    โ  โ  โ  โโ RecentDiaryCard.js
    โ  โ  โโ list
    โ  โ  โ  โโ calendar
    โ  โ  โ  โ  โโ Calendar.css
    โ  โ  โ  โ  โโ calendarList.js
    โ  โ  โ  โ  โโ loading.js
    โ  โ  โ  โ  โโ page.jsx
    โ  โ  โ  โโ DateRangePicker.js
    โ  โ  โ  โโ grid
    โ  โ  โ  โ  โโ error.js
    โ  โ  โ  โ  โโ gridList.js
    โ  โ  โ  โ  โโ loading.js
    โ  โ  โ  โ  โโ page.jsx
    โ  โ  โ  โ  โโ Pagination.css
    โ  โ  โ  โโ layout.jsx
    โ  โ  โ  โโ ListBox.js
    โ  โ  โ  โโ page.jsx
    โ  โ  โ  โโ ViewTypeTab.js
    โ  โ  โโ page.jsx
    โ  โ  โโ [diaryId]
    โ  โ     โโ diaryContents.js
    โ  โ     โโ loading.js
    โ  โ     โโ modify
    โ  โ     โ  โโ date.js
    โ  โ     โ  โโ loading.js
    โ  โ     โ  โโ page.jsx
    โ  โ     โโ page.jsx
    โ  โโ globals.css
    โ  โโ head.jsx
    โ  โโ layout.jsx
    โ  โโ loading.js
    โ  โโ page.module.css
    โ  โโ page.jsx
    โ  โโ api
    โ  โ  โโ addDiary.js
    โ  โ  โโ analyzeDiary.js
    โ  โ  โโ checkIsMember.js
    โ  โ  โโ checkPassword.js
    โ  โ  โโ deleteDiary.js
    โ  โ  โโ getDiary.js
    โ  โ  โโ getDiaryList.js
    โ  โ  โโ getEmotionCount.js
    โ  โ  โโ getKakaoApiAccessKey.js
    โ  โ  โโ getUserInfo.js
    โ  โ  โโ login.js
    โ  โ  โโ logout.js
    โ  โ  โโ modifyDiary.js
    โ  โ  โโ signUp.js
    โ  โ  โโ updatePassword.js
    โ  โ  โโ updateUserInfo.js
    โ  โ  โโ uploadImg.js
    โ  โโ hooks
    โ  โ  โโ mutations
    โ  โ  โ  โโ useDiaryDelete.js
    โ  โ  โ  โโ useDiarySave.js
    โ  โ  โ  โโ useLogin.js
    โ  โ  โ  โโ useLogout.js
    โ  โ  โ  โโ useUserInfoUpdate.js
    โ  โ  โโ queries
    โ  โ     โโ useDiaryListPageQuery.js
    โ  โ     โโ useDiaryListQuery.js
    โ  โ     โโ useDiaryQuery.js
    โ  โ     โโ useEmotionCountQuery.js
    โ  โ     โโ useUserInfoQuery.js
    โ  โโ ReactQueryWrapper.jsx
    โ  
    โโ ๐บ .github
    โ  โโ workflows
    โ     โโ github-action.yml
    โ  
    โโ ๐งช cypress
    โ  โโ downloads
    โ  โโ e2e
    โ  โ  โโ diary
    โ  โ  โ  โโ diaryEdit.cy.js
    โ  โ  โ  โโ diaryList.cy.js
    โ  โ  โ  โโ diarySave.cy.js
    โ  โ  โโ member
    โ  โ     โโ userInfo.cy.js
    โ  โ     โโ userLogin.cy.js
    โ  โโ fixtures
    โ  โ  โโ example.json
    โ  โโ support
    โ     โโ commands.js
    โ     โโ e2e.js
    โ  
    โโ ๐ฆ public
    โ  โโ jaksim31.ico
    โ  โโ images
    โ  โ  โโ emotion
    โ  โ  โ  โโ bad-small.png
    โ  โ  โ  โโ bad.png
    โ  โ  โ  โโ bored-small.png
    โ  โ  โ  โโ bored.png
    โ  โ  โ  โโ embarrassed-small.png
    โ  โ  โ  โโ embarrassed.png
    โ  โ  โ  โโ good-small.png
    โ  โ  โ  โโ good.png
    โ  โ  โ  โโ nothing-small.png
    โ  โ  โ  โโ nothing.png
    โ  โ  โ  โโ sad-small.png
    โ  โ  โ  โโ sad.png
    โ  โ  โ  โโ scared-small.png
    โ  โ  โ  โโ scared.png
    โ  โ  โ  โโ surprised-small.png
    โ  โ  โ  โโ surprised.png
    โ  โ  โ  โโ unsure-small.png
    โ  โ  โ  โโ unsure.png
    โ  โ  โโ gradient.jpg
    โ  โ  โโ kakaoLogin.png
    โ  โ  โโ landing-example.webp
    โ  โ  โโ paperTexture.jpg
    โ  โ  โโ tutorial
    โ  โ     โโ calendar.webp
    โ  โ     โโ create.webp
    โ  โ     โโ drawer.webp
    โ  โ     โโ dashboard.webp
    โ  โ     โโ grid.webp
    โ  โ     โโ login.webp
    โ  โ     โโ signUp.webp
    โ  โโ next.svg
    โ  โโ svgs
    โ  โ  โโ spinner.svg
    โ  โโ thirteen.svg
    โ  โโ vercel.svg
    โ  
    โโ ๐ README.md
    โโ ๐ณ Dockerfile
    โโ package.json
    โโ next.config.js
    โโ cypress.config.js
    โโ postcss.config.js
    โโ tailwind.config.js
```


<br/>


## โ License
![image](https://user-images.githubusercontent.com/64126621/222623865-e2fb98e6-5b4e-4a16-ad1d-3d330c5a4795.png)
            

<br/>

## ๐คณ๐ป Mobile App
![image](https://user-images.githubusercontent.com/64126621/222624673-08a2fc69-c577-4a05-b915-12b481cc99c8.png)
์์ฌ์ผ์ผ์ **๋ฐ์ํ ์น**์ผ๋ก ๊ตฌํ๋์๊ธฐ์, React Native๋ฅผ ํตํด ์ฑ์ผ๋ก๋ ๊ตฌํ ๋ฐ ์ถ์๊ฐ ์งํ๋์์ต๋๋ค.
Google Play Sotre์์ ๋ค์ด๋ก๋ ํ  ์ ์์ผ๋ฉฐ, ์น์ฑ์ผ๋ก ๊ตฌํ๋์ด ์น์ฌ์ดํธ์์ ์ฌ์ฉํ  ์ ์๋ ๋ชจ๋  ๊ธฐ๋ฅ๋ค์ ๋์ผํ๊ฒ ์ฌ์ฉํ  ์ ์์ต๋๋ค.
[Google Play - Jaksim31 ๋งํฌ](https://play.google.com/store/apps/details?id=com.jongleur.jaksim31app)


<br/>

### ๐ TODO
- ํค์๋ Custom ๊ธฐ๋ฅ - ์ถ์ถ๋ ํค์๋์ ๋ํด ์์  ๋ฐ ์ถ๊ฐํ๋ ๊ธฐ๋ฅ
- ์ผ๊ธฐ ๊ณต์  ๋ฐ ๊ณต๊ฐ ๊ฒ์ ๊ธฐ๋ฅ - ์์ฑํ ์ผ๊ธฐ๋ฅผ ๊ณต์ ํ๊ฑฐ๋ ๊ณต๊ฐ ๊ฒ์ํ๋ ๋ฑ์ ๊ธฐ๋ฅ
- ์น๊ตฌ & ๋๊ธ, ์ข์์ ๊ธฐ๋ฅ - ์ฌ์ฉ์๊ฐ ์น๊ตฌ๋ฅผ ๋งบ์ด ์๋ก์ ์ผ๊ธฐ๋ฅผ ์กฐํํ๊ณ  ๋๊ธ, ์ข์์ ๋ฑ์ ๋จ๊ธธ ์ ์๋ ๊ธฐ๋ฅ


<br/>

## ๐ฅ Features

### ๐ Diary

- **์ธ๋ค์ผ ์ด๋ฏธ์ง ์์ฑ**
    - ์ฌ์ฉ์๋ค์๊ฒ ๋ค์ํ ์ธ๋ค์ผ ์ด๋ฏธ์ง๋ฅผ ์ ๊ณตํ๊ธฐ ์ํด Unsplash ์ **[Search photos by keyword](https://unsplash.com/documentation#search-photos)** API๋ฅผ ์ฌ์ฉํ์ฌ ์ด๋ฏธ์ง ๊ฐ์ ธ์ด
        - Application  ๋ฑ๋ก
            ![image](https://user-images.githubusercontent.com/64126621/222623952-c021d312-5759-4d1c-901a-eb71861b5f81.png)
            ![image](https://user-images.githubusercontent.com/64126621/222623967-0577669e-7246-437b-af84-fe1309b9caa3.png)
            Jaksim31์ ํ์ฌ Unsplash ๊ฐ๋ฐ์ ์ฌ์ดํธ์ ๋ฑ๋กํ์ฌ ์ธ์ฆ ๋ฐ์ ์ํ (Production)
            
        - ์ฌ์ฉ
            
            ๐ **`Editor.js`**
               
            ![image](https://user-images.githubusercontent.com/64126621/222624002-63f858b3-d026-46ac-9117-4944afbb6cbd.png)
            ์ถ์ถ๋ ํค์๋ ์ ๊ฐ์  ์ค ๋๋ค์ผ๋ก ๋จ์ด ํ๋ ์ ํํ์ฌ API ํธ์ถํจ
            ![image](https://user-images.githubusercontent.com/64126621/222624033-202f5c11-d6c4-42ac-82ef-0d4b71410f3b.png)
            
        
- **์ผ๊ธฐ ์์ฑ ( CKEditor )**
    - ์ฌ์ฉ์๋ค์ด ์ผ๊ธฐ์ ๋ค์ํ ๊ธ์จ ํฌ๊ธฐ, ์์, ํฐํธ ๋ฑ์ ์ค์ ํ  ์ ์๋๋ก JavaScript ๊ธฐ๋ฐ์ ์๋ํฐ์ธ CKEditor๋ฅผ ์ ์ฉํจ (๋ฒ์  5)
        - CKEditor Customize
            ํ์ ๊ธฐ๋ฅ๋ค์ ๋ฃ์ด CKEditor Customizeํ์ฌ ์ฌ์ฉ
            ![image](https://user-images.githubusercontent.com/64126621/222624066-20cb58b5-0c86-40a1-a650-022f631ba56d.png)            
            [CKEditor5 Online Builder ๋งํฌ](https://ckeditor.com/ckeditor-5/online-builder/)
            
        - ์ฌ์ฉ
            ๐ **`Editor.js`**
            
            ![image](https://user-images.githubusercontent.com/64126621/222624121-a1fac05f-3bc2-4266-bc01-3f967a151149.png)
            ![image](https://user-images.githubusercontent.com/64126621/222624149-0f5c9ded-c7dd-4dbc-8bf9-70295da65173.png)
            

### โจ Other

- **Responsive & Dark Mode**
    - ๋ค์ํ ๋๋ฐ์ด์ค ํ๊ฒฝ ๋ฐ ๋ชจ๋์์ ์ ์ฐํ ์๋์ ํ  ์ ์๋๋ก UI ํ๋ ์์ํฌ์ธ Tailwindcss๋ฅผ ํตํด ๋ฐ์ํ ๋ฐ ๋คํฌ๋ชจ๋ ๋์
    - **`Responsice web`**
        - PC, Tablet, Mobile ๋ฑ ์ฌ๋ฌ ํ๋ฉด ํฌ๊ธฐ์ ๋ฐ๋ผ ์ ์ ํ ํฌ๊ธฐ๋ก ๋ณด์ฌ์ง๋๋ก `sm:` , `md:` , `lg:` ๋ฑ์ ์ต์์ ์ค์ ํด๋์ด ๋ฐ์ํ ์ ์ฉ
            ![image](https://user-images.githubusercontent.com/64126621/222624171-bea78225-6169-4675-a7db-74ac84e0dd2b.png)
        
        - ์ ์ฉ
            **๐ `gridList.js`**
            
            ![image](https://user-images.githubusercontent.com/64126621/222624203-4d344ae4-d9e1-46c5-82b4-986d35eafa1c.png)
            ![image](https://user-images.githubusercontent.com/64126621/222624241-bb227134-1432-46ce-8507-7c3674920795.png)

        
    - **`Dark Mode`**
        - ๋คํฌ๋ชจ๋ ์ ์ฉ ์ ๋ณ๊ฒฝ๋  ์์ ๋ฐ ์ต์์ `dark:` ๋ก ์ค์ ํด๋์ด ๋คํฌ๋ชจ๋ ์ ์ฉ
            ![image](https://user-images.githubusercontent.com/64126621/222624287-b84d28ba-7a03-42ca-9ef1-a694b5606469.png)

            - ์ ์ฉ
                ๐ **`ProfileCard.js`**
                ![image](https://user-images.githubusercontent.com/64126621/222624308-ffd5e393-f64a-4c6a-895d-6c139bf444aa.png)
                ![image](https://user-images.githubusercontent.com/64126621/222624328-b926438e-d50d-4d15-83bb-90b503ee1701.png)
                
- Server State ๊ด๋ฆฌ
    - ์๋ฒ๋ก๋ถํฐ data fetching์ ํตํด ๊ฐ์ ธ์ค๋ Server state์ ๋ํ ์ ์ญ ์ํ ๊ด๋ฆฌ๋ฅผ ์ํด Data fetching ๋ผ์ด๋ธ๋ฌ๋ฆฌ์ธ React Query๋ฅผ ์ ์ฉํ์ฌ Server State ๊ด๋ฆฌ
        - ์ ์ฉ
            ๐ **`app/layout.jsx`**
            
            ![image](https://user-images.githubusercontent.com/64126621/222624357-96ed4ad6-aa77-464d-9089-74e830c70f01.png)
            ๋ฃจํธ ๊ฒฝ๋ก์ layout(๐ **`app/layout.jsx`**)์์ ํ์ ์ปดํฌ๋ํธ๋ค์ ๋ํด ์์ฒด์ ์ผ๋ก ๋ง๋  React Query ์ปดํฌ๋ํธ์ธ **`<ReactQueryWrapper>`**๋ก ๊ฐ์ธ์ฃผ์ด ๋ชจ๋  ํ์ด์ง์ ๋ํด ํ๋์ query client๋ฅผ ๊ฐ๋ ์ํ ์ ์ฉ
            
            ๐ **`app/ReactQueryWrapper.js`**
            
            ![image](https://user-images.githubusercontent.com/64126621/222624383-3c83ae26-9316-4068-b69e-206dd528bdfb.png)
            **`QueryClientProvider`**๋ฅผ ํตํด queryClient default ์ค์ ์ ํด์ฃผ๊ณ , ๊ฐ๋ฐ ์ ํธ๋ฆฌ๋ฅผ ์ํด **`ReactQueryDevtools`**๋ฅผ ์ค์ ํ์์ผ๋ฉฐ, queryClient ์ค์  ์ query client์ ๋ํ ๊ธฐ๋ณธ ์ค์ 
            
            - **React Query hooks**
                ![image](https://user-images.githubusercontent.com/64126621/222624398-b0935c25-243c-4cba-b713-9075049ba202.png)
                ๐ **`app/hooks`** ๊ฒฝ๋ก ๋ด์ React Query hook๋ค์ ๋ํ ํจ์๋ฅผ ๋ง๋ค์ด๋์ด ํด๋น hook์ด ํ์ํ ์ปดํฌ๋ํธ๋ค ๋ด์์ ๊ฐ๋จํ๊ฒ ๊ฐ์ ธ๋ค ์ธ ์ ์๋๋ก ํจ
                
            
            ๐ **`useDiaryListQuery.js`**
            
            ![image](https://user-images.githubusercontent.com/64126621/222624427-f2257a98-07ec-41ae-b592-acc87737c1ee.png)
            api fetch ํ ์ดํ ๋ง์ฝ response๋ฅผ ์ ๋๋ก ๋ฐ์์ค์ง ๋ชปํ ๊ฒฝ์ฐ(= ์๋ฌ ๋ฐ์์ ๊ฒฝ์ฐ = response data์  errorCode๊ฐ ํฌํจ๋ ๊ฒฝ์ฐ) error throw
            
            ๐ **`calendarList.js`**
            
            ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ec6ad340-fdf3-4da8-b7c4-ebc618076c68/Untitled.png)
            
            useDiaryListQuery ์ ์ธ ์ error ๋ฉ์ธ์ง๋ฅผ ๋ฐ์์ฌ error์ error ์ํ์ ๋ํ isError ๊ฐ ์ ์ธ
            
            ![image](https://user-images.githubusercontent.com/64126621/222624452-e7643d44-d5b9-49e0-afd5-0d41d9f84e05.png)
            isError ์ผ ๊ฒฝ์ฐ error ๋ฉ์ธ์ง๋ฅผ ๋ณด์ฌ์ฃผ๋ UI ๊ตฌ์ฑ
            
- ์ด๋ฏธ์ง Object Stroage ์ ์ฅ
    - ์ฌ์ฉ์๊ฐ ์ผ๊ธฐ๋ฅผ ์ ์ฅํ  ๊ฒฝ์ฐ ์์ฑ๋๋ ์ธ๋ค์ผ ์ด๋ฏธ์ง์ ์ฌ์ฉ์์ ํ๋กํ ์ด๋ฏธ์ง๋ฅผ KiC Object Storage ์ ์ฅํ์ฌ ์ฌ์ฉ
        - ์ ์ฉ
            
            ๐ **`uploadImg.js`**
            
            ![image](https://user-images.githubusercontent.com/64126621/222624483-6b4c1d7d-49e7-4ec9-82a0-b11134f9fc3d.png)            
            KiC API ์์ฒญ์ ํ์ฉ๋ฐ๊ธฐ ์ํ Access key ๋ฐ๊ธ ์ดํ, ํด๋น key๋ฅผ ์ฌ์ฉํ์ฌ Object Storage์ ์ด๋ฏธ์ง upload ์์ฒญ
            
            - UI
                ์ ์ฅ์ ์๊ฐ์ด ์ข ๊ฑธ๋ฆฌ๊ธฐ ๋๋ฌธ์ ์ผ๊ธฐ ์ ์ฅ ๋ชจ๋ฌ์์ **์ ์ฅ ์ **(์ธ๋ค์ผ ์ ํ) / **์ ์ฅ์ค** / **์ ์ฅ ์๋ฃ** ์ํ์ ๋ฐ๋ผ UI ๋ฐ ์ ์ฅ ๋ฒํผ ๋นํ์ฑํ๋ฅผ ๋ค๋ฅด๊ฒ ํ์ฌ ์ฌ์ฉ์๊ฐ ์ผ๊ธฐ ์ต์ข ์ ์ฅ์ ๊ณผ์ ์์ ๊ธฐ๋ค๋ฆฌ๊ฒ ๋๋ ์๊ฐ์ ์ค์! (์ฌ์ฉ์ ๊ฒฝํ ํฅ์โ)
                - *์ธ๋ค์ผ ์ ์ฅ ๊ณผ์ *
                    - ์ ์ฅ ์ 
                        ![image](https://user-images.githubusercontent.com/64126621/222624508-42944f6e-db56-4849-a5e8-75e60cc5302e.png)                        
                        **`์ด ์ฌ์ง์ผ๋ก ๊ฒฐ์ `**โ ๋ฒํผ ํ์ / **`์ ์ฅํ๊ธฐ`** โ ๋ฒํผ ๋นํ์ฑํ
                        
                    - ์ ์ฅ์ค
                        ![image](https://user-images.githubusercontent.com/64126621/222624529-4a7df440-f2a8-4332-a45b-6e4ffe77bb30.png)                       
                        `**์ ์ฅ์ค์๋๋ค**` โ ๋ฒํผ ํ์ / **`์ ์ฅํ๊ธฐ`** โ ๋ฒํผ ๋นํ์ฑํ
                        
                    
                    - ์ ์ฅ ์๋ฃ
                        ![image](https://user-images.githubusercontent.com/64126621/222624555-75a2b6f0-9c74-49ad-8d21-8526a1dc3054.png)                        
                        **`์ธ๋ค์ผ ์์ฑ ์๋ฃ`** โ ๋ฒํผ ํ์ / **`์ ์ฅํ๊ธฐ`** โ ๋ฒํผ ํ์ฑํ
                        
- SEO
    - ์น์ฌ์ดํธ๊ฐ ๊ฒ์ ์์ง์์ ์ฝ๊ฒ ๋ธ์ถ๋  ์ ์๋๋ก ๊ฒ์ ์์ง ์ต์ ํ ์ ์ฉ
        - ์ ์ฉ
            - **NAVER**
                
                **๐ `DefaultTags.jsx`**
                
                ![image](https://user-images.githubusercontent.com/64126621/222624579-ef33e82c-5313-4b6d-9f2c-9b269d79e79a.png)
                header.js ํ์ผ์ ๊ณตํต์ ์ผ๋ก ๋ค์ด๊ฐ๋ **`DefaultTags.jsx`** ํ์ผ์ naver์์ ์ ๊ณตํ๋ meta tag ์ถ๊ฐ
                
            - **Google**
                
                ![image](https://user-images.githubusercontent.com/64126621/222624600-db5f440e-5b41-4373-9a93-89259b94b9f2.png)
                ๋๋ฉ์ธ ๊ตฌ์ํ ์ฌ์ดํธ์์ ์ ๊ณตํ๋ txt ๋ ์ฝ๋ ์ถ๊ฐํ์ฌ ์ธ์ฆ
                
            - **OpenGraph**
                - ์น์ฌ์ดํธ์ ๋ฉํ์ ๋ณด๋ฅผ ์ฝ๊ฒ ํ์ํ๊ธฐ ์ํด์ ๋ฉํ์ ๋ณด์ ํด๋นํ๋ ์ ๋ชฉ, ์ค๋ช, ๋ฌธ์์ ํ์, ๋ํ URL ๋ฑ ๋ค์ํ ์์๋ค์ ๋ํด์ ์ฌ๋๋ค์ด ํต์ผํด์ ์ธ ์ ์๋๋ก Open Graph ํ๊ทธ๋ฅผ ์ ์ํจ
                    - ์ ์ฉ
                        ๐ **`DefaultTags.jsx`**
                        
                        ![image](https://user-images.githubusercontent.com/64126621/222624616-83fe8f62-00f7-48cb-88e4-fad64829c53f.png)
                        
            - **robots.txt & sitemap.xml**
                - ์น์ฌ์ดํธ์์ ํฌ๋กค๋งํ๋ฉฐ ์ ๋ณด๋ฅผ ์์งํ๋ ๊ฒ์์์ง ํฌ๋กค๋ฌ๊ฐ ์นํ์ด์ง๋ฅผ ์์งํ  ์ ์๋๋ก ํ๋ `**robots.txt**` ํ์ผ๊ณผ `**sitemap.xml**` ํ์ผ์ ์ค์ ํจ
                
                **๐ `robots.txt`**
                
                ![image](https://user-images.githubusercontent.com/64126621/222624626-b630db02-aafa-4e94-8449-dde2b4812097.png)
                
                **๐ `sitemap.xml`**
                
                ![image](https://user-images.githubusercontent.com/64126621/222624644-d36552f3-eeb2-47a1-8299-a43fe316f324.png)                
                โ `next-sitemap` ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ฅผ ์ฌ์ฉํ์ฌ ํ๋ก์ ํธ ๋น๋ ์ ์๋ ์์ฑ๋๋๋ก ์ค์ 
                
- Google Analytics
    - ๋ฐฉ๋ฌธ์์ ์ ์ ์ถ์ฒ๋ฅผ ํ์ธํ๊ฑฐ๋, ์ฌ์ฉ์ ํ๋์ ํ์ํ๋ ๋ฑ ์ ์ฉํ ์ ๋ณด๋ฅผ ์์งํ๊ณ  ์ ์ฅํ์ฌ ๋ถ์ํ๊ณ ์ ๊ตฌ๊ธ์์ ๋ฌด๋ฃ๋ก ์ ๊ณตํ๋ย ์น ๋ก๊ทธ๋ถ์ ํด์ธ Google Analytics ์ ์ฉ
        - ์ ์ฉ
            
            ๐ **`layout.jsx`**
            
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
