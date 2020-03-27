<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 审核管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>待审核试题</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table ref="multipleTable" :data="tableData" border style="width: 100%">
      <el-table-column type="selection" width="60"></el-table-column>
      <el-table-column prop="eNumber1" label="题目id" width="100" align="center"></el-table-column>
      <el-table-column prop="eNumber2" label="题型" width="200" align="center"></el-table-column>
      <el-table-column prop="eNumber3" label="题目内容" width="800" align="center"></el-table-column>
      <el-table-column prop="eNumber4" label="上传时间" width="200" align="center"></el-table-column>
      <el-table-column prop="eNumber6" label="操作" width="163" align="center">
        <template slot-scope="scope">
          <el-button
                  type="text"
                  icon="el-icon-delete"
                  class="red"
                  @click="handleDelete(scope.$index, scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "NRQuestionsList",
    data() {
      return {
        tableData: [{
          eNumber1: '1',
          eNumber2: '选择题',
          eNumber3: '面向对象程序设计的三个特征是_封装、多态、继承',
          eNumber4: '2020-01-18 16:30',
        }, {
          eNumber1: '2',
          eNumber2: '填空题',
          eNumber3: '面向对象程序设计的三个特征是_封装、多态、继承',
          eNumber4: '2020-01-18 16:00',
        }, {
          eNumber1: '3',
          eNumber2: '选择题',
          eNumber3: '面向对象程序设计的三个特征是_封装、多态、继承',
          eNumber4: '2020-01-18 15:00',
        }, {
          eNumber1: '4',
          eNumber2: '填空题',
          eNumber3: '面向对象程序设计的三个特征是_封装、多态、继承',
          eNumber4: '2020-01-18 14:00',
        },],
        multipleSelection: [],
        delList: [],
        editVisible: false,
        form: {},
      }
    },
    methods: {
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
    }
  }
</script>

<style scoped>
  .red {
    color: #ff0000;
  }

  .el-table .cell {
    white-space: pre-line;
    white-space: pre;
  }
</style>