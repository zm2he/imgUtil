# Node.js Express Image Utility Server
The project provides image utility functions which currently include<br>
- generate an image thumbnail<br>
- convert an image to ASCII representative<br>

## Project setup
```
npm install
```

### Run
```
node server.js
```

### APIs
```
POST /asciify[?width=80]  - asciify the uploaded image
POST /thumbnail[?percentage=10] - thumbnailize the uploaded image 
```
<br><br>

## Configurations
By default the server listens on port number 80, or whatever specified in environment variable IMGUTIL_PORT<br>
By default the server allows image size up to 10 mega bytes, or the value specified in environment variable: IMGUTIL_MAX_IMG_SIZE<br>
<br><br>


##  Upload images from Postman
### form-data type body
In Postman, create a new post request to the route /images; click on the "form-data", then add "images" as a key and you will see a hidden drop-down at the right of the key field which says Text as default,  change the type from text to file and choose one or multiple image files to upload.<br>
<br><img src="public/form-data.png" /><br><br>
### binary type body
Binary is designed to send the information in a format that cannot be entered manually, to use this option, create a new post request to the route /images/:name (here name is the image file name);  click on the "binary", a "CHOOSE FILES" option will be available, click it to select an image file to upload.<br>
Please note image name must be specified in the route<br>
<br><img src="public/binary-data.png" /><br><br>

## References
[1] [How to upload files in Node.js and Express](https://attacomsian.com/blog/uploading-files-nodejs-express)<br>
[2] [Express File Upload with Multer in Node.js](https://attacomsian.com/blog/express-file-upload-multer)<br>
[3] [Generate an image thumbnail](https://github.com/onildoaguiar/image-thumbnail)<br>
[4] [Grab all the pixels in an image and return the result as an ndarray](https://www.npmjs.com/package/get-pixels)
[5] [How to deploy a node.js application on aws ec2 server](https://ourcodeworld.com/articles/read/977/how-to-deploy-a-node-js-application-on-aws-ec2-server)<br>
[6] [AWS npm install failed](https://stackoverflow.com/questions/54096891/npm-install-fails-on-ubuntu-18-04-with-error-failed-at-the-bcrypt3-0-3-insta)