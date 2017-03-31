#Secure Software Engineering - Software Sample

##The Goal:
    To get a better understanding of how you program and work, this sample program is designed to let you show off your use of design patterns and secure coding knowledge. 

    The project is (relatively) simple, and designed to be completed in just a few hours. There are a couple of interesting ways that you can solve this.

##Ground Rules:
     * Use whatever language you are most comfortable in.
     * leverage frameworks & open source as you see fit, but be prepared to justify your choices.
     * Everything here is fictional, but based on real problems we deal with in secure coding

##Setup:
    There is a small sample flask app included here. To get it running, install python on your local machine, and using a command prompt head into that directory. This was tested with python 3.5, but it should work on python2

    To install flask:
    pip install -r requirements.txt
    to run the web server:
    python server.py

    Open a web browser and browse to:
    http://localhost:8085/168
    You should see some random looking data come back.

    Try:
    http://localhost:8085/167
    and you should see a 404 error

##The Challenge:
    A product team has released a new proprietary device, and we need to write a custom program to fuzz test it. Fuzzing is the practice of trying a large range of values against a system to see what happens or to enumerate possiblities.

    In this case we have a sample web server that will return some data when the right value is passed in. The team wasn't sure what kind of data was being sent, or how sensitive it was. I suspect that they have two things we should search for based on their architecture:

     * Private key files
     * password data

    So your task is to build the following app:
     1. Find out what values the web server will return on. Checking at least for values 0-1000 would be a good start. print or save these for later use.
     2. For each value, see if it looks like a private key, and if so, print out or save the input value and private key information
     3. For each value, see if it matches a likely password. Passwords for the system are always exactly 8 characters long, consist of only lowercase letters and numbers, and have no other characters. If you find a likely password, print or store it out along with the input value.

    There are going to be more tests we need to write to check for other kinds of data in the near future, so make sure the design makes it easy to add more tests. Eventually, we will want to use this tool to interactively search potential problematic data. Some future tests may be much more complicated to test than what we are looking for in this sample, so please design with this in mind.

## Submission
    Send a web link to your source code or email a zip file of your solution with instruction on how to run it locally. If email is used, please also include a list of the expected files in the email body - source code may be automatically stripped from emails.