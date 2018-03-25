import os
import configparser

def recognizeForAmount():
    minutes = getConfig('recognition', 'minutesToRecognize') #returns minutes
    return minutes * 60

def getConfig(section, name):
    config = configparser.ConfigParser()
    config.read('config/config.txt')
    return config.get(section, name)


configVal = recognizeForAmount()

print("%s", configVal)


