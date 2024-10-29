<script>
    import { animationWorking, codeColor, naturalLang, isPaused, 
        animationCnt, insertAnimationWorking, elementCnt, insertElement, 
        deletetAnimationWorking,
        extractAnimationWorking,
        createAnimationWorking} from '../../../../../lib/store';

    export let randomColor;
    export let startAnimation;
    let hoverColor = '#000000';  
    let tmpElement = 0;

    // 값의 범위가 유효한지 체크
    const validInput = (event) => {
        const target = event.target;
        const value = Number(target.value);

        if (value > 99) {
            tmpElement = 99;
        } else if (value < 0) {
            tmpElement = 0;
        } 
        else {
            tmpElement = value;
        }
    };

    const insert = () => {
        if($elementCnt == 31) {
            alert("원소를 더 이상 삽입할 수 없습니다");
        }
        else {
            $insertElement = tmpElement;
            $insertAnimationWorking = $deletetAnimationWorking = $extractAnimationWorking = $createAnimationWorking = false;
            $insertAnimationWorking = true;
            startAnimation();
        }
    };
</script>

<main style="--random-bg-color: {randomColor}; --hover-bg-color: {hoverColor};">
    <span class='txt'>v</span> <span class='txt'>=</span>
    <input type="number" id="insert-element-input" min="1" max="99" on:blur={validInput} bind:value={tmpElement}>
    <button id="go-btn" on:click={insert}>Go</button>
</main>

<style>
    main {
        display: flex;
        align-items: center;
        gap: 4px; 
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

    #insert-element-input {
        width: 50px; 
    }
</style>
