const table = document.getElementById('myTable');
const indexContainer = document.getElementById('indexContainer');

// 1행 10열의 테이블 생성
const row = table.insertRow();

for (let i = 0; i < 10; i++) { 
    const cell = row.insertCell(); // 새로운 셀 추가
    cell.textContent = ""; // 셀에 텍스트 추가
}

// 인덱스 텍스트 추가
for (let i = 0; i < 10; i++) {
    const indexDiv = document.createElement('div'); // 새로운 div 생성
    indexDiv.textContent = i; // 인덱스 번호 추가
    indexDiv.className = 'index'; // 스타일 적용
    indexContainer.appendChild(indexDiv); // 인덱스 컨테이너에 추가
}