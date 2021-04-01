function main() { 
  menuToggle()
  mainSlider(document.querySelector(".slider__inner"))
}

main()

// Menu Toggle
function menuToggle() { 
  const menuBtn = document.querySelector('.navigation__btn')
  const navMenu = document.querySelector('.navigation')
  menuBtn.addEventListener('click', ()=> {
    if (menuBtn.classList.contains('navigation__btn--active')) {
      menuBtn.classList.remove('navigation__btn--active')
      navMenu.style.cssText = `right: -100%`
      menuBtn.children[1].style.cssText = `width: 75%;`
      for (let i = 0; i < menuBtn.children.length; i++) {
        menuBtn.children[i].style.cssText += `
        top: 50%;
        transform: rotate(0deg) translateY(-50%);
        -webkit-transform: rotate(0deg) translateY(-50%);
        -moz-transform: rotate(0deg) translateY(-50%);
        -ms-transform: rotate(0deg) translateY(-50%);
        -o-transform: rotate(0deg) translateY(-50%);
        `
      }
      setTimeout(() => {
        menuBtn.children[1].style.cssText = `
          top: calc(50% + .75rem);
        `
        menuBtn.children[0].style.cssText = ``
      }, 300);
    } else {
      menuBtn.classList.add('navigation__btn--active')
      navMenu.style.cssText = `right: 0%`
      for (let i = 0; i < menuBtn.children.length; i++) {
        menuBtn.children[i].style.cssText += `
        width: 100%;
        top: 50%;
        `
      }
      menuBtn.children[0].style.cssText += `
      transform: translateY(-50%);
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      -o-transform: translateY(-50%);
      `
      menuBtn.children[1].style.cssText += `
      transform: translateY(-50%);
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      -o-transform: translateY(-50%);
      `
      setTimeout(() => {
        menuBtn.children[0].style.cssText += `
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        `
        menuBtn.children[1].style.cssText += `
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        `
      }, 300);
    }
  })
}

// Slider
function mainSlider(sliderWrap) {
  sliderWrap = sliderWrap.querySelector('.slider__items')
  
  let offset = 1
  let slideWidth = sliderWrap.children[0].offsetWidth
  
  const slidesCount = sliderWrap.children.length
  for (let i = 0; i < slidesCount; i++) {
    document.querySelector('.slider__dots').innerHTML += `<span class="slider__dot"></span>`
  }
  
  const arrowPrev = document.querySelector('#arrow-prev'),
  arrowNext = document.querySelector('#arrow-next')
  
  const firstClone   = sliderWrap.children[0].cloneNode(true);
  const lastClone    = sliderWrap.children[1].cloneNode(true);
  
  firstClone.setAttribute('id', 'first-clone');
  lastClone.setAttribute('id', 'last-clone');
  sliderWrap.appendChild(firstClone.cloneNode(true));
  sliderWrap.appendChild(lastClone.cloneNode(true));
  
  
  sliderWrap.parentNode.style.cssText = `transition: 0s;transform: translateX(-${slideWidth * offset}px)`
  document.querySelectorAll('.slider__dot')[offset].classList.add('slider__dot--active')
  
  function sliderToPrev() {
    document.querySelectorAll('.slider__dot').forEach(element => {
      element.classList.remove('slider__dot--active')
    });
    if (offset < sliderWrap.children.length - 1 && offset > 0) {
      offset--
      sliderWrap.parentNode.style.cssText = `transform: translateX(-${slideWidth * offset}px)`
    }
    document.querySelectorAll('.slider__dot')[offset].classList.add('slider__dot--active')
    sliderWrap.parentNode.addEventListener('transitionend', ()=> {
      if (offset === 0) {
        offset = sliderWrap.children.length - 2
        sliderWrap.parentNode.style.cssText = `transition: 0s;transform: translateX(-${slideWidth * offset}px)`
      }
    })
    window.addEventListener('resize', ()=>{
      slideWidth = sliderWrap.children[0].offsetWidth
      sliderWrap.parentNode.style.cssText = `transform: translateX(-${slideWidth * offset}px)`
    })
  }
  function sliderToNext() { 
    document.querySelectorAll('.slider__dot').forEach(element => {
      element.classList.remove('slider__dot--active')
    });
    if (offset < sliderWrap.children.length - 1) {
      offset++
      sliderWrap.parentNode.style.cssText = `transform: translateX(-${slideWidth * offset}px)`
    } 
    if (offset == sliderWrap.children.length - 2 && sliderWrap.children[offset].id === 'first-clone') {
      document.querySelectorAll('.slider__dot')[0].classList.add('slider__dot--active')
    }
    if (offset == sliderWrap.children.length - 1 && sliderWrap.children[offset].id === 'last-clone') {
      document.querySelectorAll('.slider__dot')[1].classList.add('slider__dot--active')
    }
    document.querySelectorAll('.slider__dot')[offset].classList.add('slider__dot--active')
    document.querySelectorAll('.slider__dot')[offset].classList.add('slider__dot--active')
    sliderWrap.parentNode.addEventListener('transitionend', ()=> {
      if (offset == sliderWrap.children.length - 1) {
        offset = 1
        sliderWrap.parentNode.style.cssText = `transition: 0s;transform: translateX(-${slideWidth * offset}px)`
      }
    })
    window.addEventListener('resize', ()=>{
      slideWidth = sliderWrap.children[0].offsetWidth
      sliderWrap.parentNode.style.cssText = `transform: translateX(-${slideWidth * offset}px)`
    })
  }
  arrowPrev.parentNode.addEventListener('click', sliderToPrev)
  arrowNext.parentNode.addEventListener('click', sliderToNext)
}