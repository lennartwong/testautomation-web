# Read Me First

## Thank You
First of all, thank you very much for giving me the opportunity to do this assignment.  It is a lot of fun.  I really enjoy the exercise where I have to think about what I want to do, facilitate my computer and my GitHub/Azure account to handle the work, and do the work.  

## Explanation of the result
There are basically three components in my submitted work.  
Please allow me to explain my work here.
- Automated test
- A CI/CD pipeline for deployment
- Test documentation

## Automated test

I have created 6 automated tests that will be run for 3 browsers, total 18 test executions.  To run this, you will have to install the following
- Selenium WebDriver (https://www.selenium.dev/documentation/webdriver/)
- Node.Js (https://nodejs.org/en)
- Mocha (https://mochajs.org/)

The tests as well as the helper functions are located in the test/test.js file.

After the test are run, a test/testlog.txt file will be created.  This is the test log.

The tests are commented clearly as well as the helper functions.  You should have no problem understanding what the code is doing.

Please note this.  I understand that checking the display style is not a good way for login verification.  However, based on the implementation of the login system, this is what I could do at the moment.

## CI/CD pipeline for deployment

I have created a Azure static website to host this assignment (https://blue-mud-03d13a903.4.azurestaticapps.net/).  The code is stored in my GitHub repository (https://github.com/lennartwong/testautomation-web/tree/main).  A GitHub Action workflow is created to deploy the code.  It will get triggered whenever new changes are push to the repo (https://github.com/lennartwong/testautomation-web/actions/workflows/azure-static-web-apps-blue-mud-03d13a903.yml).


# Future Improvement
Here is a list of items that I can do if I have more time

- Normally, the browser type should be part of the configuration passed by the CI/CD pipeline, or at least defined in a config file of a test project (the tests would be in the test project instead of being in the main project).
- This system is very simple.  Therefore, I decided that unit tests are not necessary.  However, I think arguably, I cah add one unit test to verify logIn() will update the localStorage.  I probably will add that test if I have more time.
- The test.js is not too long right now.  However, if I continue to work on adding more tests, I would separate the code into test.js and helper.js.  Therefore, the test code will be in one file, while the helper functions will be in a different file.
- The logging system isn't the best.  I would like to improve it.  Maybe look for some 3rd party library or system that can make it better.

# Assumption
- I am assuming or pretending that the officially supported browsers are Chrome, Firefox and Microsoft Edge.  

