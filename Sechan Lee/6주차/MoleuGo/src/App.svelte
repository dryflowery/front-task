<script>
  import Footer from "./component/Footer.svelte";
  import Header from "./component/Header.svelte";
  import Main1 from "./component/Main1.svelte";
</script>

<main>
  <div id="Header-container">
    <Header/>
  </div>

  <div id="Main-container">
    <Main1/>
  </div>

  <div id="Footer-container">
    <Footer/>
  </div>
</main>

<style>
    main {
        display: grid;
        height: 100vh; 
        grid-template-rows: 80px calc(100vh - 120px) 40px;
    }

    #Header-container {
        z-index: 1;
    }
    
    #Footer-container {
        z-index: 1;
    }
</style>