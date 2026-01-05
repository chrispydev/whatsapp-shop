<script setup lang="ts">
import { ref } from "vue";
import type { Product } from "../types";

defineProps<{
    product: Product;
}>();

const emit = defineEmits<{
    (e: "add-to-cart", product: Product): void;
}>();

const isLoading = ref(false);
const isImageLoaded = ref(false);

const addToCart = (product: Product) => {
    isLoading.value = true;
    setTimeout(() => {
        emit("add-to-cart", product);
        isLoading.value = false;
    }, 200);
};

const onImageLoad = () => {
    isImageLoaded.value = true;
};

const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-GH", {
        style: "currency",
        currency: "GHS",
        minimumFractionDigits: 0,
    }).format(price);
};
</script>

<template>
    <div
        class="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-1"
    >
        <!-- Image Container - -->
        <div class="relative overflow-hidden bg-gray-50 h-48">
            <!-- Skeleton -->
            <div
                v-if="!isImageLoaded"
                class="absolute inset-0 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"
            ></div>

            <!-- Product Image -->
            <img
                :src="product.image"
                :alt="product.name"
                @load="onImageLoad"
                @error="onImageError"
                class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                :class="{
                    'opacity-0': !isImageLoaded,
                    'opacity-100': isImageLoaded,
                }"
            />
        </div>

        <!-- Content -->
        <div class="p-5">
            <div class="mb-3">
                <h3
                    class="font-semibold text-gray-900 text-lg mb-1 line-clamp-1 group-hover:text-green-600 transition-colors duration-200"
                >
                    {{ product.name }}
                </h3>

                <!-- Price -->
                <div class="flex items-center justify-between">
                    <span class="text-2xl font-bold text-green-600">
                        {{ formatPrice(product.price) }}
                    </span>

                    <!-- Rating stars (placeholder) -->
                    <div class="flex items-center space-x-1">
                        <div class="flex text-yellow-400">
                            <svg
                                v-for="i in 5"
                                :key="i"
                                class="w-3 h-3 fill-current"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
                                />
                            </svg>
                        </div>
                        <span class="text-xs text-gray-500 ml-1">(4.5)</span>
                    </div>
                </div>
            </div>

            <!-- Product features (optional) -->
            <div class="mb-4">
                <div class="flex items-center text-xs text-gray-500 space-x-3">
                    <div class="flex items-center space-x-1">
                        <svg
                            class="w-3 h-3 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        <span v-if="!product.in_stock">Out of Stock</span>
                    </div>

                    <div class="flex items-center space-x-1">
                        <svg
                            class="w-3 h-3 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>Fast Delivery</span>
                    </div>
                </div>
            </div>

            <!-- Add to Cart Button -->
            <button
                @click="addToCart(product)"
                :disabled="isLoading || !product.in_stock"
                class="w-full bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed shadow-sm hover:shadow-md focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
                <span
                    v-if="!isLoading"
                    class="flex items-center justify-center space-x-2"
                >
                    <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l1.5-6M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"
                        />
                    </svg>
                    <span>Add to Cart</span>
                </span>

                <span v-else class="flex items-center justify-center space-x-2">
                    <svg
                        class="w-4 h-4 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                        ></circle>
                        <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    <span>Adding...</span>
                </span>
            </button>
        </div>
    </div>
</template>

<style scoped>
.line-clamp-1 {
    display: -webkit-box;
    /*-webkit-line-clamp: 1;*/
    line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.animate-spin {
    animation: spin 1s linear infinite;
}

@keyframes pulse {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0.7;
    }
}

.animate-pulse {
    background-size: 200px 100%;
    animation: pulse 2s ease-in-out infinite;
}
</style>
