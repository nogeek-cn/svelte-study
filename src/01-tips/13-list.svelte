<script>
    let arr = [
        {id: 1, name: 1, age: 1},
        {id: 2, name: 2, age: 2},
        {id: 3, name: 3, age: 3},
        {id: 4, name: 4, age: 4},
        {id: 5, name: 5, age: 5}
    ]

</script>


<div>
    <ul>
        {#each arr as item, index (item.id)}
            <li>
                <td> id : {item.id} </td>
                <td>name: {item.name}</td>
                <td> age: {item.age}</td>
            </li>
        {/each}
    </ul>
</div>