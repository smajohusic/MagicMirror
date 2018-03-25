import os
import configparser
import RPi.GPIO as GPIO

def detectMotion():
    detect = True

    while detect:
        input = GPIO.input(11)

        if input == 1:
            print("Something moved, start recognizing face")
            # Stop detecting motion
            detect = False
            # Start recognizing faces
            #recognizeFace()


# Start detecting motion
detectMotion()

