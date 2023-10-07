<script>
    let count = 0;

    const add = () => {
        count ++;
    }
    const reduce = () => {
        count --;
    }

    let price = 20;

    // vue 的 watch

    // 后边跟的是表达式
    $: console.log("count: " + count);
    // $: alert("count: " + count);

    $: totol = price * count
</script>


<button on:click={add}> ++ </button>
{count}
<button on:click={reduce}> -- </button>

<br/>
价格：{price}
合计：{totol}