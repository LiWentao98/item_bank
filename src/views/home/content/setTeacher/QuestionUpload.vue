<template>
  <div class="question_upload">
    <span>试题录入</span>
  </div>
</template>

<script>
  export default {
    name: "QuestionUpload",
    data() {
      return {
        question_content:''
      }
    }
  }
</script>

<style scoped>
  .question_upload {
    width: 95%;
    margin: 0 auto;
    text-align: center;
  }
  .question {
    width: 100%;
    height: 250px;
    margin-top: 2px;
    padding: 5px;
  }
  .tags {
    width: 100%;
    border: solid 1px #8695a7;
    margin-top: 5px;
    font-size: 14px;
  }
  .tags tr {
    height: 35px;
  }
  .tags select,input {
    width: 140px;
    font-size: 14px;
    padding-bottom: 1px;
  }
  .buttons {
    width: 100%;
    margin: 10px auto 15px auto;
    display: flex;
  }
  .buttons button {
    height: 30px;
    margin: 0 5px;
    flex: 1;
    font-size: 13px;
  }
</style>
