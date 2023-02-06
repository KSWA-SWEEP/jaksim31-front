describe('member test', () => {
  
  beforeEach(() => {
      // 로그인
      cy.visit('/home/landing');
      cy.wait(1500);
      cy.get('[data-cy="startButton"]', { timeout: 30000 }).click();
      cy.wait(1500);
      cy.get('[data-cy="loginModal"]').should('be.visible');
      cy.wait(1500);
  });

  it('check email', function() {
    cy.get('[data-cy="checkEmailButton"]', { timeout: 30000 }).click();
    cy.wait(1500);
    cy.get('[data-cy="isMemberEmailInput"]').clear();
    cy.get('[data-cy="isMemberEmailInput"]').type('qwerqwer');
    cy.get('.message').should('be.visible');
    cy.get('[data-cy="isMemberEmailInput"]').clear();
    cy.get('[data-cy="isMemberEmailInput"]').type('j_jonleur@naver.com');
    cy.get('.message').should('be.visible');
    cy.get('[data-cy="isMemberEmailInput"]').clear();
    cy.get('[data-cy="isMemberEmailInput"]').type('test@sweep.com');    
    cy.get('[data-cy="isMemberSubmitButton"]', { timeout: 30000 }).click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('가입된 계정입니다. 로그인 해주세요.')
    });
  });

  it('join', function() {
    cy.get('[data-cy="joinButton"]', { timeout: 30000 }).click();
    cy.wait(1500);
    cy.get('[data-cy="nameInput"]').clear();
    cy.get('[data-cy="nameInput"]').type('스윕');
    cy.get('[data-cy="validationEmailInput"]').clear();
    cy.get('[data-cy="validationEmailInput"]').type('qewrqewr');
    cy.get('.message').should('be.visible');
    cy.get('[data-cy="validationEmailInput"]').clear();
    cy.get('[data-cy="validationEmailInput"]').type('sweep@gmail.com');
    cy.get('[data-cy="sendEmailButton"]', { timeout: 30000 }).click();
    cy.get('.mt-3 > .text-xs').should('be.visible');
    cy.get('[data-cy="authCodeInput"]').click();
    cy.get('[data-cy="authCodeInput"]').clear();
    cy.get('[data-cy="authCodeInput"]').type('4080');
    cy.get('[data-cy="passwordInput"]').click();
    cy.get('[data-cy="passwordInput"]').clear();
    cy.get('[data-cy="passwordInput"]').type('qwr1234!');
    cy.get('[data-cy="passwordCheckInput"]').click();
    cy.get('[data-cy="passwordCheckInput"]').clear();
    cy.get('[data-cy="passwordCheckInput"]').type('qwr1234!');
  });

  it('worng password', function() {
    cy.get('[data-cy="loginEmailInput"]').clear();
    cy.get('[data-cy="loginEmailInput"]').type('test@sweep.com');
    cy.get('[data-cy="passwordInput"]').clear();
    cy.get('[data-cy="passwordInput"]').type('yj105102');
    cy.get('[data-cy="loginSubmitButton"]', { timeout: 30000 }).click();
    cy.wait(1500);
    
    cy.on('window:alert', (str) => {
      expect(str).to.equal('비밀번호를 잘못 입력하였습니다.😥')
    });

  });

  it('login & logout', function() {
    cy.get('[data-cy="loginEmailInput"]').clear();
    cy.get('[data-cy="loginEmailInput"]').type('test@sweep.com');
    cy.get('[data-cy="passwordInput"]').clear();
    cy.get('[data-cy="passwordInput"]').type('test1234!');
    cy.get('[data-cy="loginSubmitButton"]', { timeout: 30000 }).click();
    cy.wait(1500);
    
    cy.get('[data-cy="profileImageButton"]', { timeout: 30000 }).should('be.visible');
    cy.wait(3000);

    cy.get('[data-cy="profileImageButton"]', { timeout: 30000 }).click();
    cy.wait(1500);
    cy.get('[data-cy="logoutButton"]', { timeout: 30000 }).click();
  });
})