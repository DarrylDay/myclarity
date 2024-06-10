import { Crop } from "react-image-crop";
import { v4 } from "uuid";

export function getRandomAvatar() {
    return 	"https://avatars.dicebear.com/api/big-ears-neutral/" +
    v4() +
    ".svg";
}

export function getEpochDays(timestamp: number): number {
    const date = new Date(timestamp);
    return (date.getFullYear() * 1000) + (getDayOfYear(timestamp));
}

export function getDayOfYear(timestamp:number) : number {
    const date = new Date(timestamp);
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = (+date - +start) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    return day;
}

export function getCroppedImg(image:HTMLImageElement, crop:Crop, fileName:string) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    if (ctx) {
        // New lines to be added
        const pixelRatio = window.devicePixelRatio;
        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = "high";
    
        ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
        );
    }
  
    // As Base64 string
    // const base64Image = canvas.toDataURL("image/jpeg");
    // return base64Image;
  
    // As a blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(
          (blob) => {
              if (blob) {
                (blob as any).name = fileName;
                resolve(blob);
              }
        },
        "image/jpeg",
        1
      );
    });
  }