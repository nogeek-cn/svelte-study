<script>
    import {onMount, beforeUpdate, afterUpdate, onDestroy} from "svelte";

    // 挂载期
    onMount(() => {
        // 网络请求
        console.log("onMount")
    });

    // 存在期
    beforeUpdate(() => {
        console.log("beforeUpdate")
    });

    afterUpdate(() => {
        console.log("afterUpdate")
    });

    // 卸载器
    onDestroy(() => {
        console.log("onDestroy")
    });
</script>

<div>
    <h1>生命周期</h1>
</div>