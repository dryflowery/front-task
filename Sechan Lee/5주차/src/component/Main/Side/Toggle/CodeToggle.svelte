<script>
    import { fly } from 'svelte/transition';
    import { codeColor, animationWorking, isUsedColor, randomColorArr, insertAnimationWorking, 
             extractAnimationWorking, 
             deletetAnimationWorking,
             createAnimationWorking} from '../../../../lib/store';

    let isVisible = false;
    let randomColor = getRandomColor(); 
    
    function getRandomColor() {
        while(true) {
            let randomIndex = Math.floor(Math.random() * $randomColorArr.length);

            if($isUsedColor[randomIndex] == false) {
                $isUsedColor[randomIndex] = true;
                return $randomColorArr[randomIndex];
            }
        }
    }

    $: if ($animationWorking) {
        isVisible = true;
    }

    const toggleDropdown = () => {
        isVisible = !isVisible; 
    }

    // dropdown을 클릭해도 main의 toggleDropdown 함수가 실행되지 않도록 함
    const stopPropagation = (event) => {
        event.stopPropagation(); 
    }
</script>

<main on:click={toggleDropdown} style="--random-bg-color: {randomColor};">
    <div id="arrow" class:isVisible={isVisible}>
        &lt;
    </div>
    
    {#if isVisible}
        <div id='dropdown' on:click={stopPropagation}  transition:fly={{ x: 45, duration: 750 }} style="--random-bg-color: {randomColor};">
            {#if $insertAnimationWorking} 
                <div class='code' style="background-color: {$codeColor[0]};">A[A.length] = v</div>
                <div class='code' style="background-color: {$codeColor[0]};">i = A.length-1</div>
                <div class='code' style="background-color: {$codeColor[1]};">while ((i &gt; 1) && (A[i] &gt; A[parent(i)]))</div>
                <div class='code' style="background-color: {$codeColor[2]};">&nbsp;&nbsp;swap(A[i], A[parent(i)]); i = parent(i)	</div>
            {:else if $extractAnimationWorking}
                <div class='code' style="background-color: {$codeColor[0]};">take out A[1]</div>
                <div class='code' style="background-color: {$codeColor[1]};">A[1] = A[A.length-1]</div>
                <div class='code' style="background-color: {$codeColor[1]};">i = 1; A.length--</div>
                <div class='code' style="background-color: {$codeColor[2]};">while (i &lt; A.length)</div>
                <div class='code' style="background-color: {$codeColor[2]};">&nbsp;&nbsp;if A[i] &lt; (L = the larger of i's children)</div>
                <div class='code' style="background-color: {$codeColor[3]};">&nbsp;&nbsp;&nbsp;&nbsp;swap(A[i], L); i = L's index</div>
            {:else if $deletetAnimationWorking}
                <div class='code' style="background-color: {$codeColor[0]};">A[i] = A[1]+1; shiftup(i);</div>
                <div class='code' style="background-color: {$codeColor[1]};">ExtractMax();</div>
            {:else if $createAnimationWorking}
                <div class='code' style="background-color: {$codeColor[0]};">Start from an empty Binary Max Heap</div>
                <div class='code' style="background-color: {$codeColor[1]};">for (i = 0; i &lt; A.length; ++i)</div>
                <div class='code' style="background-color: {$codeColor[1]};">&nbsp;&nbsp;Insert(A[i])</div>
            {/if}   
        </div>
    {/if}
</main>

<style>
    main {
        position: relative;
        display: flex;
        align-items: center; 
        justify-content: center;
        background-color: var(--random-bg-color); 
        height: 192px;
        cursor: pointer;
    }

    #arrow {
        position: relative;
        font-size: 16px; 
        font-weight: 550; 
        color: white; 
        z-index: 1;
        transition: transform 0.5s ease-in-out;
    }

    .isVisible {
        transform: rotate(180deg); 
    }
    
    #dropdown {
        display: flex; 
        flex-direction: column; 
        position: absolute;
        top: 0;
        left: -420px; 
        height: 192px;
        width: 415px;
        background-color: var(--random-bg-color); 
        z-index: 0;
        cursor: default;
    }

    #dropdown > div {
        padding: 6px 0px 6px 10px;
    }

    .code {
        font-size: 13px;
        color: white;
        font-family: courier new, Courier, monospace;
    }
</style>
