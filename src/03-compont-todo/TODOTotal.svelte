<script>
    import {createEventDispatcher} from "svelte";
    const  dispatch = createEventDispatcher();
    export let todoArray = [];

    const finishClick = ()=> {
        console.log(todoArray);

        todoArray.forEach((item) => {
            if (item.check) {
                item.finish = true
            }
        })
        dispatch("updateArr", todoArray);
    }

    $: nofinish =  todoArray.reduce((total, item) => {
        if (!item.finish) {
            total = total + 1;
        }
        return total;
    }, 0)

</script>

    <div class="todo-total-text">
    任务总数 { todoArray.length }： 还有 {nofinish} 未完成
    <span class="todo-finish"
          on:keydown={() => {}}
          on:click={finishClick}>
            [完成]
        </span>
</div>


<style lang="scss" type="text/scss">
     //待办事项统计计算
    .todo-total-text {
        font-size: 20px;
        padding: 10px 0px;

        .todo-finish {
            color: blue;
            cursor: pointer;
        }
    }
</style>