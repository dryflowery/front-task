<!--팀장 코드 그대로임 거의 비슷-->
<script>

    import {slide} from 'svelte/transition';
    import {animationWorking,codeColor} from '../../../lib/store.js';

    let isShow = false;

    $: if ($animationWorking) {
        isShow = true;
    }

    const btnDropdown = () => {
        isShow = !isShow 
    }

    const stopPropagation = (event) => {
        event.stopPropagation(); 
    }

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<main on:click={btnDropdown}>
    <div id="Icon" class:isShow={isShow}> &lt </div>

    {#if isShow }
        <div id="CodeBlock" on:click={stopPropagation} transition:slide={{duration: 500 }}>
            <div id="CodeExplanation">
                <div class='code' style="background-color: {$codeColor[0]};">do</div>

                <div class='code' style="background-color: {$codeColor[1]};">&nbsp;&nbsp; <b>swapped</b> = false</div>
                <div class='code' style="background-color: {$codeColor[1]};">&nbsp;&nbsp; for i = 0 to indexOfLastUnsortedElement-1</div>

                <div class='code' style="background-color: {$codeColor[2]};">&nbsp;&nbsp;&nbsp;&nbsp; if leftElement &gt; rightElement</div>

                <div class='code' style="background-color: {$codeColor[3]};">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; swap(leftElement, rightElement)</div>
                <div class='code' style="background-color: {$codeColor[3]};">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>swapped</b> = true; ++swapCounter</div>

                <div class='code' style="background-color: {$codeColor[4]};">while <b>swapped</b></div>
            </div>
        </div>
    {/if}
</main>

<style>
    main {
        position: relative;
        top: 890px;
        display: flex;
        align-items: center; 
        justify-content: center;
        background-color: #ff7e28;
        height: 192px;
        cursor: pointer;
    }

    #Icon {
        position: relative;
        font-size: 16px; 
        font-weight: 200px; 
        color: white; 
        z-index: 1;
        transition: transform 0.5s ease-in-out;
        font-size: 30px;
        top: -5px;
    }

    .isShow {
        transform: rotate(180deg); 
    }

    #CodeBlock {
        display: flex; 
        flex-direction: column; 
        position: absolute;
        top: 0;
        left: -420px; 
        height: 192px;
        width: 415px;
        background-color: #ff7e28;
        z-index: 0;
        cursor: default;
    }
    
    #CodeExplanation {
        padding-top: 2px;
        padding-left: 10px;
    }

    .code {
        margin: 9px;
        color: white;
        font-size: 12px;

    }

</style>