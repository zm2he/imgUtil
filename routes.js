/*
  Bruce's personal project
  Copyright (c) 2021 brucehe<bruce.he.62@gmail.com>
  
  See LICENSE.txt for more information
*/

import fs from "fs";
import swaggerUI from "swagger-ui-express";
import config from "./config.js";
import { asciifyImage } from "./src/controller/asciifyImage.js";
import { thumbnailImage } from "./src/controller/thumbnailImage.js";
import { cartoonImage } from "./src/controller/cartoonImage.js";

const swagger = JSON.parse(fs.readFileSync(`${config.appFolder}/swagger.json`));
export function setupSwagger(app) {
  const baseUrl = config.baseUrl;
  const index = baseUrl.indexOf("://");
  if (index !== -1) {
    swagger.info.version = config.version;
    swagger.host = baseUrl.substr(index + 3);
    swagger.schemes = [baseUrl.substr(0, index)];
  }
  app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(swagger, {
      explorer: false,
      swaggerOptions: {
        urls: [
          {
            url: baseUrl,
            name: "doc",
          },
        ],
      },
    })
  );
}

export function setupRoutes(app) {
  app.get("/", (req, res) => res.json(swagger));

  app.get("/help", (req, res) =>
    res.send([
      "POST /image/thumbnail[?percentage=10]",
      "POST /image/asciify[?width=80]",
      "POST /image/cartoon",
    ])
  );
  app.post("/api/image/asciify", asciifyImage);
  app.post("/api/image/thumbnail", thumbnailImage);
  app.post("/api/image/cartoon", cartoonImage);
}
