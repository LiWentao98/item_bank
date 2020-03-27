<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>消息管理</el-breadcrumb-item>
      <el-breadcrumb-item>通知列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row class="row_1" :gutter="20">
        <el-col :span="6">
          <el-input placeholder="搜索通知" v-model="queryInfo.query" clearable @clear="getMessageList">
            <el-button slot="append" icon="el-icon-search" @click="getMessageList"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- 分页区域 -->
      <el-pagination class="pagination_message" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="queryInfo.pageNum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>

      <!-- 通知列表区域 -->
      <el-table :data="messageList" stripe :cell-style="cellStyle">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="通知标题" prop="n_title"></el-table-column>
        <el-table-column label="发布时间" prop="publish_time"></el-table-column>
        <el-table-column label="发布者姓名" prop="name"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!--详情-->
            <el-button type="primary" size="mini" @click="showMessage(scope.row)">详情</el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini"
                       @click="removeMessageById(scope.row.n_id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-drawer
            :visible.sync="addDialogVisible"
            :with-header="false">

      <div class="draw_div_1" align="center">
        <span class="txt">{{showMessageList.n_title}}</span><br><br>
        <span class="txt">发布者：{{showMessageList.name}}</span>
      </div>
      <br>
      <!--段落区域-->
      <div>
        <p class="p_msg">{{showMessageList.n_content}}</p>
      </div>
      <!--尾部-->
      <div class="draw_div_2" align="right">发布时间：{{showMessageList.publish_time}}</div>
    </el-drawer>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 获取通知列表的参数对象
        queryInfo: {
          query: '',
          // 当前的页数
          pageNum: 1,
          // 当前每页显示多少条数据
          pageSize: 2
        },
        messageList: [
          {
            n_id: '1',
            n_title: '测试1',
            n_content: '这是测试1',
            publish_time: '2020-3-27 18:00',
            name: '超级管理员'
          },
          {
            n_id: '2',
            n_title: '测试2',
            n_content: '这是测试2',
            publish_time: '2020-3-27 18:15',
            name: '超级管理员'
          },
          {
            n_id: '3',
            n_title: '测试3',
            n_content: '这是测试3',
            publish_time: '2020-3-27 18:30',
            name: '超级管理员'
          },
          {
            n_id: '4',
            n_title: '测试4',
            n_content: '这是测试4',
            publish_time: '2020-3-27 19:00',
            name: '校级管理员'
          },
          {
            n_id: '5',
            n_title: '测试5',
            n_content: '这是测试五',
            publish_time: '2020-3-27 19:05',
            name: '校级管理员'
          }
        ],
        total: 0,
        // 控制添加用户对话框的显示与隐藏
        addDialogVisible: false,
        // 已选中的角色Id值
        selectedRoleId: '',
        showMessageList: {}
      }
    },
    created() {
      this.getMessageList()
    },
    methods: {
      cellStyle() {
        return 'font-size: 15px'
      },
      // 显示通知信息
      showMessage(cont) {
        this.addDialogVisible = true
        this.showMessageList = cont
      },
      getMessageList() {
        this.total = this.messageList.length
        // console.log(this.total)
      },
      // 监听 pagesize 改变的事件
      handleSizeChange(newSize) {
        // console.log(newSize)
        this.queryInfo.pageSize = newSize
        this.getMessageList()
      },
      // 监听 页码值 改变的事件
      handleCurrentChange(newPage) {
        // console.log(newPage)
        this.queryInfo.pageNum = newPage
        this.getMessageList()
      },
      // 根据Id删除对应的通知
      async removeMessageById(id) {
        // 弹框询问用户是否删除
        const confirmResult = await this.$confirm(
          '此操作将永久删除该通知, 是否继续?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).catch(err => err)

        // 如果用户确认删除，则返回值为字符串 confirm
        // 如果用户取消了删除，则返回值为字符串 cancel
        // console.log(confirmResult)
        if (confirmResult !== 'confirm') {
          return this.$message.info('已取消删除')
        }
        this.messageList.splice(id - 1, 1)
        this.$message.success('删除通知成功！')
      },

    }
  }
</script>

<style lang="less">
  .row_1, .pagination_message {
    margin-top: 1px;
    font-size: 20px;
    color: #3d3d3d;
    height: 50px;
    line-height: 30px;
    border-bottom: 1px solid #e0e0e0;
  }

  .cell {
    text-align: center;
  }

  .pagination_message {
    margin-top: 20px;
  }

  .p_msg {
    text-indent: 2em;
    line-height: 30px;
    font-size: 17px;
  }

  .txt {
    font-size: 20px;
  }

  .draw_div_2 {
    margin-top: 100px;
    margin-right: 10px;
  }
</style>
