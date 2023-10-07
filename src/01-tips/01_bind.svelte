<!-- 数据渲染 -->
<!-- img 标签-->
<script>
  let name = '小明';
  let src = "./vite.svg"
</script>

<main>
  hello world,

  {name.replace(/(.)(.)/, "$1_$2")}

  <img src="{src}" alt="">

</main>