<template>
  <div class="info-box">
    <div class="desktop">
      <div class="info-icon">
        <img @mouseenter="hovered = true, determinePosition()"
             @mouseleave="hovered = false"
             src="data:image/png;base64,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">
      </div>
      <div class="info-text-desktop"
           v-bind:class="classObject">
        <slot></slot>
      </div>
    </div>
    <div class="mobile">
      <div class="info-icon">
        <img @mouseenter="hovered = true, determinePosition()"
             @mouseleave="hovered = false"
             src="data:image/png;base64,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">
      </div>
      <div class="info-text-mobile"
           v-bind:class="classObject">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VcaInfoBox",
  props: [],
  data() {
    return {
      hovered: false,
      bottomRight: true,
      topRight: false,
      topLeft: false,
      bottomLeft: false
    }
  },
  computed: {
    classObject: function () {
      return {
        'hide': !this.hovered,
        'text-bottom-right': this.bottomRight,
        'text-top-right': this.topRight,
        'text-top-left': this.topLeft,
        'text-bottom-left': this.bottomLeft
      }
    }
  },
  mounted() {
    this.$nextTick(function () {

          var isDesktop = this.isDesktop();
          var child;

          if (isDesktop) {
            child = 0;
          } else {
            child = 1;
          }

          var textBoxEl = this.$el.children[child].lastElementChild;
          var rect = textBoxEl.getBoundingClientRect();

          if (rect.bottom + window.pageYOffset > (document.body.clientHeight)) {
            if (rect.right + window.pageXOffset > (document.body.clientWidth)) {
              this.setTopLeft();
            } else {
              this.setTopRight();
            }
          } else {
            if (rect.right + window.pageXOffset > (document.body.clientWidth)) {
              this.setBottomLeft();
            } else {
              this.setBottomRight();
            }
          }
        }
    )
  },
  methods: {
    determinePosition() {
      var isDesktop = this.isDesktop();
      var child;

      if (isDesktop) {
        child = 0;
      } else {
        child = 1;
      }

      var infoIconEl = this.$el.children[child].firstChild;
      var rectIcon = infoIconEl.getBoundingClientRect();

      var textBoxEl = this.$el.children[child].lastElementChild;
      var rectBox = textBoxEl.getBoundingClientRect();
      var boxHeight = rectBox.bottom - rectBox.top;
      var boxWidth = rectBox.right - rectBox.left;

      if (rectIcon.bottom + boxHeight > (window.innerHeight || document.documentElement.clientHeight)) {
        if (rectIcon.left + boxWidth + 25> (window.innerWidth || document.documentElement.clientWidth)) {
          this.setTopLeft();
        } else {
          this.setTopRight();
        }
      } else {
        if (rectIcon.left + boxWidth + 25> (window.innerWidth || document.documentElement.clientWidth)) {
          this.setBottomLeft();
        } else {
          this.setBottomRight();
        }
      }
    },
    isDesktop() {
      const desktopEl = this.$el.children[0];
      const displayDesktop = window.getComputedStyle(desktopEl, null).display;
      return displayDesktop === 'contents';
    },
    setBottomRight() {
      this.bottomRight = true;
      this.topRight = false;
      this.topLeft = false;
      this.bottomLeft = false;
    },
    setTopRight() {
      this.bottomRight = false;
      this.topRight = true;
      this.topLeft = false;
      this.bottomLeft = false;
    },
    setTopLeft() {
      this.bottomRight = false;
      this.topRight = false;
      this.topLeft = true;
      this.bottomLeft = false;
    },
    setBottomLeft() {
      this.bottomRight = false;
      this.topRight = false;
      this.topLeft = false;
      this.bottomLeft = true;
    },
  }
}
</script>

<style lang="scss">
@import "../assets/style/_mixins.scss";

.desktop {
  @include media(small) {
    display: none;
  }
  @include media(large) {
    display: contents;
  }
}

.mobile {
  @include media(small) {
    display: contents;
  }
  @include media(large) {
    display: none;
  }
}

.info-box {
  width: 100%;
  height: auto;
  text-decoration: none;
  position: relative;
  overflow: visible;

  .info-icon {
    position: relative;
    left: 0;
    z-index: +3;
    width: 25px;

    img {
      width: 25px;
    }
  }

  .info-text-desktop {
    position: absolute;
    box-sizing: border-box;
    width: max-content;
    max-width: 400px;
    z-index: +2;
    text-align: justify;

    box-shadow: 0 4px 8px 2px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    padding: 1em;
    background: #ffffff;
  }

  .info-text-mobile {
    position: absolute;
    box-sizing: border-box;
    width: max-content;
    max-width: 150px;
    z-index: +2;
    text-align: left;

    box-shadow: 0 4px 8px 2px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    padding: 1em;
    background: #ffffff;
  }

  .text-bottom-right {
    top: 0;
    left: 35px
  }

  .text-top-right {
    bottom: 0;
    left: 35px;
  }

  .text-top-left {
    bottom: 0;
    right: 45px;
  }

  .text-bottom-left {
    top: 0;
    right: 45px;
  }

  .hide {
    visibility: hidden;
  }
}

</style>
