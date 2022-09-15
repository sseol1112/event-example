// change color
let selectedColor; //선택한 컬러값 저장할 변수
// change img
let viewImg = document.querySelector(".design_inner");
let bgImg = document.querySelectorAll(".change_img");
// icon img
let iconImg = document.querySelectorAll(".box_icon");
let textMsg = document.querySelector("#txt_area");


window.onload = function(){
    init();
}
function init(){
    let colorChip = ["#f89b00", "#f7e600", "#7dbad5", "#e091a9", "#86e6c2", "#81c147"]; //색상코드를 원하는 만큼 넣기
    let tag = "";
    for(i=0; i<colorChip.length; i++){  //color_box 의 id명을 색상명으로 지정해주기.
        tag += "<div id="+colorChip[i]+" class='color_box' onclick='colorSet(this)'></div>";
    }
    document.getElementById("color_list").innerHTML = tag;

    let colorBoxList = document.getElementsByClassName("color_box");
    for(i=0; i<colorBoxList.length; i++){
        colorBoxList[i].style.background = colorBoxList[i].id;  //id인 색상명을 color_box의 배경색으로 지정해주기
    }

}
// change color onclick event
function colorSet(colorPick){
    document.querySelector(".design_inner").style.background = colorPick.id;  //배경색을 선택한 색상박스의 id 값으로 지정해주기

    if(selectedColor != null){  
        document.getElementById(selectedColor).className = document.getElementById(selectedColor).className.replace(" selected", "");
    }
    document.getElementById(colorPick.id).className += " selected";
    selectedColor = colorPick.id;
}



for(let i = 0; i < bgImg.length; i++){
    bgImg[i].addEventListener("click", changeImg); // 이벤트 처리
}

for(let i = 0; i < iconImg.length; i++){
    iconImg[i].addEventListener("click", addIcon);
}

function changeImg(e){ // 이미지 바뀌는 함수
    let target = e.target;
    let bgImgAttribute = target.getAttribute("src");
    viewImg.setAttribute("style","background-image:url('"+ bgImgAttribute +"')");
}

// icon drag & drop
function addIcon(e) {
    let iconImgUrl = e.target;
    let iconImgSrc = e.target.getAttribute("src");

    console.log(iconImgUrl);
    viewImg.innerHTML = `<div class="view_icon"><a href="javascript:;" class="btn-del">X</a><img src='${iconImgSrc}'></div>`;
    
    document.querySelector('.btn-del').addEventListener('click', function(e){
        const curDelEl = e.target.parentElement;
        curDelEl.remove();
    })
}

// test api post (axios.post 활용)
function submitBtn() {
    let bgTest = viewImg.style.backgroundImage;
    let currIconImg = viewImg.children[0].lastChild;
    let currIconImgSrc = currIconImg.src;
    let textMsgVal = textMsg.value;
    const selectedVal = {
        text : textMsgVal,
        bgImg : bgTest,
        imgIconSrc : currIconImgSrc
    }
    console.log(textMsgVal);
    console.log("이미지: "+bgTest, "타겟: "+currIconImgSrc);
    //localStorage 활용해서 데이터 저장
    localStorage.setItem('cart', JSON.stringify(selectedVal))

}