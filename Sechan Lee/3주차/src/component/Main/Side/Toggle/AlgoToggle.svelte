<script>
    import { fly } from 'svelte/transition';
    import { animationWorking } from '../../../../lib/store';
    import CreateElement from './CreateElement.svelte';

    let isDropdownVisible = false; 
    let isCreateElementVisible = false;
    let randomColor = getRandomColor();
    let hoverColor = '#000000'; 

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const toggleDropdown = () => {
        isDropdownVisible = !isDropdownVisible; 

        if (isDropdownVisible === false && isCreateElementVisible === true) {
            isCreateElementVisible = false;
        }
    }

    const toggleCreateElement = () => {
        isCreateElementVisible = !isCreateElementVisible;
    }

    const stopPropagation = (event) => {
        event.stopPropagation(); 
    }

    const startAnimation = () => {
        isDropdownVisible = isCreateElementVisible = false;
        $animationWorking = true;
    }
</script>

<main on:click={toggleDropdown} style="--random-bg-color: {randomColor}; --hover-bg-color: {hoverColor}">
    <div id="arrow" class:dropdownVisible={isDropdownVisible}>
        &gt;
    </div>
    
    {#if isDropdownVisible}
        <div id='dropdown' on:click={stopPropagation} transition:fly={{ x: -45, duration: 750 }}>
            <button class='algo-dropdown-btn' id='create-btn' on:click={toggleCreateElement}>Create(A)</button>
            <button class='algo-dropdown-btn' on:click={startAnimation}>Sort</button>
        </div>
    {/if}

    {#if isCreateElementVisible}
        <div id="create-element-comp" on:click={stopPropagation} transition:fly={{ x: -45, duration: 750 }}>
            <CreateElement randomColor={randomColor}/>
        </div>
    {/if}
</main>

<style>
    main {
        position: relative;
        display: flex;
        align-items: center; 
        justify-content: center;
        height: 64px;
        cursor: pointer;
        overflow: visible; 
        background-color: var(--random-bg-color);
    }

    #arrow {
        position: absolute; 
        font-size: 16px; 
        font-weight: 550; 
        color: white; 
        z-index: 3; 
        transition: transform 0.5s ease-in-out;
    }

    .dropdownVisible {
        transform: rotate(180deg); 
    }

    #dropdown {
        display: flex; 
        flex-direction: column; 
        justify-content: space-between; 
        position: absolute;
        top: 0;
        left: 45px;
        height: 64px;
        width: 150px;
        z-index: 1; 
        background-color: var(--random-bg-color); 
    }

    .algo-dropdown-btn {
        color: white; 
        border: none; 
        flex: 1; 
        cursor: pointer; 
        text-align: left;
        background-color: var(--random-bg-color);
    }

    .algo-dropdown-btn:hover {
        background-color: var(--hover-bg-color); 
    }

    #create-element-comp {
        position: relative;
        margin: -30px 0px 0px 970px;   
    }
</style>
