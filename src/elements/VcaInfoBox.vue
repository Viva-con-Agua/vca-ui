<template>
  <div class="info-box">
    <div class="info-icon">
      <img @mouseenter="hovered = true, setPosition(), textRendered = true"
           @mouseleave="hovered = false"
           src="data:image/png;base64,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">
    </div>
    <div class="info-text-wrap">
      <div name="infotext"
           v-bind:class="{'hide' : !hovered, 'info-text' : true, 'not-rendered' : !textRendered, 'text-bottom-right' : bottomRight, 'text-top-right' : topRight, 'text-top-left' : topLeft, 'text-bottom-left' : bottomLeft}">
        {{ infoText }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VcaInfoBox",
  props: ["infoText"],
  data() {
    return {
      hovered: false,
      textRendered: false,
      bottomRight: false,
      topRight: false,
      topLeft: false,
      bottomLeft: false,
    }
  },
  mounted() {
    this.$nextTick(function () {
          var el = this.$el.lastElementChild; //text-wrap
          var rect = el.getBoundingClientRect();

          if (rect.bottom + 100 > (window.innerHeight || document.documentElement.clientHeight)) {
            if (rect.right + 400 > (window.innerWidth || document.documentElement.clientWidth)) {
              this.setTopLeft();
            } else {
              this.setTopRight();
            }
          } else {
            if (rect.right + 400 > (window.innerWidth || document.documentElement.clientWidth)) {
              this.setBottomLeft();
            } else {
              this.setBottomRight();
            }
          }
        }
    )
  },
  methods: {
    setPosition() {
      var el = this.$el.lastElementChild.children[0]; //info-text
      var rect = el.getBoundingClientRect();

      if (rect.right > (window.innerWidth || document.documentElement.clientWidth)) {
        this.moveLeft();
      } else if (this.left < 0) {
        this.moveRight();
      }
      if (rect.bottom > (window.innerHeight || document.documentElement.clientHeight)) {            /* eslint-disable no-console */
        this.moveTop();
      } else if (rect.top < 0) {
        this.moveBottom()
      }

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
    moveTop() {
      if (this.bottomLeft) {
        this.bottomLeft = false;
        this.topLeft = true;
      } else if (this.bottomRight) {
        this.bottomRight = false;
        this.topRight = true;
      }
    },
    moveBottom() {
      if (this.topLeft) {
        this.topLeft = false;
        this.bottomLeft = true;
      } else if (this.topRight) {
        this.topRight = false;
        this.bottomRight = true;
      }
    },
    moveLeft() {
      if (this.topRight) {
        this.topRight = false;
        this.topLeft = true;
      } else if (this.bottomRight) {
        this.bottomRight = false;
        this.bottomLeft = true;
      }
    },
    moveRight() {
      if (this.topLeft) {
        this.topLeft = false;
        this.topRight = true;
      } else if (this.bottomLeft) {
        this.bottomLeft = false;
        this.bottomRight = true;
      }
    }
  }
}
</script>

<style lang="scss">

.info-box {
  width: 100%;
  height: auto;
  text-decoration: none;
  position: relative;
  overflow: visible;


  .info-icon {
    position: relative;
    z-index: +3;

    img {
      width: 25px;
    }
  }

  .info-text-wrap {

    position: absolute;
    top: 0;
    width: 1px;

    .info-text {
      position: relative;
      width: max-content;
      max-width: 400px;
      z-index: +2;
      text-align: justify;

      box-shadow: 0 4px 8px 2px rgba(0, 0, 0, 0.2);
      transition: 0.3s;
      padding: 1.0em;
      background: #ffffff;
    }

    .text-bottom-right {
      top: 0;
      left: 35px
    }

    .text-top-right {
      top: 0;
      left: 35px;
      transform: translateY(-100%);
    }

    .text-top-left {
      top: 0;
      left: 35px;
      transform: translateY(-100%) translateX(calc(-100% - 45px));
    }

    .text-bottom-left {
      top: 0;
      left: 35px;
      transform: translateX(calc(-100% - 45px));
    }

    .hide {
      opacity: 0;
    }

    .not-rendered {
      display: none;
    }
  }
}


</style>
