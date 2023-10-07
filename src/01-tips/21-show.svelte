<script>
    import {fade, fly} from "svelte/transition";

    let show = true;
</script>


<button on:click={()=> {
    show = !show
}}> 切换</button>

<div>
    {#if show}
        <!-- 淡入淡出 -->
        <p transition:fade>
            adsofjiaf sdoajfpoaijdfoiajopigjafa oijaoifjoiajf ijsopdifja</p>

        <br/>
        <br/>
        <br/>
        <br/>
        <!--        -->
        <p transition:fly={{y: 200, duration: 2000}}>
            adsofjiaf sdoajfpoaijdfoiajopigjafa oijaoifjoiajf ijsopdifja</p>


        <br/>
        <br/>
        <br/>
        <br/>
        
        <p in:fly={{y: 200, duration: 2000}} out:fade>
            adsofjiaf sdoajfpoaijdfoiajopigjafa oijaoifjoiajf ijsopdifja</p>
    {/if}

</div>