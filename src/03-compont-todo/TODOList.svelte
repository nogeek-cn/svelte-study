<script>
    import {createEventDispatcher} from "svelte";

    const  dispatch = createEventDispatcher();
    export let todoArray = [];

    const liMergeClass = (finish) => {
        let classArr = ["todo-li"]
        if (finish) {
            classArr.push('todo-li-finish')
        }
        return classArr.join(" ");
    }

    // 编辑的 id
    let editIndex = -1;
</script>

<div class="todo-list-area">
    <ul class="todo-ul">
        {#each todoArray as item, index(item.id)}
            <li class={liMergeClass(item.finish)}>
                {#if item.finish}
                    <input type="checkbox" bind:checked={item.check} disabled/>
                {:else }
                    <input type="checkbox" bind:checked={item.check}/>
                {/if}


                {#if item.id == editIndex && !item.finish}
                    <!-- 显示输入框 -->
                    <input type="text"
                           bind:value={item.text}
                           on:blur={() => {
                                   if (item.text.trim() === "") {
                                       let arrIndex = todoArray.findIndex((val) => {
                                           if (val.id === item.id) {
                                               return true;
                                           } else {
                                               return false;
                                           }
                                       })
                                       todoArray.splice(arrIndex, 1);

                                       dispatch("updateArr", todoArray);
                                   }
                                   // 失去焦点
                                   editIndex = -1;
                               }}/>
                {:else}
                        <span on:click={() => {
                            editIndex = item.id;
                        }}>
                            {item.text}
                        </span>
                {/if}
            </li>
        {/each}

    </ul>
</div>

<style lang="scss" type="text/scss">
    // 待办事项列表
    .todo-list-area {
        .todo-ul {
            padding: 0;
            margin: 0;
        }

        .todo-li {
            padding: 5px 0;
            list-style: none;
            border-bottom: 1px solid black;
        }

        .todo-li-finish {
            text-decoration: line-through;
        }
    }

</style>