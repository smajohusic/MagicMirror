## Docker
Install docker by running this command

```sudo apt-get install -y docker-ce=17.09.0~ce-0~raspbian --allow-downgrades```

A newer version of docker will create a issue when trying to run the build.sh script

If you have trouble getting docker installed, try this:
https://howchoo.com/g/nmrlzmq1ymn/how-to-install-docker-on-your-raspberry-pi

## Docker and face recognition
See this link: has done what we need to do
https://github.com/JanLoebel/face_recognition

A point that ageitgey made:
Instead of building the numpy array of the images every time, you could save the encodings to a file, then just load the file when you need it. See link:
https://docs.scipy.org/doc/numpy/reference/generated/numpy.save.html


https://gist.github.com/ageitgey/1ac8dbe8572f3f533df6269dab35df65
(this example works, but requires  numpy-1.13.3)

After installing all packages, run this:

```
pip3 install numpy --upgrade
```

```
pip3 install python-firebase
```
```
pip3 install configparser
```

For best speed and recognition, use 480x368 resolution on capturing and images to compare with.
This repo  is testing with 480x360px images

## Docker and testing (building images)
```
sudo docker build -t face-recognition .
```

## Motion sensor and connection
<img src="docs/images/r-pi-motion.jpg" alt="Logo" width=400px/>