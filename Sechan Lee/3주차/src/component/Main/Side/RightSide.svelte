<script>
    import CodeToggle from "./Toggle/CodeToggle.svelte";
    import NaturalToggle from "./Toggle/NaturalToggle.svelte";
</script>

<main>
    <div id="natural-toggle">
        <NaturalToggle/>
    </div>
    
    <div id="code-toggle">
        <CodeToggle/>
    </div>
</main>

<style>
    main {
        background-color: black;
        height: 623.2px;
    }

    #natural-toggle {
        padding: 355px 0px 0px 0px;
    }

    #code-toggle {
        padding: 3px 0px 0px 0px;
    }
</style>