<template>
    <div class="fixed bottom-4 left-4 z-40">
        <div
            v-if="showSwitcher"
            class="bg-white rounded-lg shadow-lg border p-4 mb-2 w-64"
        >
            <h3 class="font-semibold text-gray-900 mb-3">Image Settings</h3>

            <div class="space-y-2">
                <label class="flex items-center">
                    <input
                        type="radio"
                        name="imageSource"
                        value="placeholder"
                        v-model="currentSource"
                        @change="switchImageSource"
                        class="mr-2"
                    />
                    <span class="text-sm">Placeholder Images (Fast)</span>
                </label>

                <label class="flex items-center">
                    <input
                        type="radio"
                        name="imageSource"
                        value="unsplash"
                        v-model="currentSource"
                        @change="switchImageSource"
                        class="mr-2"
                    />
                    <span class="text-sm">Real Product Photos</span>
                </label>

                <label class="flex items-center">
                    <input
                        type="radio"
                        name="imageSource"
                        value="picsum"
                        v-model="currentSource"
                        @change="switchImageSource"
                        class="mr-2"
                    />
                    <span class="text-sm">Random Images</span>
                </label>
            </div>

            <button
                @click="showSwitcher = false"
                class="mt-3 text-xs text-gray-500 hover:text-gray-700"
            >
                Close
            </button>
        </div>

        <!-- Toggle Button -->
        <button
            @click="showSwitcher = !showSwitcher"
            class="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
            title="Image Settings"
        >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
            </svg>
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showSwitcher = ref(false);
const currentSource = ref('placeholder');

const emit = defineEmits<{
    (e: 'switch-source', source: string): void;
}>();

const switchImageSource = () => {
    emit('switch-source', currentSource.value);
    showSwitcher.value = false;
};
</script>
