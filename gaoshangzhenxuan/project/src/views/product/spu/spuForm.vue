<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input placeholder="请你输入SPU名称" v-model="SpuParams.spuName"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌" class="demo-form-inline">
      <el-select v-model="SpuParams.tmId">
        <!-- @vue-ignore -->
        <el-option v-for="(item, index) in allTradeMark" :key="item.id" :label="item.tmName"
          :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input type="textarea" placeholder="请你输入SPU描述" v-model="SpuParams.description"></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <!-- 我将imgList改为(imgList as UploadUserFile[]) -->
      <!-- @vue-ignore -->
      <el-upload v-model:file-list="imgList" action="/api/admin/product/fileUpload" list-type="picture-card"
        :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="handlerUpload">
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%;height: 100%;" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性" class="demo-form-inline">
      <el-select v-model="saleAttrIdAndValueName"
        :placeholder="unSelectSaleAttr.length ? `尚未选择${unSelectSaleAttr.length}个` : '无'">
        <!-- 我给item.name改为(item.name as string) -->
        <!-- @vue-ignore -->
        <el-option :value="`${item.id}:${item.name}`" v-for="(item, index) in unSelectSaleAttr" :key="item.id"
          :label="(item.name as string)"></el-option>
      </el-select>
      <el-button @click="addSaleAttr" :disabled="saleAttrIdAndValueName ? false : true" type="success" size="default"
        icon="Plus" style="margin-left: 10px;">添加属性</el-button>
      <el-table border style="margin: 10px 0" :data="saleAttr">
        <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
        <el-table-column label="销售属性名字" width="120px" prop="saleAttrName"></el-table-column>
        <el-table-column label="销售属性值">
          <!-- @vue-ignore -->
          <template #="{ row, $index }">
            <!-- 我改为了(item,index) -->
            <el-tag @close="row.spuSaleAttrValueList.splice(index, 1)" style="margin: 0 5px"
              v-for="(item, index) in row.spuSaleAttrValueList" :key="item.id" closable>
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input @blur="toLook(row)" v-model="row.saleAttrValue" v-if="row.flag == true" placeholder="请输入属性值"
              size="small" style="width: 100px;"></el-input>
            <el-button @click="toEdit(row)" v-else type="success" size="small" icon="Plus" round></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <!-- @vue-ignore -->
          <template #="{ row, $index }">
            <el-button type="danger" size="small" icon="Delete" @click="saleAttr.splice($index, 1)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button :disabled="saleAttr.length > 0 ? false : true" type="primary" size="default"
        @click="save">保存</el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { SpuData } from '@/api/product/spu/type';
import { reqAllTradeMark, reqSpuImageList, reqSpuHasSaleAttr, reqAllSaleAttr, reqAddOrUpdateSpu } from '@/api/product/spu';
import type { SaleAttrValue, HasSaleAttr, SaleAttr, SpuImg, Trademark, AllTradeMark, SpuHasImg, SaleAttrResponseData, HasSaleAttrResponseData } from '@/api/product/spu/type';
import { ElMessage, UploadUserFile } from 'element-plus';
let $emit = defineEmits(['changeScene']);
let allTradeMark = ref<Trademark[]>([]);
let imgList = ref<SpuImg[]>([]);
let saleAttr = ref<SaleAttr[]>([]);
let allSaleAttr = ref<HasSaleAttr[]>([]);
let dialogVisible = ref<boolean>(false);
let dialogImageUrl = ref<string>('');
let SpuParams = ref<SpuData>({
  category3Id: "",
  spuName: "",
  description: "",
  tmId: "",
  spuImageList: [],
  spuSaleAttrList: []
});
let unSelectSaleAttr = computed(() => {
  let unSelectArr = allSaleAttr.value.filter(item => {
    return saleAttr.value.every(item1 => {
      return item.name != item1.saleAttrName;
    });
  })
  return unSelectArr;
});
let saleAttrIdAndValueName = ref<string>('')
const cancel = () => {
  $emit('changeScene', { flag: 0, params: 'update' });
}
const initHasSpuData = async (spu: SpuData) => {
  SpuParams.value = spu;
  let result: AllTradeMark = await reqAllTradeMark();
  let result1: SpuHasImg = await reqSpuImageList(spu.id as number);
  let result2: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number);
  let result3: HasSaleAttrResponseData = await reqAllSaleAttr();
  allTradeMark.value = result.data;
  imgList.value = result1.data.map(item => {
    return {
      name: item.imgName,
      url: item.imgUrl
    }
  })
  saleAttr.value = result2.data;
  allSaleAttr.value = result3.data;
}
const handlePictureCardPreview = (file: any) => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
}
const handleRemove = () => {

}
const handlerUpload = (file: any) => {
  if (file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif') {
    if (file.size / 1024 / 1024 < 3) {
      return true;
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件必须小于3M'
      })
      return false;
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件必须为PNG或JPG或GIF格式'
    })
    return false;
  }
}
const addSaleAttr = () => {
  const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':');
  let newSaleAttr: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: []
  }
  saleAttr.value.push(newSaleAttr);
  saleAttrIdAndValueName.value = '';
}
const toEdit = (row: SaleAttr) => {
  row.flag = true;
  row.saleAttrValue = '';
}
const toLook = (row: SaleAttr) => {
  const { baseSaleAttrId, saleAttrValue } = row;
  let newSaleAttrValue: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: (saleAttrValue as string)
  }
  if ((saleAttrValue as string).trim() == '') {
    ElMessage({
      type: 'error',
      message: '属性值不能为空'
    })
    return;
  }
  let repeat = row.spuSaleAttrValueList.find(item => {
    return item.saleAttrValueName == saleAttrValue;
  })
  if (repeat) {
    ElMessage({
      type: 'error',
      message: '属性值不能重复'
    })
    return;
  }
  row.spuSaleAttrValueList.push(newSaleAttrValue);
  row.flag = false;
}
const save = async () => {
  SpuParams.value.spuImageList = imgList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url
    }
  });
  SpuParams.value.spuSaleAttrList = saleAttr.value;
  let result = await reqAddOrUpdateSpu(SpuParams.value);
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: SpuParams.value.id ? '更新成功' : '添加成功'
    })
    $emit('changeScene', { flag: 0, params: SpuParams.value.id ? 'update' : 'add' });
  } else {
    ElMessage({
      type: 'error',
      message: SpuParams.value.id ? '更新失败' : '添加失败'
    })
  }
}
const initAddSpu = async (c3Id: number | string) => {
  Object.assign(SpuParams.value, {
    category3Id: "",
    spuName: "",
    description: "",
    tmId: "",
    spuImageList: [],
    spuSaleAttrList: []
  });
  imgList.value = [];
  saleAttr.value = [];
  saleAttrIdAndValueName.value = '';
  SpuParams.value.category3Id = c3Id;
  let result: AllTradeMark = await reqAllTradeMark();
  let result1: HasSaleAttrResponseData = await reqAllSaleAttr();
  allTradeMark.value = result.data;
  allSaleAttr.value = result1.data;
}
defineExpose({ initHasSpuData, initAddSpu });
</script>

<style scoped lang="scss">
.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>