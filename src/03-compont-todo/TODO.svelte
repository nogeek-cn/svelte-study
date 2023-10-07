<script>
    // 输入框内容
    import TODOList from "./TODOList.svelte";
    import TODOTotal from "./TODOTotal.svelte";
    import TODOAdd from "./TODOAdd.svelte";
    import app from "../main.js";


    // 待办事项列表
    let todoArray = [
        {id: 1, text: "预习 vuex知识点1111", check: false, finish: false},
        {id: 2, text: "预习 vuex知识点222", check: true, finish: true},
        {id: 3, text: "预习 vuex知识点333", check: false, finish: false}
    ]

    // 传递过来的是一个事件，所以他的值应该在 detail 里边
    const updateArr = (e) => {
        todoArray = e.detail;
    }

    $: console.log("arr被修改了", todoArray);
</script>

<div class="todo">
    <div class="todo-header">任务列表</div>

    <TODOList {todoArray} on:updateArr={updateArr}/>
    <TODOTotal {todoArray} on:updateArr={updateArr}/>
    <TODOAdd {todoArray} on:updateArr={updateArr}/>


</div>

<style lang="scss" type="text/scss">
  .todo {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    background: #fffacc;
    width: 350px;
    min-height: 300px;
    padding: 15px;

    //代办事项头
    .todo-header {
      text-align: center;
      font-size: 34px;
      font-weight: 600;
      margin-bottom: 10;
    }




  }

</style>