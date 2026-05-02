export type ImageCell = {
  id: number;
  imageUrl: string;
  primaryText: string;
  secondaryText?: string;
  media?: Media;
};

export type Media = 'movie' | 'tv';

export type SearchType = 'movie' | 'tv' | 'person';