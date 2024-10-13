<script>
    import { animationSpeed } from "../../lib/store";

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
</script>

<main>
    <div class="speed-container">
        <span class="range-label">1.0x</span>
        <input type="range" min="0" max="100" step="1" value="0" on:input={updateSpeed}>
        <span class="range-label">{$animationSpeed}x</span>
    </div>
</main>

<style>
    main {
        height: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: left;
    }

    .speed-container {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-left: 20px;
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
</style>
