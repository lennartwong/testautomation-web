# Bugs

I am logging a couple of bugs here to demonstrate how I would log a bug.

#### Bug #1

###### Title:
It is not a secured login system
###### Category: 
Security
###### Description:
There are a few reason the login system is not secured.  First, the js files are visible from the dev console.  Therefore, anyone can look at the email and password in plain text.
Second, anyone can just do a "localStorage.setItem('logged', 'abcde')" and then "checklogged()" on the dev console.  And they will be logged in.
###### Priority
1
###### Severity
1

#### Bug #2

###### Title: 
The login page doesn't provide any visual indication if login has failed
###### Category:
Functionality
###### Description:
When user provided incorrect credential and pressed the LOGIN button, nothing will happen.  It is not a good user experience.  I suggest that we provide an error message telling the user they have entered an invalid credential.
###### Repro Steps:
    1) Load the login page
    2) Enter some invalid credential
    3) Press LOGIN
    Expected
    - A message letting the user know the login has failed.
    Observed
    - Nothing happened.  User is left to wonder what is going on.
###### Priority
2
###### Severity
2

#### Bug #3

###### Title:
Pressing ENTER at the Password textbox doesn't log in the user
###### Category:
Accessibility
###### Description:
It would be nice if a keyboard-only user can login by pressing ENTER immediately after they enter the password.  Right now, they have to tab again to the LOGIN button before they can login using the ENTER key.  The extra tab is not a big deal but it would be a nicer user experience if we don't require the extra tab
###### Repro Steps:
    1) Load the login page
    2) Navigate to the User email
    3) Input email
    4) Tab
    5) Input password
    6) Without pressing tab to the LOGIN button, press ENTER
    Expected
    - User is logged in
    Observed
    - Nothing happened
###### Priority
3
###### Severity
4