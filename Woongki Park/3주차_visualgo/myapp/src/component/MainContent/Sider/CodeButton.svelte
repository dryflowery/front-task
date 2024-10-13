<script>
    import {fly} from 'svelte/transition';
    import {animationWorking} from '../../../lib/store';

    let isMenuOpen = false; //메뉴가 열려있는지 여부 확인
    let isNewElementVisible = false; //요소 표시 여부 

    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen; 

        if (isMenuOpen === false && isNewElementVisible === true) {
            isNewElementVisible = false;
        }
    }

    const toggleNewElement = () => {
        isNewElementVisible = !isNewElementVisible;
    }

    const preventEventPropagation = (event) => {
        event.stopPropagation(); 
    }

    const triggerAnimation = () => {
        $animationWorking = true;
        console.log('clicked');
    }

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<main on:click={toggleMenu}>

    <div id="toggleIcon" class:menuOpen={isMenuOpen}>
        &lt;
    </div>
    
    {#if isMenuOpen}
        <div id='menu' on:click={preventEventPropagation} transition:fly={{ duration: 300 }}>
            아아아아아ㅏㅇ아아아아ㅏㅇ
        </div>
    {/if}

</main>

<style>
    main {
        position: relative;
        top: 1030px;
        display: flex;
        align-items: center; 
        justify-content: center;
        height: 140px;
        background-color: rgb(250, 106, 81);
        cursor: pointer;
        overflow: visible; 
    }

    #toggleIcon {
        position: absolute; 
        font-size: 16px; 
        font-weight: 550; 
        color: white; 
        z-index: 3; 
        transition: transform 0.5s ease-in-out;
    }

    .menuOpen {
            transform: rotate(180deg); 
        }

    #menu {
        position: relative;

    }

    




</style>