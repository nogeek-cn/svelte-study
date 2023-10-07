<!--双向绑定-->
<script>
    let name = ""; // 响应式数据

    let yes = false;

    let books = [];

    let selected = 1;
</script>



<input type="text" bind:value={name}>

<h1>hello, {name}</h1>

<br/>
<br/>


<input type="checkbox" bind:checked="{yes}"/> {yes}


<br/>
<br/>
复选框
<br/>
<input type="checkbox" bind:group={books} name="books" value="check_1">1<br/>
<input type="checkbox" bind:group={books} name="books" value="check_2">2<br/>
<input type="checkbox" bind:group={books} name="books" value="check_3">3<br/>
<input type="checkbox" bind:group={books} name="books" value="check_4">4

<br/>
<br/><br/>
单选框

<input type="radio" bind:group={books} name="books" value="check_1">1<br/>
<input type="radio" bind:group={books} name="books" value="check_2">2<br/>
<input type="radio" bind:group={books} name="books" value="check_3">3<br/>
<input type="radio" bind:group={books} name="books" value="check_4">4


<br/>
<br/><br/>
选择<br/>  :  {selected}
<br/>
<select bind:value={selected}>
    <option value="1">1
    <option value="2">2
    <option value="3">3
</select>