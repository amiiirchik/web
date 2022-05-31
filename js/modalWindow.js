let modalWindowLink =  document.querySelector('.getModalWindow');
let modalWindowBackground = document.querySelector('.modalWindowBackground');
let modalWindow = document.querySelector('.modalWindow');
let authModalWindowBackground = document.querySelector('.authModalWindowBackground');
let authModalWindow = document.querySelector('.authModalWindow');
let closeModalWindowButton = document.querySelector('.closeModalWindow');
let closeAuthModalWindow = document.querySelector('.closeAuthModalWindow');
let burgerMenuRegistration = document.querySelector('.burgerMenuRegistration');
let burgerMenuAuthorization = document.querySelector('.burgerMenuAuthorization');
let modalWindowOpen = false;
modalWindowLink.addEventListener('click', () => {
    openModalWindow(modalWindow,modalWindowBackground);
});
burgerMenuRegistration.addEventListener('click', () => {
    openModalWindow(modalWindow,modalWindowBackground);
});
burgerMenuAuthorization.addEventListener('click', () => {
    openModalWindow(authModalWindow,authModalWindowBackground);
});
document.querySelector('.enterAccount').addEventListener('click', function(){
    closeModalWindow(modalWindow,modalWindowBackground);
    setTimeout(() => {
        openModalWindow(authModalWindow,authModalWindowBackground);
    }, 400);
});
closeAuthModalWindow.addEventListener('click', () => {
    closeModalWindow(authModalWindow,authModalWindowBackground);
    document.body.style.overflow = 'scroll';
});
closeModalWindowButton.addEventListener('click', () => {
    closeModalWindow(modalWindow,modalWindowBackground);
    document.body.style.overflow = 'scroll';
});
modalWindowBackground.addEventListener('click', (event) => {
    if(event.target.classList.contains('modalWindowBackground')){
        closeModalWindow(modalWindow,modalWindowBackground);
        document.body.style.overflow = 'scroll';
    }
});
authModalWindowBackground.addEventListener('click', (event) => {
    if(event.target.classList.contains('authModalWindowBackground')){
        closeModalWindow(authModalWindow,authModalWindowBackground);
        document.body.style.overflow = 'scroll';
    }
});
function closeModalWindow(currentModalWindow,currentModalWindowBackground){
    currentModalWindowBackground.classList.remove('opened');
    currentModalWindowBackground.classList.add('hide');
    currentModalWindow.classList.remove('opened');
    currentModalWindow.classList.add('hide');
    setTimeout(() => {
        currentModalWindow.classList.remove('hide');
        currentModalWindowBackground.classList.remove('hide');
    }, 800)
    modalWindowOpen = false;
}
function openModalWindow(currentModalWindow,currentModalWindowBackground){
    currentModalWindowBackground.classList.add('opened');
    currentModalWindow.classList.add('opened');
    modalWindowOpen = true;
    document.body.style.overflow = 'hidden';
}
