<template>
  <div>{{message}}
    <el-button @click="upmess">sb</el-button>
  </div>

</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      message: "xiaohuihui"
    };
  },
  mounted: function() {
    this.message = "huihui";
  },
  methods: {
    upmess: function() {
      this.message = "huihui xiao";
    }
  }
};
</script>

<style>
</style>
