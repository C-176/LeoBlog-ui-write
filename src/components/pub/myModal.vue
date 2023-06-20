<template>
    <transition name="fade">
        <!--    <TransitionRoot  appear :show="visible">-->
        <!--        <TransitionChild-->
        <!--                as="template"-->
        <!--                enter="duration-300 ease-out"-->
        <!--                enter-from="opacity-0 scale-95"-->
        <!--                enter-to="opacity-100 scale-100"-->
        <!--                leave="duration-200 ease-in"-->
        <!--                leave-from="opacity-100 scale-100"-->
        <!--                leave-to="opacity-0 scale-95"-->
        <!--        >-->
        <div v-show="visible"
             :class="{
            'lg:w-1/3 lg:h-1/3':size==='sm',
            'lg:w-2/5 lg:h-4/5':size==='md',
            'lg:w-2/3 lg:h-5/6':size==='lg',
             }"
             class="fixed text-left z-50 shadow-2xl lg:inset-1 flex-col items-center justify-center mx-auto lg:mt-16 w-screen h-screen bg-white p-2 lg:rounded-xl">
            <a-tooltip class="absolute top-0 right-0" title="关闭">
                <button class="rounded-bl-xl rounded-tr-xl z-20 text-white h-8 w-8 text-center bg-indigo-600 hover:bg-indigo-500"
                        @click="quit()">
                    ✖
                </button>
            </a-tooltip>
            <div class="w-full h-full pt-4 px-1 pb-1 rounded-xl">

                <slot><h1>空空如也</h1></slot>

            </div>

        </div>
        <!--        </TransitionChild>-->
        <!--    </TransitionRoot>-->


    </transition>

    <bg-cover :show-cover="$store.state.bgCover" />


</template>

<script>

import {Dialog, DialogPanel, TransitionChild, TransitionRoot} from "@headlessui/vue";

export default {
    name: "myModal",

    props: {
        visible: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'lg'
        }

    },
    components: {DialogPanel, TransitionChild, TransitionRoot, Dialog},
    watch: {
        visible(val,oldVal){
            if (val) {
                this.$store.commit('changeBgCover', true)
            }
        }
    },
    methods: {
        quit() {
            if (this.$store.state.bgCover) {
                this.$store.commit('changeBgCover', false)
            }
            this.$emit('closeModal')
        }
    }
}
</script>

<style scoped>

.fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>