<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>试题</el-breadcrumb-item>
      <el-breadcrumb-item>我的试题</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-table ref="multipleTable" :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="eNumber1" label="题目id" width="100" align="center"></el-table-column>
        <el-table-column prop="eNumber2" label="题型" width="100" align="center"></el-table-column>
        <el-table-column prop="eNumber3" label="题目内容"  align="center"></el-table-column>
        <el-table-column prop="eNumber4" label="上传时间" width="200" align="center"></el-table-column>
        <el-table-column prop="eNumber5" label="状态" width="100" align="center"></el-table-column>
        <el-table-column prop="eNumber6" label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    @click="handleDelete(scope.$index, scope.row)"
            >删除
            </el-button>
          </template>
        </el-table-column>
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
    name: "MyQuestions",
    data() {
      return {
        tableData: [{
          eNumber1: '1',
          eNumber2: '选择题',
          eNumber3: '面向对象程序设计的三个特征是_封装、多态、继承',
          eNumber4: '2020-01-18 16:30',
          eNumber5: '未完成'
        }, {
          eNumber1: '2',
          eNumber2: '填空题',
          eNumber3: '面向对象程序设计的三个特征是_封装、多态、继承',
          eNumber4: '2020-01-18 16:00',
          eNumber5: '待审核'
        }, {
          eNumber1: '3',
          eNumber2: '选择题',
          eNumber3: '面向对象程序设计的三个特征是_封装、多态、继承',
          eNumber4: '2020-01-18 15:00',
          eNumber5: '未通过'
        }, {
          eNumber1: '4',
          eNumber2: '填空题',
          eNumber3: '面向对象程序设计的三个特征是_封装、多态、继承',
          eNumber4: '2020-01-18 14:00',
          eNumber5: '通过'
        },],
        multipleSelection: [],
        delList: [],
        editVisible: false,
        form: {},
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
      this.getMyQuestionList()
    },
    methods: {
      getMyQuestionList() {
        this.total = this.tableData.length
      },
      handleDelete(index, row) {
        // 二次确认删除
        this.$confirm('确定要删除吗？', '提示', {
          type: 'warning'
        })
          .then(() => {
            this.$message.success('删除成功');
            this.tableData.splice(index, 1);
          })
          .catch(() => {
          });
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
  }
</script>

<style scoped>
  .red {
    color: #ff0000;
  }

  /*.el-table .cell {*/
  /*white-space: pre-line;*/
  /*white-space: pre;*/
  /*}*/
</style>