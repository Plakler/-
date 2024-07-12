<template>
  <el-card>
    <el-table border style="margin: 10px 0;" :data="skuArr">
      <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
      <el-table-column label="名称" show-overflow-tooltip width="150px" prop="skuName"></el-table-column>
      <el-table-column label="描述" show-overflow-tooltip width="150px" prop="skuDesc"></el-table-column>
      <el-table-column label="图片" width="150px">
        <!-- @vue-ignore -->
        <template #="{ row, $index }">
          <img :src="row.skuDefaultImg" alt="" style="width: 100px;height: 100px;">
        </template>
      </el-table-column>
      <el-table-column label="重量" width="150px" prop="weight"></el-table-column>
      <el-table-column label="价格" width="150px" prop="price"></el-table-column>
      <el-table-column label="操作" width="250px" fixed="right">
        <!-- @vue-ignore -->
        <template #="{ row, $index }">
          <el-button type="primary" size="small" :icon="row.isSale == 1 ? 'Bottom' : 'Top'"
            @click="updateSale(row)"></el-button>
          <el-button type="primary" size="small" icon="Edit" @click="updateSku"></el-button>
          <el-button type="primary" size="small" icon="InfoFilled" @click="findSku(row)"></el-button>
          <el-popconfirm :title="`你确定要删除${row.skuName}吗?`" width="200px" @confirm="removeSku(row.id)">
            <template #reference>
              <el-button type="primary" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
      :background="true" layout="prev,pager,next,jumper,->,sizes,total" :total="total" @current-change="getHasSku"
      @size-change="getHasSku()" />
    <el-drawer v-model="drawer">
      <template #header>
        <h4>查看商品详情</h4>
      </template>
      <template #default>
        <el-row style="margin: 10px 0;">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0;">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0;">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuInfo.price }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0;">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag style="margin: 5px;" v-for="item in skuInfo.skuAttrValueList" :key="item.id">{{ item.valueName
              }}</el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0;">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag style="margin: 5px;" v-for="item in skuInfo.skuSaleAttrValueList" :key="item.id">{{
              item.saleAttrValueName }}</el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0;">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                <img :src="item.imgUrl" alt="" style="width: 100%;height: 100%;">
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { reqSkuList, reqSaleSku, reqCancelSale, reqSkuInfo, reqRemovesku } from '@/api/product/sku';
import type { SkuResponseData, SkuData, SkuInfoData } from '@/api/product/sku/type';
import { ElMessage } from 'element-plus';
let pageNo = ref<number>(1);
let pageSize = ref<number>(10);
let total = ref<number>(0);
let skuArr = ref<SkuData[]>([]);
let drawer = ref<boolean>(false);
let skuInfo = ref<SkuData>({});
const getHasSku = async (pager = 1) => {
  pageNo.value = pager;
  let result: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value);
  if (result.code == 200) {
    total.value = result.data.total;
    skuArr.value = result.data.records;
  }
}
const updateSale = async (row: SkuData) => {
  if (row.isSale == 1) {
    await reqCancelSale((row.id as number));
    ElMessage({
      type: 'success',
      message: '下架成功'
    });
    getHasSku(pageNo.value);
  } else {
    await reqSaleSku((row.id as number));
    ElMessage({
      type: 'success',
      message: '上架成功'
    });
    getHasSku(pageNo.value);
  }
}
const updateSku = () => {
  ElMessage({
    type: 'error',
    message: '此功能尚未完善，请等待更新'
  })
}
const findSku = async (row: SkuData) => {
  drawer.value = true;
  let result: SkuInfoData = await reqSkuInfo((row.id as number));
  skuInfo.value = result.data;
}
const removeSku = async (id: number) => {
  let result: any = await reqRemovesku(id);
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    });
    getHasSku(skuArr.value.length > 1 ? pageNo.value : pageNo.value - 1);
  } else {
    ElMessage({
      type: 'error',
      message: '系统数据不可删除'
    })
  }
}
onMounted(() => {
  getHasSku();
})
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>