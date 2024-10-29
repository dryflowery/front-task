<script>
    import { fly } from 'svelte/transition';
    import { animationWorking, insertAnimationWorking, isUsedColor, randomColorArr } from '../../../../lib/store';
    import CreateElement from './ToggleButton/CreateElementBtn.svelte';
    import InsertBtn from './ToggleButton/InsertBtn.svelte';
    import ExtractBtn from './ToggleButton/ExtractBtn.svelte';
    import DeleteBtn from './ToggleButton/DeleteBtn.svelte';

    let isDropdownVisible = false; 
    let isCreateElementVisible = false, isInsertVisible = false, isExtractVisible = false, isDeleteVisible = false;
    let randomColor = getRandomColor();
    let hoverColor = '#000000'; 

    function getRandomColor() {
        while(true) {
            let randomIndex = Math.floor(Math.random() * $randomColorArr.length);

            if($isUsedColor[randomIndex] == false) {
                $isUsedColor[randomIndex] = true;
                return $randomColorArr[randomIndex];
            }
        }
    }

    const toggleDropdown = () => {
        isDropdownVisible = !isDropdownVisible; 

        if (isDropdownVisible === false) {
            isCreateElementVisible = isInsertVisible = isExtractVisible = isDeleteVisible = false;
        }
    }

    const toggleCreateElement = () => {
        isCreateElementVisible = !isCreateElementVisible;
        isInsertVisible = isExtractVisible = isDeleteVisible = false;
    }

    const toggleInsert = () => {
        isInsertVisible = !isInsertVisible;
        isCreateElementVisible = isExtractVisible = isDeleteVisible = false;
    }

    const toggleExtract = () => {
        isExtractVisible = !isExtractVisible;
        isCreateElementVisible = isInsertVisible = isDeleteVisible = false;
    }

    const toggleDelete = () => {
        isDeleteVisible = !isDeleteVisible;
        isCreateElementVisible = isInsertVisible = isExtractVisible = false;
    }

    const stopPropagation = (event) => {
        event.stopPropagation(); 
    }

    const startAnimation = () => {
        isDropdownVisible = isCreateElementVisible = isInsertVisible = isExtractVisible = isDeleteVisible = false;
        $animationWorking = true;
    }
</script>

<main on:click={toggleDropdown} style="--random-bg-color: {randomColor}; --hover-bg-color: {hoverColor}">
    <div id="arrow" class:dropdownVisible={isDropdownVisible}>
        &gt;
    </div>
    
    {#if isDropdownVisible}
        <div id='dropdown' on:click={stopPropagation} transition:fly={{ x: -45, duration: 750 }}>
            <button class='algo-dropdown-btn' on:click={toggleCreateElement}>Create(A)-O(N log N)</button>
            <button class='algo-dropdown-btn' on:click={toggleInsert}>Insert(v)</button>
            <button class='algo-dropdown-btn' on:click={toggleExtract}>ExtractMax(cnt)</button>
            <button class='algo-dropdown-btn' on:click={toggleDelete}>Delete(idx)</button>
        </div>
    {/if}

    {#if isCreateElementVisible}
        <div id="create-element-comp" on:click={stopPropagation} transition:fly={{ x: -45, duration: 750 }}>
            <CreateElement randomColor={randomColor} startAnimation={startAnimation}/>
        </div>
    {/if}

    {#if isInsertVisible}
        <div id="insert-comp" on:click={stopPropagation} transition:fly={{ x: -45, duration: 750 }}>
            <InsertBtn randomColor={randomColor} startAnimation={startAnimation}/>
        </div>
    {/if}

    {#if isExtractVisible}
        <div id="extract-comp" on:click={stopPropagation} transition:fly={{ x: -45, duration: 750 }}>
            <ExtractBtn randomColor={randomColor} startAnimation={startAnimation}/>
        </div>
    {/if}

    {#if isDeleteVisible}
        <div id="delete-comp" on:click={stopPropagation} transition:fly={{ x: -45, duration: 750 }}>
            <DeleteBtn randomColor={randomColor} startAnimation={startAnimation}/>
        </div>
    {/if}
</main>

<style>
    main {
        position: relative;
        display: flex;
        align-items: center; 
        justify-content: center;
        height: 120px;
        cursor: pointer;
        overflow: visible; 
        background-color: var(--random-bg-color);
        z-index: 3; 
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
        height: 120px;
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
        margin: -90px 0px 0px 760px;   
    }

    #insert-comp {
        position: absolute;
        margin: -30px 0px 0px 490px;   
    }

    #extract-comp {
        position: absolute;
        margin: 30px 0px 0px 490px;   
    }

    #delete-comp {
        position: absolute;
        margin: 90px 0px 0px 490px;   
    }
</style>
