<script>
    import RightSider from "./Sider/RightSider.svelte";
    import LeftSider from "./Sider/LeftSider.svelte";

    import { numArray, animationWorking } from "../../lib/store";

    let graphDistance = []; 
    let indexDistance = [];
    let currentIndexes = [-1, -1];  // 현재 비교 중인 두 인덱스
    let sortedIndexes = [];  // 정렬 완료된 인덱스들

    $: if ($animationWorking) {
        showBubbleSort();
    }

    const resetGraphColor = () => {
        currentIndexes = [-1, -1];  // 비교 중인 인덱스 초기화
        sortedIndexes = [];  // 정렬 완료된 인덱스 초기화
    };

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
        resetGraphColor();  // 정렬 시작 시 그래프 색상 초기화

        const graphElements = document.querySelectorAll('.graph');
        let n = $numArray.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                // 현재 비교 중인 두 인덱스를 업데이트
                currentIndexes = [j, j + 1];
                await delay(1000);

                if ($numArray[j] > $numArray[j + 1]) {
                    // 그래프 위치를 먼저 교환 (애니메이션 적용을 위해)
                    graphElements.forEach(element => {
                        element.style.transition = "left 1s ease"; 
                    });
                    
                    let tempGraph = graphDistance[j];
                    graphDistance[j] = graphDistance[j + 1];
                    graphDistance[j + 1] = tempGraph; 
                    // 화면에 변경된 위치가 적용되도록 지연을 줌
                    await delay(1000);

                    // 그 다음 배열 값 교환 (실제 값이 바뀌도록)
                    graphElements.forEach(element => {
                        element.style.transition = "left 0s ease"; 
                    });

                    let temp = $numArray[j];
                    $numArray[j] = $numArray[j + 1];
                    $numArray[j + 1] = temp; 
                }

                // 변화된 상태를 반영
                updateGraphPositions();
            }

            // 현재 마지막 요소를 정렬 완료로 처리
            sortedIndexes.push(n - i - 1);
            currentIndexes = [-1, -1];  // 현재 비교 중인 상태 초기화
        }

        // 마지막 남은 요소도 정렬 완료
        sortedIndexes.push(0);

        resetGraphColor();

        $animationWorking = false;  // 애니메이션 종료
    };
</script>

<main>
   <RightSider/>
   <LeftSider/>

    <div class="graph-container">
        {#each $numArray as element, index}
            <div 
                class="graph {index === currentIndexes[0] || index === currentIndexes[1] ? 'active' : ''} 
                             {sortedIndexes.includes(index) ? 'sorted' : ''}"
                style="height: {element * 5.5}px; left: {graphDistance[index]}px;">
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

    /* 비교 중인 그래프 막대 */
    .graph.active {
        background-color: green;
    }

    /* 정렬이 완료된 그래프 막대 */
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
