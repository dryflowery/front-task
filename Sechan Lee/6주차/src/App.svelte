<script>
  import Router from 'svelte-spa-router';
  import MainPage1R from "./routes/MainPage1R.svelte";
  import MainPage2R from "./routes/MainPage2R.svelte";

  const routes = {
    '/': MainPage1R,
    '/MainPage2': MainPage2R
  };
</script>

<Router {routes}/>

