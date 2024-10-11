<script>
    import { numArr } from '../../../../lib/store';

    let elementCnt = 0;
    let elementInput = '';
    let errorMessage = '';

    // N = <input>에서 값의 범위가 유효한지 체크
    const validInput = (event) => {
        const target = event.target;
        const value = Number(target.value);

        if (value > 10) {
            elementCnt = 10;
            alert("11 이상은 입력할 수 없습니다.");
        } else if (value < 0) {
            elementCnt = 0;
            alert("0 미만은 입력할 수 없습니다.");
        } else {
            elementCnt = value;
        }
    };

    // 랜덤한 원소 생성
    const createRadomElements = () => {
        $numArr = [];

        for (let i = 0; i < elementCnt; i++) {
            const randomNum = Math.floor(Math.random() * 51);
            $numArr.push(randomNum);
        }
    };

    // 입력된 텍스트를 숫자로 변환하여 배열로 저장
    const createInputtedElements = () => {
        const elements = elementInput.split(',').map(num => num.trim());
        errorMessage = '';
        $numArr = [];

        // 입력된 원소의 개수가 10개 이하인지 확인
        if (elements.length > 10) {
            errorMessage = '10개 이하의 원소를 입력해주세요';
            return;
        }

        // 모든 요소가 유효한 숫자인지 확인
        const isValid = elements.every(el => {
            const num = Number(el);
            return !isNaN(num) && num >= 0 && num <= 50 && el !== '';
        });

        if (isValid) {
            elements.forEach(el => {
                $numArr.push(Number(el));
            });
        } else if (elements.some(el => isNaN(Number(el)) || el === '')) {
            errorMessage = '유효하지 않은 문자가 있습니다';
        } else {
            errorMessage = '0이상, 50이하의 원소를 입력해주세요';
        }
    };
</script>

<main class:isErrorMessage={errorMessage}>
    <span class='txt'>N</span> <span class='txt'>=</span>
    <input type="number" id="elementCntInput" min="0" max="10" on:blur={validInput} bind:value={elementCnt}>
    <button id="randomBtn" on:click={createRadomElements}>Random</button>
    <button id="sortedBtn">Sorted</button>
    <button id="nearlyBtn">Nearly sorted</button>
    <button id="manyBtn">Many duplicates</button>
    <span class='txt'>A</span> <span class='txt'>=</span>
    <input type="text" id="elementInput" size="10" bind:value={elementInput}>
    <button id="goBtn" on:click={createInputtedElements}>Go</button>

    {#if errorMessage}
        <span id="errorMessage">{errorMessage}</span>
    {/if}
</main>

<style>
    main {
        display: flex;
        align-items: center;
        gap: 4px; 
    }

    .isErrorMessage {
        padding-left: 204px;
    }

    .txt {
        font-size: 0.75rem;
    }

    input {
        background-color: black;
        color: white; 
        border: none;
        padding: 4px;
    }

    button {
        background-color: #FF8A27;
        color: white;
        border: none;
        cursor: pointer;
        padding: 4px 8px;
    }

    button:hover {
        background-color: #E67E22; 
    }

    #elementCntInput {
        width: 50px; 
    }

    #nearlyBtn {
        width: 100px;
    }

    #manyBtn {
        width: 115px;
    }

    #errorMessage {
        color: red;
        font-size: 0.75rem;
        cursor: default;
        min-width: 200px;
    }
</style>
