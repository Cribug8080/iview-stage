<template>
  <div>
    <Card>
      <p slot="title">模板页面</p>
      <div style="text-align: right">
        <div class="inline-block">
          <span class="margin-left-5 margin-right-5">
            名字:
          </span>
          <Input v-model="search.name"
                 @on-enter="handleSearch"
                 clearable
                 style="width: 100px;"></Input>
        </div>
        <div class="inline-block">
          <span class="margin-left-5 margin-right-5">
            性别:
          </span>
          <Select v-model="search.sex"
                  @on-change="handleSearch"
                  placeholder=""
                  clearable
                  style="width: 80px;text-align: left">
            <Option v-for="item,index in sexList" :key="index" :value="item.value">{{item.label}}</Option>
          </Select>
        </div>
        <div class="inline-block">
          <Button type="primary" @click="handleSearch">搜索</Button>
        </div>
      </div>
      <Table :data="hisData.list"
             :columns="getColumns()"
             @on-selection-change="selectChange"
             ref="rowTable"
             size="small"
             border
             stripe>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="rowShow(row)">修改</Button>
          <Button type="error" size="small" style="margin-right: 5px" @click="rowRemove(row)">删除</Button>
          <Button type="success" size="small" style="margin-right: 5px" @click="openQuery(row)">打开Q</Button>
          <Button type="success" size="small" style="margin-right: 5px" @click="openParams(row)">打开P</Button>
        </template>
      </Table>



      <div class="margin-top-10">
        <Button @click="handleSelectAll(true)">全选</Button>
        <Button @click="handleSelectAll(false)">取消全选</Button>
        <Page
          :current="hisData.page"
          :pageSize="hisData.pageSize"
          :total="hisData.total"
          show-sizer
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          show-total
          style="float: right;"
        ></Page>
      </div>
    </Card>
    <Modal v-model="detailModal.modal"
           title="详情"
           :mask-closable="false"
           :width="45"
           transfer>
      <Form :model="detailModal.data" :label-width="100">
        <FormItem prop="name" label="姓名">
          <Input v-model="detailModal.data.name"></Input>
        </FormItem>
        <FormItem prop="age" label="年龄">
          <Input v-model="detailModal.data.age"></Input>
        </FormItem>
        <FormItem prop="sex" label="性别">
          <Input v-model="detailModal.data.sex"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
    export default {
      name: "test-page",
      data(){
        return {
          search:{
            name:'姓名',
            select:'',
            page:1,
            pageSize:10,
          },
          hisData:{
            list:[],
            total:0,
          },
          detailModal:{
            data:{},
            modal:false,
            loading:false,
            saving:false,
          },
          sexList:[
            {
              label:'男',
              value:'M',
            },
            {
              label:'女',
              value:'W',
            },
          ],
        }
      },
      created(){
          // this.loadData()
      },
      methods:{
        getColumns(){
          let myVue = this
          let res = [
            {
              type:'selection',
              width:60,
            },
            {
              key:'name',
              title:'名字',
              minWidth:200,
            },
            {
              key:'sex',
              title:'性别',
              filters:this.sexList,
              filterMethod:(value,row)=>{//单页筛选
                return value == row.sex
              },
              minWidth:100,
            },
            {
              key:'age',
              title:'年龄/岁',
              sortable:true,//单页排序
              minWidth:100,
            },
            {
              key:'action',
              title:'操作',
              align:'center',
              fixed:'right',
              slot:'action',
              minWidth:150,
            },
          ]
          return res;
        },
        loadData(){
          this.$axios.post('/getUsersWithPage',{
            page:this.search.page,
            pageSize:this.search.pageSize,
            name:this.search.name,
            sex:this.search.sex,
          }).then(res=>{
            this.hisData = res.data
          })
        },
        handleSearch(){
          this.search.page = 1
          this.loadData()
        },
        changePage(page){
          this.search.page = page
          this.loadData()
        },
        changePageSize(pageSize){
          this.search.pageSize = pageSize
          this.loadData()
        },
        rowShow(row){
          this.detailModal.data = row
          this.detailModal.modal = true
        },
        openQuery(row){
          this.$router.push({
            name:'query',
            query:{
              name:row.name,
            },
          })
        },
        openParams(row){
          this.$router.push({
            name:'params',
            params:{
              name:row.name,
              row:row,
            },
            query:{
              queryName:'qweqwe'
            },
          })
        },
        rowRemove(row){
          this.$Modal.confirm({
            title:'删除',
            content:`<p>确定删除${row.name}？</p>`,
            closable:true,
            onOk:this.delData,
          })
        },
        delData(){
          // 发送请求
          if(Math.random() >0.5){
            this.$Message.success('删除成功')
            this.handleSearch();//更新列表数据
          }else{
            this.$Message.error('删除失败')
          }

        },
        selectChange(selections){
          // console.log(selections)
        },
        handleSelectAll (status) {
          this.$refs.rowTable.selectAll(status);
        }
      },
      mounted(){

      },
    }
</script>

<style scoped>

</style>
