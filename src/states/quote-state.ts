import { type TQuote } from "../types";

export class QuoteState {
  constructor() {
    this.getRandomQuote();
  }

  private static quoteState: QuoteState;

  public static instance() {
    if (!QuoteState.quoteState) QuoteState.quoteState = new QuoteState();
    return QuoteState.quoteState;
  }

  async getRandomQuote(): Promise<TQuote | null> {
    const res = await fetch("https://api.quotable.io/random");
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      return null;
    }
  }
}
