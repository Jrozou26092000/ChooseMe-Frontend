<template>
    <div class="reviewers">
        <top-header @header_message="option = $event" class="mb-5"></top-header>
        <reviewers-list />
    </div>
</template>

<script>
import TopHeader from "../components/TopHeader";
import ReviewersList from "../components/ReviewersList";

export default {
    components: {
        "top-header": TopHeader,
        "reviewers-list": ReviewersList
    },
};
</script>