<script>
    import Footer from './component/Footer.svelte';
    import Header from './component/Header.svelte';
    import MainContent from './component/MainContent.svelte';
</script>

<main>
    <div id="header">
        <Header/>
    </div>

    <div id="mainContent">
        <MainContent/>
    </div>

    <div id="footer">
        <Footer/>
    </div>
</main>

<style>
    main {
        display: grid;
        grid-template-rows: 58px 581.6px auto;
    }
</style>
