<script>
    import { fly } from 'svelte/transition';
    import { animationWorking } from '../../../../lib/store';
    import CreateElement from './CreateElement.svelte';

    let isDropdownVisible = false; 
    let isCreateElementVisible = false;

    const toggleDropdown = () => {
        isDropdownVisible = !isDropdownVisible; 

        if (isDropdownVisible === false && isCreateElementVisible === true) {
            isCreateElementVisible = false;
        }
    }

    const toggleCreateElement = () => {
        isCreateElementVisible = !isCreateElementVisible;
    }

    // dropdown과 elementCreate를 클릭해도 main의 toggleDropdown 함수가 실행되지 않도록 함
    const stopPropagation = (event) => {
        event.stopPropagation(); 
    }

    const startAnimation = () => {
        isDropdownVisible = isCreateElementVisible = false;
        $animationWorking = true;
    }
</script>

<main on:click={toggleDropdown}>
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
            <CreateElement/>
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
        background-color: #FF8A27;
        cursor: pointer;
        overflow: visible; 
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
        background-color: #FF8A27; 
        z-index: 1; 
    }

    .algo-dropdown-btn {
        background-color: #FF8A27; 
        color: white; 
        border: none; 
        flex: 1; 
        cursor: pointer; 
        text-align: left; 
    }

    .algo-dropdown-btn:hover {
        background-color: #E67E22; 
    }

    #create-element-comp {
        position: relative;
        margin: -30px 0px 0px 970px;   
    }
</style>