<script>
    import { heap, tmpCreateHeap, elementCnt, animationWorking, codeColor, 
             naturalLang, isPaused, animationCnt, createAnimationWorking,
             insertAnimationWorking, deletetAnimationWorking, extractAnimationWorking } from '../../../../../lib/store';

    export let randomColor;
    export let startAnimation;
    let elementInput = '';
    let errorMessage = '';
    let hoverColor = '#000000';  
    let tmpElementCnt = 1;

    // N = <input>에서 값의 범위가 유효한지 체크
    const validInput = (event) => {
        const target = event.target;
        const value = Number(target.value);

        if (value > 31) {
            $elementCnt = 31;
            alert("32 이상은 입력할 수 없습니다.");
        } else if (value < 1) {
            $elementCnt = 1;
            alert("1 미만은 입력할 수 없습니다.");
        } 
        else {
            tmpElementCnt = value;
        }
    };
    
    // 랜덤한 원소 생성
    const createRadomElements = () => {
        $tmpCreateHeap = [null];
        $heap = Array(32).fill(null);
        $elementCnt = tmpElementCnt;

        for (let i = 0; i < $elementCnt; i++) {
            const randomNum = Math.floor(Math.random() * 100);
            $tmpCreateHeap.push(randomNum);
        }

        $insertAnimationWorking = $deletetAnimationWorking = $extractAnimationWorking = $createAnimationWorking = false;
        $createAnimationWorking = true;
        startAnimation();
    };

    // 입력된 텍스트를 숫자로 변환하여 배열로 저장
    const createInputtedElements = () => {
        const elements = elementInput.split(',').map(num => num.trim());
        errorMessage = '';

        // 입력된 원소의 개수가 31개 이하인지 확인
        if (elements.length > 31) {
            errorMessage = '31개 이하의 원소를 입력해주세요';
            return;
        }

        // 모든 요소가 유효한 숫자인지 확인
        const isValid = elements.every(el => {
            const num = Number(el);
            return !isNaN(num) && num >= 0 && num <= 99 && el !== '';
        });

        if (isValid) {
            $tmpCreateHeap = [null];
            $heap = Array(32).fill(null);
            elements.forEach(el => {
                $tmpCreateHeap.push(Number(el));
            });
            $elementCnt = $tmpCreateHeap.length - 1;
            // 추가) create 애니메이션
        } else if (elements.some(el => isNaN(Number(el)) || el === '')) {
            errorMessage = '유효하지 않은 문자가 있습니다';
        } else {
            errorMessage = '0이상, 99이하의 원소를 입력해주세요';
        }

        $insertAnimationWorking = $deletetAnimationWorking = $extractAnimationWorking = $createAnimationWorking = false;
        $createAnimationWorking = true;
        startAnimation();
    };
</script>

<main class:isErrorMessage={errorMessage} style="--random-bg-color: {randomColor}; --hover-bg-color: {hoverColor};">
    <span class='txt'>A</span> <span class='txt'>=</span>
    <input type="text" id="element-input" size="20" bind:value={elementInput}>
    <button id="go-btn" on:click={createInputtedElements}>Go</button>

    <span class='txt'>N</span> <span class='txt'>=</span>
    <input type="number" id="element-cnt-input" min="1" max="31" on:blur={validInput} bind:value={tmpElementCnt}>
    <button id="random-btn" on:click={createRadomElements}>Random</button>

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
        cursor: default;
    }

    input {
        background-color: black;
        color: white; 
        border: none;
        padding: 4px;
    }

    button {
        background-color: var(--random-bg-color); 
        color: white;
        border: none;
        cursor: pointer;
        padding: 4px 8px;

    }

    button:hover {
        background-color: var(--hover-bg-color); 
    }

    #element-cnt-input {
        width: 50px; 
    }

    #error-message {
        color: red;
        font-size: 0.75rem;
        cursor: default;
        min-width: 200px;
    }
</style>
