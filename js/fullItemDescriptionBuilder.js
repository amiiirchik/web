window.addEventListener('DOMContentLoaded',function(){
    document.querySelector('.mainImage').src = (JSON.parse(localStorage.getItem('imageUrl'))).substr(15);
    document.querySelector('.mainInfoPrice').textContent = (JSON.parse(localStorage.getItem('price')));
    document.querySelector('.watchesName').textContent = (JSON.parse(localStorage.getItem('name')));
    document.querySelector('.buy').textContent = '';
    
    setButtonCondition();

    document.querySelector('.buy').addEventListener('click',function(){
        if(document.querySelector('.buy').textContent == 'В корзину')
            sendPostRequest(JSON.stringify({name: document.querySelector('.watchesName').textContent}));
        else
            sendDeleteRequest(JSON.stringify({name: document.querySelector('.watchesName').textContent}));

        document.querySelector('.buy').textContent = (document.querySelector('.buy').textContent == 'В корзину') ? 'Убрать из корзины' : 'В корзину';
    });

    async function sendPostRequest(content){
        return await fetch(`ajax.php?do=putData`, {
                    method: 'POST',
                    headers : {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: content
        })
        .then(response => response.json())
        .then(json => console.log(json));
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

    function setButtonCondition(){
        fetch('ajax.php?do=getShopBagItems')
            .then(response => response.json())
            .then(json => checkCondition(json))
    }
    function checkCondition(data){
        setTimeout(function(){
            if(data.includes(document.querySelector('.watchesName').textContent))
                document.querySelector('.buy').textContent = 'Убрать из корзины';
            else 
                document.querySelector('.buy').textContent = 'В корзину';
        },100);
    }
});