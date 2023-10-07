# Svelte项目实战

### 01、Axios封装

安装axios

npm install axios

```js
export function fetch(uri, data, method = "POST", responseType = "json") {
  return new Promise((resolve, reject) => {
    axios({
      url: BASEURL + uri,
      method: method,
      params: method === "GET" ? data : null,
      data: method === "POST" ? data : null,
      // headers: {
      //   "Content-Type": "application/json",
      // },
      responseType: responseType,
    })
      .then(function (response) {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}
```



### 02、数据请求

创建api.js文件，导入fetch文件。

在api.js写请求接口。



### 03、页面制作

使用蓝湖还原设计图。



### 04、路由配置

安装路由依赖：

```
npm install svelte-spa-router
```

定义路由：

```js

import Home from './routes/Home.svelte'
import Author from './routes/Author.svelte'
import Book from './routes/Book.svelte'
import NotFound from './routes/NotFound.svelte'

const routes = {
    // Exact path
    '/': Home,

    // Using named parameters, with last being optional
    '/author/:first/:last?': Author,

    // Wildcard parameter
    '/book/*': Book,

    // Catch-all
    // This is optional, but if present it must be the last
    '*': NotFound,
}
```

使用路由：

```html
<body>
    <Router {routes}/>
</body>
```



接收路由参数：

```js
<script>
	import {location, querystring} from 'svelte-spa-router'
</script>
<p>The current page is: {$location}</p>
<p>The querystring is: {$querystring}</p>
```

路由跳转：

声明式：

```html
<script>
import {link} from 'svelte-spa-router'
let myLink = "/book/456"
</script>
<a use:link={myLink}>The Biggest Princess</a>
```

导航式：

```js
import {push, pop, replace} from 'svelte-spa-router'

// The push(url) method navigates to another page, just like clicking on a link
push('/book/42')

// The pop() method is equivalent to hitting the back button in the browser
pop()

// The replace(url) method navigates to a new page, but without adding a new entry in the browser's history stack
// So, clicking on the back button in the browser would not lead to the page users were visiting before the call to replace()
replace('/book/3')
```

