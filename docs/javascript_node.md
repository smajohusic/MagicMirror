This part will guide you trough installing node, npm and packages that are required for the app to work.

#### Node
Start by running this command to get node.
It is recommended to get version 8.x since that is used when developing this project.

```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
```

Then we can run to install node
```
sudo apt-get install -y nodejs
```

To test if node is installed, run ```node --v```, and you should see this output:
```
$ node -v
v8.x.x
```

### Electron
Before we run the package manager (npm) to install all required packages,
we have to first fix ```electron```.

Electron requires that we install som ubuntu packages first:

```
sudo apt-get install -y libxtst6 libxss1 libgconf-2-4 libnss3 libgtk2.0-0 libnotify-bin
```

Then install```electron``` globally trough nom

```
sudo npm install electron -g
```

If the you are having issues with not enough permission to create folders
that ```electron``` needs, then run this command:

```
sudo npm install electron -g --unsafe-perm=true --allow-root
```

After the installation run ```electron``` in the terminal, then  a ```electron``` window should start.
If this window does not start, you are missing either the linux packages or the ```electron``` installation failed.
Please check the terminal for errors.

### Noble (bluetooth)
To make sure that when we run ```npm install``` on the project without any problems, we also need to install
the bluetooth package.
Run this command even if you are not planning to use any bluetooth modules.

```
sudo apt-get install -y bluetooth bluez libbluetooth-dev libudev-dev
```

#### NPM
From the terminal navigate to the repository that you downloaded by writing ```cd work-in-progress```,
then run ```npm install```

This can take some time based on your connection.

#### What now?

If there is no error, that means that you now have node, electron and all 
other packages that are needed for the javascript section.

**required** - If you only want to use the node portion (magic mirror) then you can read about
[configuration](/docs/config.md) the settings for the application.

Depending on if you also want to use face-recognition and such, you need to 
refer to the [Python](/docs/python.md) documentation.


