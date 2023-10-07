# Svelte基础语法



### 01、生命周期

什么是生命周期？生命周期就像人的生老病死一样是具体的某个时间段。那么软件也是一样，有特定的具体时刻所触发的事件。

svelte中的生命周期：onMount、onDestroy、beforeUpdate、afterUpdate

```vue
<script>
	import { onMount, onDestroy, beforeUpdate, afterUpdate } from 'svelte';

	// 挂载期    
	onMount(async () => {
		// 一般可以通过挂载来进行网络请求。
	});
    
    // dom节点更新前
    beforeUpdate(() => {
        // 用于记录dom节点更新前的状态
    }) 
    
    // dom节点更新后
    afterUpdate(() => {
        // 在dom接口更新后所需事件
    }) 
    
    // 卸载期
    onDestroy(() => {
		// 卸载工作
        // 例如释放变量、删除时钟。
	});
</script>
```



### 02、tick的用法

tick函数返回一个Promise, 你可以在任意地方使用tick。它的作用是：有了await tick()后，它不会里面刷新dom，而去等待下一次微任务就绪的时候（包括其他组件已经渲染完成）再继续往下执行。

```vue
<script>
  import { tick } from "svelte";

  let count = 0;
  async function hello() {
    count++;

    new Promise((resolve) => {
      setTimeout(() => {
        resolve("hello");
      }, 3000);
    }).then((res) => {
      console.log(res);
    });

    await tick();
    console.log(count);
  }
</script>

count: {count}
<button on:click={hello}>click me</button>
```



### 03、全局状态管理

store.svelte文件：

```JavaScript
import { writable } from 'svelte/store';
export const count = writable(0);
```



App.svelte

```vue
<script>
	import { count } from './stores.js';

    // 减少
	function decrement() {
		count.update(n => n - 1);
	}

    // 增加
	function increment() {
		count.update(n => n + 1);
	}

    // 重置
    function reset() {
		count.set(0);
	}
    
	let countValue;
	count.subscribe(value => {
		countValue = value;
	});
</script>

<button on:click={increment}>+</button>
{countValue}
简写：{$count}
<button on:click={decrement}>-</button>
<br />
<button on:click={reset}>重置</button>
```



只读全局仓库：只允许内部修改

```javascript
export const time = readable(new Date(), function start(set) {
	const interval = setInterval(() => {
		set(new Date());
	}, 1000);

	return function stop() {
		clearInterval(interval);
	};
});
```



利用derived基于原有的仓库数据进行定义新变量

```JavaScript
import { readable, derived } from 'svelte/store';

export const time = readable(new Date(), function start(set) {
	const interval = setInterval(() => {
		set(new Date());
	}, 1000);

	return function stop() {
		clearInterval(interval);
	};
});

const start = new Date();

export const elapsed = derived(
	time,
	$time => Math.round(($time - start) / 1000)
);
```



### 04、tweened补间动画

```js
<script>
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});
</script>

<progress value={$progress}></progress>
<button on:click="{() => progress.set(0)}">0%</button>
<button on:click="{() => progress.set(0.5)}">50%</button>
<button on:click="{() => progress.set(1)}">100%</button>

<style>
	progress {
		display: block;
		width: 100%;
	}
</style>
```



### 05、spring动画

spring是用于替代tweened适用于实时性更高的情况。

```js
<script>
	import { spring } from 'svelte/motion';

	let coords = spring({ x: 50, y: 50 }, {
		stiffness: 0.1,
		damping: 0.25
	});

	let size = spring(10);
</script>

<div style="position: absolute; right: 1em;">
	<label>
		<h3>stiffness ({coords.stiffness})</h3>
		<input bind:value={coords.stiffness} type="range" min="0" max="1" step="0.01">
	</label>

	<label>
		<h3>damping ({coords.damping})</h3>
		<input bind:value={coords.damping} type="range" min="0" max="1" step="0.01">
	</label>
</div>

<svg
	on:mousemove="{e => coords.set({ x: e.clientX, y: e.clientY })}"
	on:mousedown="{() => size.set(30)}"
	on:mouseup="{() => size.set(10)}"
>
	<circle cx={$coords.x} cy={$coords.y} r={$size}/>
</svg>

<style>
	svg {
		width: 100%;
		height: 100%;
	}
	circle {
		fill: #ff3e00;
	}
</style>
```





### 06、显隐动画

```js
<script>
	import { fade, fly } from 'svelte/transition';
	let visible = true;
</script>

<label>
	<input type="checkbox" bind:checked={visible}>
	visible
</label>

{#if visible}
	<p transition:fade>
		Fades in and out
	</p>
 
    <p transition:fly="{{ y: 200, duration: 2000 }}">
        Flies in and out
    </p>
 
 	<p in:fly="{{ y: 200, duration: 2000 }}" out:fade>
		Flies in, fades out
	</p>
{/if}
```



### 07、其他

window对象

```vue
<svelte:window on:keydown={handleKeydown}/>
```

body对象

```html
<svelte:body
	on:mouseenter={handleMouseenter}
	on:mouseleave={handleMouseleave}
/>
```

