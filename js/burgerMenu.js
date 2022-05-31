let menuBtn = document.querySelector('.menuButton');
let burgerMenu = document.querySelector('.burgerMenu');
let burgerLinks = document.querySelectorAll('.burgerMenuLink');
let menuOpen = false;
menuBtn.addEventListener('click', () => {
  (!menuOpen) ? openBurgerMenu() : closeBurgerMenu();
});
burgerLinks.forEach(link => {
  link.addEventListener('click',function(){
    closeBurgerMenu();
  });
});
function openBurgerMenu(){
  menuBtn.classList.add('open');
  document.body.style.overflow = 'hidden';
  burgerMenu.classList.add('opened');
  menuOpen = true;
}
function closeBurgerMenu(){
  menuBtn.classList.remove('open');
  document.body.style.overflow = 'scroll';
  burgerMenu.classList.remove("opened")
  burgerMenu.classList.add("hide")
  setTimeout(() => {
    burgerMenu.classList.remove("hide")
  }, 800)
  menuOpen = false
}