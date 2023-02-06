describe('Diary Edit Test', () => {

    beforeEach(() => {
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

        // 일기 목록 페이지로 이동 
        cy.wait(3000);
        cy.get('[data-cy="drawerButton"]', { timeout: 30000 }).should('be.visible');
        cy.wait(3000);
        cy.get('[data-cy="drawerButton"]', { timeout: 30000 }).click();
        cy.wait(1500);
        cy.get('[data-cy="📅  일기 목록"] > .w-full', { timeout: 30000 }).click();
        cy.wait(1500);
        
        // 썸네일 목록으로 이동
        cy.get('[data-cy="gridListTab"]', { timeout: 30000 }).should('be.visible');
        cy.get('[data-cy="gridListTab"]', { timeout: 30000 }).click();
        cy.wait(3000);
    });

    it('Modify Diary', function() {
        
        // 일기 수정        
        cy.get('.diaryMenuButton', { timeout: 30000 }).click();
        cy.wait(1500);
        cy.get('.diaryModifyButton', { timeout: 30000 }).click();
        cy.wait(3000);
        cy.get('[data-cy="saveDiaryButton"]', { timeout: 30000 }).click();
        cy.wait(3000);
        cy.get('[data-cy="saveDiaryModal"]', { timeout: 30000 }).should('be.visible');
        cy.get('[data-cy="getNewThumbnailButton"]', { timeout: 30000 }).click();
        cy.get('[data-cy="uploadThumbnailButton"]', { timeout: 30000 }).click();
        cy.wait(6000);
        cy.get('.cursor-not-allowed').should('have.text', '썸네일 생성 완료👍', { timeout: 30000 });
        
        cy.get('[data-cy="uploadDiaryButton"]', { timeout: 30000 }).click();
        cy.wait(3000);
        cy.get('[data-cy="closeSaveDiarySuccessModalButton"]', { timeout: 30000 }).click();
        cy.wait(3000);

    });

    it('Delete Diary', function() {

        // 일기 삭제
        cy.get('.diaryMenuButton', { timeout: 30000 }).click();
        cy.wait(1500);
        cy.get('.diaryDeleteButton', { timeout: 30000 }).click();
        cy.wait(1500);
        cy.get('[data-cy="deleteDiaryButton"]', { timeout: 30000 }).click();
        cy.wait(3000);
        cy.get('[data-cy="closeDiaryDeleteSuccessModalButton"]', { timeout: 30000 }).click();
        cy.wait(3000);
    });
})