/*
  Bruce's personal project
  Copyright (c) 2021 brucehe<bruce.he.62@gmail.com>
  
  See LICENSE.txt for more information
*/

import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import { setupRoutes, setupSwagger } from "./routes.js";
import config from "./config.js";

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
    limits: {
      fileSize: config.maxImageSize,
    },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  const originalUrl = req.originalUrl;
  if (originalUrl.startsWith("/api-docs") || originalUrl.startsWith("/api/")) {
    console.log(`received ${req.method} ${originalUrl}`);
    next();
  } else {
    let fileName = originalUrl;
    if (fileName === "/") fileName = "index.html";
    res.sendFile(`${config.appFolder}/public/web/${fileName}`);
  }
});
setupRoutes(app);
setupSwagger(app);

// start to listening
const port = config.port;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
