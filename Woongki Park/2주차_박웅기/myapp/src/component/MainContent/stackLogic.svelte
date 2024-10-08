<!--스텍 로직 구역-->
<script>
    
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    
    let inputValue = ""; // 정수를 넣을 칸
    export let stackSize = 30;
    $: stack = new Array(stackSize).fill(null); // 스택 초기화
    export let top = 0; // 처음 top 위치

    // 애니메이션을 위한 위치값 (x, y 좌표)
    let animatedValue = null;
    let animationPosition = { x: 0, y: 0 };
    let finalPosition = { x: 0, y: 0 };

    // 움직이는 애니메이션 좌표 트윈
    const posX = tweened(0, { duration: 500, easing: cubicOut });
    const posY = tweened(0, { duration: 500, easing: cubicOut });

    let showRedBorder = false; // top-box 테두리 빨간색 표시 상태

    function Push() {
        const value = parseInt(inputValue); // 입력값을 정수로 변환
        if (!isNaN(value) && value >= 0 && top < stackSize) {
            animatedValue = value; // 애니메이션에 표시할 값
            finalPosition = getStackPosition(top); // 스택 위치 계산

            // 애니메이션이 끝나면 값을 스택에 추가하고 top-box에 빨간 테두리 표시
            posX.set(finalPosition.x);
            posY.set(finalPosition.y).then(() => {
                stack[top] = value; // 스택에 추가
                top++;
                animatedValue = null; // 애니메이션 종료 후 값 숨김
                showRedBorder = true; // 빨간 테두리 표시 시작
                setTimeout(() => showRedBorder = false, 300); // 300ms 후 빨간 테두리 제거
            });
            
            inputValue = ""; // 입력 필드 초기화
        } else if (top >= stackSize) {
            alert("스택이 꽉 찼습니다.");
        } else {
            alert("유효한 자연수를 입력하세요.");
        }
    }

    function Pop() {
        if (top > 0) { // 스택이 비어있지 않은 경우
            top--; // top 위치 감소
            stack[top] = null; // 스택에서 제거
        } else {
            alert("스택이 비어 있습니다.");
        }
    }

    function ClearStack() {
        for (let i = 0; i < stackSize; i++) {
            stack[i] = null; // 모든 스택 칸을 null로 설정
        }
        top = 0; // top 위치 초기화
    }

    // 각 스택의 좌표를 계산하는 함수 (간단한 예시로 행과 열에 따라 x, y 위치 계산)
    function getStackPosition(index) {
    const row = Math.floor(index / 15);  // 행 계산 (0~14는 첫 번째 줄, 15~29는 두 번째 줄)
    const col = index % 15;              // 열 계산 (0~14는 각자의 위치, 15부터 다시 열을 세기 시작)

    // 스택 박스 크기와 간격을 고려한 좌표 계산
    const x = col * 52;                  // 각 칸의 너비 52px을 기준으로 열에 따라 x 좌표 설정
    const y = row * 70;                  // 각 칸의 높이 70px을 기준으로 행에 따라 y 좌표 설정

    return {
        x: x,  // 인덱스에 맞는 x 좌표
        y: y   // 인덱스에 맞는 y 좌표
    };
}

</script>

<!-- 버튼 구역 -->
<div class="tecButton">
    <input type="text" id="inputBox" bind:value={inputValue}>
    <button on:click={Push}>Push</button>
    <button on:click={Pop}>Pop</button>
    <button on:click={ClearStack}>Clear Stack</button>
</div>

<!-- 애니메이션을 위한 파란색 테두리 원 -->
{#if animatedValue !== null}
    <div class="animated-circle" style="transform: translate({$posX}px, {$posY}px)">
        {animatedValue}
    </div>
{/if}

<!-- 스택 시각화 -->
<div class="stack-visual">
    <!-- 상단에 'top' 박스, 빨간 테두리 추가 -->
    <div class="top-box {showRedBorder ? 'red-border' : ''}">
        {top}
    </div>

    <!-- 스택 칸 0~14 -->
    <div class="stack-row">
        {#each stack.slice(0, 15) as value, index}
            <div class="stack-box">{value !== null ? value : ""}</div>
        {/each}
    </div>

    <!-- 0~14 번호 -->
    <div class="stack-row">
        {#each Array(15).fill(0) as _, index}
            <div class="stack-index">{index}</div>
        {/each}
    </div>

    <!-- 스택 칸 15~29 -->
    <div class="stack-row">
        {#each stack.slice(15, 30) as value, index}
            <div class="stack-box">{value !== null ? value : ""}</div>
        {/each}
    </div>

    <!-- 15~29 번호 -->
    <div class="stack-row">
        {#each Array(15).fill(0) as _, index}
            <div class="stack-index">{index + 15}</div>
        {/each}
    </div>
</div>

<style>
    .tecButton { 
        background-color: #ddeedd;
        padding: 2px;
        display: flex;
        align-items: center;
        margin-bottom: 70px;
        padding-bottom: 0;
    }

    #inputBox {
        padding: 1px;
        font-size: 13px;
        width: 75px; 
        height: 23px;
        border: 1px solid #6d6d6d;
    }

    button {
        padding: 2px 7px;
        font-size: 13px;
        margin-left: 4px;
        cursor: pointer;
        background-color: #ececec;
        border: 1px solid #6d6d6d;
        border-radius: 3px;
        transition: background-color 0.3s ease;
        margin-top: 1px;
        font-weight: 500;  
    }

    button:hover {
        background-color: #b4b4b4b6;
    }

    /* 스택 시각화 스타일 */
    .stack-visual {
        display: flex;
        flex-direction: column;
        margin-left: 100px;
    }

    .top-box { 
        margin-bottom: 70px;
        margin-left: 80px;
        font-size: 18px;
        text-align: center;
        padding: 10px;
        border: 1px solid #000;
        width: 30px;
        height: 30px;
        transition: border-color 0.3s ease;
    }

    /* 빨간 테두리 스타일 */
    .red-border {
        border-color: red;
        
    }

    .stack-row {
        display: flex;
        margin-bottom: 5px;
    }

    .stack-box {
        width: 50px;
        height: 50px;
        border: 1px solid #000;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        margin: 1px;
    }

    .stack-index {
        width: 50px;
        height: 50px;
        border: 1px solid #00000000;
        display: flex;
        
        justify-content: center;
        font-size: 18px;
        margin: 1px;
    }

    .stack-index {
        font-size: 14px;
        color: blue;
    }

    /* 애니메이션 파란색 테두리 원 */
    .animated-circle {
        position: absolute;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid blue;
        background-color: transparent;
        color: blue;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
    }
</style>
