# Test Cases
I am documenting a few test cases here to demonstrate how I would author a test case

#### Case #1

###### Title:
User can log in using valid credential
###### Description:
When a user entered valid email and password and press LOGIN, the user will be logged in successfully to the system.
###### Steps:
    1) Load login page
    2) Enter a valid email
    3) Enter a matching valid password
    4) Press LOGIN
    Expected
    - The content page is displayed
    - The login UI is hidden
###### Priority
1
###### Need to be automated
Yes
###### Automated
Yes

#### Case #2

###### Title:
User can log out using the Sign Out button
###### Description:
When a user click the Sign Out button, the user will be logged out to the system.
###### Steps:
    1) Login
    2) Click the User icon
    3) Click Sign Out button
    Expected
    - The content page is hidden
    - The login UI is displayed
###### Priority
1
###### Need to be automated
Yes
###### Automated
Yes

#### Case #3

###### Title: 
Login should work for all supported browsers
###### Description:
User can log in using any of our officially supported browsers
###### Steps:
    1) Launch Google Chrome
    2) Attempt to log in with valid credential
    3) Repeat step 1 and 2 with Firefox and Microsoft Edge
    Expected
    - Log in is successful with all supported browsers
###### Priority
1
###### Need to be automated
Yes
###### Automated
Yes
