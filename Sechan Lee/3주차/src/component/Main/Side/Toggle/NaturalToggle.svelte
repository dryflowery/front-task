<script>
    import { fly } from 'svelte/transition';
    
    let isVisible = false;

    const toggleDropdown = () => {
        isVisible = !isVisible; 
    }

    // dropdown을 클릭해도 main의 toggleDropdown 함수가 실행되지 않도록 함
    const stopPropagation = (event) => {
        event.stopPropagation(); 
    }
</script>

<main on:click={toggleDropdown}>
    <div id="arrow" class:isVisible={isVisible}>
        &lt;
    </div>
    
    {#if isVisible}
        <div id='dropdown' on:click={stopPropagation} transition:fly={{ x: 45, duration: 750 }}>
    
        </div>
    {/if}
</main>

<style>
    main {
        position: relative;
        display: flex;
        align-items: center; 
        justify-content: center;
        background-color: #d9513C;
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

    #dropdown {
        display: flex; 
        position: absolute;
        top: 0;
        left: -420px;
        height: 54px;
        width: 415px;
        background-color: #d9513C;
        z-index: 0;
        cursor: default;
    }
</style>
