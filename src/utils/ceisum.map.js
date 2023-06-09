import 'cesium/Build/Cesium/Widgets/widgets.css'
import * as Cesium from 'cesium'
import { CESIUM_TOKEN, TDT_SUBBDOMAINS, TDT_TOKEN } from '../config/default'


export function map(id) {
  // Cesium.Ion.defaultAccessToken = CESIUM_TOKEN
  const viewer = new Cesium.Viewer(id, {
    geocoder: false,   // 位置查找工具
    homeButton: false,  // 视角返回初始位置
    sceneModePicker: false,   // 选择视角的模式（球体、平铺、斜视平铺）
    baseLayerPicker: false,    // 图层选择器（地形影像服务）
    navigationHelpButton: false,   // 导航帮助(手势，鼠标)
    animation: false,   // 左下角仪表盘（动画器件）
    timeline: false,   // 底部时间线
    fullscreenButton: false,   // 全屏
    vrButton: false,  // VR
    terrainProvider: Cesium.createWorldTerrain()
  })
  viewer._cesiumWidget._creditContainer.style.display = "none"
  return viewer
}
//矢量
// "http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk="
// 影像
// "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=",
// 地形
// "http://t0.tianditu.com/ter_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=ter&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk="

export function provider(viewer, obj) {
  const providerImage = new Cesium.ImageryLayer(
    new Cesium.WebMapTileServiceImageryProvider({
      url: `http://{s}.tianditu.com/${obj.key}_${obj.type}/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=${obj.key}&tileMatrixSet=${obj.type}&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=${TDT_TOKEN}`,
      layer: obj.key,	//WMTS请求的层名称
      style: "default",//WMTS请求的样式名称
      format: "tiles",//MIME类型，用于从服务器检索图像
      format: "image/jpeg",
      tileMatrixSetID: "GoogleMapsCompatible",//	用于WMTS请求的TileMatrixSet的标识符
      subdomains: TDT_SUBBDOMAINS,//天地图8个服务器
      minimumLevel: 0,//最小层级
      maximumLevel: 18,//最大层级
    })
  )
  viewer.imageryLayers.add(providerImage)
  return providerImage
}