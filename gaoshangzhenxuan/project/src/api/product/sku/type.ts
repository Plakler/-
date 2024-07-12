export interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}
export interface Attr {
  id?: number,
  valueName?: number | string,
  attrId: number | string,
  valueId: number | string
}
export interface saleAttr {
  id?: number,
  saleAttrValueName?: number | string,
  saleAttrId: number | string,
  saleAttrValueId: number | string
}
export interface imgAttr {
  id?: number,
  imgUrl?: string
}
export interface SkuData {
  category3Id?: string | number,
  spuId?: string | number,
  tmId?: string | number,
  skuName?: string,
  price?: string | number,
  weight?: string | number,
  skuDesc?: string,
  skuAttrValueList?: Attr[],
  skuSaleAttrValueList?: saleAttr[],
  skuImageList?: imgAttr[],
  skuDefaultImg?: string,
  isSale?: number,
  id?: number
}
export interface SkuResponseData extends ResponseData {
  data: {
    records: SkuData[],
    total: number,
    size: number,
    current: number,
    orders: [],
    optimizeCountSql: boolean,
    hitCount: boolean,
    countId: null,
    maxLimit: null,
    searchCount: boolean,
    page: number
  }
}
export interface SkuInfoData extends ResponseData {
  data: SkuData
}