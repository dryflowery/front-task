<!-- 애니메이션을 담당하는 컴포넌트 -->

<script>
    // store을 사용하여 전역변수 관리(자세한 설명은 AnimationControl.svelte의 주석 참고)
    import {animationControlDown} from '../lib/store'
    import {animationWorking} from '../lib/store'
    
    import TopMemory from './TopMemory.svelte';

    export let top;
    export let stack;
    export let numArr;

    $animationWorking = false;
    let animationStatusPos = {left: 5, top: 560};
    let queryValueTxtPos = {left: 5, top: 90};
    let queryNumPos = {left: 125, top: 90};
    let circlePos = {left: 105, top: 172};

    let queryValueTxt = 'Pushing Value: '
    let visuTop = 0;

    // AnimationiControl 컴포넌트의 위치가 바뀔때마다 요소들 좌표 재설정
    $: if($animationControlDown !== undefined) {
        initPos();
    }

    const initPos = () => {
        animationStatusPos = {left: 5, top: 560};
        queryValueTxtPos = {left: 5, top: 90};
        queryNumPos = {left: 125, top: 90};
        circlePos = {left: 105, top: 172};

        if($animationControlDown === false) {
            animationStatusPos.top += 50;
            queryValueTxtPos.top += 50;
            queryNumPos.top += 50;
            circlePos.top += 50;
        }
    };

    // numArr를 15개씩 나누기
    const divideNumArr = (arr, size) => {
        const divided = [];

        for (let i = 0; i < arr.length; i += size) {
            divided.push(arr.slice(i, i + size));
        }

        return divided;
    };

    // 배열 내용 바뀔때마다 최신화
    $: dividedNumArr = divideNumArr(numArr, 15);

    // stack 내용이 변하면 실행
    $: if(stack.query === 'push') {
        drawPush();
    }
    else if(stack.query === 'pop') {
        drawPop();
    }
    else if(stack.query === 'clear') {
        drawClear();
    }

    // 애니메이션 영역
    const drawPush = () => {
        $animationWorking = true;
        queryValueTxt = 'Pushing Value: '

        // table[visuTop] 객체 선택
        let tables = document.getElementsByTagName('table');
        let table = tables[0]; 
        let memory = table.rows[Math.floor(visuTop / 15)].cells[Math.floor(visuTop % 15)];
        let memoryRect = memory.getBoundingClientRect(); 

        // circle 이동
        setTimeout(() => {
            circlePos.top = memoryRect.top + 45;
            circlePos.left = memoryRect.left + 7;
        }, 1000);

        // queryNum 이동
        setTimeout(() => {
            let element = memory.querySelector('.elementText');  
            let elementRect = element.getBoundingClientRect();

            queryNumPos.left = elementRect.left;
            queryNumPos.top = elementRect.top + 16;
        }, 3000);

        setTimeout(() => {
            visuTop = top;
            $animationWorking = false;

            initPos();
        }, 5500);
    }

    const drawPop = () => {
        console.log({qeury: stack.query, num: stack.num});
        visuTop = top;

        // table[visuTop] 객체 선택
        let tables = document.getElementsByTagName('table');
        let table = tables[0]; 
        let memory = table.rows[Math.floor(visuTop / 15)].cells[Math.floor(visuTop % 15)];
        let memoryRect = memory.getBoundingClientRect(); 

        // queryNum 이동
        let element = memory.querySelector('.elementText');  
        let elementRect = element.getBoundingClientRect();
        queryNumPos.left = elementRect.left;
        queryNumPos.top = elementRect.top + 16;

        queryValueTxt = 'Popped Value: '
        $animationWorking = true;

        // circle 이동
        setTimeout(() => {
            circlePos.top = memoryRect.top + 45;
            circlePos.left = memoryRect.left + 7;
        }, 1000);

        // queryNum 이동
        setTimeout(() => {
            queryNumPos.left = 125;
            queryNumPos.top = 90;

            if($animationControlDown === false) {
                queryNumPos.top += 50;
            }
        }, 3000);

        setTimeout(() => {
            $animationWorking = false;
            numArr[top] = undefined;

            initPos();
        }, 5500);
    }

    const drawClear = () => {
        visuTop = 0;
    }
</script>   

<main>
    <!-- Pushing value: {stack.num} -->
    {#if $animationWorking == true && stack.query != 'clear'} 
        <div id="queryValueTxt" style="left: {queryValueTxtPos.left}px; top: {queryValueTxtPos.top}px">{queryValueTxt}</div>
        <span id="queryNum" style="left: {queryNumPos.left}px; top: {queryNumPos.top}px">{stack.num}</span>
    {/if}

    {#if $animationWorking == true} 
        <div id="circle" style="left: {circlePos.left}px; top: {circlePos.top}px"></div>
    {/if}

    <!-- top 메모리 -->
    <div id="topMemory">
        <TopMemory top={visuTop}/>
        <div id="topIndex">top</div>
    </div>

    <!-- numArr[0] ~ numArr[29]까지 그리기 -->
    <table>
        {#each dividedNumArr as oneDimArray, twoDimindex}
            <tr>
                {#each oneDimArray as element, ondDimindex}
                    <td>
                        <div class="memory">
                            <div class="elementText" 
                                 style="color: {(($animationWorking == true) && 
                                                 ((twoDimindex * 15) + ondDimindex) == visuTop) ? 'transparent' : 'black'};">
                                {#if element != undefined}
                                    {element}
                                {/if}
                            </div>
                        </div>
                        <div class="index">{(twoDimindex * 15) + ondDimindex}</div>
                    </td>
                {/each}
            </tr>
        {/each}
    </table> 

    <div id="animationStatus" style="left: {animationStatusPos.left}px; top: {animationStatusPos.top}px; 
     color: {$animationWorking ? '#388E3C' : 'black'};">
        {#if $animationWorking == false} 
            Animation Completed
        {:else} 
            Animation Running
        {/if}
    </div>
       
</main>

<style>
    main {
        height: 504px;
        background-color: #FFFFFF;
    }

    #queryValueTxt {
        position: absolute;
    }

    #queryNum {
        position: absolute;
        transition: left 2s, top 2s; 
    }

    #topMemory {
        padding: 80px 0px 0px 100px;
    }

    #topIndex {
        margin: 5px 0px 0px 12.5px;
    }

    #circle {
        position: absolute;
        width: 30px;
        height: 30px;
        border: 5px solid blue;
        background-color: transparent; 
        border-radius: 50%;  
        transition: left 2s, top 2s; 
    }

    table {
        padding: 60px 0px 0px 100px;
    } 

    .index {
        text-align: center;
        margin: 5px 0px 0px 0px;
    }

    #animationStatus {
        position: absolute;
    }

    .memory {
        position: relative;
        width: 50px;  
        height: 50px; 
        border: 1px solid #000000; 
        line-height: 50px; 
        display: flex;
        background-color: transparent; 
        /* color: transparent; num값을 투명하게 표시(좌표 가져오는 용도) */

        /* num 가운데 정렬 */
        text-align: center; 
        justify-content: center;
        align-items: center;
    }
</style> 