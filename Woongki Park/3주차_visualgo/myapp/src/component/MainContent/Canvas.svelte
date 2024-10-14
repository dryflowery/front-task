<script>
    import RightSider from "./Sider/RightSider.svelte";
    import LeftSider from "./Sider/LeftSider.svelte";

    import { numArray, animationWorking, codeColor, naturalExplanation, animationSpeed, isPaused } from "../../lib/store";

    let graphDistance = [];
    let indexDistance = [];
    let currentIndexes = [-1, -1];
    let sortedIndexes = [];
    

    $: if ($animationWorking) {
        showBubbleSort();
    }

    $: updateGraphPositions();

    const resetGraphColor = () => {
        currentIndexes = [-1, -1];
        sortedIndexes = [];
    };

    const updateGraphPositions = () => {
        const middlePosition = 500;
        const totalElements = $numArray.length;
        const gap = 60;

        for (let i = 0; i < totalElements; i++) {
            const offset = (totalElements - 1) * gap / 2;
            graphDistance[i] = middlePosition - offset + i * gap;
            indexDistance[i] = middlePosition - offset + i * gap;
        }
    };

    const changeCodeColorBlack = (idx) => {
        for (let i = 0; i < $codeColor.length; i++) {
            if (i == idx) {
                $codeColor[i] = "rgb(0, 0, 0)";
            } else {
                $codeColor[i] = "rgba(255, 255, 255, 0)";
            }
        }
    };

    const delay = ms => new Promise(res => setTimeout(res, ms / $animationSpeed));

    // 일시정지 상태를 확인하는 함수
    const waitWhilePaused = async () => {
        while ( $isPaused ) {
            await new Promise(res => setTimeout(res, 100));  // 0.1초 간격으로 일시정지 상태 확인
        }
    };

    // 일시정지/재개를 토글하는 함수
    const togglePause = () => {
        $isPaused = !$isPaused;
    };

    const showBubbleSort = async () => {
        resetGraphColor();

        updateGraphPositions();

        const graphElements = document.querySelectorAll('.graph');
        let n = $numArray.length;
        let swapCounter = 0;

        changeCodeColorBlack(1);
        $naturalExplanation = `Set the <b>swapped</b> flag to false.<br>Then iterate from index 0 to ${n} inclusive.`;
        await delay(500);

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                await waitWhilePaused();  // 일시정지 상태 확인
                changeCodeColorBlack(2);
                currentIndexes = [j, j + 1];

                $naturalExplanation = `Checking if ${$numArray[j]}(index ${j + 1}) and swap them if that is<br>true; <b>swapped</b> = false`;

                await delay(500);
                swapCounter++;

                if ($numArray[j] > $numArray[j + 1]) {
                    await waitWhilePaused();  // 일시정지 상태 확인
                    graphElements.forEach(element => {
                        changeCodeColorBlack(3);
                        $naturalExplanation = `Swapping the index ${j} and index ${j + 1} and Set <b>swapped</b> = true<br>For inversion index: Add 1 to <b>swapCounter</b>, now = ${swapCounter}`;
                        element.style.transition = `left ${1 / $animationSpeed}s ease, background-color 0.3s ease`;
                    });

                    let tempGraph = graphDistance[j];
                    graphDistance[j] = graphDistance[j + 1];
                    graphDistance[j + 1] = tempGraph;

                    await delay(1000);

                    graphElements.forEach(element => {
                        element.style.transition = "left 0s ease, background-color 0.3s ease";
                    });

                    let temp = $numArray[j];
                    $numArray[j] = $numArray[j + 1];
                    $numArray[j + 1] = temp;
                }

                updateGraphPositions();
            }

            sortedIndexes.push(n - i - 1);
            changeCodeColorBlack(4);
            $naturalExplanation = `Mark this element as sorted now.<br>As at least one swap is done in this pass, we continue.`;
            await delay(500);

            currentIndexes = [-1, -1];
        }

        sortedIndexes.push(0);
        await delay(500);

        resetGraphColor();

        graphElements.forEach(element => {
            element.style.transition = `left 0.5s ease, height 0.5s ease, background-color 0.3s ease`;
        });

        changeCodeColorBlack(null);
        $naturalExplanation = ``;
        $animationWorking = false;
    };

</script>

<main>
    <RightSider/>
    <LeftSider/>


    <div class="graph-container">
        {#each $numArray as element, index}
            <div class="graph {index === currentIndexes[0] || index === currentIndexes[1] ? 'active' : ''} {sortedIndexes.includes(index) ? 'sorted' : ''}"
                 style="height: {element * 5.5}px; left: {graphDistance[index]}px;">
                <span class="element" class:isAbove={element <= 4}>{element}</span>
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
        height: 800px;
        margin-left: 700px;
    }

    .graph {
        background-color: #cdeffc;
        width: 50px;
        position: absolute;
        bottom: 0;
        display: flex;
        justify-content: center;
        transition: left 0.5s ease, height 0.5s ease, background-color 0.3s ease;
    }

    .graph.active {
        background-color: green;
    }

    .graph.sorted {
        background-color: orange;
    }

    .element {
        color: black;
        font-size: 18px;
        font-weight: bold;
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
        font-weight: bold;
    }
</style>
