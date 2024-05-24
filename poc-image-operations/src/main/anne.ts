/* eslint-disable prettier/prettier */
import { ipcMain } from 'electron';
import * as path from 'path';
import fs from 'fs';
import { GIF } from 'imagescript';

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
    await useImageScript(base64Image);

    return "Image received and saved!";
  });

};

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
  // read binary data from base64 image data
  const binary = new Uint8Array(base64ToArrayBuffer(_base64Image));
  console.log("buffer: " + binary.byteLength);

  // read binary data from file
  // const imagePath = path.join(__dirname, `../../${FILENAME}`);
  // let binary = fs.readFileSync(imagePath);

  const gif = await GIF.decode(binary);

  // console.log(`ts :: ${imagePath}: ${binary.length} ${gif.width}x${gif.height}`);

  for (let i = 0; i < 1/*gif.length*/; i++) {
    // extract frame
    const frame = gif[i];
    // console.log(`[frame ${i}] size: (${frame.width},${frame.height}), length: ${frame.bitmap.length}`);
    
    let buff = await frame.encode();
    fs.writeFileSync(`./magicktest/rgb_${i}.png`, buff);

    const rgbBuffer = new Uint8Array(frame.bitmap);
    // console.log(`[frame ${i}] rgb compare: + ${Buffer.from(frame.bitmap).equals(Buffer.from(rgbBuffer))}`);
    console.log(`[frame ${i}] pixels: ${frame.bitmap}`);

    // frame.saturation(0);

    buff = await frame.encode();
    fs.writeFileSync(`./magicktest/bw_${i}.png`, buff);
    
    console.log(`[frame ${i}] buffer changed after B&W?: ${!Buffer.from(frame.bitmap).equals(Buffer.from(rgbBuffer))}`);

    // get pixels
    const pixels = new Uint16Array(frame.bitmap.buffer);
    // console.log(`[frame ${i}] pixels: ${pixels.length}`);

    // convert to 4 bit grayscale
    const bitPixels = convert16bitTo4bit(pixels);
    // console.log(`[frame ${i}] 4bit pixels: ${bitPixels.length}`);

    // create json object
    const oled = {
      width: frame.width,
      height: frame.height,
      originalPixels: pixels.length,
      frameCount: gif.length,
      totalPackets: Math.ceil(bitPixels.length / 59),
      packedCount: bitPixels.length,
      packedPixels: [...bitPixels]
    };
    fs.writeFileSync(`./magicktest/json_${i}.txt`, "" + JSON.stringify(oled, null, 2));
  }
};

export default setupAnneIpc;
