<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 试卷
        </el-breadcrumb-item>
        <el-breadcrumb-item>我的试卷</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card class="box-card">
      <el-table ref="multipleTable" :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column prop="eNumber1" label="试卷id" width="180" align="center"></el-table-column>
        <el-table-column prop="eNumber2" label="试卷名称" width="750" align="center"></el-table-column>
        <el-table-column prop="eNumber3" label="组卷时间" width="180" align="center"></el-table-column>
        <el-table-column prop="eNumber4" label="组卷方式" width="180" align="center"></el-table-column>
        <el-table-column prop="eNumber5" label="操作" width="180" align="center">
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
<style>
  .red {
    color: #ff0000;
  }

  .el-table .cell {
    white-space: pre-line;
    white-space: pre;
  }
</style>