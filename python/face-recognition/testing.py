import os
import configparser
import RPi.GPIO as GPIO

# Initilize and set the GPIO
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(11, GPIO.IN) #Read output from PIR motion sensor
GPIO.setup(3, GPIO.OUT) #LED output pin

def detectMotion():
    detect = True

    while detect:
        input = GPIO.input(11)

        if input == 1:
            print("Something moved, start recognizing face")
            # Stop detecting motion
            detect = False
            detectMotion()


# Start detecting motion
detectMotion()

