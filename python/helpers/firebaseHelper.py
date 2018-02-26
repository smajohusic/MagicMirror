import configparser
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# Define globalVariables
globalUserId = None

'''
Init is the first function that is run. Is responsible to set the userId that
is sent from recognition.py and authenticating the database connection to firebase
'''

def init(userId):
    # Get access to the global user id variable and set it
    global globalUserid
    globalUserId = userId
    #Authenticate the database connection to your current database
    authenticate(credentials)

'''
Authenticate your user against firebase
Needs error handling, if authenication fails, it needs to return a message to
the user or something like that
'''

def authenticate(credentials):
    databaseURL = getConfig('firebase', 'databaseUrl');

    # Authenticate user against firebase
    credentials = credentials.Certificate('firebase_alice.json')
    default_app = firebase_admin.initialize_app(credentials, {
        'databaseURL': databaseURL
    })

'''
Helper function to get values from the config file
'''

def getConfig(section, name):
    config = configparser.ConfigParser()
    config.read('config.txt')
    return config.get(section, name)

'''
Update the current user with firebase and patch method
'''

def updateCurrentUser(id):
    reference = db.reference('recognized_user')
    reference.update({
        'currentUser': id
    })

def getCurrentUserFromDatabase():
    reference = db.reference('recognized_user')
    return reference.get()['currentUser']
