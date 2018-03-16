## Front-end

### Usage
Depending on what changes you are going to perform, place the file in correct folder.

```/components``` contains styles for each component, and **only** targets the component itself.

```/layout``` contains files that only do changes to the layout.

```/vendor``` contains vendor files that you want to do custom changes to.

### File extension and build

Currently using ```scss``` file extension. You can also write plain css in these files.
All files are imported in ```app.scss``` and then build and published to ```dist/app.css```, 
which is included in ```index.html```

### Other

If for some reason you need to load files from another folder than ```dist```, you will need to do some
changes to the server setup.

Currently the app allows loading resources from ```/dist```, ```/fonts``` and ```javascript/vue```. To add more folders, see
```/javascript/server/setup.js```
 
