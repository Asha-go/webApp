<template>
  <div class="service-container">
    
  </div>
</template>
<script>
export default {
  layout(context) {
    return context.isMobile ? "h5" : "default";
  },
};
</script>
<style lang="less" scoped>
.service-container {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #990000;
  padding: 2rem;
  .title {
    color: #990000;
    font-size: 2rem;
    text-align: center;
  }
  .text {
    margin-top: 2rem;
    line-height: 2.2rem;
    p {
      margin-bottom: 1rem;
    }
  }
}
</style>
