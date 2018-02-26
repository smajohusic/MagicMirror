import face_recognition
import os
import picamera
import numpy as np
from firebase import firebase

# Authenticate user against firebase
SECRET = '1ypbewNoeUIoAdfVJDcFW8XlhNI4xPSBdnnlnIP6'
DSN = 'https://alice-188216.firebaseio.com/'
EMAIL = 'smajohusic@gmail.com'
authentication = firebase.FirebaseAuthentication(SECRET,EMAIL, True, True)

# Is used to temporarly store current user
currentUser = None

# Is used for database actions
# The url needs to go to a config or something
firebase = firebase.FirebaseApplication(DSN, authentication)

def isCurrentUserSameAsRecognizedUser(userId):
    if userId == currentUser:
        return true
    else:
        return false

def updateCurrentUser(userId):
    # Update the local variable storing the user id
    currentUser = userId

    # Get the user information from database
    return firebase.get("/users", userId)


currentPath = os.path.dirname(__file__) # Absolute dir the script is in
filepath = "../tests/test_images/smajohusic/" # The path where the pictures are uploaded
fileList = os.listdir(os.path.join(currentPath, filepath));

# Get a reference to the Raspberry Pi camera.
camera = picamera.PiCamera()
camera.resolution = (320, 240)
output = np.empty((240, 320, 3), dtype=np.uint8)

imageFiles = []
knownFaces = []
userIds = []

print("Fetching all the images that are used to recognize persons")

# Load all images and add them to the imageFiles array
for image in fileList:
    imageFiles.append(face_recognition.load_image_file(filepath + image))

    # Build the userIds to use later to find the correct user id based on the face recognition
    # Only supports one integer as userId
    if image.find("#") != -1:
        userIds.append(image.split("#")[1][:1])
    else:
        userIds.append("Unknown user id")

print("Encoding the images that were found")

# Get all the encodings of the images we found and add them to knownFaces array
for image in imageFiles:
    # But since I know each image only has one face, I only care about the first encoding in each image, so I grab index 0.
    knownFaces.append(face_recognition.face_encodings(image)[0])

# Initialize some variables
camera_face_locations = []
camera_face_encodings = []

print("Ready to recognize faces")

camera.vflip = True
camera.brightness = 85
camera.start_preview()

while True:
    # Grab a single frame of video from the RPi camera as a numpy array
    camera.capture(output, format="rgb")

    # Find all the faces and face encodings in the current frame of video
    camera_face_locations = face_recognition.face_locations(output)
    camera_face_encodings = face_recognition.face_encodings(output, camera_face_locations)

    # Loop over each face found in the frame to see if it's someone we know.
    for face_encoding in camera_face_encodings:
        # See if the face is a match for the known face(s)
        match = face_recognition.compare_faces(knownFaces, face_encoding)
        name = "<Unknown Person>"

        print(match)

        if match[0]:
            name = "Smajo Husic"

            # Somehow we need to know what picture triggered the match = true. When we know this, we also know which user id to get

        print("I see someone named {}!".format(name))

camera.stop_preview()
