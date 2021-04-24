<template>
  <div>
    <b-sidebar
      id="sidebar-backdrop"
      :title="this.$store.state.product.name"
      backdrop-variant="dark"
      backdrop
      shadow
      width="50%" 
    >
     <template #footer>
       <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
        <strong class="mr-auto">ChooseMe</strong>
       </div>
      </template>
      <div class="px-3 py-2">
        <b-img rounded="circle" width="250%" class="mb-3" src="https://picsum.photos/500/500/?image=54" fluid></b-img>
        <p>
          Descripción del producto:
        </p>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        
      }
    }
  }
</script>