/*
  Bruce's personal project
  Copyright (c) 2021 brucehe<bruce.he.62@gmail.com>
  
  See LICENSE.txt for more information
*/

import imageThumbnail from "image-thumbnail";
import { getImageData } from "./getImage.js";

/**
 * create image thumbnail using "image-thumbnail" module
 * @param {*} req
 * @param {*} res
 */
export function thumbnailImage(req, res) {
  const percentage = Number(req.query.percentage || 10);
  getImageData(req)
    .then((data) => {
      return imageThumbnail(data, { percentage, jpegOptions: { force: true } });
    })
    .then((image) => {
      res.setHeader("Content-Type", "image/jpeg");
      res.send(image);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}
