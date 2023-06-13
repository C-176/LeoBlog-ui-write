<template>
    <div class="fixed z-40 inset-0 overflow-y-auto" :class="{ 'hidden': !visible }">
        <div class="flex items-center justify-center min-h-screen">
            <div class="fixed inset-0 bg-gray-500 opacity-75"></div>
            <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full mx-4">
                <div class="bg-gray-100 px-6 py-4">
                    <h2 class="text-2xl font-bold mb-4">添加标签</h2>
                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2" for="nameInput">
                            名称
                        </label>
                        <input v-model="name" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nameInput" type="text" placeholder="请输入标签名称" />
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2" for="descriptionInput">
                            描述
                        </label>
                        <textarea v-model="description" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="descriptionInput" placeholder="请输入标签描述"></textarea>
                    </div>
                    <div class="flex justify-end">
                        <button @click="addTag" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2">
                            添加
                        </button>
                        <button @click="$emit('close')" class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">
                            取消
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue'
import axios from 'axios'

export default {
    name: 'AddTagModal',
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
    },
    setup(props, context) {
        const state = reactive({
            name: '',
            description: '',
        })

        const addTag = async () => {
            try {
                // const response = await axios.post('/api/tags', state)
                // context.emit('add', response.data)
                context.emit('add', state)
                state.name = ''
                state.description = ''
            } catch (error) {
                console.error(error)
            }
        }

        return {
            name: state.name,
            description: state.description,
            addTag,
        }
    },
}
</script>

<style scoped>
//bug修复
/* 在这里添加样式 */
</style>