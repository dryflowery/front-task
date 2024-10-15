<script>
    import { fade } from 'svelte/transition';
    import { tick } from 'svelte';

    export let arrayData = []; // 부모 컴포넌트에서 전달받은 배열
    export let sortSignal = false;  // 부모로부터 받은 정렬 신호

    let highlightIndices = []; // 비교 중인 인덱스
    let sortedIndices = []; // 최종 정렬된 인덱스

    $: if (sortSignal) {
        console.log('Sorting triggered. sortSignal:', sortSignal);
        bubbleSort();  // Sort 신호가 오면 정렬 실행
    }

    // 버블 정렬
    async function bubbleSort() {
        let n = arrayData.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                // 현재 비교 중인 인덱스 설정
                highlightIndices = [j, j + 1];

                // 색상 변경
                await tick(); // DOM 업데이트를 위해 tick 호출
                await new Promise(resolve => setTimeout(resolve, 500)); // 잠시 대기

                // 두 요소 비교
                if (arrayData[j] > arrayData[j + 1]) {
                    let temp = arrayData[j];
                    arrayData[j] = arrayData[j + 1];
                    arrayData[j + 1] = temp;

                    await tick();
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    console.log(`Swapped: ${arrayData[j]} and ${arrayData[j + 1]}`);
                }

                // 비교 후 인덱스 초기화
                highlightIndices = [];
                await tick();
                await new Promise(resolve => setTimeout(resolve, 500)); // 원래 색으로 돌아가도록 대기
            }

            sortedIndices.push(n - i - 1);
        }

        // 모든 요소가 정렬된 후 인덱스를 추가
        sortedIndices = Array.from({ length: n }, (_, index) => index);

        console.log('Bubble sort completed. Sorted array:', arrayData);
        await tick();
        await new Promise(resolve => setTimeout(resolve, 500)); // 정렬 후 잠시 대기
        sortedIndices = []; // 색상 초기화
    }
</script>

<style>
    .table {
        display: flex; 
        width: 100%; 
        justify-content: center; 
        align-items: flex-end; 
        height: 250px; 
    }
    .cell {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        width: 40px; 
        text-align: center;
        font-weight: bolder; 
        background-color: aqua; 
        margin-right: 2px; 
        transition: background-color 0.3s;
    }

    .highlight {
        background-color: green; /* 비교 중인 요소 색상 */
        transition: background-color 0.3s; /* 부드러운 전환 효과 */
    }

    .sorted {
        background-color: orange; /* 최종 정렬된 요소 색상 */
    }

    .order {
        display: flex; 
        justify-content: center; 
        margin-top: 5px; 
    }

    .index{
        width: 40px; 
        text-align: center; 
        background-color: none;
        margin-right: 2px; 
    }


</style>

<div class="table">
    {#each arrayData as item, index}
        <!-- 각 배열 요소를 셀에 출력하고 높이 조정 -->
        <div class="cell {highlightIndices.includes(index) ? 'highlight' : sortedIndices.includes(index) ? 'sorted' : ''}" style="height: {item * 4.5}px;" transition:fade >{item}</div> 
    {/each}
</div>

<div class="order">
    {#each arrayData as _, index}
        <!-- 순서 표시 -->
        <div class="index">{index}</div> 
    {/each}
</div>