<script>
    let activeIdx = 0; // 선택된 요소의 인덱스

    const handleClick = (idx) => {
        activeIdx = idx; // 클릭된 요소의 인덱스 설정
    };
</script>

<main>
    <div id="header-title-container">
        <a class="header-title" href="https://visualgo.net/en">VISUALGO.net / </a>

        <select id="header-lang">
            <option value="en">en</option>
            <option value="zh">zh</option>
            <option value="id">id</option>
        </select>
        
        <span class="header-title"> / sorting</span>
    </div>

    <div id="sort-type-container">
        {#each ['Bubble Sort', 'SEL', 'INS', 'MER', 'QUI', 'R-Q', 'COU', 'RAD'] as sortType, idx}
            <span 
                class="sort-txt {idx === activeIdx ? 'active' : 'inactive'}" 
                on:click={() => handleClick(idx)}>
                {sortType}
            </span>
        {/each}
    </div>

    <div id="mode-container">
        <div class="mode" id="mode-toggle">
            Exploration Mode &nbsp; <span style="font-size: 8px;">▼</span>

            <div class="mode mode-active">
                e Lecture Mode
            </div>
        </div>
    </div>

    <div id="login-container">
        <span id="login-btn">
            <a href="https://visualgo.net/login" id="login-href">L&nbsp;o&nbsp;g&nbsp;i&nbsp;n</a>
        </span>
    </div>
</main>

<style>
    main {
        height: 40px;
        display: flex;
    }

    #header-title-container {
        padding-left: 45px;
        padding-top: 6px;
    }

    .header-title {
        color: white;
        text-decoration: none; 
        font-family: "Roboto", sans-serif;
        font-size: 15px;
    }

    #sort-type-container {
        padding-left: 20px;
        padding-top: 8px;
    }

    .sort-txt {
        color: white;
        padding-left: 8px;
        font-size: 15px;
        font-family: "Roboto", sans-serif;
        cursor: pointer;
    }

    .active {
        color: white;
    }

    .inactive {
        color: gray;
    }

    #mode-container {
        padding-left: 630px;
        padding-top: 10px;
    }

    .mode {
        color: white;
        font-size: 13px;
        font-family: "Roboto", sans-serif;
        cursor: pointer;
    }

    #mode-toggle:hover .mode-active {
        display: block;
    }

    .mode-active {
        display: none; 
        position: relative; 
        background-color: black;
        color: white;
        padding: 8px 10px;
        font-size: 13px;
        z-index: 1000; 
    }

    .mode-active:hover {
        background-color: #00C1D4;
    }

    #login-container {
        border: 3px solid green;
        border-radius: 6px;
        margin: 5px 10px;
    }

    #login-btn {
        font-family: "Roboto", sans-serif;
        font-size: 13px;
        padding: 1px 10px;
    }

    #login-href {
        color: green;            
        text-decoration: none;    
        font-weight: 600;
    }
</style>