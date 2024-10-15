<script>
    
</script>

<style>
    #header {
        display: flex;
        align-items: center;
        width: 100%;
        height: 50px;
        background-color: black;
    }

    select {
        width: 60px; 
        height: 30px; 
        font-size: 15px; 
    }

    a {
        text-decoration: none; /* 밑줄 제거 */
        color: beige;
    }

    .fontMain {
        font-family: Arial, sans-serif;
        font-size: 20px;
        font-weight: bolder;
        color: rgb(216, 175, 98);
        margin-left: 50px;
        margin-top: 8px;
    }

    .position {
        margin-left: 30px;
        margin-right: 10;
    }

    .textMargin {
        margin: 10px;
    }

    .exploration {
        position: relative; 
        cursor: pointer; 
        color: white;
        margin-left: 440px;
    }

    .lectureMode {
        display: none; 
        position: absolute; 
        top: 100%; /* Exploration Mode 아래에 위치 */
        left: 0;
        background-color: black;
        color: white;
        padding: 10px; /* 여백 설정 (커지게 하기 위함) */
        font-size: 15px; 
        z-index: 1; /* 다른 요소 위에 표시되도록 설정 */
    }

    .exploration:hover .lectureMode {
        display: block; /* 마우스 오버 시 표시 */
    }

    .lectureMode:hover {
        background-color: skyblue; 
    }

    .loginButton {
        display: flex; 
        justify-content: center; 
        align-items: center; 
        width: 80px; 
        height: 30px; 
        border: 3px solid green; 
        background-color: black; 
        color: green; 
        font-size: 15px; 
        font-weight: bold; 
        border-radius: 8px; 
        cursor: pointer;
        margin-top: 10px;
        margin-left: 5px;
    }

    .loginButton:hover {
        color: blue; /* 글자색을 파랗게 변경 */
    }
</style>

<main>
    <div id="header">
        <div class="fontMain">VISUALGO.net/
            <select name="language" id="">
                <option value="English" selected>en</option>
                <option value="Chinese">zh</option>
                <option value="Ireland">id</option>
            </select>
            /sorting
        </div>

        <div class="position">
            <a href="http://localhost:8080/"><b>BUBBLE SORT</b></a>
        </div>

        <div class="textMargin">
            <a href="https://visualgo.net/en/sorting">SEL</a>
        </div>

        <div class="textMargin">
            <a href="https://visualgo.net/en/sorting">INS</a>
        </div>

        <div class="textMargin">
            <a href="https://visualgo.net/en/sorting">MER</a>
        </div>

        <div class="textMargin">
            <a href="https://visualgo.net/en/sorting">QUI</a>
        </div>

        <div class="textMargin">
            <a href="https://visualgo.net/en/sorting">R-Q</a>
        </div>

        <div class="textMargin">
            <a href="https://visualgo.net/en/sorting">COU</a>
        </div>

        <div>
            <a href="https://visualgo.net/en/sorting">RAD</a>
        </div>
        
        <div class="exploration">Exploration Mode▿
            <div class="lectureMode">e-Lecture Mode</div> 
        </div>
        
        <button class="loginButton">Login</button> 
    </div>
</main>
