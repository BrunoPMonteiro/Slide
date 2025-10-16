export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.dist = {
      finalPosition: 0,
      startX: 0,
      movement: 0,
    }
  }

  moveSlide(distX) {
    this.dist.movePosition = distX
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.5;
    return this.dist.finalPosition - this.dist.movement;
  }

  onStart(event) {
    let movetype;
    if (event.type ==='mousedown') {
      event.preventDefault();
      this.dist.startX = event.clientX;
      movetype = 'mousemove';
    } else {
      this.dist.startX = event.changedTouches[0].clientX;
      movetype = 'touchmove'
    } 
    this.wrapper.addEventListener(movetype, this.onMove, {passive: true});
  }

  onMove(event) {
    const pointerPOsition = (event.type === 'mousemove') ? event.clientX : event.changedTouches[0].clientX;
    const finalPosition = this.updatePosition(pointerPOsition);
    this.moveSlide(finalPosition)
  }

  onEnd(event) {
    const moveType = (event.type === 'mouseup') ? 'movetype' : 'touchmove';
    this.wrapper.removeEventListener(moveType, this.onMove, {passive: true});
    this.dist.finalPosition = this.dist.movePosition;
  }

  addSlideEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('touchstart', this.onStart, {passive: true});
    this.wrapper.addEventListener('mouseup', this.onEnd);
    this.wrapper.addEventListener('touchend', this.onEnd, {passive: true});
    
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  init() {
    this.bindEvents();
    this.addSlideEvents();
    return this;
  }

}