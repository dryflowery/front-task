<script>

	import Header from "./component/Header/Header.svelte";
    import Canvas from "./component/MainContent/Canvas.svelte";
    import Footer from "./component/Footer/Footer.svelte";

</script>

<main>
    <div class="header"> <Header/></div>
    <div class="canvas"> <Canvas/> </div>
    <div class="footer"> <Footer/></div>

</main>

<style>
    main {
        display: grid;
    }

</style>