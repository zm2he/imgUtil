/*
  Bruce's personal project
  Copyright (c) 2021 brucehe<bruce.he.62@gmail.com>
  
  See LICENSE.txt for more information
*/

/**
 * the following two configurations can be read from environment varaibles
 *     IMGUTIL_PORT - port number to be listening on, default is 8080
 *     IMGUTIL_MAX_IMG_SIZE - maximum allowed image size in bytes, maximum is 10m
 *     IMGUTIL_DEEPAI_API_KEY - apply a free api key at https://deepai.org (after signed up)
 */

import dotenv from "dotenv";
// reading envrionment variables from file .env
dotenv.config();

const port = process.env.IMGUTIL_PORT || 8081;
const config = {
  version: "1.0.2100920",

  port,
  //baseUrl: `http://localhost:${port}`,
  baseUrl: `http://35.173.93.67:${port}`,

  appFolder: ".",

  // maximum allowed image size, 10m by default
  maxImageSize: process.env.IMGUTIL_MAX_IMG_SIZE || 10 * 1024 * 1024,
  deepAIKey: process.env.IMGUTIL_DEEPAI_API_KEY,
};

config.appFolder = process.cwd();

export default config;
