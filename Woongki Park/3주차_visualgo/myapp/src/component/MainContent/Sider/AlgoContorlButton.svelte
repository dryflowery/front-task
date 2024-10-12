<!--팀장 코드 참고 많이함-->
<!--추가할 기능: 랜덤 색상기능-->
<!--버튼 부분 위치 개선-->
<script>
    import {slide} from 'svelte/transition';
    import {fade} from 'svelte/transition';
    import {animationWorking} from '../../../lib/store';
    import ElementSettingButton from './ElementSettingButton.svelte';

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
        &gt;
    </div>
    
    {#if isMenuOpen}
        <div id='menu' on:click={preventEventPropagation} transition:slide={{ duration: 300 }}>
            <button class='MenuButton' id='createElementBtn' on:click={toggleNewElement}> Create(A) </button>
            <button class='MenuButton' on:click={triggerAnimation}>Sort</button>
        </div>

    {/if}
    
    {#if isNewElementVisible}
        <div class='openElementMenu' on:click={preventEventPropagation} transition:fade={{ delay:1 }}>
            <ElementSettingButton/>
        </div>
    {/if}

</main>

<style>

    main {
            position: relative;
            top: 1117px;
            display: flex;
            align-items: center; 
            justify-content: center;
            height: 64px;
            background-color: #7790ff;
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
            display: flex; 
            flex-direction: column; 
            justify-content: space-between; 
            position: absolute;
            font-size: 13px;
            top: 0;
            left: 45px;
            height: 64px;
            width: 150px;
            background-color: #7790ff; 
            z-index: 1; 
        }

        .MenuButton {
            background-color: #7790ff; 
            color: white; 
            border: none; 
            flex: 1; 
            cursor: pointer; 
            text-align: left; 
        }

        .MenuButton:hover {
            background-color: #5061af; 
        }
        
        .openElementMenu {
            position: relative;
            margin-bottom: 25px;
        }

    
</style>
