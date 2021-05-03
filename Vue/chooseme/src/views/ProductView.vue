<template>
  <div class="productview">
    <top-header @header_message="option = $event" class="mb-5"></top-header>
    <product-list />
    <!-- <component v-bind:is="$store.state.component_product_view" ></component> -->
  </div>
</template>

<script>
import TopHeader from "../components/TopHeader";
import ProductList from "../components/ProductList";
export default {
  components: {
    "top-header": TopHeader,
    "product-list": ProductList,
  },
};
</script>
