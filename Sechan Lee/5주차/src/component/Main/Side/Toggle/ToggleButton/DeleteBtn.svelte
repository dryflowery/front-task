<script>
    import { elementCnt, animationWorking, codeColor, 
             naturalLang, isPaused, animationCnt, deletetAnimationWorking, deleteIdx,
             insertAnimationWorking, extractAnimationWorking, createAnimationWorking} from '../../../../../lib/store';

    export let randomColor;
    export let startAnimation;
    let hoverColor = '#000000';  
    let tmpDeleteIdx = 1;

    // 값의 범위가 유효한지 체크
    const validInput = (event) => {
        const target = event.target;
        const value = Number(target.value);

        if (value > $elementCnt) {
            tmpDeleteIdx = $elementCnt;
        } else if (value <= 0) {
            tmpDeleteIdx = 1;
        } 
        else {
            tmpDeleteIdx = value;
        }
    };

    const deleteHeap = () => {
        if($elementCnt == 1) {
            alert("원소를 더 이상 삭제할 수 없습니다");
        }
        else {
            $deleteIdx = tmpDeleteIdx;
            $insertAnimationWorking = $deletetAnimationWorking = $extractAnimationWorking = $createAnimationWorking = false;
            $deletetAnimationWorking = true;
            startAnimation();
        }
    }
</script>

<main style="--random-bg-color: {randomColor}; --hover-bg-color: {hoverColor};">
    <span class='txt'>idx</span> <span class='txt'>=</span>
    <input type="number" id="extract-cnt-input" min="1" max="{$elementCnt}" on:blur={validInput} bind:value={tmpDeleteIdx}>
    <button id="go-btn" on:click={deleteHeap}>Go</button>
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
