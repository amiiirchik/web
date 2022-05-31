let sliderPoints = document.querySelectorAll('.sliderPoint');
let imageSources = ['images/bestModel3.png','images/bestModel2.png','images/bestModel1.png','images/bestModel2.png','images/bestModel3.png','images/bestModel2.png','images/bestModel1.png'];
let leftSliderArrow = document.querySelector('.leftArrow img');
let rightSliderArrow = document.querySelector('.rightArrow img');
let sliderCards = document.querySelectorAll('.bestModel img');
let defaultPlacement = [2,3,4];
let singlePlacement = 3;

sliderPoints.forEach((point,index) => {
    point.addEventListener('click',function(){
        sliderCards.forEach(card => { card.style.opacity = 1 });
        let appear;
        let disappear = setInterval(function(){
            if(Number(sliderCards[0].style.opacity) > 0)
                sliderCards.forEach(card => { card.style.opacity = Number(card.style.opacity) - 0.04 });
        },20);
        setTimeout(() => {
            clearInterval(disappear);
            sliderCards[0].src = imageSources[index];
            sliderCards[1].src = imageSources[index + 1];
            sliderCards[2].src = imageSources[index + 2];
            appear = setInterval(function(){
                if(Number(sliderCards[0].style.opacity) < 1)
                    sliderCards.forEach(card => { card.style.opacity = Number(card.style.opacity) + 0.04 });
            },20);
        },600);
        setTimeout(() => { clearInterval(appear) },1200);

        defaultPlacement = [index,index + 1, index + 2];
        disableSliderPoints();
        sliderPoints[index].classList.add('active');
    });
});

leftSliderArrow.addEventListener('click',function(){
    rightSliderArrow.classList.remove('lowVisible');
    (defaultPlacement[0] > 0) ? slideAllImages(-1) : leftSliderArrow.classList.add('lowVisible');
});
rightSliderArrow.addEventListener('click',function(){
    leftSliderArrow.classList.remove('lowVisible');
    (defaultPlacement[2] < 6) ? slideAllImages(1) : rightSliderArrow.classList.add('lowVisible');
});
function slideAllImages(slideDirection){
    defaultPlacement = defaultPlacement.map(elem => elem + slideDirection);
    sliderCards.forEach((card,index) => {
        card.style.opacity = 1;
        let appear;
        let disappear = setInterval(function(){
            if(Number(card.style.opacity) > 0)
                card.style.opacity = Number(card.style.opacity) - 0.04; 
        },20);
        setTimeout(() => {
            clearInterval(disappear);
            card.src = imageSources[defaultPlacement[index]];
            appear = setInterval(function(){
                if(Number(card.style.opacity) < 1)
                    card.style.opacity = Number(card.style.opacity) + 0.04;
            },20);
        },600);
        setTimeout(() => { clearInterval(appear) },1200);
    });
    disableSliderPoints();
    sliderPoints[defaultPlacement[0]].classList.add('active');
}
function disableSliderPoints(){
    sliderPoints.forEach(sliderPoint => sliderPoint.classList.remove('active'));
}