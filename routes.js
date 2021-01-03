/*
  Bruce's personal project
  Copyright (c) 2021 brucehe<bruce.he.62@gmail.com>
  
  See LICENSE.txt for more information
*/

import { asciifyImage } from "./src/controller/asciifyImage.js";
import { thumbnailImage } from "./src/controller/thumbnailImage.js";

export default function setup(app) {
  app.get("/help", (req, res) =>
    res.send([
      "POST /image/thumbnail[?percentage=10]",
      "POST /image/asciify[?width=80]",
    ])
  );
  app.post("/image/asciify", asciifyImage);
  app.post("/image/thumbnail", thumbnailImage);
}
