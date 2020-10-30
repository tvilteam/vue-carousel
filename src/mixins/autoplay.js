const autoplay = {
  props: {
    /**
     * Flag to enable autoplay
     */
    autoplay: {
      type: Boolean,
      default: false
    },
    /**
     * Time elapsed before advancing slide
     */
    autoplayTimeout: {
      type: Number,
      default: 2000
    },
    /**
     * Flag to pause autoplay on hover
     */
    autoplayHoverPause: {
      type: Boolean,
      default: true
    },
    /**
     * Autoplay direction. User can insert backward to make autoplay move from right to left
     */
    autoplayDirection: {
      type: String,
      default: "forward"
    }
  },
  data: function() {
    return {
      autoplayInterval: null
    };
  },
  destroyed: function() {
    if (!this.$isServer) {
      this.$el.removeEventListener("mouseenter", this.pauseAutoplay);
      this.$el.removeEventListener("mouseleave", this.startAutoplay);
    }
  },
  methods: {
    pauseAutoplay: function() {
      if (this.autoplayInterval) {
        this.autoplayInterval = clearInterval(this.autoplayInterval);
      }
    },
    startAutoplay: function() {
      if (this.autoplay) {
        this.autoplayInterval = setInterval(
          this.autoplayAdvancePage,
          this.autoplayTimeout
        );
      }
    },
    restartAutoplay: function() {
      this.pauseAutoplay();
      this.startAutoplay();
    },
    autoplayAdvancePage: function() {
      this.advancePage(this.autoplayDirection);
    }
  },
  mounted: function() {
    if (!this.$isServer && this.autoplayHoverPause) {
      this.$el.addEventListener("mouseenter", this.pauseAutoplay);
      this.$el.addEventListener("mouseleave", this.startAutoplay);
    }

    this.startAutoplay();
  }
};

export default autoplay;
