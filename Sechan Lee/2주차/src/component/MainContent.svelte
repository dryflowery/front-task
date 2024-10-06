<!-- AlgoControlSection, Canvas, AnimationControl을 컨트롤하는 컴포넌트 -->

<script>
  import AlgoControlSection from "./AlgoControlSection.svelte";
  import AnimationControl from "./AnimationControl.svelte";
  import Canvas from "./Canvas.svelte";

  // store을 사용하여 전역변수 관리(자세한 설명은 AnimationControl.svelte의 주석 참고)
  import {animationControlDown} from '../lib/store'

  let top = 0; // 스택의 현재 top(다음에 저장할 index)
  let numArr = new Array(30).fill(undefined); // 스택에 들어있는 원소들
  let stack = { // 스택에 새로운 연산이 실행됐을때 쿼리의 종류와 숫자를 전달하기 위한 객체
    query: undefined,
    num: undefined
  }; 

  // AlgoControlSection.svelte의 sendData()가 보낸 data가 유효하면 stack에 대입
  const receiveData = (data) => {
    let isValid = false;

    if(data.detail.query === 'push') {
      if (data.detail.num.trim() != '' && !isNaN(data.detail.num) && top < 30) {
        numArr[top++] = data.detail.num;
        isValid = true;
      }
    }
    else if(data.detail.query === 'pop') {
      if(top > 0) {
        data.detail.num = numArr[--top];
        isValid = true;
      }
    }
    else if(data.detail.query === 'clear') { 
      if(top > 0) {
        top = 0;
        numArr = new Array(30).fill(undefined);
        isValid = true;
      }
    }

    // 유효한 쿼리인 경우에만 Canvas.svelte로 전달
    if(isValid == true) {
      stack.query = data.detail.query;
      stack.num = data.detail.num;
    }
  };
</script>
  
<main>
  <!-- animationControlDown의 값에 따라 배치 방식 변경 -->
  {#if $animationControlDown == true} 
    <AlgoControlSection on:sendData={receiveData}/> 
    <Canvas top={top} numArr={numArr} stack={stack}/>
    <AnimationControl/>
  {:else}
    <AlgoControlSection on:sendData={receiveData}/> 
    <AnimationControl/>
    <Canvas top={top} numArr={numArr} stack={stack}/>
  {/if}
</main>
  
<style>
  main {
    height: 581.6px;
  }
</style>
  