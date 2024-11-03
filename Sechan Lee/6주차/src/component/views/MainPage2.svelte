<script>
    import Footer from "../fixed/Footer.svelte";
    import Header from "../fixed/Header.svelte";
    import {isListVisible} from "../../lib/store";
</script>
  
<main>
    <div id="Header-container">
        <Header/>
    </div>

    <div class="main-container" class:list-visible={$isListVisible} class:list-invisible={!$isListVisible}>

    </div>

    <div id="Footer-container">
        <Footer/>
    </div>
 </main>
 
  
<style>
    .main-container {

    }
</style>