<script>
    export let element;
    export let left
    export let index;
    export let bgc;
</script>

<main style="height: {element * 5.5}px; left: {left[index]}px, background-color: {bgc[index]};">
    <span class="element" class:isAbove={element <= 3}>{element}</span> 
    <span class="index">{index}</span> 
</main>

<style>
    main {
        width: 50px;
        position: absolute;
        bottom: 0; 
        display: flex;
        justify-content: center; 
    }

    .element {
        color: black;
        font-size: 18px;
    }

    /* element 값이 3보다 작거나 같을 때 */
    .element.isAbove {
        position: absolute;
        top: -25px; 
    }

    /* element 값이 3 이상일 때 */
    .element:not(.isAbove) {
        margin-top: auto; 
    }

    .index {
        position: absolute;
        bottom: -30px; 
        font-size: 18px;
        color: black; 
    }
</style>
