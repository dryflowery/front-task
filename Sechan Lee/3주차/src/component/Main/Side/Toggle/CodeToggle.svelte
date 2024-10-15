<script>
    import { fly } from 'svelte/transition';
    import { codeColor, animationWorking, isUsedColor, randomColorArr } from '../../../../lib/store';

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
        <div id='dropdown' on:click={stopPropagation} transition:fly={{ x: 45, duration: 750 }}  style="--random-bg-color: {randomColor};">
            <div class='code' style="background-color: {$codeColor[0]};">do</div>

            <div class='code' style="background-color: {$codeColor[1]};">&nbsp;&nbsp; <b>swapped</b> = false</div>
            <div class='code' style="background-color: {$codeColor[1]};">&nbsp;&nbsp; for i = 0 to indexOfLastUnsortedElement-1</div>

            <div class='code' style="background-color: {$codeColor[2]};">&nbsp;&nbsp;&nbsp;&nbsp; if leftElement &gt; rightElement</div>

            <div class='code' style="background-color: {$codeColor[3]};">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; swap(leftElement, rightElement)</div>
            <div class='code' style="background-color: {$codeColor[3]};">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>swapped</b> = true; ++swapCounter</div>

            <div class='code' style="background-color: {$codeColor[4]};">while <b>swapped</b></div>
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
