<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 题库
        </el-breadcrumb-item>
        <el-breadcrumb-item>实时题库</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card class="box-card">
      <div class="container">
        <div class="form-box">
          <el-form ref="form" :model="form" label-width="80px">
            <div class="form-box1">
              <el-form-item label="试题id">
                <el-input v-model="form.name1"></el-input>
              </el-form-item>
            </div>

            <el-form-item label="题型类型">
              <el-col :span="11.8">
                <el-select v-model="form.region" placeholder="请选择">
                  <el-option key="bbk" label="选择题" value="bbk"></el-option>
                  <el-option key="xtc" label="填空题" value="xtc"></el-option>
                  <el-option key="imoo" label="解答题" value="imoo"></el-option>
                </el-select>
              </el-col>
              <el-col :span="1.4">关键字</el-col>
              <el-col :span="11.8">
                <el-input v-model="form.name2"></el-input>
              </el-col>
            </el-form-item>


            <el-form-item label="检索结果">
              <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">检索结果</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'QuestionsStore',
    data() {
      return {
        form: {
          name1: '',
          name2: '',
          region: '',
        }
      };
    },
    methods: {
      onSubmit() {
        this.$message.success('检索成功！');
      }
    }
  };
</script>
<style scoped>
  .form-box1 {
    width: 297px;
  }
</style>