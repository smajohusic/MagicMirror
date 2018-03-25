import os

print("%s", os.path.dirname())

currentPath = os.path.dirname(__file__) # Absolute dir the script is in
filepath = "../images/" # The path where the pictures are uploaded
fileList = os.listdir(os.path.join(currentPath, filepath))
