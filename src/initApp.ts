import { Action, Quote } from "./components";
import { QuoteState } from "./states";

export function initApp(mainElement: HTMLElement) {
  QuoteState.instance();
  const quote = Quote.instance();
  const action = Action.instance();
  quote.renderIn(mainElement);
  action.renderIn(mainElement);
}
