import { parseGIF, decompressFrames } from "gifuct-js";
import { Buffer } from "buffer";

async function base64ToArrayBuffer(base64: string): Promise<ArrayBuffer> {
  const buffer = Buffer.from(base64, 'base64');
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
}

export async function processImage(base64: string) {
  const buffer = await base64ToArrayBuffer(base64);
  const gif = parseGIF(buffer);
  if (gif.frames.length > 0) {
    parseGif(buffer);
  } else {
    console.log("No frames found in the gif.");
  }
}

class FramePixels {
  width: number;
  height: number;
  top: number;
  left: number;
  pixels: Uint8ClampedArray;

  constructor(width: number, height: number, top: number, left: number, pixels: Uint8ClampedArray) {
    this.width = width;
    this.height = height;
    this.top = top;
    this.left = left;
    this.pixels = pixels;
  }
}

function coalesceFrames(targetFrame: FramePixels, newFrame: FramePixels): FramePixels {
  // if target frame is the same size as the new frame, return the new frame
  if (targetFrame.width === newFrame.width || targetFrame.height === newFrame.height) 
    return newFrame;

  // otherwise coalesce the frames
  let newPixels = new Uint8ClampedArray(targetFrame.pixels);
  
  const startX = newFrame.left;
  const endX = newFrame.left + newFrame.width;
  const startY = newFrame.top;
  const endY = newFrame.top + newFrame.height;
  for (let x = 0; x < targetFrame.width; x++) {
    for (let y = 0; y < targetFrame.height; y++) {
      if (x >= startX && x < endX && y >= startY && y < endY) {
        const targetIdx = (y * targetFrame.width + x) * 4;
        const newIdx = ((y - startY) * newFrame.width + (x - startX)) * 4;
        newPixels[targetIdx] = newFrame.pixels[newIdx];
        newPixels[targetIdx + 1] = newFrame.pixels[newIdx + 1];
        newPixels[targetIdx + 2] = newFrame.pixels[newIdx + 2];
        newPixels[targetIdx + 3] = newFrame.pixels[newIdx + 3];
      }
    }
  }

  targetFrame.pixels = newPixels;
  return targetFrame;
}

function convertTo4bitGreyscale(pixels: Uint8ClampedArray): Uint8Array {
  const result = new Uint8Array((pixels.length + 1) / 4);

  let idx = 0;
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    
    // transform to grayscale
    const C = 0.2126*r + 0.7152*g + 0.0722*b;
    result[idx++] = Math.floor(C / 16);
  }
  
  return result;
};

async function parseGif(buffer: ArrayBuffer) {
  const gif = parseGIF(buffer);
  const frames = decompressFrames(gif, true);
  console.log(`frames: ${frames.length}. First frame: ${gif.lsd.width}x${gif.lsd.height}.`);

  let targetFrame: FramePixels | undefined = undefined;
  for (let i = 0; i < frames.length; i++) {
    let frame = frames[i];
    
    if (targetFrame === undefined) {
      targetFrame = new FramePixels(frame.dims.width, frame.dims.height, frame.dims.top, frame.dims.left, frame.patch);
    } else {
      // coalesce pixels
      const newFrame = new FramePixels(frame.dims.width, frame.dims.height, frame.dims.top, frame.dims.left, frame.patch);
      targetFrame = coalesceFrames(targetFrame, newFrame);
    }

    // get pixels
    const pixels = new Uint8ClampedArray(targetFrame.pixels);

    // convert to 4 bit grayscale
    const bitPixels = convertTo4bitGreyscale(pixels);
    console.log(`[frame ${i}] 4bit pixels ${bitPixels.length}: ${bitPixels}`);
  }
}
