### Auto start

Start by installing pm2 with npm

`sudo npm install -g pm2`


To enable pm2 at start-up, run the command

`pm2 startup`

This will ouput a line of code that you need to execute in order to allow pm2 to run at start-up


Create a script that will run with pm2
`
cd ~
nano mm.sh
`

Add the following lines

`
cd ~/MagicMirror

DISPLAY=:0 npm start
`

Save the file. Now give the user permissions to execute the file

`chmod +x mm.sh`

At last, save it

`pm2 save`

To make sure it works, reboot your pi and wait
`sudo reboot now`

### Open GL - decrease Electron's CPU usage.

Use the experimental desktop Open GL driver by adding the following line to _/boot/config.txt_:

````
sudo nano /boot/config.txt
````
Add the following line:
````
dtoverlay=vc4-kms-v3d
````
ℹ️ _Activating the Open GL drive can also be accomplished by using the `rasps-config` tool by running `sudo raspi-config`. Go to the `Advanced Options` menu and select `A7 GL Driver`. Next, select the `G1 GL (Full KMS) OpenGL desktop driver with full KMS`. Note that this option will be selected in the menu even when the GL drive is not yet configured._ 

### Disabling the screensaver
_(Please note, you will need the x11-xserver-utils package installed.)_

edit ~/.config/lxsession/LXDE-pi/autostart:
````
sudo nano ~/.config/lxsession/LXDE-pi/autostart
````
Add the following lines:
````
@xset s noblank
@xset s off
@xset -dpms
````

Edit _/etc/lightdm/lightdm.conf_:
````
sudo nano /etc/lightdm/lightdm.conf
````
Add the following line below [SeatDefaults]
````
xserver-command=X -s 0 -dpms
````
