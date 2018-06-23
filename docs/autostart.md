## Auto start

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
