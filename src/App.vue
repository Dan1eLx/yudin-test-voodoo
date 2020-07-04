<template>
  <div id="app">
    <b-container>
      <b-row align-h="center">
        <b-col lg="4" class="my-3">
          <b-input-group>
            <b-input-group-prepend is-text>
              <b-icon-search></b-icon-search>
            </b-input-group-prepend>
            <b-form-input v-model="search" placeholder="Filter by author..."></b-form-input>
          </b-input-group>
        </b-col>
      </b-row>

      <b-card-group columns v-if="posts.length">
        <Post v-for="post of currentPageItems" :key="post.id" :post='post' />
      </b-card-group>
      
      <div class="text-center" v-else>
        <b v-if="search">Ничего не найдено</b>
        <b v-else>Загрузка данных...</b>
      </div>
      
      <b-pagination align="center" :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-3" />
    
    </b-container>
  </div>
</template>

<script>
import Post from './components/Post'

export default {
  name: 'App',
  components: {
    Post
  },
  data:() => ({
      currentPage: 1,
      perPage: 6,
      paginated_items: {},
      currentPageIndex:0,
      nbPages:0,
      search: ''
  }),
  mounted (){
    this.$store.dispatch('GET_POSTS')
  },
  computed : {
    posts() {
      if (this.search !== ''){
        const search = this.$store.getters.POSTS.filter(post => {
          let name = post.userName.toLowerCase()
          if (name.indexOf(this.search.toLowerCase()) !== -1){
            return true
          }
        })
        return search
      } else {
        return this.$store.getters.POSTS
      }

    },
    totalRows(){
      return this.posts.length
    },
    pageCount() {
      let l = this.totalRows,
      s = this.perPage;
      return Math.floor(l / s);
    },
    currentPageItems() {
      let lengthAll = this.posts.length;
      this.nbPages = 0;
      for (let i = 0; i < lengthAll; i = i + this.perPage) {
        this.paginated_items[this.nbPages] = this.posts.slice(
          i,
          i + this.perPage
      );
      this.nbPages++;
      }
      return this.paginated_items[this.currentPage-1];

    }
  }
}
</script>

<style lang="scss">
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";
body {
  background-color: $gray-200 !important;
}

.card-columns {
  @include media-breakpoint-down(md){
    column-count: 2 !important;
  }

  @include media-breakpoint-down(xs){
    column-count: 1 !important;
  }
}

.input-group-text{
  background-color: #fff !important;
}
</style>
