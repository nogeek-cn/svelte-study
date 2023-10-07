<script>
    async function sleep(duration) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("时间到了")
            }, duration)
        });
    }

</script>

{#await sleep(3000)}
    loading ...
{:then result}
    {result}
{/await}
