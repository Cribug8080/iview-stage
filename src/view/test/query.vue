<template>
    <div>
      <Card>
        <p slot="title">get请求-数组传参</p>
        <Row>
          <Col v-if="search.canSearch" class="align-right">
            <Input v-model="search.name" style="width: 200px;"></Input>
            <Button @click="handleSearch">搜索</Button>
          </Col>
          <Col>
            <Table :columns="getCols()" :data="hisData.list"></Table>
          </Col>
        </Row>
      </Card>
    </div>
</template>

<script>
    export default {
      name: "query",//组件名字，用于标识、路由缓存...
      props:{},// 父组件传参
      components:{},// 组件注册
      data(){
        return {
          title:'title',
          search:{
            canSearch:true,
          },
          hisData:{
            list:undefined,
            total:0,
          }
        }
      }, // 当前VUE对象的观测数据
      created(){
        this.loadData()
      }, //创建当前vue对象完成
      mounted(){},//挂载HTML元素到页面上，依赖元素的操作，比如根据ID选择元素,需要在挂载之后
      methods:{
        getCols(){
          return [
            {
              title:'名字',
              key:'name',
            },
            {
              title:'性别',
              key:'sex',
            },
          ]
        },
        loadData(){
          this.$axios.get('/getUserByName',{
            params:{
              names:['qwe','asd','zxc'] + '',
            }
          }).then(res=>{
            console.log(res)
            this.hisData.list = res.data
          })
        },
        handleSearch(){
          this.loadData()
        },
      }, //  定义所有的函数
    }
</script>

<style scoped>
  .align-right{
    text-align: right;
    margin-bottom: 10px;
  }
</style>
