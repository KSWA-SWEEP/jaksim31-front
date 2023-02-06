describe('Diary Save Test', () => {

  // 일기 저장
  it('diarySave', function() {
    // 로그인
    cy.visit('/home/landing');
    cy.wait(1500);
    cy.get('[data-cy="title"]', { timeout: 30000 }).should('be.visible');
    cy.get('[data-cy="startButton"]', { timeout: 30000 }).click();
    cy.wait(1500);
    cy.get('[data-cy="loginModal"]').should('be.visible');
    cy.get('[data-cy="loginEmailInput"]').clear();
    cy.get('[data-cy="loginEmailInput"]').type('test@sweep.com');
    cy.get('[data-cy="passwordInput"]').clear();
    cy.get('[data-cy="passwordInput"]').type('test1234!');
    cy.wait(1500);
    cy.get('[data-cy="loginSubmitButton"]', { timeout: 30000 }).click();

    // 오늘 일기 쓰기 페이지로 이동
    cy.wait(3000);
    cy.get('[data-cy="drawerButton"]', { timeout: 30000 }).should('be.visible');
    cy.wait(3000);
    cy.get('[data-cy="drawerButton"]', { timeout: 30000 }).click();
    cy.wait(1500);
    cy.get('li[data-cy="📇  오늘의 일기 쓰기"] > [data-cy="📇  오늘의 일기 쓰기"]', { timeout: 30000 }).click();
    cy.wait(3000);


    // editor 활성화될때까지 대기
    cy.get('.ck-editor__editable', { timeout: 30000 }).should('be.visible');
    cy.wait(3000);

    // 일기 저장하기 버튼 클릭
    cy.get('[data-cy="saveDiaryButton"]', { timeout: 30000 }).click();
    cy.get('[data-cy="uploadThumbnailButton"]', { timeout: 30000 }).click();
    cy.wait(6000);
    cy.get('.cursor-not-allowed').should('have.text', '썸네일 생성 완료👍', { timeout: 30000 });
    cy.get('[data-cy="uploadDiaryButton"]', { timeout: 30000 }).click();
    cy.get('[data-cy="closeSaveDiarySuccessModalButton"]', { timeout: 30000 }).click();
    cy.wait(3000);

    // // 일기 수정
    // cy.get('#headlessui-menu-button-\\:r8\\: > .block > path', { timeout: 30000 }).click();
    // cy.wait(3000);
    // cy.get('.diaryModifyButton', { timeout: 30000 }).click();
    // cy.wait(3000);
    // cy.get('[data-cy="saveDiaryButton"]', { timeout: 30000 }).click();
    // cy.get('.ml-3').click();
    // cy.get('[data-cy="uploadThumbnailButton"]', { timeout: 30000 }).click();
    // cy.wait(6000);
    // cy.get('.cursor-not-allowed').should('have.text', '썸네일 생성 완료👍', { timeout: 30000 });

    // cy.get('[data-cy="uploadDiaryButton"]', { timeout: 30000 }).click();
    // cy.get('[data-cy="closeSaveDiarySuccessModalButton"]', { timeout: 30000 }).click();

    // // 일기 삭제
    // cy.get('#headlessui-menu-button-\\:rk\\: > .block', { timeout: 30000 }).click();
    // cy.get('#headlessui-menu-item-\\:rn\\:', { timeout: 30000 }).click();
    // cy.wait(3000);
    // cy.get('[data-cy="deleteDiaryButton"]', { timeout: 30000 }).click();
    // cy.wait(3000);
    // cy.get('[data-cy="closeDiaryDeleteSuccessModalButton"]', { timeout: 30000 }).click();
  });

})