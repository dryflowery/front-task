<script>
    import { fly } from 'svelte/transition';
    import { animationWorking, naturalLang } from '../../../../lib/store';
    
    let isVisible = false;
    let randomColor = getRandomColor(); 
    
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
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
        <div id="bubble-sort" transition:fly={{ x: 0, duration: 0 }}><b>Bubble Sort</b></div>
        <div id='dropdown' on:click={stopPropagation} transition:fly={{ x: 45, duration: 750 }}>
            <div id="natural-lang">{@html $naturalLang}</div>
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
        height: 54px;
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

    #bubble-sort {
        position: absolute;
        top: -30px;
        left: -120px;
        min-width: 150px;
        font-size: 1.2rem;
        font-family: 'PT Sans', sans-serif;
    }
    
    #dropdown {
        display: flex; 
        position: absolute;
        top: 0;
        left: -420px;
        height: 54px;
        width: 415px;
        background-color: var(--random-bg-color); /* 랜덤 배경색 */
        z-index: 0;
        cursor: default;
    }

    #natural-lang {
        padding: 10px 10px;
        font-size: 12px;
        color: white;
        font-family: 'PT Sans', sans-serif;
    }
</style>
