<script>
    import { tick } from "svelte";

    let count = 0;
    async function hello() {
        count ++;

        new Promise((resolve) => {
            setTimeout(() => {
                resolve("hello");
            }, 3000);
        }).then((res) => {
            console.log(res);
        });

        await tick();
        console.log(count);
    }

</script>



<div>
count: {count}

    <button on:click={hello} > click me </button>
</div>