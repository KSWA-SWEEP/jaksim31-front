# Jaksim31 


```
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
    │  ├─ favicon.ico
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
    │  │  ├─ landing-example.png
    │  │  ├─ paperTexture.jpg
    │  │  └─ tutorial
    │  │     ├─ create.png
    │  │     ├─ drawer.png
    │  │     ├─ login.png
    │  │     └─ signUp.png
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