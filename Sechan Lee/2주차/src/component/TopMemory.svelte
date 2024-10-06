<script>
    export let top
</script>

<main>
    <div id="topMemory">{top}</div>
</main>

<style>
   #topMemory {
        position: relative;
        width: 50px;  
        height: 50px; 
        border: 1px solid #000000; 
        line-height: 50px; 
        display: flex;
        background-color: transparent; 

        /* num 가운데 정렬 */
        text-align: center; 
        justify-content: center;
        align-items: center;
    }
</style>
