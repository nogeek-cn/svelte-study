<script>
    const mouseEnter = () => {
        console.log("mouseEnter")
    }

    const mouseLeave = () => {
        console.log("mouseLeave")
    }

</script>

<svelte:body on:mouseenter={mouseEnter} on:mouseleave={mouseLeave}/>

<div class="bodyDiv">

</div>

<style>

    .bodyDiv {
        height: 200px;
        width: 100px;
        background: yellow;
    }

    body{
        background: blue;
    }
</style>