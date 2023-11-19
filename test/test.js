const {By, Builder} = require('selenium-webdriver');
const assert = require("assert");

// Launch browser and load index.html
// param:
// browser - browser type, such as chrome, firefox, etc
async function LoadPage(browser)
{
  try
  {
    driver = await new Builder().forBrowser(browser).build();
    await driver.get('file:///C:/Users/lenyy/Documents/Code/GitHub/testautomation-web/index.html');
  }
  catch (e)
  {
    console.log(e);
  }
}

// Close browser
async function CloseBrowser()
{
  await driver.quit();
}

// Attempt to login using provided email and password
// param: 
// enterEmail - user email address
// enterPassword - user password
async function LoginAttempt(enterEmail, enterPassword) 
{
  try {
    let email = await driver.findElement(By.id('email'));
    await email.sendKeys(enterEmail);

    let password = await driver.findElement(By.id('password'));
    await password.sendKeys(enterPassword);
  
    let submitButton = await driver.findElement(By.className('btn-login'));
    await submitButton.click();
  } 
  catch (e) 
  {
    console.log(e)
  } 
}

// Attempt to log out user
async function LogoutAttempt() 
{
  try 
  {
    let logout = await driver.findElement(By.className('logout'));
    await logout.click();
  } 
  catch (e) 
  {
    console.log(e)
  }
}

// Click the user icon so that we can see the logout button
async function ClickUserIcon()
{
  try
  {
    let userIcon = await driver.findElement(By.className('user'));
    await userIcon.click();
  }
  catch (e) 
  {
    console.log(e)
  }
}

// Assert the content display style
// Note: Current purpose is to determine if the content is show or not .
async function AssertContentDisplay(expected)
{
  let content = await driver.findElement(By.id('content'));
  let style = await content.getAttribute('style');

  assert.equal(expected, style);
}

// Assert the LogOut button is displaying
async function AssertLogOutDisplay(expected)
{
  let logout = await driver.findElement(By.className('logout'));
  let style = await logout.getAttribute('style');

  assert.ok(style.indexOf("display: flex;") >= 0)
}

// Following are the tests.  Each test will run 3 times for each supported browser.
// Current tests:
// - Login with valid credential
// - Login with invalid credential (valid password but invalid email)
// - Login with invalid credential (valid email but invalid password)
// - Clicking user icon should display logout button
// - Clicking Logout should log user out

inputs = 
[
  {'browser': 'chrome'},
  {'browser': 'firefox'},
  {'browser': 'MicrosoftEdge'}
]
inputs.forEach(function(input) 
{
  describe('UI Tests', function () 
  {
    
    this.timeout(5000);
  
    beforeEach(async () =>
    {
      await LoadPage(input.browser);
    });
  
    afterEach(async () =>
    {
      await CloseBrowser();
    });
  
    describe('Login Tests', function () 
    {
      it('should display content with valid credential', async () =>  
      {
        await LoginAttempt('admin@admin.com', '2020');
        await AssertContentDisplay('display: flex;')
      });
  
      it('should NOT display content with invalid user email', async () =>
      {
        await LoginAttempt('badadmin@admin.com', '2020');
        await AssertContentDisplay('display: none;')
      });
  
      it('should NOT display content with invalid password', async () =>
      {
        await LoginAttempt('admin@admin.com', 'bad password');
        await AssertContentDisplay('display: none;')
      });
    });
  
    describe('Logout Tests', function ()
    {
      it('should display logout button when user icon is clicked', async () =>
      {
        await LoginAttempt('admin@admin.com', '2020');
        await ClickUserIcon();
        await AssertLogOutDisplay();
      });
  
      it('should go back to home when log out', async () =>
      {
        await LoginAttempt('admin@admin.com', '2020');
        await ClickUserIcon();
        await LogoutAttempt();
        await AssertContentDisplay('display: none;')
      });
    });
  });
});
