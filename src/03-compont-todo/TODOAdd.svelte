<script>
    import {createEventDispatcher} from "svelte";

    const  dispatch = createEventDispatcher();
    export let todoArray = [];

    let inputText = "";


</script>

<div class="todo-add-area">
    <input bind:value={inputText}
           class=" todo-add-input"
           type="text"/>
    <button class="todo-add-button"
            on:click={()=>{
                    inputText = inputText.trim();
                    if (inputText.length <= 0) {
                        alert("请输入待办事项")
                        return;
                    }

                    todoArray.push(
                        {   id: todoArray.length + 1,
                            text: inputText,
                            check: false,
                            finish: false
                        }
                    )
                    dispatch("updateArr", todoArray);
                }}
    >
        添加
    </button>
</div>


<style lang="scss" type="text/scss">


    .todo-add-area {
        .todo-add-input {
            flex: 0;
            min-width: 200px;

        }

        .todo-add-button {
            flex: 0;
            min-width: 80px;
        }
    }
</style>