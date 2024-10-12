<script>
    import {numArray} from '../../../lib/store';

    let eleCount = 0; //최대 10까지(비주알고는 43까지 가능)
    let elementInputValue = ''; // 최대 0~50 까지
    let feedbackMessage = '';

    const checkValue = (event) => {
        const target = event.target;
        const value = Number(target.value);

        if (value > 10) {
            eleCount = 10;
            alert("10 초과는 입력할 수 없습니다.");
        } else if (value < 0) {
            eleCount = 0;
            alert("0 미만은 입력할 수 없습니다.");
        } else {
            eleCount = value;
        }
    };
    
    const radomLogic = () => { // 랜덤 로직
        $numArray = [];

        for (let i = 0; i < eleCount; i++) {
            const randomNum = Math.floor(Math.random() * 51);
            $numArray.push(randomNum);
        }
        console.log($numArray); // 배열이 제대로 생성되었는지 확인
    }

        
    const handleUserInput = () => {
        const trimmedInputs = elementInputValue.split(',').map(value => value.trim());
        feedbackMessage = '';  // 피드백 메시지 초기화
        $numArray = [];  // 배열 초기화
        
        // 각 입력값에 대한 개별 유효성 검사
        trimmedInputs.forEach((item, index) => {
            const numberValue = Number(item);

            // 입력값이 유효하지 않은 경우
            if (isNaN(numberValue) || item === '' || numberValue < 0 || numberValue > 50) {
                if (isNaN(numberValue) || item === '') {
                    feedbackMessage = `입력값 "${item}"가 유효하지 않습니다 (숫자를 입력하세요).`;
                } else {
                    feedbackMessage = `입력값 "${item}"는 0 이상 50 이하이어야 합니다.`;
                }
                return;  // 잘못된 입력값이 있으면 함수 종료
            }

            // 유효한 입력값인 경우 배열에 추가
            $numArray.push(numberValue);
        });

        // 최대 10개의 숫자만 입력 가능
        if (trimmedInputs.length > 10) {
            feedbackMessage = '최대 10개의 숫자만 입력 가능합니다';
            return;
        }

        // 유효성 검사 후 배열 출력 확인 (디버깅용)
        console.log($numArray);
    };
    
</script>

<main class:isFeedbackMessage={feedbackMessage}>
    <span class='txt'>N</span> <span class='txt'>=</span>
    <input type="number" id="elementCntInput" min="0" max="10" on:blur={checkValue} bind:value={eleCount}>
    <button id="randomBtn" on:click={radomLogic}>Random</button>
    <button id="sortedBtn">Sorted</button>
    <button id="nearlyBtn">Nearly sorted</button>
    <button id="manyBtn">Many duplicates</button>
    <span class='txt'>A</span> <span class='txt'>=</span>
    <input type="text" id="elementInputValue" size="10" bind:value={elementInputValue}>
    <button id="goBtn" on:click={handleUserInput}>Go</button>

    {#if feedbackMessage}
        <span id="feedbackMessage">{feedbackMessage}</span>
    {/if}
</main>    

<style>
     main {
        margin-left: 1075px;
        display: flex;
        align-items: center;
        gap: 4px; 
        color:black;
    }

    .isFeedbackMessage {
        padding-left: 204px;
    }

    .txt {
        font-size: 13px;
        margin-bottom: 13px;
    }

    input {
        background-color: black;
        color: white; 
        border: none;
        padding: 4px;
    }

    button {
        background-color: #7790ff;
        color: white;
        border: none;
        cursor: pointer;
        padding: 4px 8px;
    }

    button:hover {
        background-color: #7790ff; 
    }

    #elementCntInput {
        width: 50px; 
    }

    #nearlyBtn {
        width: 125px;
    }

    #manyBtn {
        width: 150px;
    }

    #feedbackMessage {
        color: red;
        font-size: 0.75rem;
        cursor: default;
        min-width: 200px;
    }
</style>
