import "./style.css";
import { initApp } from "./initApp.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <article id="quotes-container" class="quotes-container"></article>
`;

const mainComponent = document.getElementById("quotes-container")!;

initApp(mainComponent);
