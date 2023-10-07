<script>
    let arr = [1, 2, 3];


    $: total = arr.reduce(
        (total, val) => total = total + val,
        0);
</script>

<div>
    {arr.join(" + ")} = {total}

    <br/>
    <br/>
    <br/>

    <button on:click={()=> {
        arr.push(arr.length + 1);
        arr = [...arr];
    }}>追加一个元素</button>
</div>