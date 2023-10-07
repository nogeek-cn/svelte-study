<script>
    import { count } from "./17-Store-Gloab.js";

    let countValue;
    // 读取全局状态的方法
    count.subscribe((value) => {
        countValue = value;
    })
</script>

全局状态的值：{countValue}
<br/>
<button on:click={() => {
    count.update((val) => {
        val -= 1;
        return val;
    });
}}> -- </button>
<br/>
<button on:click={() => {
    count.update((val) => {
        val +=1;
        return val;
    })

}}> ++ </button>

<br/><br/><br/>

<button on:click={() => {
    count.set(100000)
}}> count.set(100000) </button>