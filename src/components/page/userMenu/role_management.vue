<template>
    <div class="table"     v-loading="loading"
    element-loading-text="拼命加载中">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="create" class="handle-del mr10" @click="createUser">创建用户</el-button>
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="username" label="姓名" sortable width="120">
                </el-table-column>
                <el-table-column prop="user_code" label="工号" sortable width="150">
                </el-table-column>
                <el-table-column prop="user_phone" label="手机号码" :formatter="formatter">
                </el-table-column>
                <el-table-column prop="user_status" label="人员状态" :formatter="formatter">
                    <template slot-scope="scope">
                        <span :style="scope.row.user_status==1?'color:green':'color:red'">
                            {{scope.row.user_status==1?'在职':'离职'}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="is_active" label="是否可用" :formatter="formatter">
                    <template slot-scope='scope'>
                        <span :style="scope.row.is_active==1?'color:green':'color:red'">
                            {{scope.row.is_active==1?'可用':'不可用'}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" @size-change="handleSizeChange" 
                layout="sizes, prev, pager, next, jumper" :page-sizes="[5, 10, 15, 20, 30, 50]" :total="pageInfo.total_page" :page-size="pageInfo.page_size">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="姓名" prop="username">
                    <el-input v-model="form.username" ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="工号" prop="user_code">
                    <el-input v-model="form.user_code"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="user_phone">
                    <el-input v-model="form.user_phone" type="tel"></el-input>
                </el-form-item>
                <el-form-item label="人员状态" >
                    <el-radio-group v-model="form.user_status">
                        <el-radio :label="1">在职</el-radio>
                        <el-radio :label="0">离职</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否可用">
                    <el-radio-group v-model="form.is_active">
                        <el-radio :label="true">可用</el-radio>
                        <el-radio :label="false">不可用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.email" type="email"></el-input>
                </el-form-item>                
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: "basetable",
  data() {
    return {
      loading: true,
      tableData: [],
      cur_size: 20,
      cur_page: 1,
      multipleSelection: [],
      select_word: "",
      del_list: [],
      editVisible: false,
      delVisible: false,
      userCreateType: "", // create:创建用户      updata:更新用户数据
      form: {
        username: "cjh12",
        password: "chenjunhui",
        user_code: "170711140",
        user_phone: "18574791277",
        user_status: 1,
        is_active: false,
        email: "1126509225@qq.com"
      },
      row: {},
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        user_code: [{ required: true, message: "请输入工号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      pageInfo: {
        total_page: 1,
        page_size: 20
      }
    };
  },
  created() {
    this.getData();
  },
  computed: {
    data() {
      return this.tableData.filter(d => {
        let is_del = false;
        for (let i = 0; i < this.del_list.length; i++) {
          if (d.name === this.del_list[i].name) {
            is_del = true;
            break;
          }
        }
        if (!is_del) {
          if (
            d.address.indexOf(this.select_cate) > -1 &&
            (d.name.indexOf(this.select_word) > -1 ||
              d.address.indexOf(this.select_word) > -1)
          ) {
            return d;
          }
        }
      });
    }
  },
  methods: {
    // 调整页面数量
    handleSizeChange(val) {
      this.cur_size = val;
      this.getData();
    },
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
    },
    // 获取 数据
    getData() {
      let that = this;
      that.loading = true;
      this.$fetch(that.$path + "users/users/", {
        search: that.select_word,
        page: that.cur_page,
        size: that.cur_size
      }).then(res => {
        that.loading = false;
        this.tableData = res.dataInfo.listData;
        this.pageInfo = res.dataInfo.pageInfo;
      });
    },
    // 查询
    search() {
      this.cur_page = 1;
      this.getData();
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleEdit(row) {
      this.userCreateType = "updata";
      this.row = row;

      this.form = {
        id: row.id,
        username: row.username,
        password: row.password,
        user_code: row.user_code,
        user_status: row.user_status,
        is_active: row.is_active,
        user_phone: row.user_phone,
        email: row.email
      };
      console.log("--------------------");
      console.log(this.form);

      this.editVisible = true;
    },
    handleDelete(row) {
      this.row = row;
      this.delVisible = true;
    },
    // 创建用户
    createUser() {
      this.userCreateType = "create";
      if (this.$refs.form){
        this.$refs.form.resetFields();

      }
      this.editVisible = true;
    },
    // 批量删除
    delAll() {
      let that = this
      const length = this.multipleSelection.length;
      let delList = [];
      for (let i = 0; i < length; i++) {
        delList.push(this.multipleSelection[i].id);
      }
      console.log(delList)
      that.loading = true;
      this.$post(that.$path + "users/users/", {
        ids:delList
      }).then(res => {
        that.loading = false;
        this.getData()
      }).catch(res=>{
      });
      this.multipleSelection = [];

    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    // 修改/创建
    saveEdit() {
      let that = this;
      this.$refs["form"].validate(async valid => {
        if (valid) {
          if (this.userCreateType === "create") {
            // 创建用户
            that.loading = true;
            console.log(that.form);
            let userInfo = await this.$post(
              that.$path + "users/users/",
              that.form
            );
            console.log("-----+++++++++");

            console.log(userInfo);
            if (userInfo.statusCode == 200) {
              this.$message.success(`创建用户` + that.form.username + "成功！");
            } else {
              this.$message.error(`创建用户` + that.form.username + "失败！");
            }
            that.loading = false;
          } else if (this.userCreateType === "updata") {
            // 修改用户
            that.loading = true;
            let userInfo = await this.$put(
              that.$path + "users/users/" + that.form.id + "/",
              that.form
            );
            console.log("-----++++++------+++");

            console.log(userInfo);
            if (userInfo.statusCode == 200) {
              this.$message.success(`修改用户` + that.form.username + "成功！");
            } else {
              this.$message.error(
                `修改用户` + that.form.username + "失败！" + userInfo.message
              );
            }
            that.loading = false;
          }
          that.getData();
          this.$set(this.tableData, this.idx, this.form);
          this.editVisible = false;
        } else {
          alert("cuowu");
        }
      });
    },
    // 确定删除
    async deleteRow() {
      let that = this;
      that.loading = true;
      let listData = await this.$del(
        that.$path + "users/users/" + that.row.id + "/"
      );
      that.loading = false;
      that.getData();
      if (listData.statusCode == 204) {
        this.$message.success("删除成功!");
      } else {
        this.$message.success("删除失败！" + listData.message);
      }

      this.delVisible = false;
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
</style>
