/** A quote as used throughout the app (API results, favourites, collections). */
export type Quote = {
  /** Stable id derived from the text — used for favourites/collection membership. */
  id: string;
  text: string;
  author: string;
};
