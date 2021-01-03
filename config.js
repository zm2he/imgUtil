/*
  Bruce's personal project
  Copyright (c) 2021 brucehe<bruce.he.62@gmail.com>
  
  See LICENSE.txt for more information
*/

/**
 * the following two configurations can be read from environment varaibles
 *     IMGUTIL_PORT - port number to be listening on, default is 8080
 *     IMGUTIL_MAX_IMG_SIZE - maximum allowed image size in bytes, maximum is 10m
 */

const port = process.env.IMGUTIL_PORT || 80;
const config = {
  version: "1.0.210103",

  port,
  baseUrl: `http://localhost:${port}`,

  appFolder: ".",

  // maximum allowed image size, 10m by default
  maxImageSize: process.env.IMGUTIL_MAX_IMG_SIZE || 10 * 1024 * 1024,
};

config.appFolder = process.cwd();

export default config;
