describe('User Login test', () => {
  
  beforeEach(() => {
      // 로그인
      cy.visit('/home/landing');
      cy.wait(1000);
      cy.get('[data-testid="startButton"]', { timeout: 30000 }).click();
      cy.wait(1000);
      cy.get('[data-testid="loginModal"]').should('be.visible');
  });

  it('check email', function() {
    cy.wait(1000);
    cy.get('[data-testid="checkEmailButton"]', { timeout: 30000 }).click();
    cy.wait(1000);
    cy.get('[data-testid="isMemberEmailInput"]').clear();
    cy.get('[data-testid="isMemberEmailInput"]').type('qwerqwer');
    cy.get('.message').should('be.visible');
    cy.get('[data-testid="isMemberEmailInput"]').clear();
    cy.get('[data-testid="isMemberEmailInput"]').type('abcd@sweep.com');
    cy.get('.message').should('be.visible');
    cy.get('[data-testid="isMemberEmailInput"]').clear();
    cy.get('[data-testid="isMemberEmailInput"]').type('test@sweep.com');    
    cy.get('[data-testid="isMemberSubmitButton"]', { timeout: 30000 }).click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('가입된 계정입니다. 로그인 해주세요.')
    });
  });

  it('join', function() {
    cy.wait(1000);
    cy.get('[data-testid="joinButton"]', { timeout: 30000 }).click();
    cy.wait(1000);
    cy.get('[data-testid="nameInput"]').clear();
    cy.get('[data-testid="nameInput"]').type('스윕');
    cy.get('[data-testid="validationEmailInput"]').clear();
    cy.get('[data-testid="validationEmailInput"]').type('qewrqewr');
    cy.get('.message').should('be.visible');
    cy.get('[data-testid="validationEmailInput"]').clear();
    cy.get('[data-testid="validationEmailInput"]').type('sweep@gmail.com');
    cy.get('[data-testid="sendEmailButton"]', { timeout: 30000 }).click();
    cy.wait(1000);
    cy.get('.mt-3 > .text-xs').should('be.visible');
    cy.get('[data-testid="authCodeInput"]').click();
    cy.get('[data-testid="authCodeInput"]').clear();
    cy.get('[data-testid="authCodeInput"]').type('4080');
    cy.get('[data-testid="passwordInput"]').click();
    cy.get('[data-testid="passwordInput"]').clear();
    cy.get('[data-testid="passwordInput"]').type('qwr1234!');
    cy.get('[data-testid="passwordCheckInput"]').click();
    cy.get('[data-testid="passwordCheckInput"]').clear();
    cy.get('[data-testid="passwordCheckInput"]').type('qwr1234!');
  });

  it('worng password', function() {
    cy.get('[data-testid="loginEmailInput"]').clear();
    cy.get('[data-testid="loginEmailInput"]').type('test@sweep.com');
    cy.get('[data-testid="passwordInput"]').clear();
    cy.get('[data-testid="passwordInput"]').type('yj105102');
    cy.get('[data-testid="loginSubmitButton"]', { timeout: 30000 }).click();
    cy.wait(1000);
    
    cy.on('window:alert', (str) => {
      expect(str).to.equal('비밀번호를 잘못 입력하였습니다.😥')
    });

  });

  it('login & logout', function() {
    cy.get('[data-testid="loginEmailInput"]').clear();
    cy.get('[data-testid="loginEmailInput"]').type('test@sweep.com');
    cy.get('[data-testid="passwordInput"]').clear();
    cy.get('[data-testid="passwordInput"]').type('test1234!');
    cy.get('[data-testid="loginSubmitButton"]', { timeout: 30000 }).click();
    cy.wait(3000);
    
    cy.get('[data-testid="profileImageButton"]', { timeout: 30000 }).should('be.visible');
    cy.wait(1500);

    cy.get('[data-testid="profileImageButton"]', { timeout: 30000 }).click();
    cy.wait(1000);
    cy.get('[data-testid="logoutButton"]', { timeout: 30000 }).click();
  });
})