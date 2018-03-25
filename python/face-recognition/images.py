import os

print("%s , %s", % (os.path.dirname("."), __file__))

currentPath = os.path.dirname(__file__) # Absolute dir the script is in
filepath = "../images/" # The path where the pictures are uploaded
fileList = os.listdir(os.path.join(currentPath, filepath))
