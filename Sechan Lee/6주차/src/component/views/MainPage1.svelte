<script>
    import Footer from "../fixed/Footer.svelte";
    import Header from "../fixed/Header.svelte";
    import { push } from "svelte-spa-router";
    import {isListVisible} from "../../lib/store";
</script>
  
<main>
    <div class="Header-container">
        <Header/>
    </div>

    <div class="main-container" class:main1-list-visible={$isListVisible} class:main1-list-invisible={!$isListVisible}>
        <div id="main1-left-container">
            <div id="main-txt">알고리즘의 시각화를 경험해보세요</div>
            <div id="sub-txt">궁금한 알고리즘 검색하기</div>
            <input type="text" placeholder="Search algorithms...">
    
            <div>
                <button id="learn-more-btn" on:click={() => push('/MainPage2')}>더 알아보기</button>
                <button id="search-start-btn">검색</button>
            </div>
        </div>
     
        <div id="main1-right-container">
             <div id="algo-gif-container">
                <img src="assets/algoGif.gif" alt="visualized algorithm" id="algo-gif">
             </div>
        </div>
    </div>

    <div class="Footer-container">
        <Footer/>
    </div>
 </main>
 
  
<style>
    .main-container {
        display: grid;
        grid-template-columns: 1030px auto;
    }

    #main1-left-container {
        padding: 250px 0px 0px 190px;
    }

    #main-txt {
        font-size: 3.5rem;
        font-weight: bold;
    }

    #sub-txt {
        font-size: 2rem;
        color: #dedede;
    }

    #main1-left-container input[type="text"] {
        padding: 10px;
        margin-top: 20px;
        border-radius: 5px;
        border: 1px solid #2c3138;
        width: 420px;
        height: 25px;
        background-color: #151b23;
        font-size: 1rem;
        color: #FFFFFF;
    }

    #main1-left-container button {
        padding: 10px 20px;
        margin: 20px 10px 0px 0px;
        border-radius: 5px;
        border: none;
        color: white;
        width: 213px;
        font-size: 1.1rem;
        cursor: pointer;
    }

    #learn-more-btn {
        background-color: #555;
    }

    #learn-more-btn:hover {
        background-color: #777; 
    }

    #search-start-btn {
        background-color: #28a745;
    }

    #search-start-btn:hover {
        background-color: #218838; 
    }

    #algo-gif-container {
        background-color: #dcddde;
        margin-top: 150px;
        border-radius: 10px;
        width: 800px;
        height: 500px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>