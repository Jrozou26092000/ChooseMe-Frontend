<template>
  <div>
    <b-carousel
      id="carousel-1"
      img-width="800"
      img-height="400"
      :interval="4000"
      controls
      indicators
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide img-src="@/assets/Car_img1.jpg">
        <h1>Bienvenidos a ChooseMe!</h1>
      </b-carousel-slide>
      <b-carousel-slide
        img-src="@/assets/Car_img2.jpg"
        caption="ChooseMe"
        text="La plataforma más grande de calificaciones de productos."
      ></b-carousel-slide>
      <b-carousel-slide img-src="@/assets/Car_img3.jpg">
        <h2>Encuentra las calificaciones de los productos que buscas!</h2>
      </b-carousel-slide>
      <b-carousel-slide img-src="@/assets/Car_img4.jpg"></b-carousel-slide>
      <b-carousel-slide img-src="@/assets/Car_img5.jpg"></b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
  },
};
</script>
