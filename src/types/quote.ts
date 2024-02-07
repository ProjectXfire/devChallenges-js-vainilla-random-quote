export type TQuote = {
  _id: string;
  author: string;
  authorSlug: string;
  content: string;
  dateAdded: string;
  dateModified: string;
  length: number;
  tags: string[];
};

export type TQuoteElements = {
  quoteTitle: HTMLElement | null;
  quoteTags: HTMLElement | null;
  quoteText: HTMLElement | null;
};
