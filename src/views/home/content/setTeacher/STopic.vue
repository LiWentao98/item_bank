<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 选题
        </el-breadcrumb-item>
        <el-breadcrumb-item>我的选题</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card class="box-card">
      <el-table ref="multipleTable" :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column prop="eNumber1" label="题目id" width="180" align="center"></el-table-column>
        <el-table-column prop="eNumber2" label="题型" width="180" align="center"></el-table-column>
        <el-table-column prop="eNumber3" label="题目内容" width="922" align="center"></el-table-column>
        <el-table-column prop="eNumber4" label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
                    type="text"
                    icon="el-icon-edit"
                    @click="handleEdit(scope.$index, scope.row)"
            >编辑
            </el-button>
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
      <!-- 编辑弹出框 -->
      <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
        <el-form ref="form" :model="form" label-width="70px">
          <el-table-column label="题目内容">
            <el-input v-model="form.eNumber3"></el-input>
          </el-table-column>
        </el-form>
        <span slot="footer" class="dialog-footer">
                  <el-button @click="editVisible = false">取 消</el-button>
                  <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
  export default {
    name: 'STopic',
    data() {
      return {
        tableData: [{
          eNumber1: '1',
          eNumber2: '选择题',
          eNumber3: '有一段java 应用程序，它的主类名是a1，那么保存它的源文件名可以是（A)\n' +
            'A a1.java      B a1.class      C a1      D 都对'
        }, {
          eNumber1: '2',
          eNumber2: '填空题',
          eNumber3: '面向对象程序设计的三个特征是_封装、多态、继承'
        }],
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
      // 编辑操作
      handleEdit(index, row) {
        this.idx = index;
        this.form = row;
        this.editVisible = true;
      },
      // 保存编辑
      saveEdit() {
        this.editVisible = false;
        this.$message.success(`修改第 ${this.idx + 1} 行成功`);
        this.$set(this.tableData, this.idx, this.form);
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