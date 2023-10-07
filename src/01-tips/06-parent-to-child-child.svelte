<script>
    import {createEventDispatcher} from "svelte";

    const dispatcher = createEventDispatcher();

    export let msg = "";

    const sendToParent = () => {
        dispatcher("helloparent", "你好，父组件")
    }
</script>

<div class="box2">
    子盒子, {msg}

    <button on:click={sendToParent}>
        子传父
    </button>
</div>

<style lang="scss" type="text/scss">
  .box2 {
    width: 250px;
    height: 250px;
    //display: flex;
    //justify-content: center;
    //align-items: center;
    background: blue;
  }

</style>