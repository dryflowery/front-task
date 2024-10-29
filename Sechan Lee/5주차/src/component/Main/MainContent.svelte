<script>
    import Canvas from "./Canvas.svelte";
    import LeftSide from "./Side/LeftSide.svelte";
    import RightSide from "./Side/RightSide.svelte";
</script>

<main>
    <div id="LeftSide">
        <LeftSide/>
    </div>

    <div id="Canvas">
        <Canvas/>
    </div>

    <div id="RightSide">
        <RightSide/>
    </div>
</main>

<style>
    main {
        display: grid;
        grid-template-columns: 40px calc(100vw - 80px) 40px;
        width: 100vw;
        height: 623.2px;
    }
</style>
