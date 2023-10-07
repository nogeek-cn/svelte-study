
<script>
    import Child from "./06-parent-to-child-child.svelte";

    let msg = "";
</script>

<div class="box1">
    父组件接收到的消息：<br>
    {msg};
    <br/>
    <Child msg="hello world1111111111111"
           on:helloparent={(e) => {
               // alert(e.detail);
               msg = e.detail;
           }}/>
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