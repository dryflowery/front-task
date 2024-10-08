<!--헤더 영역 입니다-->
<script>
    import HeadTecButton from "./headTecButton.svelte"

    let dataStructName = "Stack (Array Implementaion)";
</script>

<div class='header'>
    <h1>{dataStructName}</h1>
</div>

<HeadTecButton/>

<style>
    .header {
        background-color: #006400; /* 진한 초록색 */
        padding: 15px 20px; /* 위, 아래 패딩을 주어 공간 확보 */
        text-align: left; /* 왼쪽 정렬 */
    }

    h1 {
        color: #ffcc33; /* 노란색 텍스트 */
        font-size: 36px; /* 글자 크기 */
        margin: 0; /* 기본 여백 제거 */
        font-weight: bold; /* 굵은 글씨 */
        font-family: 'Arial', sans-serif; /* Arial 폰트 */
    }
</style>
