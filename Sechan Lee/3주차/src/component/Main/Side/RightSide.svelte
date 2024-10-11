<script>
    import CodeToggle from "./Toggle/CodeToggle.svelte";
    import NaturalToggle from "./Toggle/NaturalToggle.svelte";
</script>

<main>
    <div id="NaturalToggle">
        <NaturalToggle/>
    </div>
    
    <div id="CodeToggle">
        <CodeToggle/>
    </div>
</main>

<style>
    main {
        background-color: black;
        height: 623.2px;
    }

    #NaturalToggle {
        padding: 355px 0px 0px 0px;
    }

    #CodeToggle {
        padding: 3px 0px 0px 0px;
    }
</style>