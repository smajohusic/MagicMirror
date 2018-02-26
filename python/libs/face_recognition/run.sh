#!/bin/sh
docker run -it --rm -v `pwd`/code:/mnt/code -v `pwd`/images:/mnt/images --name face_recognitio face_recognition_python
