<template>
    <div>
      <Card>
        <p slot="title">params</p>
        <div>
          {{row}}
        </div>
      </Card>
    </div>
</template>

<script>
    export default {
        name: "params",
      data(){
          return {
            row:undefined,
            hisData:{},
          }
      },
      created(){
          this.row = this.$route.params.row
      },
      methods:{
        loadData(){
          this.$axios.get('/getUsersWithPage',{
            params:{
              page:this.search.page,
              pageSize:this.search.pageSize,
              name:this.search.name,
            }
          }).then(res=>{
            this.hisData = res.data
          })
        },
      },
    }
</script>

<style scoped>

</style>
