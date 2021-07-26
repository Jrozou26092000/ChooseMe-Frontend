<template>
    <div class="reviewer">
        <top-header @header_message="option = $event" class="mb-5"></top-header>
        <v-container class="grey lighten-5">
            <v-row class="mx-5" justify="center"> 
                <v-col class="mb-2" cols=12>
                    <v-card width="95%" class="ml-5">
                            <v-parallax
                                dark
                                src="@/assets/Profile_background2.jpg"
                                height="90%"
                            >
                                <v-container class="mt-5">
                                    <v-row justify="center">
                                        <v-avatar size="45%">
                                            <img
                                                src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                                                alt="John"
                                            >
                                        </v-avatar>
                                    </v-row>
                                </v-container>
                                <v-card-title v-text="$store.state.current_reviewer.user_name"></v-card-title>
                            </v-parallax>
                            <v-card-actions>
                            <v-spacer></v-spacer>

                            <div class="font-weight-medium">Puntos del crítico: ({{$store.state.current_reviewer.points}})</div>
                            
                            </v-card-actions>
                        </v-card>
                </v-col>
                <v-col cols=12>
                    <v-card
                        class="mx-auto my-12"
                        color="#102f85"
                        dark
                        max-width="80%"
                        v-for="(review, index) in this.$store.state.reviews_reviewer"
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
                        <v-row class="mx-3 my-1">
                            <div class="font-weight-bold" style="text-align: justify;font-size: 120%;">"{{review.comment}}"</div>
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
                            <v-list-item-avatar rounded=0>
                            <v-img
                                elevation = 6
                                alt=""
                                src="@/assets/paquete.png"
                            ></v-img>
                            </v-list-item-avatar>

                            <v-list-item-content>
                            <v-list-item-title>{{review.product_name}}</v-list-item-title>
                            </v-list-item-content>

                            <v-row
                            align="center"
                            justify="end"
                            >
                                <v-btn
                                color="indigo darken-2"
                                dark
                                @click="ConsultaActualizaciones(review)"
                                >
                                    Consultar actualizaciones
                                </v-btn>
                            </v-row>
                        </v-list-item>
                        </v-card-actions>

                    </v-card>
                    <infinite-loading @infinite="getReviewsReviewer" class="mt-5">
                        <div slot="waveDots">
                            <v-alert
                            elevation="4"
                            color="#283593"
                            dense
                            type="info"
                            >
                                <strong> Cargando... </strong>
                            </v-alert>
                        </div>
                        <div slot="no-more">
                            <v-alert
                            elevation="4"
                            color="#283593"
                            dense
                            type="info"
                            >
                                <strong> No hay más resultados </strong>
                            </v-alert>
                        </div>
                        <div slot="no-results">
                            <v-alert
                            elevation="4"
                            color="#283593"
                            dense
                            type="info"
                            >
                                <strong> No hay más resultados </strong>
                            </v-alert>
                        </div>
                    </infinite-loading>
                </v-col>
            </v-row>
        </v-container>

        <v-dialog
            v-model="botonActualizaciones"
            persistent
            max-width="80%"
        >

            <v-card>
                <v-list two-line>
                <template v-for="(review) in this.reviewActualizaciones">
                    <v-divider
                    :key="review.impression_id"
                    >
                    </v-divider>
                    <v-list-item
                    :key="review.impression_id"
                    >
                    <v-list-item-content>
                        <v-list-item-title v-html="review.impression"></v-list-item-title>
                        <v-list-item-subtitle>Creado el: {{review.created_at.substring(0, 10)}} </v-list-item-subtitle>
                    </v-list-item-content>
                    </v-list-item>
                </template>
                </v-list>
            </v-card>

            <v-btn
                color="error"
                @click="botonActualizaciones = false"
            >
                Cerrar
            </v-btn>
        </v-dialog>
    </div>
</template>

<script>
import axios from "axios";
import TopHeader from "../components/TopHeader";
import InfiniteLoading from "vue-infinite-loading";

export default{
    data(){
        return{
            reviewActualizaciones: [],
            botonActualizaciones: false,
        };
    },
    components: {
        "top-header": TopHeader,
        InfiniteLoading
  },
  methods: {
    async getReviewsReviewer($state) {
      this.$store.commit("incrementPage_reviews_reviewer");
      try {
        const response = await axios.get(
          "http://localhost:8080/user/review/"+ this.$store.state.current_reviewer.user_id + "/" + this.$store.getters.getPage_reviews_reviewer,
          {}
        );
        if (response.data.length == 0) { //No hay más resultados
          $state.complete();
        } else {
          this.$store.commit("addReviewsReviewer", response.data);
          $state.loaded();
        }
      } catch (error) {
        console.log(error);
      }
    },
    ConsultaActualizaciones(review){
        this.reviewActualizaciones = review.impressions;
        this.botonActualizaciones = true;
    },
  },
}
</script>
