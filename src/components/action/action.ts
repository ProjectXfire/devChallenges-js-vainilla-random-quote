import { Quote } from "..";
import { TAction } from "../../types";
import "./action.css";

const actionComponent = document.createElement("div");
actionComponent.className = "action";

const actionButtons = `
  <button id="random" class="action-button" type="button">
    <img src="/images/Regroup.svg" alt="random" />
  </button>
  <button id="copy" class="action-button" type="button">
    <img src="/images/link.svg" alt="copy" />
  </button>
`;

export class Action {
  constructor() {
    this.quote = Quote.instance();
  }

  private static action: Action;
  private quote: Quote;
  private elements: TAction = {
    random: null,
    copy: null,
  };

  public static instance() {
    if (!Action.action) Action.action = new Action();
    return Action.action;
  }

  renderIn(elem: HTMLElement) {
    actionComponent.innerHTML = actionButtons;
    elem.appendChild(actionComponent);
    this.setupElements();
    this.setupListeners();
  }

  setupElements() {
    const random = document.getElementById("random") as HTMLButtonElement;
    const copy = document.getElementById("copy") as HTMLButtonElement;
    this.elements.random = random;
    this.elements.copy = copy;
  }

  setupListeners() {
    const { copy, random } = this.elements;
    random?.addEventListener("click", this.random.bind(this));
    copy?.addEventListener("click", this.copy.bind(this));
  }

  copy() {
    this.quote.copyToClipboard();
  }

  random() {
    this.quote.setData();
  }
}
