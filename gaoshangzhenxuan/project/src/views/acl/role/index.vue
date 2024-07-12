<template>
  <el-card>
    <el-form :inline="true" class="form">
      <el-form-item label="职位搜索">
        <el-input placeholder="请你输入搜索职位关键字" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" :disabled="keyword ? false : true" @click="search">搜索</el-button>
        <el-button type="primary" size="default" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0;">
    <el-button type="primary" size="default" icon="Plus" @click="addRole">添加职位</el-button>
    <el-table border style="margin: 10px 0;" :data="allRole">
      <el-table-column type="index" align="center" label="#"></el-table-column>
      <el-table-column label="ID" align="center" prop="id"></el-table-column>
      <el-table-column label="职位名称" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
      <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="280px" align="center">
        <!-- @vue-ignore -->
        <template #="{ row, $index }">
          <el-button type="primary" size="small" icon="User" @click="setPermission(row)">分配权限</el-button>
          <el-button type="primary" size="small" icon="Edit" @click="updateRole(row)">编辑</el-button>
          <el-popconfirm :title="`你确定要删除${row.roleName}吗?`" width="260px" @confirm="removeRole(row.id)">
            <template #reference>
              <el-button type="primary" size="small" icon="Delete">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
      :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total" @current-change="getHasRole"
      @size-change="getHasRole()" />
  </el-card>
  <el-dialog v-model="dialogVisite" :title="RoleParams.id ? '更新职位' : '添加职位'">
    <el-form :model="RoleParams" :rules="rules" ref="form">
      <el-form-item label="职位名称" prop="roleName">
        <el-input placeholder="请你输入职位名称" v-model="RoleParams.roleName"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" size="default" @click="dialogVisite = false">取消</el-button>
      <el-button type="primary" size="default" @click="save">确定</el-button>
    </template>
  </el-dialog>
  <el-drawer v-model="drawer">
    <template #header>
      <h4>分配菜单与按钮的权限</h4>
    </template>
    <template #default>
      <el-tree ref="tree" style="max-width: 600px" :data="menuArr" show-checkbox node-key="id"
        :default-expanded-keys="[1, 2, 3]" :default-checked-keys="selectArr" :props="defaultProps" />
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="drawer = false">取消</el-button>
        <el-button type="primary" @click="handler">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue';
import { reqAllRoleList, reqAddOrUpdateRole, reqAllMenuList, reqSetPermission, reqRemoveRole } from '@/api/acl/role';
import type { RoleResponseData, Records, RoleData, MenuResponseData, MenuList } from '@/api/acl/role/type';
import useLayOutSettingStore from '@/store/modules/setting';
import { ElMessage } from 'element-plus';
let pageNo = ref<number>(1);
let pageSize = ref<number>(10);
let keyword = ref<string>('');
let allRole = ref<Records>([]);
let total = ref<number>(0);
let settingStore = useLayOutSettingStore();
let dialogVisite = ref<boolean>(false);
let RoleParams = reactive<RoleData>({
  roleName: ''
})
let form = ref<any>();
let drawer = ref<boolean>(false);
let menuArr = ref<MenuList>([]);
let selectArr = ref<number[]>([]);
let tree = ref<any>();
const getHasRole = async (pager = 1) => {
  pageNo.value = pager;
  let result: RoleResponseData = await reqAllRoleList(pageNo.value, pageSize.value, keyword.value);
  if (result.code == 200) {
    total.value = result.data.total;
    allRole.value = result.data.records;
  }
}
const search = () => {
  getHasRole();
  keyword.value = '';
}
const reset = () => {
  settingStore.refresh = !settingStore.refresh;
}
const addRole = () => {
  dialogVisite.value = true;
  Object.assign(RoleParams, {
    roleName: '',
    id: 0
  });
  nextTick(() => {
    form.value.clearValidate('roleName');
  })
}
const updateRole = (row: RoleData) => {
  dialogVisite.value = true;
  Object.assign(RoleParams, row);
  nextTick(() => {
    form.value.clearValidate('roleName');
  })
}
// @ts-ignore
const validatorRoleName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack();
  } else {
    callBack(new Error('职位名称至少有2位'));
  }
}
const rules = {
  roleName: [
    {
      required: true,
      trigger: 'blur',
      validator: validatorRoleName
    }
  ]
}
const save = async () => {
  await form.value.validate();
  let result: any = await reqAddOrUpdateRole(RoleParams);
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: RoleParams.id ? '更新成功' : '添加成功'
    });
    dialogVisite.value = false;
    getHasRole(RoleParams.id ? pageNo.value : 1);
  }
}
const filterSelectArr = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    if (item.select && item.level == 4) {
      initArr.push(item.id);
    }
    if (item.children && item.children.length > 0) {
      filterSelectArr(item.children, initArr);
    }
  });
  return initArr;
}
const setPermission = async (row: RoleData) => {
  drawer.value = true;
  Object.assign(RoleParams, row);
  let result: MenuResponseData = await reqAllMenuList((RoleParams.id as number));
  if (result.code == 200) {
    menuArr.value = result.data;
    selectArr.value = filterSelectArr(menuArr.value, []);
  }
}
const defaultProps = {
  children: 'children',
  label: 'name',
}
const handler = async () => {
  const roleId = (RoleParams.id as number);
  let arr = tree.value.getCheckedKeys();
  let arr1 = tree.value.getHalfCheckedKeys();
  let permissionId = arr.concat(arr1);
  let result: any = await reqSetPermission(roleId, permissionId);
  if (result.code == 200) {
    drawer.value = false;
    ElMessage({
      type: 'success',
      message: '分配权限成功'
    });
    window.location.reload();
  }
}
const removeRole = async (id: number) => {
  let result: any = await reqRemoveRole(id);
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    });
    getHasRole(allRole.value.length > 1 ? pageNo.value : pageNo.value - 1);
  }
}
onMounted(() => {
  getHasRole();
})
</script>

<style scoped>
.form {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>