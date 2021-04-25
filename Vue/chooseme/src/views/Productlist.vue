<template>
    <div class="productlist">
        <top-header @header_message = "option = $event" class="mb-5"></top-header>
        <b-container fluid="sm" class="mb-5">
            <b-row>
                <b-col cols="4" class="mt-5">
                    <b-card style="width: 90%;">
                        <b-card-text>
                            <strong>Filtros de búsqueda</strong>
                        </b-card-text>
                            <b-form-group label="Calificación del producto:" v-slot="{ ariaDescribedby }" align="left">
                                <b-form-radio v-model="stars" :aria-describedby="ariaDescribedby" name="starsfilter" value="">No filtrar por calificación.</b-form-radio>
                                <b-form-radio v-model="stars" :aria-describedby="ariaDescribedby" name="starsfilter" value="0">Cero estrellas.</b-form-radio>
                                <b-form-radio v-model="stars" :aria-describedby="ariaDescribedby" name="starsfilter" value="1">Una estrella.</b-form-radio>
                                <b-form-radio v-model="stars" :aria-describedby="ariaDescribedby" name="starsfilter" value="2">Dos estrellas.</b-form-radio>
                                <b-form-radio v-model="stars" :aria-describedby="ariaDescribedby" name="starsfilter" value="3">Tres estrellas.</b-form-radio>
                                <b-form-radio v-model="stars" :aria-describedby="ariaDescribedby" name="starsfilter" value="4">Cuatro estrellas.</b-form-radio>
                                <b-form-radio v-model="stars" :aria-describedby="ariaDescribedby" name="starsfilter" value="5">Cinco estrellas.</b-form-radio>
                            </b-form-group>

                            <b-form-group label="Antiguedad del producto:" v-slot="{ ariaDescribedby }" align="left">
                                <b-form-radio v-model="time" :aria-describedby="ariaDescribedby" name="timefilter" value="">No filtrar por antiguedad.</b-form-radio>
                                <b-form-radio v-model="time" :aria-describedby="ariaDescribedby" name="timefilter" value="6">Seis (6) meses atrás.</b-form-radio>
                                <b-form-radio v-model="time" :aria-describedby="ariaDescribedby" name="timefilter" value="12">Doce (12) meses atrás.</b-form-radio>
                            </b-form-group>

                            <b-button @click="onSearch" class="mr-3" variant="primary">Filtrar</b-button>
                            <b-button @click="onErase" variant="danger">Reiniciar filtros</b-button>

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
import axios from 'axios';

export default({
    data() {
      return {
        stars: '',
        time: ''
        }
    },
    props: ['products'],
    components: {
      "top-header": TopHeader,
      "side-bar": Sidebar
    },
    methods: {
        product_description(product) {
            this.$store.state.product = product;
        },
        async onSearch(){
            if (this.stars != '' && this.time != ''){
                try {
                    const response = await axios.post('Direccion que no conozco',{
                        "category": this.$store.state.current_product,
                        "stars": this.stars,
                        "time": this.time
                    });
                    this.$store.state.products = response.data;
                } catch (error) {
                    console.log(error);
                }                
            }else if(this.stars !=''){
                try {
                    const response = await axios.post('Direccion que no conozco',{
                        "category": this.$store.state.current_product,
                        "stars": this.stars
                    });
                    this.$store.state.products = response.data;
                } catch (error) {
                    console.log(error);
                }
            }else if(this.time != ''){
                try {
                    const response = await axios.post('Direccion que no conozco',{
                        "category": this.$store.state.current_product,
                        "time": this.time
                    });
                    this.$store.state.products = response.data;
                } catch (error) {
                    console.log(error);
                }
            }
        },
        onErase(){
            this.stars = '';
            this.time = '';
        }
    }
})
</script>
