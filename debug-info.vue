<template>
    <div
        v-if="showDebug"
        class="fixed top-4 left-4 bg-white border border-red-300 rounded-lg p-4 shadow-lg z-50 max-w-md"
    >
        <div class="flex justify-between items-center mb-3">
            <h3 class="font-bold text-red-700">Debug Panel</h3>
            <button
                @click="showDebug = false"
                class="text-red-500 hover:text-red-700"
            >
                ✕
            </button>
        </div>

        <div class="space-y-3 text-sm">
            <!-- Cart Info -->
            <div>
                <h4 class="font-semibold text-gray-800">Cart Status:</h4>
                <ul class="text-gray-600 ml-2">
                    <li>Items: {{ cart.length }}</li>
                    <li>Total Items: {{ totalItems }}</li>
                    <li>Total Value: GHS {{ totalValue }}</li>
                    <li>Cart Open: {{ isCartOpen ? 'Yes' : 'No' }}</li>
                </ul>
            </div>

            <!-- Recent Actions -->
            <div>
                <h4 class="font-semibold text-gray-800">Recent Actions:</h4>
                <ul class="text-gray-600 ml-2 max-h-20 overflow-y-auto">
                    <li v-for="(action, index) in recentActions" :key="index">
                        {{ action }}
                    </li>
                    <li v-if="recentActions.length === 0" class="text-gray-400">
                        No actions yet
                    </li>
                </ul>
            </div>

            <!-- Image Status -->
            <div>
                <h4 class="font-semibold text-gray-800">Image Status:</h4>
                <ul class="text-gray-600 ml-2">
                    <li>Source: {{ imageSource }}</li>
                    <li>Failed: {{ failedImages }}</li>
                    <li>Loaded: {{ loadedImages }}</li>
                </ul>
            </div>

            <!-- WhatsApp Test -->
            <div>
                <h4 class="font-semibold text-gray-800">WhatsApp:</h4>
                <button
                    @click="testWhatsApp"
                    class="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                >
                    Test WhatsApp
                </button>
            </div>

            <!-- Quick Actions -->
            <div>
                <h4 class="font-semibold text-gray-800">Quick Actions:</h4>
                <div class="flex gap-2">
                    <button
                        @click="addTestItem"
                        class="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
                    >
                        Add Test Item
                    </button>
                    <button
                        @click="clearCart"
                        class="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
                    >
                        Clear Cart
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Toggle Button -->
    <button
        v-if="!showDebug"
        @click="showDebug = true"
        class="fixed top-4 left-4 bg-red-600 text-white p-2 rounded-full shadow-lg z-50 hover:bg-red-700"
        title="Debug Panel"
    >
        🐛
    </button>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { CartItem, Product } from '../types';

const props = defineProps<{
    cart: CartItem[];
    isCartOpen: boolean;
}>();

const emit = defineEmits<{
    (e: 'add-to-cart', product: Product): void;
    (e: 'clear-cart'): void;
}>();

const showDebug = ref(false);
const recentActions = ref<string[]>([]);
const imageSource = ref('placeholder');
const failedImages = ref(0);
const loadedImages = ref(0);

const totalItems = computed(() => {
    return props.cart.reduce((total, item) => total + item.quantity, 0);
});

const totalValue = computed(() => {
    return props.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
});

const addAction = (action: string) => {
    const timestamp = new Date().toLocaleTimeString();
    recentActions.value.unshift(`${timestamp}: ${action}`);
    if (recentActions.value.length > 5) {
        recentActions.value.pop();
    }
};

// Watch for cart changes
watch(() => props.cart.length, (newLength, oldLength) => {
    if (newLength > oldLength) {
        addAction(`Item added to cart (${newLength} items)`);
    } else if (newLength < oldLength) {
        addAction(`Item removed from cart (${newLength} items)`);
    }
});

// Watch for cart open/close
watch(() => props.isCartOpen, (isOpen) => {
    addAction(`Cart ${isOpen ? 'opened' : 'closed'}`);
});

const testWhatsApp = () => {
    const message = encodeURIComponent(
        '🛠️ DEBUG TEST: WhatsApp integration test message from your shop!'
    );
    const phoneNumber = '233XXXXXXXXX'; // Change this
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    addAction('WhatsApp test triggered');
    window.open(whatsappUrl, '_blank');
};

const addTestItem = () => {
    const testProduct: Product = {
        id: 999,
        name: 'DEBUG Test Product',
        price: 1,
        image: 'https://via.placeholder.com/400x300/FF0000/FFFFFF?text=DEBUG+TEST',
        category: 'Test'
    };

    emit('add-to-cart', testProduct);
    addAction('Debug test item added');
};

const clearCart = () => {
    emit('clear-cart');
    addAction('Cart cleared');
};

// Image tracking functions
const onImageLoad = () => {
    loadedImages.value++;
    addAction('Image loaded successfully');
};

const onImageError = () => {
    failedImages.value++;
    addAction('Image failed to load');
};

// Expose functions for global use
(window as any).debugPanel = {
    addAction,
    onImageLoad,
    onImageError,
    setImageSource: (source: string) => {
        imageSource.value = source;
        addAction(`Image source changed to: ${source}`);
    }
};
</script>

<style scoped>
.max-h-20 {
    max-height: 5rem;
}
</style>
