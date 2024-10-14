<script>
    import { animationSpeed, isPaused } from "../../lib/store";

    // togglePause 함수로 일시정지 기능 구현
    const togglePause = () => {
        $isPaused = !$isPaused;
    };
</script>

<main>
    <div class="slider-container">
        <span class="value">{$animationSpeed.toFixed(1.0)}x</span>
        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
        <input 
          type="range" 
          min="1" 
          max="100" 
          step="0.1" 
          bind:value={$animationSpeed} 
          class="slider"
        />
        <span class="value">1x</span>
    </div>

    <div class="button-container">
        <!-- 버튼 클릭 시 togglePause 함수 실행 -->
        <button on:click={togglePause} class="center-button"> 
            {$isPaused ? "Resume" : "Pause"} 
        </button>
    </div>
</main>

<style>
    main {
        position: fixed;
        bottom: 0;
        background-color: black;
        width: 100%;
        height: 42px;
        color: white;
    }

    .slider-container {
        display: flex;
        margin-top: 12px;
        margin-left: 25px;
        align-items: center;
        color: white;
        font-size: 14px;
        font-weight: normal;
    }

    .value {
        margin: 0 10px;
        margin-bottom: 10px;
    }

    .slider {
        -webkit-appearance: none;
        width: 150px;
        height: 10px;
        background: #777;
        border-radius: 1px;
        outline: none;
        cursor: pointer;
    }

    .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        background: white; 
        border-radius: 25%;
        cursor: pointer;
    }

    .slider::-moz-range-thumb {
        width: 20px;
        height: 20px;
        background: white;
        border-radius: 50%;
        cursor: pointer;
    }

    .button-container {
        position: absolute;
        top: 57%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .center-button {
        background-color: #6b6b6b;
        color: white;
        border: none;
        padding: 5px 15px;
        font-size: 15px;
        cursor: pointer;
        border-radius: 5px;
    }

    .center-button:hover {
        background-color: #4b4b4b;
    }
</style>
