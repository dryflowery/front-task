<script>
    import Footer from "./component/Footer/Footer.svelte";
    import Header from "./component/Header/Header.svelte";
    import MainContent from "./component/Main/MainContent.svelte";
</script>

<main>
    <div id="Header">
        <Header/>
    </div>

    <div id="MainContent">
        <MainContent/>
    </div>

    <div id="Footer">
        <Footer/>
    </div>
</main>

<style>
    main {
        display: grid;
        grid-template-rows: 40px calc(100vh - 80px) 40px;
        height: 100vh; 
    }

    #Header {
        background-color: black;
        z-index: 1;
    }
    
    #Footer {
        background-color: black;
        z-index: 1;
    }
</style>
