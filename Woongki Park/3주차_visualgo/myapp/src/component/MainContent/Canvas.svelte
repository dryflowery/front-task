<script>
    import RightSider from "./Sider/RightSider.svelte";
    import LeftSider from "./Sider/LeftSider.svelte";

    import { numArray, animationWorking } from "../../lib/store";

    let graphDistance = [];
    let indexDistance = [];

    $: if($animationWorking) {
        showBubbleSort();
    }

    // 그래프 위치 업데이트 함수
    const updateGraphPositions = () => {
        const middlePosition = 500;  // 중앙 위치
        const totalElements = $numArray.length;
        const gap = 60;  // 각 그래프 간의 간격

        for (let i = 0; i < totalElements; i++) {
            const offset = (totalElements - 1) * gap / 2;  // 전체 그래프가 중앙에 모이도록 계산
            graphDistance[i] = middlePosition - offset + i * gap;
            indexDistance[i] = middlePosition - offset + i * gap;
        }
    };

    $: updateGraphPositions();  // numArray가 변경될 때마다 위치 업데이트

    // 딜레이 함수
    const delay = ms => new Promise(res => setTimeout(res, ms));

    // 버블 정렬 함수
    const showBubbleSort = async () => {

        let n = $numArray.length;
        let swapped;

        for (let i = 0; i < n - 1; i++) {
            swapped = false;

            for (let j = 0; j < n - i - 1; j++) {
                if ($numArray[j] > $numArray[j + 1]) {
                    // Swap elements in numArray
                    let temp = $numArray[j];
                    $numArray[j] = $numArray[j + 1];
                    $numArray[j + 1] = temp;

                    swapped = true;

                    // Swap graph positions
                    let tempGraph = graphDistance[j];
                    graphDistance[j] = graphDistance[j + 1];
                    graphDistance[j + 1] = tempGraph;

                    // 애니메이션이 보이도록 약간의 지연을 줌
                    await delay(1000);  // 500ms 지연

                    // 화면에 변화가 반영되도록 Svelte 반응성 트리거
                    updateGraphPositions();
                }
            }

            // 이미 정렬이 완료되면 종료
            if (!swapped) break;
        }

        $animationWorking = false;  // 애니메이션 종료
    };
</script>

<main>
   <RightSider/>
   <LeftSider/>

    <div class="graph-container">
        {#each $numArray as element, index}
            <div class="graph" style="height: {element * 5.5}px; left: {graphDistance[index]}px;">
                <span class="element" class:isAbove={element <= 6}>{element}</span>
            </div>
            <span class="index" style="left: {indexDistance[index]}px;">{index}</span>
        {/each}
    </div>
</main>

<style>
    main {
        margin-left: 40px;
        margin-right: 40px;
    }

    .graph-container {
        position: relative;
        height: 900px;
        margin-left: 920px;
    }

    .graph {
        background-color: #cdeffc;
        width: 50px;
        position: absolute;
        bottom: 0;
        display: flex;
        justify-content: center;
        transition: left 0.5s ease, height 0.5s ease; 
    }

    .element {
        color: black;
        font-size: 18px;
    }

    .element.isAbove {
        position: absolute;
        top: -25px;
    }

    .element:not(.isAbove) {
        margin-top: auto;
    }

    .index {
        position: absolute;
        bottom: -30px;
        font-size: 18px;
        color: black;
        width: 50px;
        text-align: center;
    }

    button {
        margin-top: 20px;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
    }

    button:disabled {
        background-color: #ddd;
        cursor: not-allowed;
    }
</style>
