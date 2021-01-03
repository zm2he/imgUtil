/*
  Bruce's personal project
  Copyright (c) 2021 brucehe<bruce.he.62@gmail.com>
  
  See LICENSE.txt for more information
*/

/*
 Code modified from  "Ascii Art Convert" (https://github.com/jpetitcolas/ascii-art-converter)
 https://www.jonathan-petitcolas.com/2017/12/28/converting-image-to-ascii-art.html
*/

import fs from "fs";
import imageThumbnail from "image-thumbnail";
import getPixels from "get-pixels";
import config from "../../config.js";
import { getImageData } from "./getImage.js";

const asciifyPatterns = [
  {
    name: "default",
    patterns: [
      {
        value: "@&$%0>o^li;:=~-`'.  ",
      },
    ],
  },
  {
    name: "ten characters",
    patterns: [
      {
        value: "@#%*+=-:. ",
      },
    ],
  },
  {
    name: "blocks",
    patterns: [
      {
        value: "█▓▒░ ",
      },
    ],
  },
  {
    name: "More patterns",
    patterns: [
      {
        value: "#&B9@?sri:,. ",
      },
      {
        name: "five characters",
        patterns: [
          {
            value: "@=:. ",
          },
        ],
      },
      {
        value: "@&$%0<o~^li;:=~-'. ",
      },
      {
        value: "@%#*+=-:. ",
      },
      {
        value: "@#8&o:*. ",
      },
      {
        value: "@#$=*!;:~-,.  ",
      },
      {
        value: "M$o|*:=\\. ",
      },
      {
        value: "@80GCLft1i;:,. ",
      },
      {
        value: "MNFV$I*:. ",
      },
      {
        value: "#@&%0?=",
      },
      {
        value: "@%$&#^+()~!*_",
      },
      /*
      {
        value: '\';-~|}/+='
      },*/
      {
        value:
          "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,\"^`'. ",
      },
      /*{
        value: ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'
      },*/
      {
        value:
          "@%DMm890$&dawB6hbgSqeopWERO4#5knZsGQUP3XCFI2cNAHu1^fJT7zxvV>y=Y?[<KLrt+/jl]\\{}|()~!*\"i-;':,.`_",
      },
      {
        value:
          "@%DMm890$&dawB6hbgSqeopWERO4#5knZsGQUP3XCFI2cNAHu1^fJT7zxvV>y=Y?[<KLrt+/jl]\\{}|()~!*i-;:",
      },
    ],
  },
];

// convert image to grayscales
// For more information see http://en.wikipedia.org/wiki/Grayscale

// BT-709 (HDTV) method, also known as ITU-R BT-709 formula
// GREY = 0.21* RED + 0.72 * GREEN + 0.07 * BLUE
// const toGrayScale = (r, g, b) => 0.21 * r + 0.72 * g + 0.07 * b;

// BT-601 (PAL/NTSC) method, als known as ITU-R BT-601 formulat
// GREY = 0.299 * RED + 0.587 * GREEN + 0.114 * BLUE

// Average Red, Green, Blue
// const toGrayScale = (r, g, b) => r/3 + g/3 + b/3
function convertToGrayScales(pixels) {
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const a = pixels[i + 3];
    /* treat a transparacy as a white */
    const grayScale = a === 0 ? 255 : ~~(0.299 * r + 0.587 * g + 0.114 * b);
    pixels[i] = pixels[i + 1] = pixels[i + 2] = grayScale;
  }
}

// convert a grayscale image to ascii string
function convertToAscii(pixels, patterns, width) {
  let ascii = "";
  for (let i = 0; i < pixels.length; i += 4) {
    const grayScale = pixels[i];
    const char = patterns[Math.ceil(((patterns.length - 1) * grayScale) / 255)];
    ascii += char;

    if ((i / 4 + 1) % width === 0) {
      ascii += "\n";
    }
  }
  return ascii;
}

/**
 * asciify the uploaded image
 * @param {*} req
 * @param {*} res
 */
export function asciifyImage(req, res) {
  const width = Number(req.query.width || 80);
  const thumbnailPath = `${config.appFolder}/${Date.now()}.jpg`;
  getImageData(req)
    .then((data) => {
      // generate thumbnial image
      return imageThumbnail(data, {
        width,
        height: width,
        fit: "inside",
        jpegOptions: { force: true },
        withMetaData: true,
      });
    })
    .then((image) => {
      // save the generated thumbnail to a file (as inpit to getPixles)
      fs.appendFileSync(thumbnailPath, Buffer.from(image));
    })
    .then(() => {
      // read the thumbnail image to load in as pixles
      getPixels(thumbnailPath, (err, pixels) => {
        if (err) {
          res.status(500).send(err);
          return;
        }

        convertToGrayScales(pixels.data);
        const pattern = asciifyPatterns[0].patterns[0].value;
        const result = convertToAscii(pixels.data, pattern, width);

        // delete the temporary saved thumbnail file
        fs.unlink(thumbnailPath, (error) => {
          if (error) {
            console.log(`failed to delete ${thumbnailPath}`);
          }
        });

        res.setHeader("Content-Type", "text/plain");
        res.send(result);
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}
