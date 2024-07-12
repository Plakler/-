<template>
  <div>
    <el-card class="box-card">
      <el-button type="success" size="default" icon="Plus" @click="addTrademark"
        v-has="`btn.Trademark.add`">添加品牌</el-button>
      <el-table style="margin: 10px 0;" border :data="trademarkArr">
        <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
        <el-table-column label="品牌名称" prop="tmName">
        </el-table-column>
        <el-table-column label="品牌LOGO">
          <!-- @vue-ignore -->
          <template #="{ row, $index }">
            <img :src="row.logoUrl" style="width: 100px;height: 100px;">
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <!-- @vue-ignore -->
          <template #="{ row, $index }">
            <!-- @vue-ignore -->
            <el-button v-has="`btn.Trademark.update`" type="primary" size="small" icon="Edit"
              @click="$event => updateTrademark(row)"></el-button>
            <el-popconfirm :title="`您确定要删除${row.tmName}吗？`" width="250px" icon="Delete" icon-color="red"
              @confirm="removeTrademark(row.id)">
              <template #reference>
                <el-button v-has="`btn.Trademark.remove`" type="danger" size="small" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination @current-change="getHasTrademark" @size-change="sizeChange" v-model:current-page="pageNo"
        v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" :background="true"
        layout="prev, pager, next, jumper,->,sizes, total" :total="total" />
    </el-card>
    <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'">
      <el-form style="width: 80%;" :model="trademarkParams" :rules="rules" ref="formRef">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">

          <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" size="default" @click="cancel">取消</el-button>
        <el-button type="primary" size="default" @click="confirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { reqHasTrademark, reqAddOrUpdateTrademark, reqDeleteTrademark } from '@/api/product/trademark';
import { Records, TradeMarkResponseData, TradeMark } from '@/api/product/trademark/type';
import { ElMessage, UploadProps } from 'element-plus';
let pageNo = ref<number>(1);
let limit = ref<number>(3);
let total = ref<number>(0);
let trademarkArr = ref<Records>([]);
let dialogFormVisible = ref<boolean>(false);
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: ''
});
let formRef = ref();
const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager;
  let result: TradeMarkResponseData = await reqHasTrademark(pageNo.value, limit.value);
  if (result.code == 200) {
    total.value = result.data.total;
    trademarkArr.value = result.data.records;
  }
}
onMounted(() => {
  getHasTrademark();
});
const sizeChange = () => {
  getHasTrademark();
}
const addTrademark = () => {
  dialogFormVisible.value = true;
  //我修改了id变为undefined后方便界面正常显示添加品牌
  trademarkParams.id = undefined;
  trademarkParams.tmName = '';
  trademarkParams.logoUrl = '';
  formRef.value?.clearValidate('tmName');
  formRef.value?.clearValidate('logoUrl');
}
const updateTrademark = (row: TradeMark) => {
  dialogFormVisible.value = true;
  // trademarkParams.id = row.id;
  // trademarkParams.tmName = row.tmName;
  // trademarkParams.logoUrl = row.logoUrl;
  Object.assign(trademarkParams, row);
  formRef.value?.clearValidate('tmName');
  formRef.value?.clearValidate('logoUrl');
}
const cancel = () => {
  dialogFormVisible.value = false;
}
const confirm = async () => {
  await formRef.value.validate();
  let result: any = await reqAddOrUpdateTrademark(trademarkParams);
  if (result.code == 200) {
    dialogFormVisible.value = false;
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功'
    });
    getHasTrademark(trademarkParams.id ? pageNo.value : 1);
  } else {
    dialogFormVisible.value = false;
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败'
    });
  }
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type == 'image/png' || rawFile.type == 'image/jpeg' || rawFile.type == 'image/gif') {
    if (rawFile.size / 1024 / 1024 < 0.03) {
      return true;
    } else {
      ElMessage({
        type: 'error',
        message: "上传文件大小必须小于30kb"
      })
      return false;
    }
  } else {
    ElMessage({
      type: 'error',
      message: "上传文件格式必须为PNG或JPEG或GIF"
    })
    return false;
  }
}
//@ts-ignore
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  trademarkParams.logoUrl = response.data;
  formRef.value.clearValidate('logoUrl');
}
//@ts-ignore
const validatorTmName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack();
  } else {
    callBack(new Error('品牌名称位数必须大于或等于两位'));
  }
}
//@ts-ignore
const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
  if (value) {
    callBack();
  } else {
    callBack(new Error('LOGO图片必须上传'));
  }
}
const rules = {
  tmName: [
    {
      required: true,
      trigger: 'blur',
      validator: validatorTmName
    }
  ],
  logoUrl: [
    {
      required: true,
      validator: validatorLogoUrl
    }
  ]
}
const removeTrademark = async (id: number) => {
  let result = await reqDeleteTrademark(id);
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除品牌成功'
    });
    getHasTrademark(trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1);
  } else {
    ElMessage({
      type: 'error',
      message: '删除品牌失败'
    })
  }
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>