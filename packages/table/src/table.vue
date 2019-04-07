<template>
  <transition name="w-move">
    <div class="w__table" @mouseover="mouseoverFun" @mouseout="mouseoutFun">
      <div class="data-table" v-if="isTable">
        <div class="t_l">
          <div class="sa-cycle-top">
            <ul class="cycle-title clearfix">
              <li style="width:110px"></li>
            </ul>
          </div>
          <div class="w-warp-box">
            区域名称
          </div>
          <div class="t_l_freeze" :style="{maxHeight:(tablesHeight-80)+'px'}">
            <table :style="{transform:toTransform}">
              <tr v-for="(item,i) in cyData" :key="i" @click.stop="clickRowFun(item)">
                <td>
                  <p>{{item.itemName}}</p>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="t_r" :style="{height:tablesHeight+'px'}">
          <div :style="{width:warpX}">
            <div class="sa-cycle-top">
              <ul class="cycle-title clearfix">
                <li v-for="item in cycleTitleData"
                    :style="{
                    width:(item.status)?(item.hide*defaultWidth)+'px':(item.show*defaultWidth)+'px',
                    textAlign:(item.status)?'right':'center'}">
                  {{item.label}}
                  <i v-if="item.status"
                     class="sa-hr"
                     :style="{width:(item.hide-item.show)*defaultWidth+'px'}"></i>
                  <span :class="(item.status)?('w-icon-filter'):('w-icon-filter2')"
                        @click="toShow(item)"></span>
                </li>
              </ul>
            </div>
            <div class="t_r_t" :style="{paddingRight:(exceed)?'8px':'0'}">
              <table>
                <thead>
                  <tr>
                    <th id="sa-th"
                        v-for="(item,i) in titleArr" :key="i"
                        :class="{ascending:(sortName === item.up),descending:(sortName === item.down)}"
                        @click="sorting((i+1),item)"
                        :style="{width:defaultWidth+'px'}"
                        v-if="isShow(item.pid,item.pType)">
                      {{item.label}}
                      <span class="caret-wrapper">
                          <i class="sort-caret ascending"></i>
                          <i class="sort-caret descending"></i>
                      </span>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div class="t_r_content"  @scroll="paperScroll"  :style="{height: (tablesHeight - 80)+'px'}">
              <table>
                <tbody>
                  <tr v-for="(item,y) in cyData" :key="y"  @click.stop="clickRowFun(item)">
                    <td v-for="(itemChild,i) in titleArr" :key="i"
                        :style="{width:defaultWidth+'px'}"
                        v-if="isShow(itemChild.pid,itemChild.pType)">{{item[itemChild.data]}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'WTable',
    props: {
      // 默认唯一标识
      activeId: {
        type: String,
        default: 'id'
      },
      // 默认排序方式
      activeName: {
        type: String,
        default: ''
      },
      // 头部关系数组
      columnTop: {
        type: Array,
        default: []
      },
      // 列关系数组
      column: {
        type: Array,
        default: []
      },
      // 数据关系数组
      data: {
        type: Array,
        default: []
      },
      // 点击行方法
      clickRow: {
        type: Boolean
      },
      // 表格高度
      tableHeight: {
        type: Number,
        default: 300
      },
      // 默认列宽
      columnWidth: {
        type: Number,
        default: 100
      },
      // 默认列宽
      columnHeight: {
        type: Number,
        default: 40
      }
    },
    data () {
      return {
        isclosed: false,
        isTable: false,
        exceed: false,
        tablesHeight: null,
        thHeight: null,
        defaultWidth: null,
        warpX: '100%',
        sortName: '',
        toTransform: 'translate(0px,0px,0px)',
        cycleTitleData: [],
        titleArr: [],
        cyData: [],
        defaultShowNum: null
      }
    },
    mounted () {
      this.tablesHeight = this.tableHeight
      this.defaultWidth = this.columnWidth
      this.thHeight = this.columnHeight
      this.cycleTitleData = this.columnTop
      sessionStorage.setItem('columnTop', JSON.stringify(this.columnTop))
      this.titleArr = this.column
      this.cyData = this.data
      this.sortName = this.activeName
      let c = 0
      this.cycleTitleData.map(item => {
        c = c + item.show
      })
      this.defaultShowNum = c
      if ((document.querySelector('.w__table').clientWidth - 110) < this.defaultShowNum * this.defaultWidth) {
        this.warpX = this.defaultShowNum * this.defaultWidth + 'px'
      }
      this.isTable = true
    },
    methods: {
      mouseoverFun () {
        document.body.style.overflow = 'hidden'
      },
      mouseoutFun () {
        document.body.style.overflow = 'auto'
      },
      /*
      *  判断是否处于当前关联关系
      * */
      isShow (id, type) {
        let c = false
        if (type === 'show') {
          c = true
        } else {
          this.cycleTitleData.map(item => {
            if (item.id === id && item.status) {
              c = true
            }
          })
        }
        return c
      },
      /*
      *  联动控制表格显示
      * */
      paperScroll (e) {
        this.toTransform = 'translate(0px, -' + e.target.scrollTop + 'px) translateZ(0px)'
      },
      /*
      *  展开显示方法
      * */
      toShow (item) {
        let _this = this
        let newArr = []
        _this.cycleTitleData = JSON.parse(sessionStorage.getItem('columnTop'))
        _this.cycleTitleData.map(a => {
          if (a.id === item.id) {
            if (item.status) {
              a.status = false
              _this.warpX = ((_this.defaultShowNum * _this.defaultWidth) <= document.querySelector('.t_r').clientWidth) ? '100%' : (_this.defaultShowNum * _this.defaultWidth + 'px')
            } else {
              a.status = true
              _this.warpX = ((_this.defaultShowNum * _this.defaultWidth + _this.defaultWidth * (a.hide - a.show)) <= document.querySelector('.t_r').clientWidth) ? '100%' : (_this.defaultShowNum * _this.defaultWidth + _this.defaultWidth * (a.hide - a.show) + 'px')
            }
          }
          newArr.push(a)
        })
        _this.cycleTitleData = newArr
      },
      /*
      * 外置点击行方法
      * */
      clickRowFun (e) {
        this.$emit('clickRow', e)
      },
      /*
      *  冒泡排序算法 start
      *  up 从大到小 down 从小到大
      * 冒泡算法 总共循环数组的长度次，即len次，每次将最小的放最后
      * */
      sorting (order, e) {
        let _this = this
        if (_this.sortName !== e.down) {
          _this.sortName = e.down
          this.sortData(order, 'down')
        } else {
          _this.sortName = e.up
          this.sortData(order, 'up')
        }
      },
      sortData (type, orderType) {
        let toptitle = this.titleArr
        let titleName = toptitle[type - 1].data
        let oldData = this.data
        let newData = []
        let cOrder = []
        oldData.map(item => {
          cOrder.push(item[titleName])
        })
        let newOrder = []
        switch (orderType) {
          case 'up':
            newOrder = this.bubble(cOrder, 'up')
            break
          case 'down':
            newOrder = this.bubble(cOrder, 'down')
            break
        }
        newOrder.map(req => {
          let _this = this
          let c = 0
          oldData.map(res => {
            if (req === res[titleName] && c < 1) {
              let d = 0
              if (newData[0] != null) {
                newData.map(child => {
                  if (child[_this.activeId] === res[_this.activeId]) {
                    d = 1
                    c = 0
                  }
                })
              }
              if (d === 0) {
                newData.push(res)
                c++
              }
            }
          })
        })
        this.cyData = newData
      },
      bubble (item, type) {
        let len = item.length
        let i = 0
        let j = 0
        let tmp = 0
        switch (type) {
          case 'up':
            for (i = 0; i < len; i++) {
              for (j = 0; (j + 1) < len - i; j++) {
                if (item[j] > item[j + 1]) {
                  tmp = item[j]
                  item[j] = item[j + 1]
                  item[j + 1] = tmp
                }
              }
            }
            break
          case 'down':
            for (i = 0; i < len; i++) {
              for (j = 0; (j + 1) < len - i; j++) {
                if (item[j] < item[j + 1]) {
                  tmp = item[j]
                  item[j] = item[j + 1]
                  item[j + 1] = tmp
                }
              }
            }
            break
        }
        return item
      }
    }
  }
</script>
<style scoped lang="less">
  /* 取消点击选中的蓝色边框 */
  *{
    outline:none !important;
  }
  ::-webkit-scrollbar{
    width: 8px;
    height: 8px;
    background-color: #ececec;
  }
  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 6px;
    background-color: #F5F5F5;
  }
  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #999;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  th,td{
    box-sizing: border-box !important;
  }
  ul,li{
    list-style: none;margin: 0;padding: 0;
  }
  table{
    border-spacing: 0;
  }
  .w__table{
    width: 100%;position: relative;
    .up_data{
      display: inline-block;width: 0;height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 8px solid #52c41a;
    }
    .down_data{
      display: inline-block;width: 0;height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 8px solid #f5222d;
    }
    .sa-cycle-top{
      width: 100%;height: 40px;
      background-color: #f8f8f8;
      .cycle-title{
        height: 40px;
        li{
          width: 20%;height: 40px;line-height: 40px;text-align: center;
          float: left;vertical-align: middle;
          span{
            display: inline-block;width: 20px;height: 20px;text-align: center;line-height: 20px;
            background-color: #eee;font-size: 12px;
            margin-left: 8px;cursor: pointer;
          }
          .sa-hr{
            display: inline-block;width: 140px;height: 2px;background-color: #eee;vertical-align: middle;
          }
        }
      }
    }
    .sa-cycle-bottom{
      width: 100%;overflow-x: auto;overflow-y: auto;position: relative;
    }
    .sa-table-left{
      position: absolute;left: 8px;top: 0;
      width: 80px;
      ul{
        width: 100%;
        li{
          text-align: center;width: 100%;cursor: pointer;
          padding: 10px;
          color: rgba(0, 0, 0, .65);font-size: 14px;
          font-weight: 400;position: relative;
        }
      }
    }
    .data-table {
      display: flex;
      th,td {
        position: relative;text-align: center;font-weight: normal;
      }
      .t_l {
        width: 110px;border-right: 1px solid #e8e8e8;
        .w-warp-box{
          width: 100%;height: 40px;border-bottom: 1px solid #eaeaea;
          text-align: center;line-height: 39px;
        }
        table {
          width: 100%;
          th {
            border-bottom: 0;border-right: 0;
            color: rgba(0, 0, 0, .8);font-size: 12px;
          }
          td {
            border-right: 0;
          }
        }
        .t_l_freeze {
          overflow: hidden;
          width: 100%;
          table {
            transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1);
            transition-duration: 0ms;padding-bottom: 8px;
            tr{
              display: block;width: 100%;
              &:hover{
                background-color: rgba(24, 144, 255, .04);cursor: pointer;
                color: #1890ff;font-size: 12px;
              }
            }
            td{
              text-align: center;padding: 0 4px 0 4px;
              min-height: 40px;display: flex;align-items: center;

              p{
                width: 100%;font-size: 12px;color: rgba(0, 0, 0, .8);
                display: -webkit-box;overflow: hidden;text-overflow: ellipsis;
                word-break: break-all;-webkit-box-orient: vertical;-webkit-line-clamp:2;
              }
            }
          }
        }
      }
      .t_r {
        width: 100%;overflow-x: auto;overflow-y: hidden;
        table {
          table-layout: fixed;
          th,td {
            border-bottom: 0;
            width: 80px;
          }
        }
        .t_r_t {
          width: 100%;min-height: 40px;
          overflow: hidden;border-bottom: 1px solid #eaeaea;
          table {
            transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1);
            transition-duration: 0ms;
            thead{
              border-bottom: 1px solid #e8e8e8;
              th{
                padding: 0 18px 0 4px;text-align: center;font-size: 12px;cursor: pointer;
                line-height: 40px;color: rgba(0, 0, 0, .8);position: relative;
                user-select:none;
                .caret-wrapper {
                  display: inline-flex;flex-direction: column;align-items: center;
                  height: 34px;width: 14px;vertical-align: middle;cursor: pointer;
                  overflow: initial;position: absolute;right: 5px;top: 0;bottom: 0;margin: auto;
                }
                .sort-caret {
                  width: 0;height: 0;
                  border: 5px solid transparent;position: absolute;left: 5px;
                }
                .sort-caret.ascending {
                  border-bottom-color: #c0c4cc;top: 5px;
                }
                .sort-caret.descending {
                  border-top-color: #c0c4cc;bottom: 7px;
                }
              }
              .ascending .sort-caret.ascending {
                border-bottom-color: #409EFF;
              }
              .descending .sort-caret.descending {
                border-top-color: #409EFF;
              }
            }
          }
        }
        .t_r_content {
          width: 100%;overflow-y: auto;overflow-x: hidden;
          table{
            width: 100%;padding-bottom: 8px;
            word-wrap: break-word; word-break: break-all;
            tbody{
              tr{
                display: flex;
                &:hover{
                  background-color: rgba(24, 144, 255, .04);cursor: pointer;
                  td{
                    color: #1890ff;font-size: 12px;
                    font-weight: 400;
                  }
                }
              }
              td{
                text-align: center;padding: 0 10px 0 8px;
                color: rgba(0, 0, 0, .65);font-size: 12px;font-weight: 400;line-height: 40px;
                position: relative;overflow: hidden;
              }
            }
          }
        }
      }
    }
  }
</style>
