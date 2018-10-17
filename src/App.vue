<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  watch:{
   $route:function(val,old){
       console.log("+++++++++++++++++++++++");
      console.log(val);
    }
  }
};
</script>

<style>
</style>
