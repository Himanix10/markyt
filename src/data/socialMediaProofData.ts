export interface SocialMediaProofData {
  brand: string;
  natureOfBrand?: string;
  posts: number;
  reels: number;
  periodNote?: string;
}

export const SOCIAL_MEDIA_PROOF_ROWS: SocialMediaProofData[] = [
  {
    brand: 'Luxury Fashion & Accessories',
    posts: 15,
    reels: 4,
    periodNote: 'this month*',
  },
  {
    brand: 'Mocktail Bomb Brand',
    posts: 15,
    reels: 4,
    periodNote: 'this month*',
  },
];
