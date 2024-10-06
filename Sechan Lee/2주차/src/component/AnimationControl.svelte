<!-- 애니메이션 컨트롤을 담당하는 컴포넌트 -->

<script>
    // store을 사용하여 AnimationControl 컴포넌트의 위치를 결정하는 전역변수 관리
    // animationControlDown === true => Footer 위에 위치
    // animationControlDown === false => AlgoControlSection 아래에 위치
    import {animationControlDown} from '../lib/store'
    import {animationWorking} from '../lib/store'

    const moveControls = () => {
        $animationControlDown = !$animationControlDown;
    };
</script>

<main>
    <table>
        <td><button disabled>Skip Back</button></td>
        <td><button disabled>Step Back</button></td>
        <td><button>Pause</button></td>
        <td><button disabled>Skip Forward</button></td>
        <td><button disabled>Step Forward</button></td>

        <td>
            <input type="range" min="1" max="100" style="width: 100%;">
            <br/>
            <div style="color: #006600;">Animation Speed</div>
        </td>

        <td>
            w: <input type="text" value="1000" maxlength="4" size="4">
        </td>

        <td>
            h: <input type="text" value="500" maxlength="3" size="3">
        </td>

        <td><button>Change Canvas Size</button></td>
        
        <td>
            <button on:click={moveControls} disabled={$animationWorking}>Move Controls</button>
        </td>
    </table>
</main>

<style>
    main {
        background-color: #DDEEDD;
        height: 48.8px;
    }
</style>
