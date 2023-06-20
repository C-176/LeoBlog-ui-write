<template>

    <lottie-player
            class="cursor-pointer mx-auto"
            @click="()=>{ this.$router.push('/badgeShow')}"
            :src=badgeSrc
            background="transparent" speed="1" :style="{'width':size+'px','height':size+'px'}" loop
            autoplay>

    </lottie-player>
</template>

<script>
export default {
    name: "badge",
    props: {badgeSrc: String, size: Number},
}
</script>

<style scoped>

</style>