<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>题库</el-breadcrumb-item>
      <el-breadcrumb-item>实时题库</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <div class="container">
        <div class="form-box">
          <el-form ref="form" :model="form" label-width="80px">
            <el-row>
              <el-col :span="11.8">
                <el-form-item label="试题id">
                  <el-input v-model="form.name1"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11.8">
                <el-form-item label="关键字">
                  <el-input v-model="form.name2"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11.8">
                <el-form-item label="题型类型">
                  <el-select v-model="form.region" placeholder="请选择">
                    <el-option key="bbk" label="选择题" value="bbk"></el-option>
                    <el-option key="xtc" label="填空题" value="xtc"></el-option>
                    <el-option key="imoo" label="解答题" value="imoo"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="form-box2">
              <el-form-item>
                <el-button type="primary" @click="onSubmit">检索结果</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
    </el-card>

    <el-card class="card2">
      <div align="center">检索结果</div>

      <el-table ref="multipleTable" :data="tableData" border stripe style="width: 100%">
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column type="expand" label="内容显示" width="100">
          <template v-slot="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item>
                <span>{{ props.row.eNumber3 }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column prop="eNumber1" label="题目id" width="100" align="center"></el-table-column>
        <el-table-column prop="eNumber2" label="题型" width="100" align="center"></el-table-column>
        <el-table-column prop="eNumber3" label="题目内容" align="center"></el-table-column>
        <el-table-column prop="eNumber4" label="组卷时间" width="200" align="center"></el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-row :gutter="20">
        <el-col :span="21">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page="queryInfo.pageNum" :page-sizes="[1, 2, 5]" :page-size="queryInfo.pageSize"
                         layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </el-col>

      </el-row>
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
        }, tableData: [{
          eNumber1: '1',
          eNumber2: '选择题',
          eNumber3: '有一段java 应用程序，它的主类名是a1，那么保存它的源文件名可以是a1.java',
          eNumber4: '2018-02-18'
        },
          {
            eNumber1: '2',
            eNumber2: '选择题',
            eNumber3: '有一段java 应用程序，它的主类名是a1，那么保存它的源文件名可以是a1.java',
            eNumber4: '2018-02-18'
          },
          {
            eNumber1: '3',
            eNumber2: '选择题',
            eNumber3: '有一段java 应用程序，它的主类名是a1，那么保存它的源文件名可以是a1.java',
            eNumber4: '2018-02-18'
          }],
        // 获取用户列表的参数对象
        queryInfo: {
          query: '',
          // 当前的页数
          pageNum: 1,
          // 当前每页显示多少条数据
          pageSize: 2
        },
        total: 0
      }
    },
    created() {
      this.getQuestionStoreList()
    },
    methods: {
      getQuestionStoreList() {
        this.total = this.tableData.length
      },
      onSubmit() {
        this.$message.success('检索成功！');
      },
      // 监听 pagesize 改变的事件
      handleSizeChange(newSize) {
        // console.log(newSize)
        this.queryInfo.pagesize = newSize
      },
      // 监听 页码值 改变的事件
      handleCurrentChange(newPage) {
        console.log(newPage)
        this.queryInfo.pageNum = newPage
      },
    }
  };
</script>
<style scoped>
  .form-box1 {
    width: 297px;
    position: relative;
    left: -18px;
  }

  .form-box2 {
    position: relative;
    left: 200px;
    top: 20px;
  }
</style>