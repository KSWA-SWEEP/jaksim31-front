describe('Diary Save Test', () => {

  // 일기 저장
  it('diarySave', function() {
    // 로그인
    cy.visit('/home/landing');
    cy.wait(1000);
    cy.get('[data-testid="title"]', { timeout: 30000 }).should('be.visible');
    cy.get('[data-testid="startButton"]', { timeout: 30000 }).click();
    cy.wait(1000);
    cy.get('[data-testid="loginModal"]').should('be.visible');
    cy.get('[data-testid="loginEmailInput"]').clear();
    cy.get('[data-testid="loginEmailInput"]').type('test@sweep.com');
    cy.get('[data-testid="passwordInput"]').clear();
    cy.get('[data-testid="passwordInput"]').type('test1234!');
    cy.wait(1000);
    cy.get('[data-testid="loginSubmitButton"]', { timeout: 30000 }).click();

    // 오늘 일기 쓰기 페이지로 이동
    cy.wait(1500);
    cy.get('[data-testid="drawerButton"]', { timeout: 30000 }).should('be.visible');
    cy.wait(1500);
    cy.get('[data-testid="drawerButton"]', { timeout: 30000 }).click();
    cy.wait(1000);
    cy.get('li[data-testid="📇  오늘의 일기 쓰기"] > [data-testid="📇  오늘의 일기 쓰기"]', { timeout: 30000 }).click();
    cy.wait(1500);


    // editor 활성화될때까지 대기
    cy.get('.ck-editor__editable', { timeout: 30000 }).should('be.visible');
    cy.wait(1500);

    // 일기 저장하기 버튼 클릭
    cy.get('[data-testid="saveDiaryButton"]', { timeout: 30000 }).click();
    cy.get('[data-testid="uploadThumbnailButton"]', { timeout: 30000 }).click();
    cy.wait(5000);
    cy.get('.cursor-not-allowed').should('have.text', '썸네일 생성 완료👍', { timeout: 30000 });
    cy.get('[data-testid="uploadDiaryButton"]', { timeout: 30000 }).click();
    cy.get('[data-testid="closeSaveDiarySuccessModalButton"]', { timeout: 30000 }).click();
    cy.wait(1500);

  });

})