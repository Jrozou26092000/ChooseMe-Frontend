<template>
    <div>
        <b-container class="mt-5" fluid="sm">
            <b-row>
                <b-col cols="4">
                    <b-card class="mt-5" style="width: 90%;">
                        <b-card-text>
                            HOLAAAAAAAAA
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
                            <b-card-body :title="product">
                            <b-card-text>
                                Descripción del producto.
                            </b-card-text>
                            </b-card-body>
                        </b-col>
                        </b-row>
                    </b-card>
                </b-col>
                <!-- <b-col>
                    <b-card 
                        :title= "product" 
                        img-src="@/assets/Car_img1.jpg" 
                        img-alt="Image" 
                        img-top 
                        class="mt-5"
                        style = "max-width:20rem"
                        v-for= "(product,index) in $store.state.products" 
                        :key= "index"
                    >
                        <b-card-text>
                        Descripción, datos del producto.
                        </b-card-text>
                        <template #footer>
                            <b-form-rating value="2.75" disabled></b-form-rating>
                        </template>
                    </b-card>
                </b-col> -->
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default({
    props: ['products']
})
</script>
