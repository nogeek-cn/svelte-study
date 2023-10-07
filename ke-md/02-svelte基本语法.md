

# svelte基本语法

### 1、数据渲染

```HTML
<script>
    let name = "xxxx";
</script>

<div> hello {name} </div>
```



将变量放进一对花括号内，即可进行渲染，花括号内可以放表达式，即：

```html
<script>
    let name = "xxxx";
</script>

<div> hello {name.spilt(""),join("-")} </div>
```



甚至还可以对标签的属性进行简写，例如对img标签src属性进行简写：

```html
<script>
    let src = '/love.png'
</script>

<img {src}  alt="xxxx"/>
```





### 2、双向绑定

双向绑定只需要通过 bind:value 即可完成。若单选框组、复选框组：还需要添加bind:group属性和value值。



```vue
<script>
	let name = 'world';
</script>

<input bind:value={name}>
<h1>Hello {name}!</h1>
```

checkbox双向绑定：

```vue
<script>
	let yes = false;
</script>

<label>
	<input type="checkbox" checked={yes}>
</label>
```

复选框组：

```vue
<input type=checkbox bind:group={books} name="books" value={‘钢铁‘}>
<input type=checkbox bind:group={books} name="books" value={‘卖火柴‘}>
<input type=checkbox bind:group={books} name="books" value={‘唐诗300首‘}>
```

单选组：

```vue
<input type=radio bind:group={books} name="books" value={‘钢铁‘}>
<input type=radio bind:group={books} name="books" value={‘卖火柴‘}>
<input type=radio bind:group={books} name="books" value={‘唐诗300首‘}>
```

select：

```vue
<select value={selected} on:change="{() => answer = ''}">
	{#each questions as question}
		<option value={question}>
			{question.text}
		</option>
	{/each}
</select>
```





### 3、样式渲染

行内样式：

```html
<div>
    <div style="color: red">
        红色字符串
    </div>
</div>
```



```
<p 
	style:color=‘red’
	style:--opacity="{bgOpacity}"
>this is text</p>
```





样式表：

```html
<div>
    <div class = "bluetext">
        
        bluetext
    </div>
</div>

<style>
    .bluetext {
        color: blue;
    }
</style>
```







按条件应用类名：

```js
<button	class:selected="{current === 'foo'}">clickme</button>
```

简写：

```html
<div class:big>
	big类名
</div>
```





使得项目支持scss语法。

想要使得项目支持scss，样式预处理语言。

需要先安装预处理器：svelte-preprocess， 由于需要支持scss，那sass当然也需要进行安装。

`npm install svelte-preprocess node-sass --save-dev`

安装好预处理器后，还需要对脚手架配置文件vite.config.js进行修改：

最终修改如下：

```javascript
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      preprocess: sveltePreprocess(),
    }),
  ],
});
```

将scss写在style即可。不要忘记，将lang和type属性写上。

```vue
<div class="bluetext">
  蓝色字符串,
  <span class="violettext">紫色字符串</span>
</div>

<style lang="scss" type="text/scss">
  .bluetext {
    color: blue;
    .violettext {
      color: violet;
    }
  }
</style>
```





### 4、创建组件

在svelte项目中，每一个svelte为后缀的文件都是一个组件。

导入组件的方式也十分方便，使用import进行导入即可。千万不要忘记加svelte文件后缀。





#### 匿名插槽

父组件：

```JS
<script>
	import Box from './Box.svelte';
</script>

<Box>
	<h2>Hello!</h2>
	<p>This is a box. It can contain anything.</p>
</Box>
```

子组件：

```js
<div class="box">
	<slot></slot>
</div>

<style>
	.box {
		width: 300px;
		border: 1px solid #aaa;
		border-radius: 2px;
		box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
		padding: 1em;
		margin: 0 0 1em 0;
	}
</style>
```

#### 具名插槽

父组件：

```js
<ContactCard>
	<span slot="name">
		P. Sherman
	</span>

	<span slot="address">
		42 Wallaby Way<br>
		Sydney
	</span>
</ContactCard>
```

子组件：

```js
<article class="contact-card">
	<h2>
		<slot name="name">
			<span class="missing">Unknown name</span>
		</slot>
	</h2>

	<div class="address">
		<slot name="address">
			<span class="missing">Unknown address</span>
		</slot>
	</div>

	<div class="email">
		<slot name="email">
			<span class="missing">Unknown email</span>
		</slot>
	</div>
</article>
```

作用域插槽：

```js
<Hoverable let:hovering={active}>
	{active}
</Hoverable>
```

```js
<script>
	let hovering;
</script>

<div on:mouseenter={() => hovering = true} on:mouseleave={() => hovering = false}>
	<slot hovering={hovering}></slot>
</div>
```





### 5、父传子

父传子的过程需要子组件暴露属性，父组件才能进行参数的传递。

如何暴露属性? 子组件可以在定义响应式变量的过程中，在前面加上export关键词，即可定义参数属性。

父组件：

```vue
<script>
  import Child from "./Child.svelte";
</script>

<div class="c-parent">
  我是父组件
  <Child text="你好子组件" />
</div>

<style lang="scss" type="text/scss">
  .c-parent {
    width: 500px;
    height: 500px;
    background-color: rgb(29, 210, 255);
  }
</style>
```

子组件：

```vue
<script>
  export let text = ""; // 此处暴露出去的值，可以赋值默认值。
</script>

<div class="c-child">
  我是子组件
  <br />
  父组件信息：{text}
</div>

<style lang="scss" type="text/scss">
  .c-child {
    width: 300px;
    height: 300px;
    background-color: rgb(166, 39, 245);
  }
</style>
```

最终效果：





若子组件定义多个属性，父组件还可以通过解构的方式去传递参数：

子组件:

```vue
<script>
	export let name;
	export let age;
</script>
```

父组件：

```vue
<script>
	let userinfo = {
		name: "小明",
		age: 18
	}
</script>

<Child {...userinfo} />
```



### 6、子传父

在svelte中提供了一个创建事件调度器的方法createEventDispatcher来创建事件调度方法，开发者可以利用该事件调度方法来调度事件。从而达到子传父的目的。



父组件：在父组件中监听自定义方法on:hello，当子组件调度hello事件的时候，父组件能接收到传递过来的参数。

```vue
<script>
  import Child from "./Child.svelte";
</script>

<div class="c-parent">
  我是父组件
  <Child
    text="你好子组件"
    on:hello={(e) => {
      console.log("父组件收到的信息:", e.detail);
    }}
  />
</div>

<style lang="scss" type="text/scss">
  .c-parent {
    width: 500px;
    height: 500px;
    background-color: rgb(29, 210, 255);
  }
</style>
```

子组件：

```vue
<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  const sendToParent = () => {
    dispatch("hello", "this is message");
  };
  export let text = "";
</script>

<div class="c-child">
  我是子组件
  <br />
  父组件信息：{text}
  <br />
  <button on:click={sendToParent}>传递到父组件</button>
</div>

<style lang="scss" type="text/scss">
  .c-child {
    width: 300px;
    height: 300px;
    background-color: rgb(166, 39, 245);
  }
</style>

```







上下文传参:

定义：

```js
<script>
	import { setContext } from 'svelte';
	setContext('mykey', {
		a: "aaaaaaaaaaaaaa",
		b: "bbbbbbbbbbbbbb"
	});
</script>
```

使用：

```js
<script>
	import { getContext } from 'svelte';
	const { a, b } = getContext('mykey');
</script>
```









### 7、关于渲染html字符串

在svelte中提供一个特殊的标记 @html，使用该标记可以为我们渲染html字符串。

```html
<script>

    let h5 = '我的名字叫：<span style="color: blue; font-size: 200px">小明</span>'

</script>

<div >

    {@html h5}

</div>

```







### 8、svelte事件

在svelte中定义事件也十分简单，与原生类似，不同的是，需要在on后面加上冒号。

格式如：on:事件名={方法引用}

修饰符：

- `preventDefault` — 停止默认事件修饰符
- `stopPropagation` —停止冒泡修饰符
- `passive` — 提高滚动性能
- `nonpassive` — 显式的设置`passive: false`
- `capture` —捕获阶段处理事件
- `once` — 只执行一次，完了后移除事件，使得下次不能被执行。
- `self` — 仅在事件对象event.target为元素本身时执行事件。
- `trusted` — 只有 `event.isTrusted` 是 `true`才进行触发。



例子：

```vue
<button on:click|once={事件函数}>点击我</button>
```

例子：

```js
<script>
  let count = 0;

  const reduce = () => {
    count--;
  };

  const add = () => {
    count++;
  };
</script>

<div>
  数量:
  <button on:click={reduce}>-</button>
  {count}
  <button on:click={add}>+</button>
</div>

```

效果如下：





### 9、svelte中的反应性

从第一小节可得知，开发者只需要定义一个变量，则该变量就是响应式。

在svelte中，提供一个反应性的语法，在script标签中用$:符合进行定义。先来理解什么是反应性，当被依赖的响应式变量发生改变的时候，会自动同步更新反应性语法里面的表达式。

例子：

```vue
<script>
  let count = 0;

  const reduce = () => {
    count--;
  };

  const add = () => {
    count++;
  };

  $: console.log("count变成：%d", count);
</script>

<div>
  数量:
  <button on:click={reduce}>-</button>
  {count}
  <button on:click={add}>+</button>
</div>

```

效果如下：





```vue
<script>
  let count = 0;

  const reduce = () => {
    count--;
  };

  const add = () => {
    count++;
  };

  let price = 16.8;

  $: console.log("count变成：%d", count);
  $: total = (count * price).toFixed(2);
</script>

<div>
  数量:
  <button on:click={reduce}>-</button>
  {count}
  <button on:click={add}>+</button>
  <br />
  价格：{price} 合计：{total}
</div>
```



效果如下：



### 10、修改数组或对象

在开发过程中经常会遇到一个问题，就是虽然修改了数组，但是不会产生效果的情况。

为什么会产生这样的问题呢？原因是由于数组和对象变量的指向地址并无发生变化，使得sevelte不能识别是否发生的变量，无法进一步的触发渲染事件。

如何解决该问题？可以通过浅拷贝或深拷贝的形式，使得变量所指向的地址发生改变即可。

通常做法有：

对象：

1、Object.assign({}, obj1, obj2)

2、{...obj1, ...obj2}

3、JSON.parse(JSON.stringify(obj1))

数组：

1、[...arr1, ...arr2]

2、JSON.parse(JSON.stringify(arr1))

```vue
<script>
  let arr = [1, 2, 3];

  $: total = arr.reduce((total, val) => (total += val));
</script>

<div>
  {arr.join(" + ")} = {total}

  <br />
  <button
    on:click={() => {
      arr.push(arr.length + 1);
      arr = [...arr];
    }}>add item</button
  >
</div>

```



### 11、条件渲染

svelte有着自己的一套模板语法,使用起来结构更加清晰.

可以看到如下代码，条件渲染的条件是放在标签语法{#if }里面，而分支用{:else}分开，最终再以{/if}结束。

```vue
<script>
  let flag = true;
</script>

{#if flag}
  <div>真的</div>
{:else}
  <div>假的</div>
{/if}
```

结果：真的

当然，条件渲染也支持嵌套。

```vue
<script>
  let flag = true;
  let flag2 = false;
</script>

{#if flag}
  <div>真的</div>
  	{#if flag2}
      <div>真的</div>
    {:else}
      <div>假的</div>
    {/if}
{:else}
  <div>假的</div>
{/if}
```

结果：真的

假的



### 12、列表渲染

同样svelte有对于循环也是有响应的模板语法。

格式：

```
{#each 数组 as 数组项目, 数组下标 (唯一的键值)}
	<div>{数组项目.属性}</div>
{/each}
```

示例1、

```vue
<script>
  import { each } from "svelte/internal";

  let arr = [
    { name: "小明", age: 20 },
    { name: "小红", age: 19 },
    { name: "小蓝", age: 20 },
    { name: "小天", age: 15 },
  ];
</script>

{#each arr as item, index}
  <div>
    {index}、姓名：{item.name} 年龄：{item.age}
  </div>
{/each}
```

示例2: 亦可以通过each后面的圆括号来指定唯一的键(key)

```vue
<script>
  import { each } from "svelte/internal";

  let arr = [
    { id: 1, name: "小明", age: 20 },
    { id: 2, name: "小红", age: 19 },
    { id: 3, name: "小蓝", age: 20 },
    { id: 4, name: "小天", age: 15 },
  ];
</script>

{#each arr as item, index (item.id)}
  <div>
    {index}、姓名：{item.name} 年龄：{item.age}
  </div>
{/each}

```



10、Await模板标签

svelte有个与promise配合使用的模板标签，以提高用户的体验感。

语法1：含等待、成功、失败状态（较为常用）

```vue
{#await Promise}
  等待状态
{:then 成功值}
  成功状态
{/await}
```

语法2：不含失败和等待状态

```
{#await Promise then 成功值}
  成功状态
{/await}
```

例子1、

```vue
<script>
  let timer = new Promise((resolve) => {
    setTimeout(() => {
      resolve("倒计时完成");
    }, 3000);
  });
</script>

{#await timer}
  loading...
{:then r}
  {r}
{/await}
```

例子2、

```vue
<script>
  let timer = new Promise((resolve) => {
    setTimeout(() => {
      resolve("倒计时完成");
    }, 3000);
  });
</script>

{#await timer then r}
  {r}
{/await}
```



### 13、绑定元素

可以通过bind:this，将元素绑定到具体的变量中去。

```vue
<script>
	let input;

	export function focus() {
		input.focus();
	}
</script>

<input bind:this={input} />
```

