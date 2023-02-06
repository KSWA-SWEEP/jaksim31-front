describe('member test', () => {
    
    beforeEach(() => {
        // 로그인
        cy.visit('/home/landing');
        cy.wait(1500);
        cy.get('[data-cy="startButton"]', { timeout: 30000 }).click();
        cy.wait(1500);
        cy.get('[data-cy="loginModal"]').should('be.visible');
        cy.get('[data-cy="loginEmailInput"]').clear();
        cy.get('[data-cy="loginEmailInput"]').type('test@sweep.com');
        cy.get('[data-cy="passwordInput"]').clear();
        cy.get('[data-cy="passwordInput"]').type('test1234!');
        cy.get('[data-cy="loginSubmitButton"]', { timeout: 30000 }).click();
        cy.wait(1500); 
    });

    it('Check & Change member info', function() {
        
        cy.get('[data-cy="profileImageButton"]', { timeout: 30000 }).click();
        cy.wait(1500); 
        cy.get('[data-cy="myPageButton"]', { timeout: 30000 }).click();
        cy.wait(1500); 

        // 사용자 이름 변경
        cy.get('[data-cy="editProfileNameButton"]', { timeout: 30000 }).click();
        cy.get('[data-cy="profileNameInput"]').clear();
        cy.get('[data-cy="profileNameInput"]').type('스윕😀');
        cy.get('[data-cy="changeProfileInfoButton"]').click();
        // cy.on('window:alert', (str) => {
        //   expect(str).to.equal('개인정보가 수정되었습니다 😊')
        // });
        cy.wait(1500);


        // 비밀번호 변경
        cy.get('[data-cy="changePasswordButton"]', { timeout: 30000 }).click();
        cy.wait(1500); 
        cy.get('[data-cy="currentPasswordInput"]').clear();
        cy.get('[data-cy="currentPasswordInput"]').type('test1234!');
        cy.get('[data-cy="newPasswordInput"]').clear();
        cy.get('[data-cy="newPasswordInput"]').type('test1234!!');
        cy.get('[data-cy="passwordCheckInput"]').clear();
        cy.get('[data-cy="passwordCheckInput"]').type('test1234!!');
        cy.get('[data-cy="changePasswordSubmitButton"]').click();
        // cy.on('window:alert', (str) => {
        //   expect(str).to.equal('비밀번호가 변경되었습니다 😊')
        // });
        cy.wait(1500);

        cy.visit('/diary/dashboard');
        cy.wait(1500);

        // 로그아웃
        cy.get('[data-cy="profileImageButton"]', { timeout: 30000 }).click();
        cy.wait(1500);
        cy.get('[data-cy="logoutButton"]', { timeout: 30000 }).click();
        cy.wait(1500);
        // cy.on('window:alert', (str) => {
        //   expect(str).to.equal('로그아웃 되었습니다 😊')
        // });
        cy.wait(1500);

        // 변경한 비밀번호로 로그인
        cy.get('[data-cy="startButton"]', { timeout: 30000 }).click();
        cy.wait(1500);
        cy.get('[data-cy="loginEmailInput"]').clear();
        cy.get('[data-cy="loginEmailInput"]').type('test@sweep.com');
        cy.get('[data-cy="passwordInput"]').clear();
        cy.get('[data-cy="passwordInput"]').type('test1234!!');
        cy.get('[data-cy="loginSubmitButton"]', { timeout: 30000 }).click();
        cy.wait(1500);

        cy.get('[data-cy="profileImageButton"]', { timeout: 30000 }).click();
        cy.get('[data-cy="myPageButton"]').click();

        // 비밀번호 다시 원래대로 변경
        cy.get('[data-cy="changePasswordButton"]', { timeout: 30000 }).click();
        cy.wait(1500); 
        cy.get('[data-cy="currentPasswordInput"]').clear();
        cy.get('[data-cy="currentPasswordInput"]').type('test1234!!');
        cy.get('[data-cy="newPasswordInput"]').clear();
        cy.get('[data-cy="newPasswordInput"]').type('test1234!');
        cy.get('[data-cy="passwordCheckInput"]').clear();
        cy.get('[data-cy="passwordCheckInput"]').type('test1234!');
        cy.get('[data-cy="changePasswordSubmitButton"]', { timeout: 30000 }).click();
        // cy.on('window:alert', (str) => {
        //   expect(str).to.equal('비밀번호가 변경되었습니다 😊')
        // });
        cy.wait(1500);
    });
  
  })