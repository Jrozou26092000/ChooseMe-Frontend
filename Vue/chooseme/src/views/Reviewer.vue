<template>
    <div class="reviewer">
        <top-header @header_message="option = $event" class="mb-5"></top-header>
        <h1>Hola {{$store.state.current_reviewer.user_name}}</h1>
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
