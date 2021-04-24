<template>
    <div class="productlist">
        <top-header @header_message = "option = $event" class="mb-5"></top-header>
        <b-container fluid="sm" class="mb-5">
            <b-row>
                <b-col cols="4" class="mt-5">
                    <b-card style="width: 90%;">
                        <b-card-text>
                            Filtros de búsqueda.
                        </b-card-text>
                    </b-card>
                </b-col>
                <b-col cols="8">
                    <b-card 
                        no-body 
                        class="overflow-hidden mt-5" 
                        style="max-width: 90%;"
                        v-for= "(product,index) in $store.state.products" 
                        :key= "index"
                    >
                        <b-row no-gutters>
                        <b-col md="6">
                            <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image" class="rounded-0"></b-card-img>
                        </b-col>
                        <b-col md="6">
                            <b-card-body :title="product.name">
                                <b-list-group flush>
                                    <b-list-group-item><b>Marca:</b> {{product.brand}}</b-list-group-item>
                                    <b-list-group-item><b>Precio:</b> {{product.price}}</b-list-group-item>
                                    <b-list-group-item> <b>Fecha de creación:</b> {{product.created_at.substring(0,10)}}</b-list-group-item>
                                    <b-list-group-item> 
                                        <b-form-rating size="sm" disabled value="product.score"></b-form-rating>
                                    </b-list-group-item>
                                </b-list-group>
                                <!-- <b-button h-ref="#" @click="product_description(product)" variant="dark">Ver producto</b-button> -->
                                <!-- <b-button  @click="product_description(product)" v-b-toggle.sidebar-footer>Ver producto</b-button> -->
                                <b-button @click="product_description(product)" v-b-toggle.sidebar-backdrop>Ver producto</b-button>
                            </b-card-body>
                        </b-col>
                        </b-row>
                    </b-card>
                </b-col>
            </b-row>
            <side-bar></side-bar>
        </b-container>
    </div>
</template>

<script>
import TopHeader from '../components/TopHeader';
import Sidebar from '../components/Sidebar';

export default({
    props: ['products'],
    components: {
      "top-header": TopHeader,
      "side-bar": Sidebar
    },
    methods: {
        product_description(product) {
            this.$store.state.product = product;
        }
    }
})
</script>
