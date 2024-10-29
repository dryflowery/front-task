<script>
    import { elementCnt, animationWorking, codeColor, 
             naturalLang, isPaused, animationCnt, 
             extractAnimationWorking, insertAnimationWorking,
             extractCnt, deletetAnimationWorking, createAnimationWorking} from '../../../../../lib/store';

    export let randomColor;
    export let startAnimation;
    let hoverColor = '#000000';  
    let tmpExtractCnt = 1;

    // 값의 범위가 유효한지 체크
    const validInput = (event) => {
        const target = event.target;
        const value = Number(target.value);

        if (value > $elementCnt) {
            tmpExtractCnt = $elementCnt;
        } else if (value <= 0) {
            tmpExtractCnt = 1;
        } 
        else {
            tmpExtractCnt = value;
        }
    };

    const extract = () => {
        if(tmpExtractCnt >= $elementCnt) {
            alert(`최대 ${$elementCnt - 1}까지 입력이 가능합니다.`);
        }
        else {
            $extractCnt = tmpExtractCnt;
            $insertAnimationWorking = $deletetAnimationWorking = $extractAnimationWorking = $createAnimationWorking = false;
            $extractAnimationWorking = true;
            startAnimation();
        }
    }
</script>

<main style="--random-bg-color: {randomColor}; --hover-bg-color: {hoverColor};">
    <span class='txt'>cnt</span> <span class='txt'>=</span>
    <input type="number" id="extract-cnt-input" min="1" max="{$elementCnt}" on:blur={validInput} bind:value={tmpExtractCnt}>
    <button id="go-btn" on:click={extract}>Go</button>
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

    #extract-cnt-input {
        width: 50px; 
    }
</style>
