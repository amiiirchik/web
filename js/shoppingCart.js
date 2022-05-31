window.addEventListener('DOMContentLoaded',function(){

    let allServerData;
    let userServerData;

    showDataOnPage();

    function showDataOnPage(){
        getAllData();
        getUserData();
        setTimeout(() => buildCards(),200);
    }
    function getAllData(){
        fetch('data.json')
            .then(response => response.json())
            .then(json => setAllData(json));
    }
    function getUserData(){
        fetch('ajax.php?do=getShopBagItems')
            .then(response => response.json())
            .then(json => setUserData(json))
    }
    function setAllData(data){
        allServerData = data;
    }
    function setUserData(data){
        userServerData = data;
    }
        
    function buildCards(){
        let content = document.querySelector('.contentWrap');
        content.innerHTML = '<h1>Корзина</h1>';
            Array.from(Object.keys(allServerData.catalog)).forEach(watchesCompany => {
                Array.from(Object.keys(allServerData.catalog[watchesCompany])).forEach(watchesName => {
                if(userServerData.includes(watchesName)){
                content.innerHTML += 
                `<div class="shopCartItemLine"></div>
                    <div class="shopCartItem">
                    <div class="shopCartItemHolder">
                        <img src="${allServerData.catalog[watchesCompany][watchesName].imageUrl}">
                    </div>
                    <div class="shopCartInfoHolder">
                        <h3>${watchesName}</h3>
                        <p>${allServerData.catalog[watchesCompany][watchesName].desc}</p>
                        <span id="watchesPrice">${allServerData.catalog[watchesCompany][watchesName].price}</span>
                        <div class="shopCartAmount">
                            <p>Количество</p>
                            <img src="images/minus.png" class="setMinus">
                            <span>1</span>
                            <img src="images/plus.png" class="setPlus">
                        </div>
                        <a class="removeFromShoppingCart">Удалить из корзины</a>
                    </div>
                </div>`;
                }
            });
        });
        content.innerHTML += '<div class="miniShopCartItemLine"></div>';
        content.innerHTML += `<p class="totalPriceWrap">Итого: <span class="totalPrice">${getSumOfAllWatches()} €</span></p>`;
        content.innerHTML += '<div class="orderButton">Заказать</div>';
        document.querySelectorAll('.setMinus').forEach(minus => {
            minus.addEventListener('click',function(){
                (Number(minus.nextElementSibling.textContent) > 1) ? minus.parentNode.previousElementSibling.textContent = (Number(minus.parentNode.previousElementSibling.textContent.replace(' €','').replace(' ',''))) - (Number(minus.parentNode.previousElementSibling.textContent.replace(' €','').replace(' ','')) / Number(minus.nextElementSibling.textContent)) + ' €' : (Number(minus.parentNode.previousElementSibling.textContent.replace(' €','').replace(' ','')));
                minus.nextElementSibling.textContent = 
                        (Number(minus.nextElementSibling.textContent) > 1) 
                        ? (Number(minus.nextElementSibling.textContent) - 1) 
                        : Number(minus.nextElementSibling.textContent);
                document.querySelector('.totalPrice').textContent = `${getSumOfAllWatches()} €`;
            });
        });
        document.querySelectorAll('.setPlus').forEach(plus => {
            plus.addEventListener('click',function(){
                (Number(plus.previousElementSibling.textContent) < 10) ? plus.parentNode.previousElementSibling.textContent = (Number(plus.parentNode.previousElementSibling.textContent.replace(' €','').replace(' ',''))) + (Number(plus.parentNode.previousElementSibling.textContent.replace(' €','').replace(' ','')) / Number(plus.previousElementSibling.textContent)) + ' €' : (Number(plus.parentNode.previousElementSibling.textContent.replace(' €','').replace(' ','')));
                plus.previousElementSibling.textContent = 
                    (Number(plus.previousElementSibling.textContent) < 10) 
                    ? (Number(plus.previousElementSibling.textContent) + 1) 
                    : Number(plus.previousElementSibling.textContent);
                document.querySelector('.totalPrice').textContent = `${getSumOfAllWatches()} €`;
            });
        });
        document.querySelectorAll('.removeFromShoppingCart').forEach(button =>{
            button.addEventListener('click',function(){
                sendDeleteRequest(JSON.stringify({name: button.parentNode.childNodes[1].textContent}));
                setTimeout(() => showDataOnPage(),100);
            })
        });
    }
    function getSumOfAllWatches(){
        let total = 0;
        document.querySelectorAll('#watchesPrice').forEach(watchesPrice => {
            total += ((Number(watchesPrice.textContent.replace(' €','').replace(' ','')) / Number(watchesPrice.nextElementSibling.childNodes[5].textContent)) * (Number(watchesPrice.nextElementSibling.childNodes[5].textContent))); 
        });
        return total;
    }
    async function sendDeleteRequest(content){
        return await fetch(`ajax.php?do=deleteData`, {
                    method: 'POST',
                    headers : {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: content
        })
        .then(response => response.json())
        .then(json => console.log(json));
    }
});