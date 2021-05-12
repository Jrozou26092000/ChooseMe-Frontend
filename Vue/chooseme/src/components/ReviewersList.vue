<template>
    <div>
        <v-container class="grey lighten-5">
            <v-row>
                <v-col>
                    <v-text-field
                        filled
                        rounded
                        dark
                        label="Buscar críticos"
                        prepend-inner-icon="mdi-account-search"
                        background-color="indigo darken-2"
                        @keydown.enter="search"
                        v-model="reviewer_name"
                    ></v-text-field>
                </v-col>
                <v-col>
                   <!--  <v-sheet
                        class="d-flex"
                        color="#102f85"
                        height="50"
                        rounded
                    >
                    </v-sheet> -->
                </v-col>
            </v-row>
            <v-row>
                <v-col
                    v-for="(reviewer, key) in $store.state.reviewers"
                    :key="key"
                    cols="3"
                >
                    <v-card>
                        <v-img
                        src="@/assets/Profile_background2.jpg"
                        class="white--text align-end"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        max-height="20%"
                        >
                            <v-container class="mb-5">
                                <v-row justify="center">
                                    <v-avatar size="70%">
                                        <img
                                            src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                                            alt="John"
                                        >
                                    </v-avatar>
                                </v-row>
                            </v-container>
                            <v-card-title v-text="reviewer.user_name"></v-card-title>
                        </v-img>

                        <v-card-actions>
                            <v-btn
                                class="ml-2 mt-2"
                                outlined
                                rounded
                                small
                                @click="view_profile(reviewer)"
                            >
                                Ver perfil
                            </v-btn>
                            <v-spacer></v-spacer>

                            <div>({{reviewer.points}})</div>
                            <v-btn icon>
                                <v-icon>mdi-heart</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
             <infinite-loading @infinite="getReviewers" v-if="$store.state.top5" class="mt-5">
                <div slot="waveDots">Cargando...</div>
                <div slot="no-more">No hay más resultados :)</div>
                <div slot="no-results">No se encontraron resultados :(</div>
            </infinite-loading>
        </v-container>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data(){
        return{
            reviewer_name: ""
        }
    },
    methods: {
        async search(){
            this.$store.commit("resetPage_reviewers");
            this.$store.commit("setTop5", false);
             try {
                const response = await axios.post("http://localhost:8080/users/search/"+this.$store.getters.getPage_reviewers,{
                    "user_name": this.reviewer_name
                });
                this.$store.commit("resetReviewersList");
                this.$store.commit("addReviewersList", response.data);
                this.$store.commit("setTop5", true);
            } catch (error) {
                console.log(error);
            }
            //this.reviewer_name = ""
        },
        view_profile(reviewer){
            // Obtener las reviews de un reviewer.
            /* try { 
                const response = await axios.get(
                "http://localhost:8080/review/" + product.product_id + "/0",
                {}
                );
                this.$store.commit("resetProduct_reviews", response.data);
                this.$store.commit("resetPage_product_reviews");
            } catch (error) {
                console.log(error);
            } */
            this.$store.commit("setCurrent_reviewer", reviewer);
            window.scrollTo(0, 0);
            this.$router
                .push({ path: `/reviewer/${reviewer.user_name}/${reviewer.user_id}` })
                .catch(() => {});
        },
        async getReviewers($state){
            this.$store.commit("incrementPage_reviewers");
            try {
                const response = await axios.post("http://localhost:8080/users/search/"+ this.$store.getters.getPage_reviewers,{
                    "user_name": this.reviewer_name
                });
                if (response.data.length == 0) {
                    //No hay más resultados.
                    $state.complete();
                } else {
                    // console.log(response);
                    // console.log(this.$store.getters.getPage_reviewers);
                    this.$store.commit("addReviewersList", response.data);
                    // this.$store.commit("incrementPage_reviewers");
                    $state.loaded();
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>
