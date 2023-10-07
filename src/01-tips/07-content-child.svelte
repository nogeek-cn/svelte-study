<script>
    import  { getContext } from "svelte";
    import {get} from "svelte/store";

    const content = getContext("mykey");
    alert(content);
    alert(content.msg);
</script>

<div class="box2">
    子盒子

    <br/>
    {content.msg}


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