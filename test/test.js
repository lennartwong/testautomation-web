const {By, Builder} = require('selenium-webdriver');
const assert = require("assert");
const path = require('path');
const fs = require('fs');
const testlogPath = path.resolve(__dirname, 'testlog.txt');

// ******
//  TEST 
// ******

// Following are the tests.  Each test will run   3 times for each supported browser.
// Current tests:
// - Login UI should display
// - Login with valid credential
// - Login with invalid credential (valid password but invalid email)
// - Login with invalid credential (valid email but invalid password)
// - Clicking user icon should display logout button
// - Clicking Logout should log user out

// Provide browser and timeout input for different iteration
// browser - the string use by Selenium to load the correct browser
// timeout - default timeout set for the test.  We can tweak this number later depends on the test machines that will run the tests.  Also, as we improve the logging system, we can reduce the timeout needed.
inputs = 
[
  {'browser': 'chrome', 'timeout': 5000},
  {'browser': 'firefox', 'timeout': 5000},
  {'browser': 'MicrosoftEdge', 'timeout': 5000}
]

inputs.forEach(function(input) 
{
  describe('UI Tests', function () 
  {
    Log('Begin UI tests...\n', false);
    this.timeout(input.timeout);
  
    beforeEach(async () =>
    {
      Log(`\nStart of UI test for browser ${input.browser}`);
        await LoadPage(input.browser);
    });
  
    afterEach(async () =>
    {
      Log('Close the browser');
      await CloseBrowser();
    });
  
    describe('Login Tests', function () 
    {
      it('should display login UI', async () => {
        Log('Login Test - should display login UI');
        await AssertLoginUiDisplay('display: flex;');
      })
      it('should display content with valid credential', async () =>  
      {
        Log('Login Test - should display content with valid credential');
        await LoginAttempt('admin@admin.com', '2020');
        await AssertContentDisplay('display: flex;');
        await AssertLoginUiDisplay('display: none;');
      });
  
      it('should NOT display content with invalid user email', async () =>
      {
        Log('Login Test - should NOT display content with invalid user email');
        await LoginAttempt('badadmin@admin.com', '2020');
        await AssertContentDisplay('display: none;');
        await AssertLoginUiDisplay('display: flex;');
      });
  
      it('should NOT display content with invalid password', async () =>
      {
        Log('Login Test - should NOT display content with invalid password');
        await LoginAttempt('admin@admin.com', 'bad password');
        await AssertContentDisplay('display: none;');
        await AssertLoginUiDisplay('display: flex;');
      });
    });
  
    describe('Logout Tests', function ()
    {
      it('should display logout button when user icon is clicked', async () =>
      {
        Log('Logout Test - should display logout button when user icon is clicked');
        await LoginAttempt('admin@admin.com', '2020');
        await ClickUserIcon();
        await AssertLogOutDisplay('display: flex;');
      });
  
      it('should go back to home when log out', async () =>
      {
        Log('Logout Test - should go back to home when log out');
        await LoginAttempt('admin@admin.com', '2020');
        await ClickUserIcon();
        await LogoutAttempt('display: flex;');
        await AssertContentDisplay('display: none;');
      });
    });
  });
});


// ****************
// HELPER FUNCTIONS
// ****************

// Launch browser and load index.html
// param:
// browser - browser type, such as chrome, firefox, etc
// headless - determine running a test in headless or headed mode.  Default is headless
async function LoadPage(browser, headless = true)
{
  const chrome = require('selenium-webdriver/chrome');
  const firefox = require('selenium-webdriver/firefox');
  const edge = require('selenium-webdriver/edge');
  if (headless)
  {
    driver = await new Builder().forBrowser(browser).setChromeOptions(new chrome.Options().headless())
                                                    .setFirefoxOptions(new firefox.Options().headless())
                                                    .setEdgeOptions(new edge.Options().headless())
                                                    .build();
  }
  else
  {
    driver = await new Builder().forBrowser(browser).build();
  }

  indexPath = path.resolve(__dirname, '..', 'index.html');
  await driver.get(indexPath);
  Log(`Opened index html from ${indexPath}`);
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
  let email = await driver.findElement(By.id('email'));
  await email.sendKeys(enterEmail);
   let password = await driver.findElement(By.id('password'));
  await password.sendKeys(enterPassword);

  let submitButton = await driver.findElement(By.className('btn-login'));
  await submitButton.click();
}

// Attempt to log out user
async function LogoutAttempt() 
{
  let logout = await driver.findElement(By.className('logout'));
  await logout.click();
}

// Click the user icon so that we can see the logout button
async function ClickUserIcon()
{
  let userIcon = await driver.findElement(By.className('user'));
  await userIcon.click();
}

// Assert the content display style
// Note: Current purpose is to determine if the content is show or not .
async function AssertContentDisplay(expected)
{
  let content = await driver.findElement(By.className('content'));
  let style = await content.getAttribute('style');

  if (expected == style)
  {
    Log('PASSED -- Content was displayed/hidden as expected');
    assert.ok('Content was displayed/hidden as expected');
  }
  else
  {
    Log('FAILED -- Content was NOT displayed/hidden as expected');
    assert.fail('Content was NOT displayed/hidden as expected');
  }
}

// Assert the login UI display style
// Note: Current purpose is to determine if the login UI is show or not .
async function AssertLoginUiDisplay(expected)
{
  let loginUi = await driver.findElement(By.className('login'));
  let style = await loginUi.getAttribute('style');

  if (expected == style)
  {
    Log('PASSED -- Login UI was displayed/hidden as expected');
    assert.ok('Login UI was displayed/hidden as expected');
  }
  else
  {
    Log('FAILED -- Login UI was NOT displayed/hidden as expected');
    assert.fail('Login UI was NOT displayed/hidden as expected');
  }
}

// Assert the LogOut button is displaying
async function AssertLogOutDisplay(expected)
{
  let logout = await driver.findElement(By.className('logout'));
  let style = await logout.getAttribute('style');

  if (style.indexOf(expected) >= 0)
  {
    Log('PASSED -- Logout button is displayed/hidden as expected');
    assert.ok('Logout button is displayed/hidden as expected');
  }
  else
  {
    Log('FAILED -- Logout button was NOT displayed/hidden as expected');
    assert.fail('Logout button was NOTE displayed/hidden as expected');
  }
}

// Write to log file
function Log(message, append = true)
{
  if(append)
  {
    fs.writeFileSync(testlogPath, `${message}\n`, {flag: 'a+'}, (err) => {});
  }
  else
  {
    fs.writeFileSync(testlogPath, `${message}\n`, (err) => {});
  }
}


