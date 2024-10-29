<script>
    import { animationSpeed, isPaused, animationCnt, 
             isBegin, isEnd, randomColorArr, isUsedColor, animationWorking } from "../../lib/store";

    $: progressPercentage = ($animationCnt[0] == 0 && $animationCnt[1] == 0) ? 0 : Math.min(100, ($animationCnt[0] / ($animationCnt[1])) * 100);

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

    // range의 왼쪽 절반은 [1, 10], 오른쪽 절반은 [11, 1000]
    const updateSpeed = (event) => {
        const sliderValue = event.target.value;
        
        if (sliderValue <= 50) {
            $animationSpeed = Math.round(sliderValue / 5); 
            
            if($animationSpeed == 0) {
                $animationSpeed = 1;
            }
        } 
        else {
            $animationSpeed = Math.round(10 + (sliderValue - 50) * 19.8);  
        }
        
    };

    // animation control section
    const goToBeginning = () => {
        if($animationWorking) {
            $isBegin = true;
            $isPaused = !$isPaused;
        }
    }

    const goToPrev = () => {
        if($animationWorking) {
            $animationCnt[0] = Math.max($animationCnt[0] - 1, 0);
        }
    }

    const changePaused = () => {
        if($animationWorking) {
            $isPaused = !$isPaused;
        }
    }

    const goToNxt = () => {
        if($animationWorking) {
            $animationCnt[0] = Math.min($animationCnt[1], $animationCnt[0] + 1);
        }
    }

    const goToEnd = () => {
        if($animationWorking) {
            $isEnd = true;
            $isPaused = !$isPaused;
        }
    }

    // overlay section
    let showOverlay = false;
    let overlayInfo = [
        {visible: false, title: "About", content: "http://a.to/24pzv41"},
        {visible: false, title: "Team", content: "http://a.to/24fxiqH"},
        {visible: false, title: "Terms of use", content: "http://a.to/240QzlE"},
        {visible: false, title: "Privacy Policy", content: "http://a.to/24Syy37"},
    ]

    const toggleAboutOverlay = () => {
        showOverlay = true;
        
        overlayInfo.forEach(element => {
            if(element.title === "About") {
                element.visible = true;
            }
            else {
                element.visible = false;
            }
        });
    };

    const toggleTeamOverlay= () => {
        showOverlay = true;
        
        overlayInfo.forEach(element => {
            if(element.title === "Team") {
                element.visible = true;
            }
            else {
                element.visible = false;
            }
        });
    };

    const toggleTermsOverlay = () => {
        showOverlay = true;
        
        overlayInfo.forEach(element => {
            if(element.title === "Terms of use") {
                element.visible = true;
            }
            else {
                element.visible = false;
            }
        });
    };

    const togglePrivacyOverlay = () => {
        showOverlay = true;
        
        overlayInfo.forEach(element => {
            if(element.title === "Privacy Policy") {
                element.visible = true;
            }
            else {
                element.visible = false;
            }
        });
    };

    const closeOverlay = () => {
        showOverlay = false;
    };
</script>

<main>
    <span class="speed-container">
        <span class="range-label">1.0x</span>
        <input type="range" min="0" max="100" step="1" value="0" on:input={updateSpeed}>
        <span class="range-label">{$animationSpeed}x</span>
    </span>

    <span id="animation-controler">
        <img class="animation-img" id="begin-img" on:click={goToBeginning}  src="https://visualgo.net/img/goToBeginning.png" title="go-to-beginning">
        <img class="animation-img" id="prev-img" on:click={goToPrev} src="https://visualgo.net/img/prevFrame.png" title="go-to-previous">

        {#if $isPaused}
            <img class="animation-img" id="play-img" on:click={changePaused} src="https://visualgo.net/img/play.png" title="play">
        {:else}
            <img class="animation-img" id="pause-img" on:click={changePaused} src="https://visualgo.net/img/pause.png" title="pause">
        {/if}

        <img class="animation-img" id="nxt-img" on:click={goToNxt} src="https://visualgo.net/img/nextFrame.png" title="go-to-next">
        <img class="animation-img" id="end-img" on:click={goToEnd} src="https://visualgo.net/img/goToEnd.png" title="go-to-end">
    </span>

    <div class="progress-bar-container">
        <div class="progress-bar" style="width: {progressPercentage}%"></div>
    </div>

    <div id="bottom-bar">
        <a class="bottom-trigger" on:click={toggleAboutOverlay}>About</a>
        <a class="bottom-trigger" on:click={toggleTeamOverlay}>Team</a>
        <a class="bottom-trigger" on:click={toggleTermsOverlay}>Terms of use</a>
        <a class="bottom-trigger" on:click={togglePrivacyOverlay}>Privacy Policy</a>
    </div>

    {#if showOverlay}
        <div class="overlay-background" on:click={closeOverlay}></div>

        <div id="about" class="overlay">
            <div id="overlay-header" style="--random-bg-color: {randomColor};">
                <div id="overlay-title">
                    {#each overlayInfo as info}
                        {#if info.visible === true}
                            {info.title}
                        {/if}
                    {/each}
                </div>
                <span class="close-overlay" on:click={closeOverlay}>✕</span>
            </div>

            <div id="overlay-content">
                {#each overlayInfo as info}
                    {#if info.visible === true}
                        <img src="{info.content}" id="overlay-image" alt="cat"/>
                    {/if}
                {/each}
            </div>
        </div>
    {/if}
</main>

<style>
    main {
        height: 40px;
        display: flex;
        position: relative; 
        justify-content: flex-start;
        align-items: center;
    }

    .speed-container {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-left: 20px;
        flex-shrink: 0; 
    }

    .range-label {
        font-size: 14px;
        color: white;
    }

    input[type="range"] {
        -webkit-appearance: none;
        width: 150px;
        height: 5px;
        background: gray;
        outline: none;
        border-radius: 5px;
    }

    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 15px;
        height: 15px;
        background: white;
        border-radius: 50%;
        cursor: pointer;
    }

    input[type="range"]::-moz-range-thumb {
        width: 15px;
        height: 15px;
        background: white;
        border-radius: 50%;
        cursor: pointer;
    }

    #animation-controler {
        display: flex;
        gap: 20px;
        position: absolute;
        left: 450px;
        align-items: center;
    }

    .animation-img {
        cursor: pointer;
        filter: brightness(0.7); 
    }

    .animation-img:hover {
        filter: brightness(1); 
    }

    #begin-img {
        width: 10px;
        height: 12px;
    }

    #prev-img {
        width: 12px;
        height: 12px;
    }

    #play-img {
        width: 16px;
        height: 16px;
        filter: brightness(1);
    }

    #pause-img {
        width: 16px;
        height: 16px;
        filter: brightness(1);
    }

    #nxt-img {
        width: 12px;
        height: 12px;
    }

    #end-img {
        width: 10px;
        height: 12px;
    }

    .progress-bar-container {
        position: absolute;
        left: 250px;
        width: 25%; 
        height: 20%;
        background-color: gray;
        margin-left: 370px;
    }

    .progress-bar {
        height: 100%;
        background-color: gold;
    }

    #bottom-bar {
        position: absolute;
        left: 1150px;
    }

    .bottom-trigger {
        padding: 10px;
        color: white;
        font-size: 13px;
        text-decoration: none; 
    }

    .bottom-trigger:hover {
        text-decoration: underline; 
        cursor: pointer;
    }

    .overlay-background {
        display: block; 
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5); 
        z-index: 9502; 
    }

    .overlay {
        display: block;
        background: #eee;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9503;
        overflow-x: hidden;
        overflow-y: hidden;
        width: 60%; 
        height: 70%; 
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    }

    .close-overlay {
        cursor: pointer;
        font-size: 1.5rem;
        position: absolute;
        top: 10px;
        right: 20px;
    }

    #overlay-header {
        background-color: var(--random-bg-color); 
        height: 50px;; 
        display: flex; 
    }

    #overlay-title {
        color: white;
        font-size: 16px;
        padding: 15px 0px 0px 15px;
    }

    #overlay-content {
        padding: 10px 10px 0px 10px;
        overflow-y: auto;
        height: auto;
    }

    #overlay-image {
        max-width: 78%; 
        width: auto; 
        height: auto; 
        object-fit: contain; 
    }
</style>