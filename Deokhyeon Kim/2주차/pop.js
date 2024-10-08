const pop = document.getElementById("popButton");
pop.addEventListener('click', popToStack);

function popToStack(){
    if(0 < stackTop){
        --stackTop;
        // 셀 내용 비우기
        myTable.rows[0].cells[stackTop].textContent = "";
    }else{
        alert("제거할 요소가 없습니다.");
    }
}