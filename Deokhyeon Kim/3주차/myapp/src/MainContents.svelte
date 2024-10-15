<script>
    import { onMount } from 'svelte'; // onMount를 가져옵니다.
    import { slide, fade } from 'svelte/transition';
    import ArrayTable from './ArrayTable.svelte';

    let showAlgoB = false;
    let createB = false;
    let N = 0; 
    let A = ''; // A 값 (문자열로 입력받음)
    let arrayData = []; // 생성된 배열 데이터
    let errorMessage = '';  // 오류 메세지 (50이상의 값은 받지 않음)
    let sortSignal = false;   // 정렬 버튼 초기 값

    //기본 배열
    onMount(() => {
        arrayData = [29, 10, 14, 37, 14]; // 기본 데이터 설정
        A = arrayData.join(','); // A 값도 초기화
    });

    function toggleButtons() {
        showAlgoB = !showAlgoB;
        if (createB) {
            createB = !createB;
        }
    }

    function createButton() {
        createB = !createB;
    }

    function generateArray() {
        const inputArray = A.split(',').map(str => str.trim()); // 입력 문자열을 분리하고 공백 제거
        const exceedsLimit = inputArray.filter(num => isNaN(num) || num === '' || Number(num) > 50); // 숫자가 아니거나 50 초과인 경우 필터링

        if (exceedsLimit.length > 0) {
            errorMessage = '다음 요소가 유효하지 않거나 50을 초과합니다: ' + exceedsLimit.join(', '); // 오류 메시지 설정
            arrayData = []; // 오류 시 배열 초기화
        } else {
            errorMessage = ''; // 오류 메시지 초기화
            arrayData = inputArray.map(Number); // 유효한 경우 배열 데이터 설정
        }
    }

    function sortArray() {
        sortSignal = true;
        console.log('Sort button clicked. sortSignal:', sortSignal);
        
        setTimeout(() => {
            sortSignal = false; 
        }, 1000); // 1초 후에 정렬 신호 초기화
    }   

    // 랜덤 버튼
    function generateRandomArray() {
        arrayData = Array.from({ length: 10 }, () => Math.floor(Math.random() * 51));
        errorMessage = ''; // 오류 메시지 초기화
    }
</script>

<style>
    #mainContents{
        display: flex;
        width: 100%;
        height: 600px;
        background-color: white;
    }

    /* 사이드 영역 */
    .side{
        width: 3%;            
        background-color: black;
    }

    /* 센터 영역 */
    .center{
        flex: 1;                    /* 중앙 영역은 남은 공간을 모두 차지하도록 설정 */
    }

    /* 알고리즘 선택 버튼 영역 */
    #algorhythm{
        width: 45px;           
        height: 50px;         
        background-color: yellow;
    }

    /* 알고리즘 선택 버튼 위치 */
    .buttonPos{
        position: absolute;
        top: 550px;
    }

    /* 알고리즘 버튼 */
    .algobutton{
        background: none; 
        border: none; 
        font-size: 20px; 
        cursor: pointer; /* 마우스 커서 변경 */

        margin-left: 7px;
        margin-top: 3px;

        transition: transform 0.5s ease; 
    }

    /* create 버튼 */
    #create, #sort{
        position: absolute;
        left: 50px;
        border: 0;
        width: 100px;           
        height: 40px;          
        background-color: yellow;
        cursor: pointer;
    }

    .sortPos{
        position: absolute;
        top: 45px;
    }

    /* 버튼 돌리기 */
    .rotate {
        transform: rotate(180deg);
    }

    /* create 옆 div 위치*/
    #createCon{
        display: flex;

        position: absolute;
        left: 160px;
        top: 5px;
        margin: 0; 
    }

    /* input style */
    .customInput {
        background-color: black;
        color: white; 
        width: 70px; 
        height: 25px; 
        border: none; 
        padding: 5px; 
        box-sizing: border-box; 
    }
    
    /* create 버튼 누르면 나오는 옵션 */
    .createContentB {
        background-color: blue;
        height: 25px;
        width: 80px;
        margin-left: 3px;
    
        color: white;
        cursor: pointer;
        font-size: 10px;
    }

    /* 호버 */
    #create:hover, #sort:hover {
        background-color: darkgray; 
        color: white; 
    }

    /* 메인 콘텐츠 */
    #contents{
        width: 100%;
        height: 550px;
        display: flex; 
        justify-content: center; 
    }

    /* 테이블이 나오는 공간 */
    .centeredDiv {
            width: 70%;
            height: 450px;
    }

</style>

<main>
    <div id="mainContents">
        <div class="side">
            <div id="algorhythm" class="buttonPos">
                <button on:click={toggleButtons} class="algobutton" class:rotate={showAlgoB}><b>></b></button>
                {#if showAlgoB}
                <button id="create" on:click={createButton} transition:slide={{ x: -100, duration: 500 }}>Create(A)</button>
                    {#if createB}
                        <div id ="createCon" transition:fade>
                            N= <input type="number" class="customInput" bind:value={N}>
                            <button class="createContentB" on:click={generateRandomArray}>Random</button>
                            <button class="createContentB">Sorted</button>
                            <button class="createContentB " style="width: 100px;">Nearly sorted</button>
                            <button class="createContentB" style="width: 150px;">Many Duplicates</button>
                            A= <input id="arrayInput" type="text" class="customInput" bind:value={A}>
                            <button class="createContentB" on:click={generateArray}>Go</button>
                                {#if errorMessage}
                                    <div style="color: red; font-size: 10px;">{errorMessage}</div>
                                {/if}
                        </div>
                    {/if}
                <button id="sort" class="sortPos" transition:slide={{ x: -100, duration: 500 }} on:click={sortArray}>Sort</button>
                {/if}
            </div>
        </div>

        <div class="center">
            <div style="width: 100%; height: 50px;"></div>
            <div id="contents">
                <div class="centeredDiv">
                    <ArrayTable {arrayData} {sortSignal} />
                </div>
            </div>
        </div>


        <div class="side">
            
        </div>
        

        <div class="footer">
            
        </div>
    </div>
</main>