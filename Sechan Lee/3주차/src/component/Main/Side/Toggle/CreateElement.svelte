<script>
    import { numArr, elementCnt, animationWorking, codeColor, 
             naturalLang, isPaused, animationCnt } from '../../../../lib/store';

    let elementInput = '';
    let errorMessage = '';

    // N = <input>에서 값의 범위가 유효한지 체크
    const validInput = (event) => {
        const target = event.target;
        const value = Number(target.value);

        if (value > 20) {
            $elementCnt = 20;
            alert("21 이상은 입력할 수 없습니다.");
        } else if (value < 0) {
            $elementCnt = 0;
            alert("0 미만은 입력할 수 없습니다.");
        } else {
            $elementCnt = value;
        }
    };

    const Init = () => {
        $animationWorking = false;
        $codeColor = Array(5).fill("rgba(255, 255, 255, 0)");
        $naturalLang = "";
        $isPaused = false;
        $animationCnt = [0, 0];

        const graphElements = document.querySelectorAll('.graph');

        graphElements.forEach((element, idx) => {
            element.style.transition = "left 1s ease, height 0.5s ease";
            graphElements[idx].style.backgroundColor = "#ADD8E6";
        });
    }


    // 랜덤한 원소 생성
    const createRadomElements = () => {
        $numArr = [];

        for (let i = 0; i < $elementCnt; i++) {
            const randomNum = Math.floor(Math.random() * 51);
            $numArr.push(randomNum);
        }

        Init();
    };

    // 입력된 텍스트를 숫자로 변환하여 배열로 저장
    const createInputtedElements = () => {
        const elements = elementInput.split(',').map(num => num.trim());
        errorMessage = '';
        $numArr = [];

        // 입력된 원소의 개수가 20개 이하인지 확인
        if (elements.length > 20) {
            errorMessage = '20개 이하의 원소를 입력해주세요';
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

        Init();
    };
</script>

<main class:isErrorMessage={errorMessage}>
    <span class='txt'>N</span> <span class='txt'>=</span>
    <input type="number" id="element-cnt-input" min="0" max="20" on:blur={validInput} bind:value={$elementCnt}>
    <button id="random-btn" on:click={createRadomElements}>Random</button>
    <button id="sorted-btn">Sorted</button>
    <button id="nearly-btn">Nearly sorted</button>
    <button id="many-btn">Many duplicates</button>
    <span class='txt'>A</span> <span class='txt'>=</span>
    <input type="text" id="element-input" size="10" bind:value={elementInput}>
    <button id="go-btn" on:click={createInputtedElements}>Go</button>

    {#if errorMessage}
        <span id="error-message">{errorMessage}</span>
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

    #element-cnt-input {
        width: 50px; 
    }

    #nearly-btn {
        width: 100px;
    }

    #many-btn {
        width: 115px;
    }

    #error-message {
        color: red;
        font-size: 0.75rem;
        cursor: default;
        min-width: 200px;
    }
</style>
