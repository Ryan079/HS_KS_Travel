// 先去把資料給抓下來
const dataURL = 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97';

//從respnseText抓下來後存在這裡
let data;

let xhr = new XMLHttpRequest();
xhr.open('get',dataURL);
xhr.send(null);
console.log(xhr);
xhr.onload = function(){
    data = JSON.parse(xhr.responseText);
    console.log(data);

    //執行一開始藥顯示的data
    beginshow();
}

//把各個藥選取的對象先命名
//下拉選單
let select = document.querySelector('.kslist');
//地區卡片
let card = document.querySelector('.cardblock');
//標題
let title = document.querySelector('.title');

//高雄各個區域區
let linya = document.querySelector('#linya'); //苓雅區
let sanmin = document.querySelector('#sanmin'); //三民區
let sinsing = document.querySelector('#sinsing'); //新興區
let siaogang = document.querySelector('#siaogang'); //小港區

// 從 data 裡面去找尋地區跟 string 相同的資料並回傳
function showData(str){
    let tempdata = data.result.records;
    let cardstr = "";
    for (let i=0; i< tempdata.length; i++){
        if (str == tempdata[i].Zone){
            // nowdata.push(tempdata[i]);
            cardstr += 
            `<div class="card">
                <div class="rowimg"><img class="blockimg" src="${tempdata[i].Picture1}"></div>
                <ul>
                    <li><img src="img/icons_clock.png"> ${tempdata[i].Opentime}</li>
                    <li><img src="img/icons_pin.png"> ${tempdata[i].Add}</li>
                    <li><img src="img/icons_phone.png"> ${tempdata[i].Tel}</li>    
                </ul>
                <p><img src="img/icons_tag.png"> ${tempdata[i].Ticketinfo}</p>
            </div>`;
        } 
    }
    card.innerHTML = cardstr;
    
}

// 一開始先顯示苓雅區
function beginshow(){
    let nowdata = '苓雅區';
    showData(nowdata);
}

// 點擊按鈕觸發變更資料
function btnchange(){
    //取得點擊按鈕的文字內容
    let str = this.textContent;
    showData(str);

    //變更區域title
    title.textContent = str;
}

// 下拉式選單觸發變更資料
function listchange(e){
    //取得下拉式選單的值
    let str = e.target.value;
    showData(str);

    //變更區域title
    title.textContent = str;
}

//監聽下拉式選單
select.addEventListener('change',listchange); 

//監聽四個按鈕
linya.addEventListener('click',btnchange);
sanmin.addEventListener('click',btnchange);
sinsing.addEventListener('click',btnchange);
siaogang.addEventListener('click',btnchange);
