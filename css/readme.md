## OBS!
If you load the index.html as a file when starting electron, ignore this. But if
you start the server with a ip and port, the use express to load the view, you
have to follow these rules.

### Requirements
All files in this folder must be created with plain css. If you want to use
scss, etc, create a new folder that contains the files and build the file to this folder.

### Availability
All files in this folder are accessible by linking to for example:  
 ```<link rel="stylesheet" type="text/css" href="css/main.css">```
 
You hva to prefix it with ```css```, and only that. This is resolved in ```javascript/server/setup.js```