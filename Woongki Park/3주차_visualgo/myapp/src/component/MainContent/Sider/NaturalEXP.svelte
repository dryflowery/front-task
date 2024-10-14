<!--팀장 코드 그대로임 거의 비슷-->
<script>

    import {slide} from 'svelte/transition';
    import {animationWorking, naturalExplanation} from '../../../lib/store.js';

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
        <div id="EXPBlock" on:click={stopPropagation} transition:slide={{duration: 500 }}>
            <div class="EXP"> {@html $naturalExplanation} </div>
        </div>
    {/if}

</main>

<style>
    main {
        position: relative;
        top: 880px;
        display: flex;
        align-items: center; 
        justify-content: center;
        background-color: #75d471;
        height: 60px;
        cursor: pointer;
    }

    #Icon {
        position: relative;
        font-weight: 200px; 
        color: white; 
        z-index: 1;
        transition: transform 0.5s ease-in-out;
        font-size: 30px;
        top: 1px;
    }

    .isShow {
        transform: rotate(180deg); 
    }

    #EXPBlock {
        display: flex; 
        flex-direction: column; 
        position: absolute;
        top: 0;
        left: -420px; 
        height: 60px;
        width: 415px;
        background-color: #75d471;
        z-index: 0;
        cursor: default;
    }

    .EXP {
        color: black;
        font-size: 13px;
        margin: 10px;
    }

</style>