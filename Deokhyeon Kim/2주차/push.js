// 테이블 가져오기
const myTable = document.getElementById("myTable")

// 변수 이름에 top 사용 못해,,, (window.top 과 겹칠수 있어서,,,)
var stackTop = 0;

function pushToStack(){
    // input 에서 value 가져오기
    let value = document.getElementById("push").value;

    if (value.trim() === "") {
        alert("입력 값을 확인하세요.");
        return; // 비어 있으면 함수 종료
    }

    console.log("현재 top 값:", stackTop);
    
    // top 10보다 작으면 실행, 테이블의 셀에 접근해 텍스트(value) 삽입
    if(stackTop < 10){
        myTable.rows[0].cells[stackTop].textContent = value;
        stackTop++;
        document.getElementById('push').value = ""; 
    }else{
        alert("최대 10개의 항목을 추가했습니다.");
    }
}

const push = document.getElementById("pushButton")
push.addEventListener('click', pushToStack);
