import { QuoteState } from "../../states";
import { type TQuoteElements } from "../../types";
import "./quote.css";

const quoteComponent = document.createElement("div");
quoteComponent.className = "quote";

const quoteHeader = `
  <header>
    <p id="quote-title" class="quote-title"></p>
    <div id="quote-tags" class="quote-tags">
    </div>
  </header>
`;

const quoteText = `
  <p id="quote-text" class="quote-text"></p>
`;

export class Quote {
  constructor() {
    this.quoteState = QuoteState.instance();
  }

  private static quote: Quote;
  private quoteState: QuoteState;
  private elements: TQuoteElements = {
    quoteTitle: null,
    quoteTags: null,
    quoteText: null,
  };

  static instance() {
    if (!Quote.quote) Quote.quote = new Quote();
    return Quote.quote;
  }

  renderIn(elem: HTMLElement) {
    quoteComponent.innerHTML = quoteHeader;
    quoteComponent.innerHTML += quoteText;
    elem.appendChild(quoteComponent);
    this.setupElements();
    this.setData();
  }

  private setupElements() {
    const quoteTitle = document.getElementById("quote-title");
    const quoteTags = document.getElementById("quote-tags");
    const quoteText = document.getElementById("quote-text");
    this.elements.quoteTitle = quoteTitle;
    this.elements.quoteTags = quoteTags;
    this.elements.quoteText = quoteText;
  }

  async setData(): Promise<void> {
    const data = await this.quoteState.getRandomQuote();
    const { quoteTitle, quoteTags, quoteText } = this.elements;
    if (!data) {
      if (quoteTitle) quoteTitle.innerText = "Error on get quote";
      if (quoteText) quoteText.innerText = "Something went wrong!";
      return;
    }
    const { author, tags, content } = data;
    const spanElements = document.getElementsByClassName("tag");
    const spanList = Array.from(spanElements);
    spanList.forEach((span) => {
      quoteTags?.removeChild(span);
    });
    if (quoteTitle) quoteTitle.innerText = author;
    if (quoteText) quoteText.innerText = `"${content}"`;
    tags.forEach((tag) => {
      const span = document.createElement("span");
      span.innerText = tag;
      span.className = "tag";
      quoteTags?.appendChild(span);
    });
  }

  copyToClipboard() {
    const { quoteText } = this.elements;
    if (!quoteText) return;
    navigator.clipboard.writeText(quoteText.innerText);
    alert(`Copy to clipboard ${quoteText.innerText}`);
  }
}
