<template>
    <transition name="fade">
        <div v-if="showShare"
             class="h-screen fixed inset-0 w-screen bg-gray-500 bg-opacity-20 flex items-center justify-center">
            <!--MODAL ITEM-->
            <div class="bg-gray-100 relative w-full mx-4 p-4 rounded-xl lg:w-1/3">
                <!--MODAL HEADER-->
                <div
                        class="flex justify-between items center border-b border-gray-200 py-3"
                >
                    <div class="flex items-center justify-center">
                        <p class="text-xl font-bold text-gray-800">分享</p>
                    </div>

                </div>
                <a-tooltip id="close" class="absolute top-2 right-2" title="关闭">
                    <button class="rounded-xl z-20 text-white h-8 w-8 text-center bg-indigo-600 hover:bg-indigo-500"
                            @click="close">
                        ✖
                    </button>
                </a-tooltip>

                <!--MODAL BODY-->
                <div class="my-4">
                    <p class="text-sm" @click="close">通过以下途径分享</p>

                    <div class="flex justify-around my-4">
                        <!--FACEBOOK ICON-->
                        <div
                                class="border hover:bg-[#1877f2] w-12 h-12 fill-[#1877f2] hover:fill-white border-blue-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-blue-500/50 cursor-pointer"
                        >
                            <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                            >
                                <path
                                        d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"
                                ></path>
                            </svg>
                        </div>
                        <!--TWITTER ICON-->
                        <div
                                class="border hover:bg-[#1d9bf0] w-12 h-12 fill-[#1d9bf0] hover:fill-white border-blue-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-sky-500/50 cursor-pointer"
                        >
                            <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                            >
                                <path
                                        d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                                ></path>
                            </svg>
                        </div>


                        <p class="text-sm">复制链接</p>
                        <!--BOX LINK-->
                        <div class="border-2 border-gray-200 flex justify-between items-center pr-2 mt-4 py-2">
                            <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    class="fill-gray-500 ml-2"
                            >
                                <path
                                        d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"
                                ></path>
                                <path
                                        d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"
                                ></path>
                            </svg>

                            <input class="w-full outline-none bg-transparent" type="text" placeholder="link"
                                   :value="this.href">

                            <button class="button w-1/2 " @click="copyLink(this.href)">
                                复制
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import useClipboard from "vue-clipboard3";

export default {
    name: "shareModal",
    props: {
        showShare: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            href: ""
        };
    },
    created() {
        this.href = window.location.href;
    },

    methods: {
        async copyLink(text) {
            const {toClipboard} = useClipboard();
            //将文字复制到剪贴板
            try {
                await toClipboard(text);  //实现复制
                this.$st("复制成功", 'success')
            } catch (e) {
                console.error(e);
            }


        },
        close() {
            this.$emit("close");
        },
    },


}
</script>

<style scoped>

.fade-enter-active, .fade-leave-active {
    transition: opacity .0s;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>