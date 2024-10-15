<script>
	import Header from "./Header.svelte";
	import MainContents from "./MainContents.svelte";
	import Footer from "./Footer.svelte";
</script>
  
<style>
	/* 메인 컨테이너 */
	.container {
	  	max-width: 1500px;
	 	height: 700px;
	  	margin: 0;
	  	padding: 0;
	}
</style>

<main>
	<div class="container">
		<Header/>	
		<MainContents/>
		<Footer/>
	</div>
</main>