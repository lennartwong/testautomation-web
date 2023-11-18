const {By, Builder} = require('selenium-webdriver');
const assert = require("assert");

async function LoadPage()
{
  try
  {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('file:///C:/Users/lenyy/Documents/Code/GitHub/testautomation-web/index.html');
  }
  catch (e)
  {
    console.log(e);
  }
}

async function CloseBrowser()
{
  await driver.quit();
}

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

async function VerifyContentDisplay(expected)
{
  let content = await driver.findElement(By.id('content'));
  let style = await content.getAttribute('style');

  assert.equal(expected, style);
}

async function VerifyLogOutDisplay(expected)
{
  let logout = await driver.findElement(By.className('logout'));
  let style = await logout.getAttribute('style');

  assert.ok(style.indexOf("display: flex;") >= 0)
}

describe('UI Tests', function () 
{
  describe('Login Tests', function () 
  {
    it('should display content with valid credential', async () =>  
    {
      await LoadPage();
      await LoginAttempt('admin@admin.com', '2020');
      await VerifyContentDisplay('display: flex;')
      await CloseBrowser();
    });

    it('should NOT display content with invalid user email', async () =>
    {
      await LoadPage();
      await LoginAttempt('badadmin@admin.com', '2020');
      await VerifyContentDisplay('display: none;')
      await CloseBrowser();
    });

    it('should NOT display content with invalid password', async () =>
    {
      await LoadPage();
      await LoginAttempt('admin@admin.com', 'bad password');
      await VerifyContentDisplay('display: none;')
      await CloseBrowser();
    });
  });

  describe('Logout Tests', function ()
  {
    it('should display logout button when user icon is clicked', async () =>
    {
      await LoadPage();
      await LoginAttempt('admin@admin.com', '2020');
      await ClickUserIcon();
      await VerifyLogOutDisplay();
      await CloseBrowser();
    });

    it('should go back to home when log out', async () =>
    {
      await LoadPage();
      await LoginAttempt('admin@admin.com', '2020');
      await ClickUserIcon();
      await LogoutAttempt();
      await VerifyContentDisplay('display: none;')
      await CloseBrowser();
    });
  });
});