<script>
    import { numArr, animationWorking, codeColor, naturalLang, 
             animationSpeed, isPaused, elementCnt, animationCnt } from '../../lib/store';

    let graphLeft = [];
    let indexLeft = [];
    let animationSteps = [];

    // 초기 위치 계산
    $: {
        for (let i = 0; i < $numArr.length; i++) {
            graphLeft[i] = (i + 12 - ($numArr.length * 0.5)) * 60;
            indexLeft[i] = (i + 12 - ($numArr.length * 0.5)) * 60;
        }
    }

    $: if ($animationWorking) {
        preDrawBubbleSort();
        drawBubbleSort();
    }
 

    const delay = (duration) => {
        return new Promise((resolve) => {
            const checkPause = () => {
                if (!$isPaused) {
                    setTimeout(resolve, duration);
                } 
                else {
                    setTimeout(() => {
                        if ($isPaused) {
                            checkPause(); 
                        } 
                        else {
                            resolve();
                        }
                    }, 50); 
                }
            };

            checkPause();
        });
    };

    const changeCodeColorBlack = (idx) => {
        for(let i = 0; i < $codeColor.length; i++) {
            if(i == idx) {
                $codeColor[i] = "rgb(0, 0, 0)";
            }
            else {
                $codeColor[i] = "rgba(255, 255, 255, 0)";
            }
        }
    }

    const pushAnimationSteps = (tmpArr, tmpColor, tmpSwap1, tmpSwap2, tmpNatural, tmpBlack, tmpSwapCounter) => {
            animationSteps.push({
            curArr: [...tmpArr],
            curColor: [...tmpColor],
            curSwap1: tmpSwap1,
            curSwap2: tmpSwap2,
            curNatural: tmpNatural,
            curBlack: tmpBlack,
        })
    };

    // 렌더링 전에 미리 실행해보고 단계별로 저장
    const preDrawBubbleSort = () => {
        animationSteps = [];
        let tmpArr = [...$numArr];
        let tmpColor = Array($elementCnt).fill("#ADD8E6");
        let tmpNatural = "";
        let tmpBlack = 6;
        let tmpSwapCounter = 0;
        
        for (let i = tmpArr.length - 1; i >= 0; i--) {
            var isSorted = true;

            tmpNatural = `Set the <b>swapped</b> flag to false.<br>Then iterate from index 0 to ${i} inclusive.`;
            tmpBlack = 1;
            pushAnimationSteps(tmpArr, tmpColor, 0, 0, tmpNatural, tmpBlack);

            for (let j = 0; j < i; j++) {
                tmpNatural = `Checking if ${tmpArr[j]} (index ${j}) > ${tmpArr[j + 1]} (index ${j + 1}) and swap them if that is true; <b>swapped</b> = true.`;
                tmpBlack = 2;
                tmpColor[j + 1] = "#008000";

                // 처음 기준 현재 element는 초록색이 아니면 항상 초록색으로
                if(tmpColor[j] != "#008000") { 
                    tmpColor[j] = "#008000";
                }

                pushAnimationSteps(tmpArr, tmpColor, 0, 0, tmpNatural, tmpBlack);

                if (tmpArr[j] > tmpArr[j + 1]) {
                    isSorted = false;
                    tmpSwapCounter++;

                    // ***************swap 애니메이션 시작*************** 
                    // 오른쪽 element 초록색으로
                    tmpNatural = `Swapping the index ${j} and index ${j + 1} and set <b>swapped</b> = true.<br>For inversion index: Add 1 to <b>swapCounter</b>, now = ${tmpSwapCounter}.`;
                    tmpBlack = 3;
                    pushAnimationSteps(tmpArr, tmpColor, 0, 0, tmpNatural, tmpBlack);

                    // swap position
                    pushAnimationSteps(tmpArr, tmpColor, j, j + 1, tmpNatural, tmpBlack);

                    // ***************swap 애니메이션 끝***************

                    // swap array
                    var tmp = tmpArr[j];
                    tmpArr[j] = tmpArr[j + 1];
                    tmpArr[j + 1] = tmp;

                    // swap 후 왼쪽 element 하늘색으로
                    tmpColor[j] = "#ADD8E6";
                    tmpBlack = 2;
                    pushAnimationSteps(tmpArr, tmpColor, 0, 0, tmpNatural, tmpBlack);
                }
                else {
                    // 현재 element는 하늘색, 오른쪽 element는 초록색
                    tmpColor[j] = "#ADD8E6";
                    pushAnimationSteps(tmpArr, tmpColor, 0, 0, tmpNatural, tmpBlack);
                }
            }

            // 중간에 전체 정렬이 완료된 경우
            if(isSorted === true) {
                for(let j = 0; j < $numArr.length; j++) {
                    tmpColor[j] = "#ffa500";
                }
                tmpBlack = 6;
                pushAnimationSteps(tmpArr, tmpColor, 0, 0, tmpNatural, tmpBlack);
                
                break;
            }
            
            // 정렬 완료 된 element 주황색으로
            tmpNatural = `Mark this element as sorted now.<br>As at least one swap is done in this pass, we continue.`;
            tmpColor[i] = "#ffa500";
            tmpBlack = 4;
            pushAnimationSteps(tmpArr, tmpColor, 0, 0, tmpNatural, tmpBlack);
        }

        // 정렬 완료
        for(let i = 0; i < $numArr.length; i++) {
            tmpColor[i] = "#ADD8E6";
        }
        tmpNatural = `List is sorted!<br>Inversion Index = ${tmpSwapCounter}.`;
        tmpBlack = 6;
        pushAnimationSteps(tmpArr, tmpColor, 0, 0, tmpNatural, tmpBlack);
    };

    const drawBubbleSort = async () => {
        const graphElements = document.querySelectorAll('.graph');
        $animationCnt = [0, animationSteps.length];

        while($animationCnt[0] < $animationCnt[1]) {
            $naturalLang = animationSteps[$animationCnt[0]].curNatural; // naturalLang 수정
            changeCodeColorBlack(animationSteps[$animationCnt[0]].curBlack); // codeToggle 수정
            
            // 색상 수정
            graphElements.forEach((element, idx) => {
                element.style.backgroundColor = animationSteps[$animationCnt[0]].curColor[idx];
            });

            // swap이 필요한 경우에만
            if(animationSteps[$animationCnt[0]].curSwap1 != animationSteps[$animationCnt[0]].curSwap2) {
                let swap1 = animationSteps[$animationCnt[0]].curSwap1;
                let swap2 = animationSteps[$animationCnt[0]].curSwap2;
                
                graphElements.forEach(element => {
                    element.style.transition = "left 1s ease";
                });

                // swap animation
                var tmp = graphLeft[swap1];
                graphLeft[swap1] = graphLeft[swap2];
                graphLeft[swap2] = tmp;

                await delay(1000 * (1 / $animationSpeed));

                graphElements.forEach(element => {
                    element.style.transition = "left 0s ease";
                });

                // non-animation
                $numArr = [...animationSteps[$animationCnt[0] + 1].curArr];
            }
            else {
                await delay(1000 * (1 / $animationSpeed));
            }

            $animationCnt[0]++;

            // Footer.svelte의 goToEnd가 실행된 경우 
            if($animationCnt[0] >= $animationCnt[1]) {
                $animationCnt[0] = $animationCnt[1] - 1;
                $naturalLang = animationSteps[$animationCnt[0]].curNatural; 
                changeCodeColorBlack(animationSteps[$animationCnt[0]].curBlack); 

                graphElements.forEach((element, idx) => {
                    element.style.backgroundColor = animationSteps[$animationCnt[0]].curColor[idx];
                });

                $numArr = [...animationSteps[$animationCnt[0]].curArr];
            }
            // Footer.svelte의 goToBeginning이 실행된 경우
            else if($animationCnt[0] < 0) {
                $animationCnt[0] = 0;
                $naturalLang = animationSteps[$animationCnt[0]].curNatural; 
                changeCodeColorBlack(animationSteps[$animationCnt[0]].curBlack); 

                graphElements.forEach((element, idx) => {
                    element.style.backgroundColor = animationSteps[$animationCnt[0]].curColor[idx];
                });

                $numArr = [...animationSteps[$animationCnt[0]].curArr];
            }
        }

        $animationWorking = false;
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
        transition: left 1s ease, height 0.5s ease; 
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
