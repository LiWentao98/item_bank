<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>选题</el-breadcrumb-item>
      <el-breadcrumb-item>我的选题</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-table ref="multipleTable" :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column type="expand" label="内容显示" width="100">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item>
                <span>{{ props.row.eNumber3 }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column prop="eNumber1" label="题目id" width="180" align="center"></el-table-column>
        <el-table-column prop="eNumber2" label="题型" width="180" align="center"></el-table-column>
        <el-table-column prop="eNumber3" label="题目内容（部分）" align="center"></el-table-column>
        <el-table-column prop="eNumber4" label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button
                    type="success"
                    icon="el-icon-edit"
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"
            >编辑
            </el-button>
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
      <!-- 编辑弹出框 -->
      <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
        <el-form ref="form" :model="form" label-width="70px">
          <el-table-column label="题目内容">
            <el-input type="textarea" rows="10" v-model="form.eNumber3"></el-input>
          </el-table-column>
        </el-form>
        <span slot="footer" class="dialog-footer">
                  <el-button @click="editVisible = false">取 消</el-button>
                  <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
      </el-dialog>

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
    name: 'STopic',
    data() {
      return {
        tableData: [{
          eNumber1: '1',
          eNumber2: '选择题',
          eNumber3: '有一段java 应用程序，它的主类名是a1，那么保存它的源文件名可以是——之后是站位，啊啊啊啊啊啊啊啊啊啊' +
            '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊（A)\n' +
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
      this.getTopicList()
    },
    methods: {
      getTopicList() {
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

  .el-table .cell {
    white-space: pre-line;
    white-space: pre;
  }
</style>