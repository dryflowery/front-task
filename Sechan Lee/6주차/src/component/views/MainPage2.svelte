<script>
    import Footer from "../fixed/Footer.svelte";
    import Header from "../fixed/Header.svelte";
    import {isListVisible} from "../../lib/store";
</script>
  
<main>
    <div id="Header-container">
        <Header/>
    </div>

    <div class="main-container" class:main2-list-visible={$isListVisible} class:main2-list-invisible={!$isListVisible}>
        <div class="left-empty-container" style="left: 0;"></div>

        <div id="center-container">
            <div id="info-container">
                <div class="title-font">
                    일일 목표
                    <div class="info-square">
                        <div id="goal-content" class="background-content">
                            안녕하세요 {null}님! 금일 목표입니다. <br><br>
                            <span style="color: rgba(0, 255, 0, 1);">Lv. 1</span> 문제 풀기 <br><br>

                            <span style="color: rgba(0, 255, 0, 1);">Lv. 2</span> 캔버스 사용 <br>
                            <span style="color: rgba(0, 255, 0, 1);">Lv. 2</span> 좋아요 누르기 <br><br>

                            <span style="color: rgba(0, 255, 0, 1);">Lv. 3</span> 댓글 달기 <br>
                            <span style="color: rgba(0, 255, 0, 1);">Lv. 3</span> 다익스트라 부수기 <br>
                            <span style="color: rgba(0, 255, 0, 1);">Lv. 3</span> 게시물 작성 <br>
                            <span style="color: rgba(0, 255, 0, 1);">Lv. 3</span> 다익스트라 부수기 <br>
                            <span style="color: rgba(0, 255, 0, 1);">Lv. 3</span> 최근 알고리즘 복습 <br>
                        </div>
                        <i class="fa-solid fa-lock icon" style="font-size: 100px;"></i>
                        <div class="info-text">로그인 하고 컨텐츠 보기</div>
                    </div>
                </div>
                
                <div class="title-font">
                    최근 알고리즘
                    <div class="info-square">
                        <div class="background-content"></div>
                        <i class="fa-solid fa-lock icon" style="font-size: 100px;"></i>
                        <div class="info-text">로그인 하고 컨텐츠 보기</div>
                    </div>
                </div>
                
                <div class="title-font">
                    커뮤니티
                    <div class="info-square">
                        <div id="community-content" class="info-text">
                            <span><button id="clicked-btn">주간 베스트</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: rgba(61, 68, 77);">|</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: rgba(255, 255, 255); font-size: 1rem;">월간 베스트</span></span>
                            <div style="color: rgba(61, 68, 77); padding-bottom: 10px;">___________________________________________</div>
                            <span style="color: rgba(170, 206, 133); position: absolute; left: 0; margin-left:10px;">자유</span> ㅋㅋ 이진탐색 쓰니까 세상 편하네 <span style="color: rgba(206, 135, 133);">&nbsp;[76]</span><br>
                            <span style="color: rgba(170, 206, 133); position: absolute; left: 0; margin-left:10px;">자유</span> 난 Heap이 왜 필요한지 모르겠음 <span style="color: rgba(206, 135, 133);">&nbsp;[21]</span><br>
                            <span style="color: rgba(170, 206, 133); position: absolute; left: 0; margin-left:10px;">자유</span> 인생 첫 퀵정렬 성공했는데 칭찬좀 <span style="color: rgba(206, 135, 133);">&nbsp;[76]</span><br>
                            <span style="color: rgba(170, 206, 133); position: absolute; left: 0; margin-left:10px;">자유</span> 스택 모양 예쁘게 만드는 방법 공유 <span style="color: rgba(206, 135, 133);">&nbsp;[76]</span><br>
                            <span style="color: rgba(170, 206, 133); position: absolute; left: 0; margin-left:10px;">자유</span> O(nlogn) 몰라서 교수님께 질문함 <span style="color: rgba(206, 135, 133);">&nbsp;[76]</span><br>
                            <span style="color: rgba(170, 206, 133); position: absolute; left: 0; margin-left:10px;">자유</span> 오늘 재귀 돌리다 오버플로우 떴음 <span style="color: rgba(206, 135, 133);">&nbsp;[76]</span><br>
                        </div>
                    </div>
                </div>
                
                <div class="title-font">
                    마이 페이지
                    <div class="info-square">
                        <div class="background-content"></div>
                        <i class="fa-solid fa-lock icon" style="font-size: 100px;"></i>
                        <div class="info-text">로그인 하고 컨텐츠 보기</div>
                    </div>
                </div>
            </div>
        </div>   

        <div id="roadmap-container">
            <div class="title-font">
                로드맵
                <div id="roadmap-info">
                    <i class="fa-solid fa-lock" style="font-size: 100px;"></i>
                    <div class="info-text" style="font-size: 1.2rem;">로그인 하고 컨텐츠 보기</div>
                </div>
            </div>
        </div>

        <div class="right-empty-container"></div>
    </div>

    <div id="Footer-container">
        <Footer/>
    </div>
</main>

<style>
    .main-container {
        display: grid;
        grid-template-columns: 400px 900px 220px 400px;
    }

    #center-container {
        display: grid;
        grid-template-rows: 650px 1fr; 
        padding-top: 30px;
    }

    #info-container {
        display: grid;
        grid-template-columns: 420px 420px;
        grid-template-rows: 300px 300px; 
        row-gap: 80px;
        column-gap: 30px;
    }

    .title-font {
        font-size: 1.5rem;
        font-weight: bold;
        color: #a2a2a2;
    }

    .info-square {
        position: relative;
        background-color: #151b23;
        border: #3d444d solid 4px;
        border-radius: 5px;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .background-content {
        z-index: 1; 
        filter: brightness(0.3) saturate(0.5);  
        overflow: hidden;
    }

    .icon {
        position: relative;
        z-index: 2;
    }

    .info-text {
        margin-top: 10px;
        text-align: center;
        z-index: 2;
    }

    #goal-content {
        position: absolute;
        top: 10px;
        left: 10px;
        right: 0;
        bottom: 0;
        color: #FFFFFF;
        font-size: 1rem;
    }

    #community-content {
        position: absolute;
        top: 10px;
        left: 10px;
        right: 10px;
        bottom: 0;
        color: #FFFFFF;
        font-size: 1.1rem;
        font-weight: bold;
    }

    #roadmap-container {
        padding-top: 30px;
    }

    #roadmap-info {
        background-color: #151b23;
        border: #3d444d solid 4px;
        border-radius: 5px;
        height: 680px;
        width: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #clicked-btn {
        background-color: #4c905e;
        border-radius: 10px;
        font-size: 1rem;
        color: #FFFFFF;
    }
</style>
