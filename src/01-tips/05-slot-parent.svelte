
<script>
    import Child from "./05-slot-child.svelte";
</script>

<div class="box1">
    <Child>
            <span slot="block1">this is block1</span>
            <span slot="block2">this is block2</span>
    </Child>
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