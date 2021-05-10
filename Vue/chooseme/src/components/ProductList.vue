<template>
  <div>
    <v-container class="grey lighten-5">
      <v-row
        no-gutters
        class="mb-4"
      >
        <v-col cols = "4">
         <b-card style="width: 90%">
            <b-card-text>
              <strong>Filtros de búsqueda</strong>
            </b-card-text>
            <b-form-group
              label="Calificación del producto:"
              v-slot="{ ariaDescribedby }"
              align="left"
            >
              <b-form-radio
                v-model="stars"
                :aria-describedby="ariaDescribedby"
                name="starsfilter"
                value=""
                >No filtrar por calificación.</b-form-radio
              >
              <b-form-radio
                v-model="stars"
                :aria-describedby="ariaDescribedby"
                name="starsfilter"
                value="0"
                >Cero estrellas.</b-form-radio
              >
              <b-form-radio
                v-model="stars"
                :aria-describedby="ariaDescribedby"
                name="starsfilter"
                value="1"
                >Una estrella.</b-form-radio
              >
              <b-form-radio
                v-model="stars"
                :aria-describedby="ariaDescribedby"
                name="starsfilter"
                value="2"
                >Dos estrellas.</b-form-radio
              >
              <b-form-radio
                v-model="stars"
                :aria-describedby="ariaDescribedby"
                name="starsfilter"
                value="3"
                >Tres estrellas.</b-form-radio
              >
              <b-form-radio
                v-model="stars"
                :aria-describedby="ariaDescribedby"
                name="starsfilter"
                value="4"
                >Cuatro estrellas.</b-form-radio
              >
              <b-form-radio
                v-model="stars"
                :aria-describedby="ariaDescribedby"
                name="starsfilter"
                value="5"
                >Cinco estrellas.</b-form-radio
              >
            </b-form-group>

            <b-form-group
              label="Antiguedad del producto:"
              v-slot="{ ariaDescribedby }"
              align="left"
            >
              <b-form-radio
                v-model="time"
                :aria-describedby="ariaDescribedby"
                name="timefilter"
                value=""
                >No filtrar por antiguedad.</b-form-radio
              >
              <b-form-radio
                v-model="time"
                :aria-describedby="ariaDescribedby"
                name="timefilter"
                value="6"
                >Seis (6) meses atrás.</b-form-radio
              >
              <b-form-radio
                v-model="time"
                :aria-describedby="ariaDescribedby"
                name="timefilter"
                value="12"
                >Doce (12) meses atrás.</b-form-radio
              >
            </b-form-group>

            <b-button @click="onSearch" class="mr-3" variant="primary"
              >Filtrar</b-button
            >
            <b-button @click="onErase" variant="danger"
              >Reiniciar filtros</b-button
            >
          </b-card>
        </v-col>

        <v-col cols = "8">
         <v-card
            class="mb-4 mx-auto"
            color="#102f85"
            dark
            max-width="75%"
            elevation="12"
            v-for="(product, index) in $store.state.products"
            :key="index"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="text-h5"
                >{{product.name.charAt(0).toUpperCase() + product.name.slice(1)}}</v-card-title>

                <v-card-text>
                  <v-rating
                    :value= "product.score"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                  ></v-rating>
                  <div><b>Marca:</b> {{product.brand.charAt(0).toUpperCase() + product.brand.slice(1)}}</div>
                  <div><b>Creación:</b> {{product.created_at.substring(0, 10)}}</div>
                </v-card-text>

                <v-card-actions>
                  <v-btn
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                    @click="view_product(product)"
                  >
                    Ver producto
                  </v-btn>
                </v-card-actions>
              </div>

              <v-avatar
                class="ma-3"
                size="200"
                tile
              >
                <v-img src="https://picsum.photos/400/400/?image=20"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      stars: "",
      time: "",
    };
  },
  props: ["products"],
  methods: {
    async view_product(product) {
      try {
        const response = await axios.get(
          "http://localhost:8080/review/" + product.product_id + "/0",
          {}
        );
        this.$store.commit("resetProduct_reviews", response.data);
        this.$store.commit("resetPage_product_reviews");
      } catch (error) {
        console.log(error);
      }
      this.$store.commit("setCurrent_product", product);
      window.scrollTo(0, 0);
      this.$router
        .push({ path: `/product/${product.name}/${product.product_id}` })
        .catch(() => {});
    },
    async onSearch() {
      if (this.stars != "" && this.time != "") {
        try {
          const response = await axios.post(
            "http://localhost:8080/products/search",
            {
              name: this.$store.state.product_search,
              stars_puntuation: this.stars,
              create_at: this.time,
            }
          );
          this.$store.commit("setProductlist", response.data);
        } catch (error) {
          console.log(error);
        }
      } else if (this.stars != "") {
        try {
          const response = await axios.post(
            "http://localhost:8080/products/search",
            {
              name: this.$store.state.product_search,
              stars_puntuation: this.stars,
            }
          );
          this.$store.commit("setProductlist", response.data);
        } catch (error) {
          console.log(error);
        }
      } else if (this.time != "") {
        try {
          const response = await axios.post(
            "http://localhost:8080/products/search",
            {
              name: this.$store.state.product_search,
              create_at: this.time,
            }
          );
          this.$store.commit("setProductlist", response.data);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const response = await axios.post(
            "http://localhost:8080/products/search",
            {
              name: this.$store.state.product_search,
            }
          );
          this.$store.commit("setProductlist", response.data);
        } catch (error) {
          console.log(error);
        }
      }
    },
    onErase() {
      this.stars = "";
      this.time = "";
    },
  },
};
</script>
