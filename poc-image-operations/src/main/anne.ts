/* eslint-disable prettier/prettier */
import { ipcMain } from 'electron';
// import { Magick, MagickCore } from "magickwand.js";
import * as path from 'path';
import fs from 'fs';
import { GIF/*, Image*/ } from 'imagescript';
// import { Animation, Color } from "imagescript/v2";
// import framebuffer from "imagescript/v2/framebuffer";
// import { log } from "console";

const FILENAME = 'icegif.gif';

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const buffer = Buffer.from(base64, 'base64');
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
}

const setupAnneIpc = (): void => {
  ipcMain.handle('get-data', async (_event, arg: string) => {
    console.log(arg); // prints the sent argument
    return 'Data received on the main process: ' + arg
  });

  ipcMain.handle("resize-image", async (_event, base64Image) => {
    // await useMagicWand();

    await useImageScript(base64Image);
    // await useImageScriptV2();

    return "Image received and saved!";
  });

};

// const useMagicWand = async () => {
//   console.log("**** magickwand.js ****");
  
//   //   console.log("Image Received");
//   //   const buffer = base64ToArrayBuffer(base64Image);

//     const imagePath = path.join(__dirname, `../../${FILENAME}`);
//     let im = new Magick.Image();
//     await im.readAsync(imagePath);

//     console.log(`ts :: ${imagePath}: ${im.size()}`);
    
//     const binary = fs.readFileSync(imagePath).buffer;
//     const blob = new Magick.Blob(binary);
//     let opt = new Magick.ReadOptions();
//     opt.size(im.size());
//     let frames = Magick.readImages(blob, opt);

//     // extract frames
//     for (let i = 0; i < frames.length; i++) {
//       const frame = frames[i];
//       let pixels = new Uint16Array(frame.size().width() * frame.size().height() * 4);
//       await frame.writeAsync(0, 0, frame.size().width(), frame.size().height(), 'RGBA', pixels);
      
//       await frame.writeAsync(`./magicktest/rgb_${i}.png`);
//       // fs.writeFileSync(`./magicktest/1_${i}.txt`, pixels.toString());
//     }

//     // coalesce images
//     frames = Magick.coalesceImages(frames);

//     // convert to grayscale
//     for (let i = 0; i < frames.length; i++) {
//       const frame =  frames[i].clone(frames[i]);
//       await frame.colorSpaceAsync(MagickCore.GRAYColorspace);

//       let pixels = new Uint16Array(frame.size().width() * frame.size().height() * 4);
//       await frame.writeAsync(0, 0, frame.size().width(), frame.size().height(), 'RGBA', pixels);

//       await frame.writeAsync(`./magicktest/bw_${i}.png`);
//       // fs.writeFileSync(`./magicktest/2_${i}.txt`, pixels.toString());
//     }

//     // convert to 4 bit grayscale
//     // for (let i = 0; i < frames.length; i++) {
//     //   const frame =  frames[i].clone(frames[i]);
//     //   await frame.colorSpaceAsync(MagickCore.GRAYColorspace);

//     //   let pixels = new Uint16Array(frame.size().width() * frame.size().height() * 4);
//     //   await frame.writeAsync(0, 0, frame.size().width(), frame.size().height(), 'RGBA', pixels);

//     //   const bitPixels = convert16bitTo4bit(pixels);

//     //   console.log(`${pixels.length} -> ${bitPixels.length}`);
//     //   let bl = new Magick.Blob(bitPixels.buffer);
//     //   frame.readAsync(bl);

//     //   await frame.writeAsync(`./magicktest/4bit_${i}.png`);
//     //   // fs.writeFileSync(`./magicktest/3_${i}.txt`, pixels.toString());
//     // }
// };

function convert16bitTo4bit(pixels: Uint16Array): Uint8Array {
  const result = new Uint8Array((pixels.length + 1) / 2);

  let idx = 0;
  let value = 0;
  for (let i = 0; i < pixels.length; i++) {
    const pixel = pixels[i] >> 12;
    if (i % 2 === 0) {            // lower nibble
      value = pixel;
    } else {                      // upper nibble
      value |= (pixel << 4);
      idx++;
    }
    result[idx] = value;
  }
  
  return result;
};

const useImageScript = async (_base64Image): Promise<void> => {
  console.log("**** imagescript ****");
  // read binary data from base64 image data
  const binary = new Uint8Array(base64ToArrayBuffer(_base64Image));
  console.log("buffer: " + binary.byteLength);

  // read binary data from file
  const imagePath = path.join(__dirname, `../../${FILENAME}`);
  // let binary = fs.readFileSync(imagePath);

  const gif = await GIF.decode(binary);

  console.log(`ts :: ${imagePath}: ${binary.length} ${gif.width}x${gif.height}`);

  for (let i = 0; i < gif.length; i++) {
    const frame = gif[i];
    console.log(`[frame ${i}] size: (${frame.width},${frame.height}), length: ${frame.bitmap.length}`);
    
    let buff = await frame.encode();
    fs.writeFileSync(`./magicktest/rgb_${i}.png`, buff);

    const rgbBuffer = new Uint8Array(frame.bitmap);
    // console.log(`[frame ${i}] rgb compare: + ${Buffer.from(frame.bitmap).equals(Buffer.from(rgbBuffer))}`);

    frame.saturation(0);

    buff = await frame.encode();
    fs.writeFileSync(`./magicktest/bw_${i}.png`, buff);
    
    console.log(`[frame ${i}] buffer changed after B&W?: ${!Buffer.from(frame.bitmap).equals(Buffer.from(rgbBuffer))}`);

    // get pixels
    const pixels = new Uint16Array(frame.bitmap.buffer);
    console.log(`[frame ${i}] pixels: ${pixels.length}`);

    // convert to 4 bit grayscale
    const bitPixels = convert16bitTo4bit(pixels);
    console.log(`[frame ${i}] 4bit pixels: ${bitPixels.length}`);
    fs.writeFileSync(`./magicktest/4bit_${i}.txt`, "" + bitPixels);
  }
};

// const useImageScriptV2 = async () => {
//   console.log("**** imagescript V2 ****");
//   // const buffer = new Uint8Array(base64ToArrayBuffer(base64Image));
//   // console.log("buffer: " + buffer.byteLength);

//   const imagePath = path.join(__dirname, `../../${FILENAME}`);
//   // read binary data from file
//   let binary = fs.readFileSync(imagePath);
//   const gif = await Animation.decode("gif", binary);

//   console.log(`ts :: ${imagePath}: ${binary.length} ${gif.width}x${gif.height}`);

//   for (let i = 0; i < gif.frames.length; i++) {
//     const frame = gif.frames[i];
//     const fp = frame.image.u8;

//     let img = await Image.decode(fp);
//     const buff = await img.encode();
//     fs.writeFileSync(`./magicktest/gr2_${i}.png`, buff);
//   }
// };

export default setupAnneIpc;
