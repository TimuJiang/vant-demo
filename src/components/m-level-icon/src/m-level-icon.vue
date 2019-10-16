<template lang="pug">
    span.m-level-icon-container
        span(:class="[level, { 'round': round }]" :style="styleObj").m-level-icon {{level}}
</template>

<script>
    export default {
        name: 'm-level-icon',
        computed: {
          styleObj() {
              return {
                  width: `${this.size}px`,
                  height: `${this.size}px`,
                  fontSize: `${this.fontSize}px`,
                  ...this.extraStyle
              }
          }
        },
        props: {
            level: {
                default: '-'
            },
            round: {
                default: false
            },
            size: {
                default: 15
            },
            fontSize: {
                default: 14
            },
            extraStyle: {
                default: function () {
                    return {}
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .m-level-icon-container {
        .A,.B,.C {
            background: #FCB27C;
        }
        .N,.F {
            background: #07B836;
        }
        .H {
            background: #FF3B30;
        }
        .O {
            background: #979797;
        }
    }
    .m-level-icon {
        color: #fff;
        display: flex;
        font-size: 14px;
        border-radius: 2px;
        background-color: #979797;
        align-items: center;
        justify-content: center;
        &.round {
            border-radius: 50%;
        }
    }
</style>
