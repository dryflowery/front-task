<!-- 알고리즘 컨트롤을 담당하는 컴포넌트 -->

<script>
    import { createEventDispatcher } from 'svelte';
    import {animationWorking} from '../lib/store'

    // 사용자가 입력한 push값
    let pushNum;

    // push, pop, clear버튼 클릭 시 관련 데이터(쿼리, 숫자)를 MainContent로 전송
    const sendData = createEventDispatcher();

    const sendPushData = () => {
        sendData('sendData', {query: "push", num: pushNum}); 
        pushNum = ''; 
    };

    const sendPopData = () => {
        sendData('sendData', {query: "pop", num: undefined});
        pushNum = '';
    };

    const sendClearData = () => {
        sendData('sendData', {query: "clear", num: undefined});
        pushNum = '';
    }

    // 값 입력 후 Enter키 누르면 sendPushData 실행
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendPushData();
        }
    };
</script>

<main class="{$animationWorking ? 'disabled' : ''}"> 
    <input type="Text" maxlength="4" size="6" bind:value={pushNum} on:keydown={handleKeyDown}>
    <button id="pushBtn" on:click={sendPushData}>Push</button>
    <button id="popBtn" on:click={sendPopData}>Pop</button>
    <button id="clearBtn" on:click={sendClearData}>Clear Stack</button>
</main>

<style>
    /* 애니메이션 작동중에는 disalbed */
    .disabled {
        pointer-events: none;
        background-color: rgba(200, 200, 200, 0.5); 
    }

    main {
        height: 28.8px;
        background-color: #DDEEDD;
    }

    input {
        margin: 4px 0px 3px 2px;
    }

    button {
        margin: 4px 0px;
    }
</style>