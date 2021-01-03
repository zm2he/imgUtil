/*
  Bruce's personal project
  Copyright (c) 2021 brucehe<bruce.he.62@gmail.com>
  
  See LICENSE.txt for more information
*/

/*
  create cartoonized image based on ToonifyAPI (https://deepai.org/machine-learning-model/toonify)
*/

import deepai from "deepai";
import fetch from "node-fetch";
import { getImageData } from "./getImage.js";
import config from "../../config.js";

/**
 * cartoonize an image using "deepai" module
 * @param {*} req
 * @param {*} res
 */
export function cartoonImage(req, res) {
  if (!config.deepAIKey) {
    res.status(500).send("not supported");
    return;
  }

  getImageData(req)
    .then((data) => {
      deepai.setApiKey(config.deepAIKey);
      return deepai.callStandardApi("toonify", {
        image: data,
      });
    })
    .then((resp) => {
      // the toonified image is in resp.output_url
      console.log(`generated cartoon at ${resp.output_url}`);
      return fetch(resp.output_url);
    })
    .then((resp) => {
      return resp.buffer();
    })
    .then((resp) => {
      res.setHeader("Content-Type", "image/jpeg");
      res.send(resp);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}
