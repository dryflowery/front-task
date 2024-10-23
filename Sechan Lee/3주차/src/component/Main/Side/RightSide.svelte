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
        height: calc(100vh - 80px);
    }

    #natural-toggle {
        padding-top: 980%;
    }

    #code-toggle {
        padding-top: 10%;
    }
</style>