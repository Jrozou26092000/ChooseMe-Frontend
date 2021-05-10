<template>
  <div class="product">
    <top-header @header_message="option = $event" class="mb-5"></top-header>
    <v-container class="grey lighten-5">
      <v-row
        no-gutters
        class="mb-4"
      >
        <v-col cols = "4">
         <v-card
          class="mx-auto my-12"
          max-width="374"
        >
         <v-img
            height="250"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img>

          <v-card-title>
            {{this.$store.state.current_product.name.charAt(0).toUpperCase() +
            this.$store.state.current_product.name.slice(1)}}
          </v-card-title>

          <v-card-text>
            <v-row
              align="center"
              class="mx-0"
            >
              <v-rating
                :value="this.$store.state.current_product.score"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ml-4">
                {{this.$store.state.current_product.score}}  ({{$store.state.product_reviews.length}})
              </div>
            </v-row>

            <div class="my-4 subtitle-1">
              <b>Marca:</b> {{this.$store.state.current_product.brand}}
            </div>

            <div class="my-4 subtitle-1">
              <b>Precio:</b> ${{ this.$store.state.current_product.price }}
            </div>

            <div class="my-4 subtitle-1">
              <b>Fecha de creación:</b> {{ this.$store.state.current_product.created_at.substring(0, 10) }}
            </div>
            
            <div>
              <b>Descripción:</b> {{this.$store.state.current_product.description.charAt(0).toUpperCase() +
              this.$store.state.current_product.description.slice(1)}}
            </div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-title>ChooseMe</v-card-title>

          <v-card-text>
          </v-card-text>
        </v-card>
        </v-col>
        <v-col cols = "8">
          <!-- <v-card
            class="pa-2 mx-auto my-12"
            outlined
            tile
            max-width="90%"
            v-for="(review, index) in $store.state.product_reviews"
            :key="index"
          >
          {{review.comment}}
          </v-card> -->
          <v-card
            class="mx-auto my-12"
            color="#102f85"
            dark
            max-width="80%"
            v-for="(review, index) in $store.state.product_reviews"
            :key="index"
          >
            <v-card-title>
              <v-icon
                large
                left
              >
                mdi-check-circle
              </v-icon>
              <span class="title font-weight-light">ChooseMe</span>
            </v-card-title>

            <v-card-text>
              <v-row class="ml-3 mt-1">
                <div class="headline font-weight-bold">"{{review.comment}}"</div>
              </v-row>
              <v-row class="ml-3 mt-5">
                <div>Calificación: ({{review.score}})
                  <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon v-bind="attrs" v-on="on" medium>mdi-information</v-icon>
                    </template>
                    <span>Las calificaciones de las críticas estan en una escala de 1-5.</span>
                  </v-tooltip>
                </div>
                </v-row>
                <v-row class="ml-3">
                  <div>Creado: {{review.created_at.substring(0, 10)}}</div>
                </v-row>
            </v-card-text>

            <v-card-actions>
              <v-list-item class="grow">
                <v-list-item-avatar color="grey darken-3">
                  <v-img
                    class="elevation-6"
                    alt=""
                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{review.user_name}}</v-list-item-title>
                </v-list-item-content>

                <v-row
                  align="center"
                  justify="end"
                >
                  <v-btn icon>
                    <v-icon class="mr-2">
                      mdi-thumb-up
                    </v-icon>
                  </v-btn>
                  <span class="subheading mr-2">256</span>
                  <span class="mr-1">·</span>
                  <v-btn icon>
                    <v-icon class="mr-2">
                      mdi-thumb-down
                    </v-icon>
                  </v-btn>
                  <span class="subheading">45</span>
                </v-row>
              </v-list-item>
            </v-card-actions>
            <!-- <v-footer class="py-5">
              <v-row class="ml-3">
                  <div class="grey--text ml-4">
                    Calificación:
                  </div>
                  <v-rating
                    :value="review.score"
                    color="amber"
                    half-increments
                    size="12"
                  ></v-rating>
                  <div class="grey--text ml-4">
                    ({{review.score}})
                  </div>
              </v-row>
            </v-footer> -->
          </v-card>
          <infinite-loading @infinite="getReviews" class="mt-5">
            <div slot="waveDots">Cargando...</div>
            <div slot="no-more">No hay más resultados :)</div>
            <div slot="no-results">No se encontraron resultados :(</div>
          </infinite-loading>
        </v-col>
      </v-row>
    </v-container>
    <!-- <b-container fluid="sm" class="mb-5">
      <b-row>
        <b-col cols="4" class="mt-5">
          <b-card
            no-body
            style="max-width: 20rem"
            img-src="https://placekitten.com/380/200"
            img-alt="Image"
            img-top
          >
            <template #header>
              <h4 class="mb-0">ChooseMe</h4>
            </template>

            <b-card-body>
              <b-card-title>{{
                this.$store.state.current_product.name.charAt(0).toUpperCase() +
                this.$store.state.current_product.name.slice(1)
              }}</b-card-title>
              <b-card-text>
                {{
                  this.$store.state.current_product.description
                    .charAt(0)
                    .toUpperCase() +
                  this.$store.state.current_product.description.slice(1)
                }}
              </b-card-text>
            </b-card-body>

            <b-list-group flush>
              <b-list-group-item
                ><b>Marca:</b>
                {{ this.$store.state.current_product.brand }}</b-list-group-item
              >
              <b-list-group-item
                ><b>Precio:</b>
                {{ this.$store.state.current_product.price }}</b-list-group-item
              >
              <b-list-group-item>
                <b>Fecha de creación:</b>
                {{
                  this.$store.state.current_product.created_at.substring(0, 10)
                }}</b-list-group-item
              >
              <b-list-group-item>
                <b-form-rating
                  size="sm"
                  disabled
                  :value="this.$store.state.current_product.score"
                ></b-form-rating>
              </b-list-group-item>
            </b-list-group>

            <b-card-footer>Creado por: <i>"Username"</i></b-card-footer>
          </b-card>
        </b-col>

        <b-col cols="8">
          <b-card
            no-body
            class="overflow-hidden mt-5"
            style="max-width: 90%"
            v-for="(review, index) in $store.state.product_reviews"
            :key="index"
          >
            <b-row no-gutters>
              <b-col md="6">
                <b-card-body :title="review.comment"> </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container> -->
    <!-- <infinite-loading @infinite="getReviews">
      <div slot="waveDots">Cargando...</div>
      <div slot="no-more">No hay más resultados :)</div>
      <div slot="no-results">No se encontraron resultados :(</div>
    </infinite-loading> -->
    <!-- <infinite-loading @infinite="getReviews" spinner="waveDots"></infinite-loading> -->
  </div>
</template>

<script>
import axios from "axios";
import TopHeader from "../components/TopHeader";
import InfiniteLoading from "vue-infinite-loading";
export default {
  components: {
    "top-header": TopHeader,
    InfiniteLoading,
  },
  methods: {
    async getReviews($state) {
      this.$store.commit("incrementPage_product_reviews");
      try {
        const response = await axios.get(
          "http://localhost:8080/review/"+this.$store.getters.getCurrent_product.product_id+"/"+this.$store.getters.getPage_product_reviews,
          {}
        );
        if (response.data.length == 0) {
          //No hay más resultados.
          $state.complete();
        } else {
          this.$store.commit("setProduct_reviews", response.data);
          $state.loaded();
        }
      } catch (error) {
        console.log(error);
      }
      // Prueba del infinite scroll:
      /* this.$store.commit("incrementPage_product_reviews");
            if(this.$store.getters.getPage_product_reviews <= 10){
                const a = {comment: "GG", created_at: "2021-04-23T06:58:46.000+00:00", reviewerid: 45};
                this.$store.commit("setProduct_reviews", a);
                $state.loaded();
            }else{
                $state.complete();
            }  */
    },
  },
};
</script>
