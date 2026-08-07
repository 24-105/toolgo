export type PrintSizeKey = "a4-portrait" | "a4-landscape" | "l-size" | "2l-size";

export type PrintSize = {
  label: string;
  widthMm: number;
  heightMm: number;
};

export type PrintPhoto = {
  name: string;
  dataUrl: string;
  width: number;
  height: number;
};

export const PRINT_SIZES: Record<PrintSizeKey, PrintSize> = {
  "a4-portrait": { label: "A4（縦）", widthMm: 210, heightMm: 297 },
  "a4-landscape": { label: "A4（横）", widthMm: 297, heightMm: 210 },
  "l-size": { label: "L判", widthMm: 89, heightMm: 127 },
  "2l-size": { label: "2L判", widthMm: 127, heightMm: 178 },
};

export const PHOTO_COUNTS = [1, 2, 4, 6, 9] as const;
export const MAX_PHOTOS = 18;
export const MAX_FILE_SIZE = 20 * 1024 * 1024;

export function getGrid(photoCount: number) {
  if (!PHOTO_COUNTS.includes(photoCount as (typeof PHOTO_COUNTS)[number])) {
    throw new Error("1、2、4、6、9枚のいずれかを選択してください。");
  }

  switch (photoCount) {
    case 1:
      return { columns: 1, rows: 1 };
    case 2:
      return { columns: 2, rows: 1 };
    case 4:
      return { columns: 2, rows: 2 };
    case 6:
      return { columns: 2, rows: 3 };
    case 9:
      return { columns: 3, rows: 3 };
    default:
      throw new Error("1、2、4、6、9枚のいずれかを選択してください。");
  }
}

export function buildPrintSvg(
  photos: PrintPhoto[],
  sizeKey: PrintSizeKey,
  photosPerPage: number,
) {
  if (photos.length === 0) throw new Error("画像を1枚以上選択してください。");

  const size = PRINT_SIZES[sizeKey];
  const { columns, rows } = getGrid(photosPerPage);
  const margin = 5;
  const gap = 3;
  const cellWidth = (size.widthMm - margin * 2 - gap * (columns - 1)) / columns;
  const cellHeight = (size.heightMm - margin * 2 - gap * (rows - 1)) / rows;
  const pageCount = Math.ceil(photos.length / photosPerPage);
  const totalHeight = size.heightMm * pageCount;
  const pages: string[] = [];

  for (let page = 0; page < pageCount; page += 1) {
    const pagePhotos = photos.slice(page * photosPerPage, (page + 1) * photosPerPage);
    const images = pagePhotos
      .map((photo, index) => {
        const column = index % columns;
        const row = Math.floor(index / columns);
        const x = margin + column * (cellWidth + gap);
        const y = page * size.heightMm + margin + row * (cellHeight + gap);
        return `<rect x="${x}" y="${y}" width="${cellWidth}" height="${cellHeight}" fill="#ffffff"/><image href="${photo.dataUrl}" x="${x}" y="${y}" width="${cellWidth}" height="${cellHeight}" preserveAspectRatio="xMidYMid slice"/>`;
      })
      .join("");
    pages.push(
      `<rect x="0" y="${page * size.heightMm}" width="${size.widthMm}" height="${size.heightMm}" fill="#ffffff"/>${images}`,
    );
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size.widthMm}mm" height="${totalHeight}mm" viewBox="0 0 ${size.widthMm} ${totalHeight}"><title>写真印刷レイアウト</title>${pages.join("")}</svg>`;
}
