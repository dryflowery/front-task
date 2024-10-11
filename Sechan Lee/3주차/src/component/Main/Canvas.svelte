<script>
    import { numArr } from '../../lib/store';
    import { animationWorking } from '../../lib/store';

    let graphLeft = [];
    let indexLeft = [];

    // 초기 위치 계산
    $: {
        for (let i = 0; i < $numArr.length; i++) {
            graphLeft[i] = (i + 12 - ($numArr.length * 0.5)) * 60;
            indexLeft[i] = (i + 12 - ($numArr.length * 0.5)) * 60;
        }
    }

    // 애니메이션이 시작될 때만 실행
    $: if ($animationWorking) {
        drawBubbleSort();
        $animationWorking = false; 
    }

    const delay = (duration) => {
        return new Promise((resolve) => {
            setTimeout(resolve, duration);
        });
    };

    const drawBubbleSort = async () => {
        const graphElements = document.querySelectorAll('.graph');
        
        for (let i = $numArr.length - 1; i >= 0; i--) {
            for (let j = 0; j < i; j++) {
                // 처음 기준 현재 element는 초록색이 아니면 항상 초록색으로
                if(window.getComputedStyle(graphElements[j]).backgroundColor != "rgb(0, 128, 0)") {
                    graphElements[j].style.backgroundColor = "#008000";
                    await delay(500);
                }

                if ($numArr[j] > $numArr[j + 1]) {
                    // ***************애니메이션 시작*************** + transition에 따라 delay 수정하기
                    graphElements.forEach(element => {
                        element.style.transition = "left 1s ease"; 
                    });

                    // 오른쪽 element 초록색으로
                    graphElements[j + 1].style.backgroundColor = "#008000";
                    await delay(500);

                    // swap position
                    var tmp = graphLeft[j];
                    graphLeft[j] = graphLeft[j + 1];
                    graphLeft[j + 1] = tmp;

                    await delay(1000);

                    // ***************애니메이션 끝***************

                    // .graph non-animation transition 
                    graphElements.forEach(element => {
                        element.style.transition = "left 0s ease"; 
                    });
 
                    // swap array
                    tmp = $numArr[j];
                    $numArr[j] = $numArr[j + 1];
                    $numArr[j + 1] = tmp;

                    // swap 후 왼쪽 element 하늘색으로
                    graphElements[j].style.backgroundColor = "#ADD8E6";

                    // transition에 따라 수정
                    await delay(1000);
                }
                else {
                    // 현재 element는 하늘색, 오른쪽 element는 초록색
                    graphElements[j + 1].style.backgroundColor = "#008000";
                    await delay(500);
                    graphElements[j].style.backgroundColor = "#ADD8E6";
                    await delay(500);
                }
            }

            // 정렬 완료 된 element 주황색
            graphElements[i].style.backgroundColor = "#ffa500"
            await delay(1000);
        }

        graphElements.forEach(element => {
            element.style.transition = "left 0.5s ease"; 
        });

        // 전체 정렬 완료 후 강조 애니메이션
        for(let i = 0; i < 5; i++) {
            await delay(500);
            for(let j = 0; j < $numArr.length; j++) {
                if(i % 2 == 0) {
                    graphElements[j].style.backgroundColor = "#ADD8E6"
                }
                else {
                    graphElements[j].style.backgroundColor = "#ffa500"
                }
            }
        }
    };
</script>

<main>
    <table>
        {#each $numArr as element, index}
            <div class="graph" style="height: {element * 5.5}px; left: {graphLeft[index]}px;">
                <span class="element" class:isAbove={element <= 3}>{element}</span>
            </div>
            <span class="index" style="left: {indexLeft[index]}px;">{index}</span>
        {/each}
    </table>
</main>

<style>
    main {
        display: flex;
        position: relative; 
        height: 300px; 
        width: 100%;   
    }

    .graph {
        background-color: #ADD8E6;
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
        width: 50px; /* 그래프와 동일한 너비 */
        text-align: center; /* 중앙 정렬 */
    }
</style>
