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
        <p align="justify">
          <b>Descripción del producto:</b><br>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
          et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse 
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
          culpa qui officia deserunt mollit anim id est laborum.
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