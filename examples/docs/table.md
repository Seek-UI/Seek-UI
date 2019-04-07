<style>
  .w__table{
    margin-right: 10px;
  }
</style>
<script>
  export default {
    data () {
      return {
        activeId: 'id',
        orderName: '1t',
        columnTopData: [
         {
           id: '5001',
           label: '成交',
           hide: 2,
           show: 1,
           status: false
         },
         {
           id: '5002',
           label: '订单',
           hide: 2,
           show: 1,
           status: false
         },
         {
           id: '5003',
           label: '潜客',
           hide: 2,
           show: 1,
           status: false
         },
         {
           id: '5004',
           label: '客源',
           hide: 2,
           show: 1,
           status: false
         }
        ],
        columnData: [
          {
            label: '交车数',
            data: 'deliveryCnt',
            pid: '5001',
            pType: 'show',
            up: '1t',
            down: '1d'
          },
          {
            label: '交车率',
            data: 'deliveryBv',
            pid: '5001',
            pType: 'hide',
            up: '2t',
            down: '2d'
          },
          {
            label: '订单数',
            data: 'orderCnt',
            pid: '5002',
            pType: 'show',
            up: '3t',
            down: '3d'
          },
          {
            label: '订单率',
            data: 'orderBv',
            pid: '5002',
            pType: 'hide',
            up: '4t',
            down: '4d'
          },
          {
            label: '潜客数',
            data: 'oppCnt',
            pid: '5003',
            pType: 'show',
            up: '5t',
            down: '5d'
          },
          {
            label: '潜客率',
            data: 'oppBv',
            pid: '5003',
            pType: 'hide',
            up: '6t',
            down: '6d'
          },
          {
            label: '客源数',
            data: 'leadsCnt',
            pid: '5004',
            pType: 'show',
            up: '7t',
            down: '7d'
          },
          {
            label: '客源率',
            data: 'leadsBv',
            pid: '5004',
            pType: 'hide',
            up: '8t',
            down: '8d'
          }
        ],
        tableData: [
          {
            id: 1,
            itemName: '西部',
            deliveryCnt: 2000,
            deliveryBv: '18.6%',
            orderCnt: 3000,
            orderBv: '28.6%',
            oppCnt: 5000,
            oppBv: '38.6%',
            leadsCnt: 10000,
            leadsBv: '13.6%'
          },
          {
            id: 2,
            itemName: '东部',
            deliveryCnt: 2100,
            deliveryBv: '19.6%',
            orderCnt: 3500,
            orderBv: '25.6%',
            oppCnt: 5500,
            oppBv: '35.6%',
            leadsCnt: 15000,
            leadsBv: '15.6%'
          },
           {
             id: 3,
             itemName: '东北部',
             deliveryCnt: 2100,
             deliveryBv: '19.6%',
             orderCnt: 3500,
             orderBv: '25.6%',
             oppCnt: 5500,
             oppBv: '35.6%',
             leadsCnt: 15000,
             leadsBv: '15.6%'
           },
          {
            id: 4,
            itemName: '东南部',
            deliveryCnt: 2100,
            deliveryBv: '19.6%',
            orderCnt: 3500,
            orderBv: '25.6%',
            oppCnt: 5500,
            oppBv: '35.6%',
            leadsCnt: 15000,
            leadsBv: '15.6%'
          },
          {
            id: 5,
            itemName: '中部',
            deliveryCnt: 2100,
            deliveryBv: '19.6%',
            orderCnt: 3500,
            orderBv: '25.6%',
            oppCnt: 5500,
            oppBv: '35.6%',
            leadsCnt: 15000,
            leadsBv: '15.6%'
          },
         {
           id: 6,
           itemName: '中南部',
           deliveryCnt: 2100,
           deliveryBv: '19.6%',
           orderCnt: 3500,
           orderBv: '25.6%',
           oppCnt: 5500,
           oppBv: '35.6%',
           leadsCnt: 15000,
           leadsBv: '15.6%'
         }
        ]
      }
    },
     methods: {
       clickRowFun(e) {
         console.log(e)
       }
     }
  }
</script>

# Table 标签
----
### 基础用法
由`type`属性来选择Table的类型，也可以通过`color`属性来自定义背景色。

<div class="demo-block" style="padding:0;width:600px">
  <w-Table :activeId='activeId' :activeName='orderName' :data='tableData' :column='columnData' :columnTop='columnTopData' v-on:clickRow='clickRowFun'></w-Table>
</div>

::: demo
```html

  <w-Table :activeId='activeId' :activeName='orderName' :data='tableData' :column='columnData' :columnTop='columnTopData' v-on:clickRow='clickRowFun'></w-Table>
  <script>
    export default {
      data () {
        return {
          activeId: 'id',
          orderName: '1t',
          columnTopData: [
           {
             id: '5001',
             label: '成交',
             hide: 2,
             show: 1,
             status: false
           },
           {
             id: '5002',
             label: '订单',
             hide: 2,
             show: 1,
             status: false
           },
           {
             id: '5003',
             label: '潜客',
             hide: 2,
             show: 1,
             status: false
           },
           {
             id: '5004',
             label: '客源',
             hide: 2,
             show: 1,
             status: false
           }
          ],
          columnData: [
            {
              label: '交车数',
              data: 'deliveryCnt',
              pid: '5001',
              pType: 'show',
              up: '1t',
              down: '1d'
            },
            {
              label: '交车率',
              data: 'deliveryBv',
              pid: '5001',
              pType: 'hide',
              up: '2t',
              down: '2d'
            },
            {
              label: '订单数',
              data: 'orderCnt',
              pid: '5002',
              pType: 'show',
              up: '3t',
              down: '3d'
            },
            {
              label: '订单率',
              data: 'orderBv',
              pid: '5002',
              pType: 'hide',
              up: '4t',
              down: '4d'
            },
            {
              label: '潜客数',
              data: 'oppCnt',
              pid: '5003',
              pType: 'show',
              up: '5t',
              down: '5d'
            },
            {
              label: '潜客率',
              data: 'oppBv',
              pid: '5003',
              pType: 'hide',
              up: '6t',
              down: '6d'
            },
            {
              label: '客源数',
              data: 'leadsCnt',
              pid: '5004',
              pType: 'show',
              up: '7t',
              down: '7d'
            },
            {
              label: '客源率',
              data: 'leadsBv',
              pid: '5004',
              pType: 'hide',
              up: '8t',
              down: '8d'
            }
          ],
          tableData: [
            {
              id: 1,
              itemName: '西部',
              deliveryCnt: 2000,
              deliveryBv: '18.6%',
              orderCnt: 3000,
              orderBv: '28.6%',
              oppCnt: 5000,
              oppBv: '38.6%',
              leadsCnt: 10000,
              leadsBv: '13.6%'
            }
          ]
        }
      },
      methods: {
        clickRowFun(e) {
          console.log(e)
        }
      }
    }
  </script>
```
:::

## API

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| activeId | 默认唯一标识 | String | -- | id |
| activeName | 默认排序标识 | String |  关系数组data中的down/up | '' |
| columnTop | head中top关系数据 | Array | — | [] |
| column | head中关系数据 | Array | — | [] |
| data | 表格中关系数据 | Array | — | [] |
| tableHeight | 表格高度 | Number | — | 300 |
| columnWidth | 表格列宽 | Number | — | 100 |

## Table 事件

| 事件名称      | 说明          | 返回值  |
|---------- |-------------- |---------- |
| clickRow | 点击行时触发 | event |
