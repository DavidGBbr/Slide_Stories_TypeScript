export default class Slide {
  container: Element;
  slides: Element[];
  controls: Element;
  time: number;
  index: number;
  slide: Element;
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
    this.index = 0;
    this.slide = this.slides[this.index];

    this.show(this.index);
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
  }
}
