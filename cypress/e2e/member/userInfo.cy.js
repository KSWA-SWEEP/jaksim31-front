describe('User Info test', () => {
    
    beforeEach(() => {
        // 로그인
        cy.visit('/home/landing');
        cy.wait(1000);
        cy.get('[data-testid="startButton"]', { timeout: 30000 }).click();
        cy.wait(1000);
        cy.get('[data-testid="loginModal"]').should('be.visible');
        cy.get('[data-testid="loginEmailInput"]').clear();
        cy.get('[data-testid="loginEmailInput"]').type('test@sweep.com');
        cy.get('[data-testid="passwordInput"]').clear();
        cy.get('[data-testid="passwordInput"]').type('test1234!');
        cy.get('[data-testid="loginSubmitButton"]', { timeout: 30000 }).click();
        cy.wait(1000); 
    });

    it('Check & Change member info', function() {
        
        cy.get('[data-testid="profileImageButton"]', { timeout: 30000 }).click();
        cy.wait(1000); 
        cy.get('[data-testid="myPageButton"]', { timeout: 30000 }).click();
        cy.wait(1000); 

        // 사용자 이름 변경
        cy.get('[data-testid="editProfileNameButton"]', { timeout: 30000 }).click();
        cy.get('[data-testid="profileNameInput"]').clear();
        cy.get('[data-testid="profileNameInput"]').type('스윕😀');
        cy.get('[data-testid="changeProfileInfoButton"]').click();
        cy.wait(1000);


        // 비밀번호 변경
        cy.get('[data-testid="changePasswordButton"]', { timeout: 30000 }).click();
        cy.wait(1000); 
        cy.get('[data-testid="currentPasswordInput"]').clear();
        cy.get('[data-testid="currentPasswordInput"]').type('test1234!');
        cy.get('[data-testid="newPasswordInput"]').clear();
        cy.get('[data-testid="newPasswordInput"]').type('test1234!!');
        cy.get('[data-testid="passwordCheckInput"]').clear();
        cy.get('[data-testid="passwordCheckInput"]').type('test1234!!');
        cy.get('[data-testid="changePasswordSubmitButton"]').click();
        cy.wait(1000);

        cy.visit('/diary/dashboard');
        cy.wait(1000);

        // 로그아웃
        cy.get('[data-testid="profileImageButton"]', { timeout: 30000 }).click();
        cy.wait(1000);
        cy.get('[data-testid="logoutButton"]', { timeout: 30000 }).click();
        cy.wait(1000);
        cy.wait(1000);

        // 변경한 비밀번호로 로그인
        cy.get('[data-testid="startButton"]', { timeout: 30000 }).click();
        cy.wait(1000);
        cy.get('[data-testid="loginEmailInput"]').clear();
        cy.get('[data-testid="loginEmailInput"]').type('test@sweep.com');
        cy.get('[data-testid="passwordInput"]').clear();
        cy.get('[data-testid="passwordInput"]').type('test1234!!');
        cy.get('[data-testid="loginSubmitButton"]', { timeout: 30000 }).click();
        cy.wait(1000);

        cy.get('[data-testid="profileImageButton"]', { timeout: 30000 }).click();
        cy.get('[data-testid="myPageButton"]').click();

        // 비밀번호 다시 원래대로 변경
        cy.get('[data-testid="changePasswordButton"]', { timeout: 30000 }).click();
        cy.wait(1000); 
        cy.get('[data-testid="currentPasswordInput"]').clear();
        cy.get('[data-testid="currentPasswordInput"]').type('test1234!!');
        cy.get('[data-testid="newPasswordInput"]').clear();
        cy.get('[data-testid="newPasswordInput"]').type('test1234!');
        cy.get('[data-testid="passwordCheckInput"]').clear();
        cy.get('[data-testid="passwordCheckInput"]').type('test1234!');
        cy.get('[data-testid="changePasswordSubmitButton"]', { timeout: 30000 }).click();
        cy.wait(1000);
    });
  
  })