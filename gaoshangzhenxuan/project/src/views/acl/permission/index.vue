<template>
  <el-table :data="PermisstionArr" style="width: 100%; margin-bottom: 20px" row-key="id" border>
    <el-table-column label="名称" prop="name"></el-table-column>
    <el-table-column label="权限值" prop="code"></el-table-column>
    <el-table-column label="修改时间" prop="updateTime"></el-table-column>
    <el-table-column label="操作">
      <!-- @vue-ignore -->
      <template #="{ row, $index }">
        <el-button @click="addPermission(row)" type="primary" size="small" :disabled="row.level == 4 ? true : false">{{
          row.level == 3 ? '添加功能' :
            '添加菜单'
        }}</el-button>
        <el-button @click="updatePermission(row)" type="primary" size="small"
          :disabled="row.level == 1 ? true : false">编辑</el-button>
        <el-popconfirm :title="`你确定要删除${row.name}吗?`" width="260px" @confirm="removeMenu(row.id)">
          <template #reference>
            <el-button type="primary" size="small" :disabled="row.level == 1 ? true : false">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="dialogVisible" :title="menuData.id ? '更新菜单' : '添加菜单'">
    <el-form>
      <el-form-item label="名称">
        <el-input placeholder="请你输入菜单名称" v-model="menuData.name"></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-input placeholder="请你输入权限数值" v-model="menuData.code"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { reqAllPermission, reqAddOrUpdateMenu, reqRemoveMenu } from '@/api/acl/menu';
import type { PermissionResponseData, PermissionList, Permission, MenuParams } from '@/api/acl/menu/type';
import { ElMessage } from 'element-plus';
let PermisstionArr = ref<PermissionList>([]);
let dialogVisible = ref<boolean>(false);
let menuData = reactive<MenuParams>({
  code: "",
  level: 0,
  name: "",
  pid: 0
})
const getHasPermissoion = async () => {
  let result: PermissionResponseData = await reqAllPermission();
  if (result.code == 200) {
    PermisstionArr.value = result.data;

  }
}
const addPermission = (row: Permission) => {
  Object.assign(menuData, {
    id: 0,
    code: "",
    level: 0,
    name: "",
    pid: 0
  })
  dialogVisible.value = true;
  menuData.level = row.level + 1;
  menuData.pid = (row.id as number);
}
const updatePermission = (row: Permission) => {
  dialogVisible.value = true;
  Object.assign(menuData, row);
}
const save = async () => {
  let result: any = await reqAddOrUpdateMenu(menuData);
  if (result.code == 200) {
    dialogVisible.value = false;
    ElMessage({
      type: 'success',
      message: menuData.id ? '更新成功' : '添加成功'
    })
    getHasPermissoion();
  }
}
const removeMenu = async (id: number) => {
  let result = await reqRemoveMenu(id);
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    });
    getHasPermissoion();
  }
}
onMounted(() => {
  getHasPermissoion();
})
</script>

<style scoped></style>