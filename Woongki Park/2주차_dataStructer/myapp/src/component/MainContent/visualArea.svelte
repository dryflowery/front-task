<!-- 알고리즘 시각화 구역 -->
<script>
    import ButtonLogic from "./stackLogic.svelte";

    let m = { x: 0, y: 0 };

	function handleMousemove(event){
		m.x = event.clientX;
		m.y = event.clientY;
	}

</script>
    
    <ButtonLogic/>


<style>
    
</style>
