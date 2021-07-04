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

                            <div>Puntos del crítico: ({{$store.state.current_reviewer.points}})</div>
                            
                            </v-card-actions>
                        </v-card>
                </v-col>
                <v-col cols=12>
                    Aquí van las Reviews del usuario.
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import TopHeader from "../components/TopHeader";

export default{
    components: {
        "top-header": TopHeader
    }
}
</script>
