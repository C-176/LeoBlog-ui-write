<template>
    <div class="flex flex-col h-screen bg-white">
        <h1 class="text-4xl text-white font-bold py-8">标签管理</h1>
        <div class="flex flex-col w-full h-full overflow-y-auto">
            <div class="flex flex-row items-center justify-between px-8 py-4 bg-indigo-700 rounded-t-lg">
                <input v-model="newLabel" type="text"
                       class="py-2 px-4 rounded-md bg-indigo-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                       placeholder="添加新标签">
                <button @click="addNewLabel"
                        class="py-2 px-4 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600">
                    添加
                </button>
            </div>
            <div class="flex flex-col w-full h-full px-8 py-4">
                <div class="flex flex-wrap">
                    <div v-for="(label, index) in labels" :key="label.labelId"
                         class="py-2 px-4 bg-indigo-600 text-white rounded-md mr-4 mb-4 cursor-pointer hover:bg-indigo-700 transform hover:scale-110 transition-transform duration-200"
                         @click="selectLabel(index)">
                        {{ label.labelName }}
                    </div>
                </div>
                <div v-if="selectedLabel !== null" class="my-4">
                    <input v-model="selectedLabel.labelName" type="text"
                           class="py-2 px-4 rounded-md bg-indigo-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                           placeholder="标签名称">
                    <input v-model="selectedLabel.labelAlias" type="text"
                           class="py-2 px-4 rounded-md bg-indigo-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                           placeholder="标签别名">
                    <textarea v-model="selectedLabel.labelDescription"
                              class="py-2 px-4 rounded-md bg-indigo-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                              placeholder="标签描述"></textarea>
                    <div class="flex flex-row items-center justify-end mt-4">
                        <button @click="deleteLabel"
                                class="py-2 px-4 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 mr-4">
                            删除
                        </button>
                        <button @click="updateLabel"
                                class="py-2 px-4 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600">
                            保存
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            labels: [],
            newLabel: '',
            selectedLabel: null,
            tagRotation: 0,
            tagWidth: 150,
            tagHeight: 80,
            tagGap: 20,
        };
    },
    async created() {
        try {
            const response = await axios.get('/label/list');
            this.labels = response.data.data;
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        async addNewLabel() {
            if (this.newLabel.trim() !== '') {
                try {
                    const response = await axios.post('/label/add', {labelName: this.newLabel});
                    const newLabel = response.data.data;
                    this.labels.push(newLabel);
                    this.newLabel = '';
                } catch (error) {
                    console.log(error);
                }
            }
        },
        selectLabel(index) {
            this.selectedLabel = {...this.labels[index]};
        },
        async updateLabel() {
            try {
                await axios.put(`/label/update`, {
                    labelId: this.selectedLabel.labelId,
                    labelName: this.selectedLabel.labelName,
                    labelAlias: this.selectedLabel.labelAlias,
                    labelDescription: this.selectedLabel.labelDescription,
                });
                const index = this.labels.findIndex((label) => label.labelId === this.selectedLabel.labelId);
                this.labels[index] = {...this.selectedLabel};
                this.selectedLabel = null;
            } catch (error) {
                console.log(error);
            }
        },
        async deleteLabel() {
            if (confirm('确定要删除吗？')) {
                try {
                    await axios.delete(`/label//${this.selectedLabel.labelId}`);
                    const index = this.labels.findIndex((label) => label.labelId === this.selectedLabel.labelId);
                    this.labels.splice(index, 1);
                    this.selectedLabel = null;
                } catch (error) {
                    console.log(error);
                }
            }
        },

    },
};
</script>

<style>

</style>