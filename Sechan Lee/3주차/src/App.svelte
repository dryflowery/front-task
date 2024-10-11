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
        grid-template-rows: 40px 623.2px 40px;
        height: 100vh; 
    }

    #Header {
        background-color: black;
    }
    
    #Footer {
        background-color: black;
    }
</style>
