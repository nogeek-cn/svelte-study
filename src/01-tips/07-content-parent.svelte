
<script>
    import CChild from "./07-content-child.svelte";

    import { setContext } from "svelte";


    setContext("mykey", {
        msg: "这是上下文信息"
    })
</script>

<div class="box1">
    父盒子

    <CChild/>
</div>

<style lang="scss" type="text/scss">
  .box1 {
    width: 500px;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: chocolate;
  }

</style>