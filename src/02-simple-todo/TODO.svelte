<script>
    // 输入框内容
    let inputText = "";

    // 待办事项列表
    let todoArray = [
        {id: 1, text: "预习 vuex知识点1111", check: false, finish: false},
        {id: 2, text: "预习 vuex知识点222", check: true, finish: true},
        {id: 3, text: "预习 vuex知识点333", check: false, finish: false}
    ]

    const liMergeClass = (finish) => {
        let classArr = ["todo-li"]
        if (finish) {
            classArr.push('todo-li-finish')
        }
        return classArr.join(" ");
    }

    // 编辑的 id
    let editIndex = -1;

    $: console.log("arr被修改了", todoArray);
</script>

<div class="todo">
    <div class="todo-header">任务列表</div>
    <div class="todo-list-area">
        <ul class="todo-ul">
            {#each todoArray as item, index(item.id)}
                <li class={liMergeClass(item.finish)}>
                    {#if item.finish}
                        <input type="checkbox" bind:checked={item.check} disabled/>
                    {:else }
                        <input type="checkbox" bind:checked={item.check} />
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
                                       todoArray = [...todoArray];
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

    <div class="todo-total-text">
        任务总数 { todoArray.length }： 还有 {
        todoArray.reduce((total, item) => {
            if (!item.finish) {
                total = total + 1;
            }
            return total;
        }, 0)
    } 未完成
        <span class="todo-finish"
              on:click={() => {
                  todoArray.forEach(item => {
                      if (item.check) {
                          item.finish = true
                      }
                  })
                  todoArray = [...todoArray];
              }}>
            [完成]
        </span>
    </div>

    <div class="todo-add-area">
        <input bind:value={inputText}
               class="todo-add-input"
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
                    todoArray = [...todoArray]
                }}
        >
            添加
        </button>
    </div>

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

    // 待办事项统计计算
    .todo-total-text {
      font-size: 20px;
      padding: 10px 0px;

      .todo-finish {
        color: blue;
        cursor: pointer;
      }
    }

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
  }

</style>