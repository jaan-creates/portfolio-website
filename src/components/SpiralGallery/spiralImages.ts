// Ordered source images for the spiral. Swap photos by editing this array.
// Images from /public/assets/spiral/ — optimized WebP versions (see
// scripts/optimize-spiral-images.mjs); full-resolution originals are archived
// under /assets-originals/spiral/ (not part of the shipped build).
export interface SpiralImage {
  src: string;
  alt: string;
}

export const SPIRAL_IMAGES: SpiralImage[] = [
  { src: '/assets/spiral/travel-01.webp', alt: 'Travel photograph' },
  { src: '/assets/spiral/travel-02.webp', alt: 'Travel photograph' },
  { src: '/assets/spiral/travel-03.webp', alt: 'Travel photograph' },
  { src: '/assets/spiral/travel-04.webp', alt: 'Travel photograph' },
  { src: '/assets/spiral/travel-05.webp', alt: 'Travel photograph' },
  { src: '/assets/spiral/travel-06.webp', alt: 'Travel photograph' },
  { src: '/assets/spiral/travel-07.webp', alt: 'Travel photograph' },
  { src: '/assets/spiral/travel-08.webp', alt: 'Travel photograph' },
  { src: '/assets/spiral/travel-09.webp', alt: 'Travel photograph' },
  { src: '/assets/spiral/travel-10.webp', alt: 'Travel photograph' },
  { src: '/assets/spiral/travel-11.webp', alt: 'Travel photograph' },
  { src: '/assets/spiral/travel-12.webp', alt: 'Travel photograph' },
  { src: '/assets/spiral/travel-13.webp', alt: 'Travel photograph' },
  { src: '/assets/spiral/travel-14.webp', alt: 'Travel photograph' },
  { src: '/assets/spiral/travel-15.webp', alt: 'Travel photograph' },
  { src: '/assets/spiral/travel-16.webp', alt: 'Travel photograph' },
  { src: '/assets/spiral/travel-17.webp', alt: 'Travel photograph' },
  { src: '/assets/spiral/travel-18.webp', alt: 'Travel photograph' },
  { src: '/assets/spiral/travel-19.webp', alt: 'Travel photograph' },
];
