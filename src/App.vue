<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  /* 重置样式 */
  html,body,div,ul,li,h1,h2,h3,h4,h5,h6,p,dl,dt,dd,ol,form,input,textarea,th,td,select{ 
    margin: 0; 
    padding: 0; 
  } 
  html,body{ 
    min-height: 100%; 
  } 
  body{ 
    font-family: "Microsoft YaHei";
  } 
  h1,h2,h3,h4,h5,h6{
    font-weight:normal;
  } 
  ul,ol{ 
    list-style: none; 
  } 
  img{
    border: none; 
    vertical-align: middle; 
  } 
  a{ 
    text-decoration: none;
  } 
  table{ 
    border-collapse: collapse;
    table-layout: fixed; 
  } 
  input,textarea{ 
    outline: none; 
    border: none; 
  } 
  textarea{ 
    resize: none; 
    overflow: auto; 
  } 
  .clearfix{ 
    zoom: 1; 
  } 
  .clearfix:after{ 
    content: "."; 
    width: 0; 
    height: 0; 
    visibility: hidden; 
    display: block; 
    clear: both; 
    overflow:hidden; 
  } 
</style>
