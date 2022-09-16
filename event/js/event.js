// change color
let selectedColor; //선택한 컬러값 저장할 변수
// change img
let viewImg = document.querySelector(".design_inner");
let viewText = document.querySelector('.design_inner .text_area');
let getText = document.querySelector('.view_inner .text_area');
let bgImg = document.querySelectorAll(".change_img");
// icon img
let iconImg = document.querySelectorAll(".box_icon");
let textMsg = document.querySelector("#txt_area");

let bgBtn = document.querySelector(".bg_btn button");
let addBtn = document.querySelector(".txt_add_btn button");
let getBtn = document.querySelector(".get_btn button");
let bxIcon = document.querySelectorAll(".box_icon a img");


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


bgBtn.addEventListener('click', function(){
    submitBtn();
});
addBtn.addEventListener('click', function(){
    addText();
});

getBtn.addEventListener('click', function(){
    getInfomation();
});

for(let i = 0; i < bgImg.length; i++){
    bgImg[i].addEventListener("click", changeImg); // 이벤트 처리
}

// 아이콘 클릭시, 
// for(let i = 0; i < iconImg.length; i++){
//     iconImg[i].addEventListener("click", addIcon);
// }

// function addIcon(e) {
//     let iconImgUrl = e.target;
//     let iconImgSrc = e.target.getAttribute("src");

//     console.log(iconImgUrl);
//     viewImg.innerHTML = `<div class="view_icon"><a href="javascript:;" class="btn-del">X</a><img src='${iconImgSrc}'></div>`;
    
//     document.querySelector('.btn-del').addEventListener('click', function(e){
//         const curDelEl = e.target.parentElement;
//         curDelEl.remove();
//     })
// }

function changeImg(e){ // 이미지 바뀌는 함수
    let target = e.target;
    let bgImgAttribute = target.getAttribute("src");
    viewImg.setAttribute("style","background-image:url('"+ bgImgAttribute +"')");
}

// icon drag & drop
// 추가내용 - 22.09.15 drag&drop
for(let i=0; i<bxIcon.length; i++) {
    bxIcon[i].onmousedown = function(event) {
        let shiftX = event.clientX - bxIcon[i].getBoundingClientRect().left;
        let shiftY = event.clientY - bxIcon[i].getBoundingClientRect().top;
                
        bxIcon[i].style.width = "110px";
        bxIcon[i].style.height = "110px";
        bxIcon[i].style.position = 'absolute';
        bxIcon[i].style.zIndex = 1000;
        
        viewImg.append(bxIcon[i]);
    
        moveAt(event.pageX, event.pageY);
    
        // 초기 이동을 고려한 좌표 (pageX, pageY)에서 아이콘 대상을 이동함
        function moveAt(pageX, pageY) {
            bxIcon[i].style.left = pageX - shiftX + 'px';
            bxIcon[i].style.top = pageY - shiftY + 'px';
        }
    
        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }
    
        // mousemove로 아이콘 대상을 움직입니다.
        document.addEventListener('mousemove', onMouseMove);
    
        // 아이콘을 드롭하고, 불필요한 핸들러를 제거합니다. (★ 중요!)
        bxIcon[i].onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            bxIcon[i].onmouseup = null;
        };
    
    };
    
    bxIcon[i].ondragstart = function() {
        return false;
    };

}
// 추가내용 - 22.09.15 drag&drop

function submitBtn() {
    let currBgImg = viewImg.style.backgroundImage;
    let currIconImg = viewImg.children;
    let currIconImgArr = [];
    let currText = viewText.innerHTML;
    

    for(let i=0; i<currIconImg.length; i++) {
        // 220916 추가 - IMG 형식 체크 용 조건문 추가 (img형식만 배열변수에 push하기 위해서)
        if(currIconImg[i].nodeName === "IMG") { 
            currIconImgArr.push(currIconImg[i].src);
        }
    }
    const selectedVal = {
        text : currText,
        bgImg : currBgImg,
        imgIconSrc : currIconImgArr
    }

    if(!currIconImgArr || !currBgImg || !currText){
        alert('입력 및 선택한 내용을 다시 확인해주세요.')        
    } else {
        //localStorage 활용해서 데이터 저장
        localStorage.setItem('cart', JSON.stringify(selectedVal));
        alert('제출 되었습니다.');
    }
}

function addText() {
    let textMsgValue = textMsg.value;
    viewText.append(textMsgValue);
}

function getInfomation () {
    let cartItem = JSON.parse(localStorage.getItem('cart'));
    let cartItemText = cartItem.text;
    let cartImg = cartItem.imgIconSrc;
    
    let html = '';

    getText.innerHTML = cartItemText;
    html += '<div class="img_area">';
    for(var i =0; i<cartImg.length; i++){
        html += '<img src="'+cartImg[i]+'">';
    }
    html += '</div>';
    html += '<div class="text_area">' + cartItemText + '</div>';

    getText.innerHTML = html;
    
}



