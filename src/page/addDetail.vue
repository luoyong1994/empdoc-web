<!-- api详情 -->
<template>
  <div>
    <ul class="detail_ul">
      <li>
        <el-card shadow="hover">
          <div slot="header">
            <span>所属类别</span>
          </div>
          <div class="text item">
            <el-select v-model="compForm.type" filterable placeholder="请选择组件类别">
              <el-option
                v-for="item in optionTypes"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-card>
      </li>
      <li>
        <el-card shadow="hover">
          <div slot="header">
            <span>组件名称</span>
          </div>
          <div class="text item">
            <el-input v-model="compForm.name" placeholder="请输入内容"></el-input>
          </div>
        </el-card>
      </li>
      <li>
        <el-card shadow="hover">
          <div slot="header">
            <span>组件id</span>
          </div>
          <div class="text item">
            <el-input v-model="compForm.componentId" placeholder="请输入内容"></el-input>
          </div>
        </el-card>
      </li>
      <li>
        <el-card shadow="hover">
          <div slot="header">
            <span>功能简介</span>
          </div>
          <div class="text item">
            <el-input type="textarea" v-model="compForm.introduce"></el-input>
          </div>
        </el-card>
      </li>
      <li>
        <el-card shadow="hover">
          <div slot="header">
            <span>实现类</span>
          </div>
          <div class="text item">
            <el-input v-model="compForm.impl" placeholder="请输入内容"></el-input>
          </div>
        </el-card>
      </li>
      <li>
        <el-card shadow="hover">
          <div slot="header">
            <span>使用方法</span>
          </div>
          <div class="text item">
            <el-input v-model="compForm.basicUse" placeholder="请输入内容"></el-input>
          </div>
        </el-card>
      </li>
      <li>
        <el-card shadow="hover">
          <div slot="header">
            <span>输入参数</span>
            <el-button
              style="float: right; padding: 3px 0;margin-right:90px;"
              type="text"
              @click="updateInputputParam()"
            >添加</el-button>
          </div>
          <div class="text item">
            <el-table :data="compForm.inputParams" border style="width: 100%">
              <el-table-column type="index" width="50"></el-table-column>
              <el-table-column prop="desc" label="字段描述" width="180"></el-table-column>
              <el-table-column prop="field" label="数据域" width="180"></el-table-column>
              <el-table-column prop="isMust" label="是否必输" width="180"></el-table-column>
              <el-table-column prop="nonte" label="备注"></el-table-column>
              <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow(scope.$index, compForm.inputParams)"
                    type="text"
                    size="small"
                  >移除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </li>
      <li>
        <el-card shadow="hover">
          <div slot="header">
            <span>输出参数</span>
            <el-button
              style="float: right; padding: 3px 0;margin-right:90px;"
              type="text"
              @click="updateOutputParam()"
            >添加</el-button>
          </div>
          <div class="text item">
            <el-table :data="compForm.outputParams" border style="width: 100%">
              <el-table-column type="index" width="50"></el-table-column>
              <el-table-column prop="desc" label="字段描述" width="180"></el-table-column>
              <el-table-column prop="field" label="数据域" width="180"></el-table-column>
              <el-table-column prop="isMust" label="是否必输" width="180"></el-table-column>
              <el-table-column prop="nonte" label="备注"></el-table-column>
              <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow(scope.$index, compForm.outputParams)"
                    type="text"
                    size="small"
                  >移除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </li>
      <li>
        <el-card shadow="hover">
          <div slot="header">
            <span>返回值</span>
          </div>
          <div class="text item">
            <el-input v-model="compForm.result" placeholder="请输入内容"></el-input>
          </div>
        </el-card>
      </li>
      <li>
        <el-card shadow="hover">
          <div slot="header">
            <span>注意事项</span>
          </div>
          <div class="text item">
            <el-input type="textarea" v-model="compForm.notices" placeholder="请输入内容"></el-input>
          </div>
        </el-card>
      </li>
    </ul>
    <div class="addDetail_button">
      <el-row>
        <el-col :span="12">
          <el-button type="primary" @click="addComponent()">提交</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="info" @click="goBack()">返回</el-button>
        </el-col>
      </el-row>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="dialogForm">
        <el-form-item label="字段描述" :label-width="formLabelWidth">
          <el-input v-model="dialogForm.desc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数据域" :label-width="formLabelWidth">
          <el-input v-model="dialogForm.field" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否必输" :label-width="formLabelWidth">
          <el-radio-group v-model="dialogForm.isMust">
            <el-radio-button label="是" style="margin-right:20px"></el-radio-button>
            <el-radio-button label="否"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="dialogForm.nonte" autocomplete="off" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="closeDialog()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addComponent,
  queryComponentTypeList,
  updateComponent
} from "@/request/api.js";
export default {
  data() {
    return {
      editFlag: false,
      optionTypes: [],
      dialogTitle: "",
      formLabelWidth: "120px",
      dialogForm: {
        desc: "",
        field: "",
        isMust: "否",
        nonte: "",
        type: "" //输入还是输出
      },
      dialogFormVisible: false,
      // compForm:{}
      compForm: {
        type: "",
        name: "",
        componentId: "",
        introduce: "",
        impl: "",
        basicUse: "",
        inputParams: [],
        outputParams: [],
        result: "",
        notices: ""
      }
    };
  },

  components: {},
  watch: {},

  computed: {},

  mounted() {
    let _this = this;
    //内容渲染
    let compForm = _this.$route.params.compForm;
    _this.editFlag = _this.$route.params.editFlag;
    _this.$set(this, "compForm", compForm);
    //类型渲染
    queryComponentTypeList().then(res => {
      _this.optionTypes = res.data;
    });
  },

  methods: {
    addComponent() {
      let _this = this;
      let params = _this.compForm;
      if (!params.inputParams) {
        params.inputParams = [];
      }
      if (!params.outputParams) {
        params.outputParams = [];
      }
      if (_this.editFlag) {
        updateComponent(params).then(res => {
          if (res.state == 0) {
            _this.$message({
              message: "更新成功！",
              type: "success"
            });
            _this.compForm = {
              type: "",
              name: "",
              componentId: "",
              introduce: "",
              impl: "",
              basicUse: "",
              inputParams: [],
              outputParams: [],
              result: "",
              notices: ""
            };
            _this.editFlag = false;
          } else {
            _this.$message({
              message: "更新失败,请联系管理员!",
              type: "error"
            });
          }
        });
      } else {
        addComponent(params).then(res => {
          if (res.state == 0) {
            _this.$message({
              message: "添加成功！",
              type: "success"
            });
            _this.compForm = {
              type: "",
              name: "",
              componentId: "",
              introduce: "",
              impl: "",
              basicUse: "",
              inputParams: [],
              outputParams: [],
              result: "",
              notices: ""
            };
            _this.$store.dispatch("reflushObj", params);
          } else {
            _this.$message({
              message: "添加失败,请联系管理员!",
              type: "error"
            });
          }
        });
      }
    },
    goBack() {
      let _this = this;
      _this.$router.go(-1);
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    updateOutputParam() {
      var _this = this;
      _this.dialogFormVisible = true;
      _this.dialogForm.type = "1";
      _this.dialogTitle = "请填写输出字段参数信息";
    },
    updateInputputParam() {
      var _this = this;
      _this.dialogFormVisible = true;
      _this.dialogForm.type = "2";
      _this.dialogTitle = "请填写输入字段参数信息";
    },
    closeDialog() {
      let _this = this;
      debugger
      _this.dialogFormVisible = false;
      let operationType = _this.dialogForm.type;
      if (operationType == 2) {
        if (!_this.compForm.inputParams) {
          _this.compForm.inputParams = [];
        }
        _this.compForm.inputParams.push(_this.dialogForm);
      } else {
        if (!_this.compForm.outputParams) {
          _this.compForm.outputParams = [];
        }
        _this.compForm.outputParams.push(_this.dialogForm);
      }
      _this.dialogForm = {
        desc: "",
        field: "",
        isMust: "否",
        nonte: "",
        type: ""
      };
    }
  }
};
</script>
<style>
.addDetail_button {
  width: 240px;
  margin: 12px auto;
}
.detail_ul > li {
  margin-top: 5px;
  margin-bottom: 5px;
  list-style: none;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>