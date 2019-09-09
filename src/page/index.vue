<!-- 首页 -->
<template>
  <el-container class="index_container">
    <el-header>
      <div class="index_title">北京易诚互动网络技术有限公司EMP文档</div>
    </el-header>
    <el-container>
      <el-aside>
        <el-menu
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          @select="addComponent"
        >
          <el-submenu :index="index+''" v-for="(item,index) in componentType" :key="index">
            <template slot="title">
              <i class="el-icon-menu" style="color:#c3d700"></i>
              <span>{{item.componenTypeName}}</span>
            </template>

            <el-menu-item
              v-for="(component,subIndex) in item.components"
              :key="subIndex"
              :index="index+'-'+component.componentId"
            >
              <i class="el-icon-setting" style="color:#475968"></i>
              <span slot="title">{{component.componentName}}</span>
            </el-menu-item>

            <el-menu-item :index="'addComponent-'+index">
              <i class="el-icon-plus"></i>
              <span slot="title">添加组件</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="addType">
            <i class="el-icon-plus"></i>
            <span slot="title">添加分类</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view :key="routekey"></router-view>
      </el-main>
    </el-container>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="dialogForm">
        <el-form-item :label="dialogFormSubTitle" :label-width="formLabelWidth">
          <el-input v-model="dialogForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <p class="index_tip">提示：添加的分类不会立刻出现在左侧列表中，需要添加对应得组件，才会显示，刚添加完分类时，请刷新一下添加页面，以更新分类下拉列表</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="closeDialog()">确 定</el-button>
      </div>
    </el-dialog>
    <el-divider></el-divider>
  </el-container>
</template>

<script>
import {
  queryComponentTypeAndComponent,
  addComponentType
} from "@/request/api.js";
import { debuglog } from "util";
export default {
  name: "index",
  data() {
    return {
      routekey: new Date().getTime(),
      dialogFormVisible: false,
      dialogTitle: "",
      dialogFormSubTitle: "",
      formLabelWidth: "120px",
      dialogForm: {
        name: "",
        id: ""
      },
      componentType: []
    };
  },

  components: {},

  computed: {},
  watch: {
    "$store.state.reflushObj": function() {
      this.queryComponentTypeAndComponent();
    }
  },

  mounted() {
    let _this = this;
    _this.queryComponentTypeAndComponent();
  },

  methods: {
    queryComponentTypeAndComponent() {
      let _this = this;
      queryComponentTypeAndComponent().then(res => {
        if (res.state == 0) {
          let data = res.data;
          _this.componentType = data;
        }
      });
    },
    addComponent(type) {
      let _this = this;
      let flag = type.indexOf("-") > 0;
      _this.routekey = new Date().getTime();
      // debugger;
      //是否是点击添加按钮
      if (!flag) {
        if (type == "addType") {
          _this.dialogTitle = "添加分类";
          _this.dialogFormSubTitle = "分类名称";
          _this.dialogFormVisible = true;
          _this.dialogForm.id = type;
        }
      } else {
        let prefix = type.substring(0, type.indexOf("-"));
        if (prefix == "addComponent") {
          //_this.dialogTitle = "添加组件";
          //_this.dialogFormSubTitle = "组件名称";
          let compForm = {
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
          _this.$router.push({
            name: "addDetail",
            params: { compForm: compForm, editFlag: false }
          });
        } else {
          //组件信息显示
          let id = type.substring(type.indexOf("-") + 1);
          // console.log("点击前的id");
          // console.log({id:id});
          console.log('newiD', id)
          // _this.$router.push({path:`/detail/${id}`});
          _this.$router.push({name:'detail',params:{id:id}});
        }
      }
    },
    closeDialog() {
      let _this = this;
      if (_this.dialogForm.id == "addType") {
        // componentType.id =_this.componentType[_this.componentType.length - 1].id + 1;
        //添加分类
        let componentType = {};
        let params = {};
        componentType.componenTypeName = _this.dialogForm.name;
        componentType.components = [];
        params.name = _this.dialogForm.name;
        addComponentType(params).then(res => {
          _this.$message({
            message: "添加成功！",
            type: "success"
          });
          //  _this.componentType.push(componentType);
        });
      } else {
        //添加组件
        let component = {};
        component.name = _this.dialogForm.name;
        _this.componentType[_this.dialogForm.id].components.push(component);
      }
      _this.dialogFormVisible = false;
      _this.dialogForm.name = "";
      _this.dialogForm.id = "";
    },
    handleOpen(key, keyPath) {
      //   console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //   console.log(key, keyPath);
    }
  }
};
</script>
<style>
.index_tip {
  color: red;
  margin-top: 20px;
  font-size: 14px;
}
.index_container {
  min-height: 800px;
}
.el-menu {
  border-right: none;
}
.index_title {
  line-height: 60px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.el-header {
  background-color: #c3d700;
  height: 200px;
  color: #475968;
}
.el-aside {
  width: 250px;
  border-right: 1px#DCDFE6 solid;
}
</style>