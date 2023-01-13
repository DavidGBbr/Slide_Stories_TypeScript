import Timeout from "./Timeout.js";

export default class Slide {
  container: Element;
  slides: Element[];
  controls: Element;
  time: number;
  index: number;
  slide: Element;
  timeout: Timeout | null;
  constructor(
    container: Element,
    slides: Element[],
    controls: Element,
    time: number = 5000
  ) {
    this.container = container;
    this.slides = slides;
    this.controls = controls;
    this.time = time;

    this.timeout = null;
    this.index = 0;
    this.slide = this.slides[this.index];

    this.init();
  }
  // método que vai esconder um elemento
  hide(el: Element) {
    el.classList.remove("active");
  }
  //método que vai passar a classe active para o slide.
  show(index: number) {
    this.index = index; // index ativo no momento
    this.slide = this.slides[this.index]; // slide ativo no momento
    this.slides.forEach((el) => this.hide(el)); //removendo a classe de todos elementos
    this.slide.classList.add("active"); // passando a classe para o elemento ativo
    this.auto(this.time);
  }
  // método que vai passar o slide de acordo com o tempo
  auto(time: number) {
    this.timeout?.clear();
    this.timeout = new Timeout(() => this.next(), time);
  }
  //método que vai retornar o slide
  prev() {
    const prev = this.index > 0 ? this.index - 1 : this.slides.length - 1;
    this.show(prev);
  }
  //método que vai avançar o slide
  next() {
    const next = this.index + 1 < this.slides.length ? this.index + 1 : 0;
    this.show(next);
  }

  //método que vai adicionar os controles
  private addControls() {
    const prevButton = document.createElement("button");
    const nextButton = document.createElement("button");
    prevButton.innerText = "Slide Anterior";
    nextButton.innerText = "Próximo Slide";
    this.controls.appendChild(prevButton);
    this.controls.appendChild(nextButton);

    prevButton.addEventListener("pointerup", () => this.prev());
    nextButton.addEventListener("pointerup", () => this.next());
  }

  private init() {
    this.addControls();
    this.show(this.index);
  }
}
