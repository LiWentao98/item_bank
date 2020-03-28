<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>试卷</el-breadcrumb-item>
      <el-breadcrumb-item>我的试卷</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-table ref="multipleTable" :data="tableData" border stripe style="width: 100%">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="eNumber1" label="试卷id" width="100" align="center"></el-table-column>
        <el-table-column prop="eNumber2" label="试卷名称" width="700" align="center"></el-table-column>
        <el-table-column prop="eNumber3" label="组卷时间" width="180" align="center"></el-table-column>
        <el-table-column prop="eNumber4" label="组卷方式" align="center"></el-table-column>
        <el-table-column prop="eNumber5" label="操作" align="center">
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
    name: "header",
    data() {
      return {
        tableData: [{
          eNumber1: '1',
          eNumber2: '长江大学2020年研究生招生考试数据结构试卷',
          eNumber3: '2020-01-18 16:30',
          eNumber4: '自动组卷'
        }, {
          eNumber1: '2',
          eNumber2: '长江大学2020年研究生招生考试计算机网络试卷',
          eNumber3: '2020-01-18 16:00',
          eNumber4: '手动组卷',
        }],
        multipleSelection: [],
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
      this.getExamPaperList()
    },
    methods: {
      getExamPaperList() {
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
<style>
  .red {
    color: #ff0000;
  }

  /*.el-table .cell {*/
  /*white-space: pre-line;*/
  /*white-space: pre;*/
  /*}*/
</style>