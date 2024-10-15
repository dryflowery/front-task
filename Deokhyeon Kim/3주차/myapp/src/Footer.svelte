<script>
    let sliderValue = 1; // 슬라이더 초기값
</script>

<style>
    #footer {
        display: flex;
        align-items: center;
        width: 100%;
        height: 40px;
        background-color: black;
        color: white;
    }

    .sliderContainer {
        display: flex;
        align-items: center;
    }

    .sliderLabel {
        margin-left: 25px;
        margin-right: 20px;
    }

    .slider {
        -webkit-appearance: none;
        appearance: none;
        width: 150px;
        height: 3px;
        background: black;
        margin-top: 10px;  
    }

    .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 20px;
        height: 20px;
        background: white;
        border-radius: 25%; 
        cursor: pointer;
    }

    #controller{
        margin-left: 120px;
        background-color: gray;
        width: 700px;
        height: 40px;
    }

    .button {
        margin: 5px;
        padding: 0px; 
        background: none;
        border: none; 
        cursor: pointer; 
        font-size: 16px; 
        color: white;   
        text-decoration: none; 
    }

    .button:hover {
        text-decoration: underline; /* 마우스를 올렸을 때 아래 줄 추가 */
    }
</style>

<main>
    <div id="footer">
        <span class="sliderContainer">
            <div class="sliderLabel">1.0x</div>
            <input class="slider" type="range" min="1" max="7" step="1" bind:value={sliderValue} />
            <div style="margin-left: 10px;">{sliderValue}x</div>
        </span>
        
        <div id="controller">
            
        </div>

        <div style="margin-left: 50px;">
            <button class="button">About</button>
            <button class="button">Team</button>
            <button class="button">Terms of use </button>
            <button class="button">Privacy Policy</button>
        </div>
    </div>
</main>
