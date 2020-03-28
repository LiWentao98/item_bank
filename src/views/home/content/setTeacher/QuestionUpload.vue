<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>试题</el-breadcrumb-item>
      <el-breadcrumb-item>上传试题</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <div class="container">
        <quill-editor style="height: 250px" ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
      </div>
      <el-form style="margin-top: 100px" ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="试题题型">
              <el-select v-model="form.region1" placeholder="请选择">
                <el-option key="bbk" label="选择题" value="bbk"></el-option>
                <el-option key="xtc" label="填空题" value="xtc"></el-option>
                <el-option key="imoo" label="解答题" value="imoo"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属章节">
              <el-select v-model="form.region2" placeholder="请选择">
                <el-option key="bbk" label="链表" value="bbk"></el-option>
                <el-option key="xtc" label="数组" value="xtc"></el-option>
                <el-option key="imoo" label="矩阵" value="imoo"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="试题难度">
              <el-select v-model="form.region3" placeholder="请选择">
                <el-option key="bbk" label="简单" value="bbk"></el-option>
                <el-option key="xtc" label="一般" value="xtc"></el-option>
                <el-option key="imoo" label="困难" value="imoo"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="知识点">
              <el-input v-model="form.region4"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="form3">
          <el-form-item label="试题答案">
            <el-input type="textarea" rows="5" v-model="form.region5" placeholder="请在此输入试题答案"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div class="form4">
        <el-button class="editor-btn" type="primary" @click="submit">保存</el-button>
        <el-button class="editor-btn" type="primary" @click="submit2">提交审核</el-button>
      </div>

    </el-card>
  </div>
</template>

<script>
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';
  import {quillEditor} from 'vue-quill-editor';

  export default {
    name: 'QuestionUpload',
    data: function () {
      return {
        content: '',
        editorOption: {
          placeholder: 'Hello World'
        },
        form: {
          region1: '',
          region2: '',
          region3: '',
          region4: '',
          region5: ''
        }
      }
    },
    components: {
      quillEditor
    },
    methods: {
      onEditorChange({editor, html, text}) {
        this.content = html;
      },
      submit() {
        console.log(this.content);
        this.$message.success('保存成功！');
      },
      submit2() {
        console.log(this.content);
        this.$message.success('提交成功！');
      }
    }
  }
</script>
<style scoped>
  .form1 {
    position: relative;
    left: 380px;
    top: -63px;
  }

  .form2 {
    position: relative;
    left: 380px;
    top: -63px;
    width: 300px;
  }

  .form3 {
    width: 680px;
  }

  .form4 {
    position: relative;
    left: 400px;
  }
</style>