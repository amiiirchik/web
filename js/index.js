let serverData;
document.querySelector('.cartierCategoryButton').addEventListener('click',function(){
    showDataOnPage('cartier',document.querySelector('.cartierCategoryButton'));
});
document.querySelector('.tissotCategoryButton').addEventListener('click',function(){
    showDataOnPage('tissot',document.querySelector('.tissotCategoryButton'));
});
document.querySelector('.rolexCategoryButton').addEventListener('click',function(){
    showDataOnPage('rolex',document.querySelector('.rolexCategoryButton'));
});
document.querySelector('.omegaCategoryButton').addEventListener('click',function(){
    showDataOnPage('omega',document.querySelector('.omegaCategoryButton'));
});
document.querySelector('.breguetCategoryButton').addEventListener('click',function(){
    showDataOnPage('breguet',document.querySelector('.breguetCategoryButton'));
});

setClickEvents();

function setClickEvents(){
    document.querySelectorAll('.getFullItemDescription').forEach(elem => {
        elem.addEventListener('click', function(){
            localStorage.setItem('imageUrl',JSON.stringify(elem.childNodes[1].childNodes[1].src));
            localStorage.setItem('name',JSON.stringify(elem.childNodes[1].childNodes[3].textContent));
            localStorage.setItem('price',JSON.stringify(elem.childNodes[1].childNodes[7].textContent));
            location.href = 'fullItemDescription.html';
        });
    });
}
function showDataOnPage(watchesModel,buttonToTurnOn){
    getData();
    setTimeout(() => buildCards(serverData,watchesModel),200);
    document.querySelectorAll('.categoryButton').forEach(button => {
        button.classList.remove('on');
    });
    buttonToTurnOn.classList.add('on');
}
function getData(){
    fetch('data.json')
        .then(response => response.json())
        .then(json => setData(json));
}
function setData(data){
    serverData = data;
}
    
function buildCards(data,watchesModel){
    let content = document.querySelector('.content');   
    content.innerHTML = '';
        Array.from(Object.keys(data.catalog[watchesModel])).forEach(watchesName => {
            content.innerHTML += 
            `<div class="card getFullItemDescription">
                    <div class="frontCard">
                        <img src="${data.catalog[watchesModel][watchesName].imageUrl}">
                        <h3>${watchesName}</h3>
                        <p>${data.catalog[watchesModel][watchesName].desc}</p>
                        <span>${data.catalog[watchesModel][watchesName].price}</span>
                    </div>
                    <div class="backCard">
                        <p>Часы появились в результате тесного сотрудничества Rolex с миром исследований.Они порой находятся в условиях, в которых отваживается работать далеко не каждый. В течение многих лет часовая марка тестировала эти часы на прочность в реальных условиях, снаряжая полярные, горные и спелеологические экспедиции.</p>
                        <a href="#">Подробнее...</a>
                    </div>
                </div>`;
            });
        setClickEvents();
}
