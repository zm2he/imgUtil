/*
  Bruce's personal project
  Copyright (c) 2021 brucehe<bruce.he.62@gmail.com>
  
  See LICENSE.txt for more information
*/

/**
 * retrieve image by binary type body
 */
function getBinaryImage(req) {
  return new Promise((resolve) => {
    let data = new Buffer("");
    req.on("data", (chunk) => {
      data = Buffer.concat([data, chunk]);
    });
    req.on("end", () => {
      resolve(data);
    });
  });
}

/**
 * retrieve image by form-data type body
 */
function getFormImage(req) {
  let images = req.files.images || req.files.image;
  if (!Array.isArray(images)) {
    images = [images];
  }
  if (images.length === 0) {
    return Promise.reject("bad request, no image uploaded");
  }

  const img = images[0];
  const { mimetype, size } = img;
  if (!mimetype.startsWith("image/") || !size) {
    return Promise.reject("bad request, uploaded not a valid image");
  }

  return Promise.resolve(img.data);
}

/**
 * extract image data from req
 * @param {*} req
 */
export async function getImageData(req) {
  if (req.files) {
    return getFormImage(req);
  } else {
    return getBinaryImage(req);
  }
}
