<script setup lang="ts">
import { computed, ref } from "vue";
import type { CartItem } from "../types";

const props = defineProps<{
    cart: CartItem[];
}>();

const emit = defineEmits<{
    (e: "update-quantity", id: number, quantity: number): void;
    (e: "remove-item", id: number): void;
    (e: "scroll-to-products"): void;
}>();

const isOrdering = ref(false);

const total = computed(() => {
    return props.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );
});

const itemCount = computed(() => {
    return props.cart.reduce((total, item) => total + item.quantity, 0);
});

const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-GH", {
        style: "currency",
        currency: "GHS",
        minimumFractionDigits: 0,
    }).format(price);
};

const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
        removeItem(id);
        return;
    }
    emit("update-quantity", id, newQuantity);
};

const removeItem = (id: number) => {
    emit("remove-item", id);
};

const generateWhatsAppMessage = () => {
    if (props.cart.length === 0) return "";

    let message = "🛍️ *New Order Request*\n\n";
    message += "Hello! I would like to place the following order:\n\n";

    props.cart.forEach((item, index) => {
        message += `${index + 1}. *${item.name}*\n`;
        message += `   Quantity: ${item.quantity}\n`;
        message += `   Unit Price: ${formatPrice(item.price)}\n`;
        message += `   Subtotal: ${formatPrice(item.price * item.quantity)}\n\n`;
    });

    message += `💰 *Total Amount: ${formatPrice(total.value)}*\n\n`;
    message +=
        "Please confirm availability and delivery details. Thank you! 🙏";

    return encodeURIComponent(message);
};

const orderViaWhatsApp = async () => {
    if (props.cart.length === 0) return;

    isOrdering.value = true;

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const message = generateWhatsAppMessage();
    // TODO: Replace with your actual WhatsApp business number (country code + number, no + symbol)
    // Example: "233501234567" for Ghana, "14155552671" for US, etc.
    const phoneNumber = "+233547650045"; // ⚠️ CHANGE THIS TO YOUR WHATSAPP NUMBER
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(whatsappUrl, "_blank");
    isOrdering.value = false;
};
</script>

<template>
    <div
        class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
    >
        <!-- Header -->
        <div
            class="bg-gradient-to-r from-green-50 to-blue-50 px-6 py-4 border-b border-gray-100"
        >
            <div class="flex items-center justify-between">
                <h2 class="text-xl font-bold text-gray-900">Shopping Cart</h2>
                <div
                    v-if="itemCount > 0"
                    class="bg-green-600 text-white text-sm px-3 py-1 rounded-full"
                >
                    {{ itemCount }} item{{ itemCount !== 1 ? "s" : "" }}
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div v-if="cart.length === 0" class="p-6 text-center">
            <div
                class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center"
            >
                <svg
                    class="w-10 h-10 text-green-600"
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
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">
                Start Shopping!
            </h3>
            <p class="text-gray-600 mb-6 leading-relaxed">
                Add products to your cart and order instantly via WhatsApp. No
                registration required!
            </p>

            <!-- Featured Benefits -->
            <div class="space-y-3 mb-6">
                <div
                    class="flex items-center justify-center gap-2 text-sm text-green-700"
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
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                    <span>Instant WhatsApp ordering</span>
                </div>
                <div
                    class="flex items-center justify-center gap-2 text-sm text-blue-700"
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
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>Fast delivery</span>
                </div>
                <div
                    class="flex items-center justify-center gap-2 text-sm text-purple-700"
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
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                    </svg>
                    <span>Secure & trusted</span>
                </div>
            </div>

            <!-- Call to Action -->
            <div
                class="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200"
            >
                <p class="text-sm font-medium text-gray-800 mb-3">
                    🎉 Special Offer: Free delivery on all orders!
                </p>
                <button
                    @click="emit('scroll-to-products')"
                    class="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-md"
                >
                    Browse Products
                </button>
            </div>
        </div>

        <!-- Cart Items -->
        <div v-else class="divide-y divide-gray-100">
            <div
                v-for="item in cart"
                :key="item.id"
                class="p-4 hover:bg-gray-50 transition-colors"
            >
                <div class="flex items-start space-x-4">
                    <!-- Product Image -->
                    <div
                        class="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden"
                    >
                        <img
                            :src="item.image"
                            :alt="item.name"
                            class="w-full h-full object-cover"
                        />
                    </div>

                    <!-- Product Info -->
                    <div class="flex-1 min-w-0">
                        <h4
                            class="font-medium text-gray-900 text-sm line-clamp-1 mb-1"
                        >
                            {{ item.name }}
                        </h4>
                        <p class="text-green-600 font-semibold text-sm">
                            {{ formatPrice(item.price) }}
                        </p>

                        <!-- Quantity Controls -->
                        <div class="flex items-center space-x-3 mt-2">
                            <div
                                class="flex items-center border border-gray-300 rounded-lg overflow-hidden"
                            >
                                <button
                                    @click="
                                        updateQuantity(
                                            item.id,
                                            item.quantity - 1,
                                        )
                                    "
                                    class="px-2 py-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors"
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
                                            d="M20 12H4"
                                        />
                                    </svg>
                                </button>
                                <span
                                    class="px-3 py-1 bg-white text-sm font-medium min-w-[2rem] text-center"
                                >
                                    {{ item.quantity }}
                                </span>
                                <button
                                    @click="
                                        updateQuantity(
                                            item.id,
                                            item.quantity + 1,
                                        )
                                    "
                                    class="px-2 py-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors"
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
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <!-- Remove Button -->
                            <button
                                @click="removeItem(item.id)"
                                class="text-red-500 hover:text-red-700 transition-colors p-1 rounded-lg hover:bg-red-50"
                                title="Remove item"
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
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Item Total -->
                    <div class="flex-shrink-0 text-right">
                        <p class="font-semibold text-gray-900">
                            {{ formatPrice(item.price * item.quantity) }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Cart Summary -->
            <div class="bg-gray-50 p-6">
                <div class="space-y-3">
                    <div class="flex justify-between text-sm text-gray-600">
                        <span>Subtotal ({{ itemCount }} items)</span>
                        <span>{{ formatPrice(total) }}</span>
                    </div>

                    <div class="flex justify-between text-sm text-gray-600">
                        <span>Delivery</span>
                        <span class="text-green-600 font-medium">FREE</span>
                    </div>

                    <div class="border-t border-gray-200 pt-3">
                        <div
                            class="flex justify-between items-center text-lg font-bold text-gray-900"
                        >
                            <span>Total</span>
                            <span class="text-green-600">{{
                                formatPrice(total)
                            }}</span>
                        </div>
                    </div>
                </div>

                <!-- Order Button -->
                <button
                    @click="orderViaWhatsApp"
                    :disabled="isOrdering || cart.length === 0"
                    class="w-full mt-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                    <span
                        v-if="!isOrdering"
                        class="flex items-center justify-center space-x-3"
                    >
                        <svg
                            class="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"
                            />
                        </svg>
                        <span>Order via WhatsApp</span>
                        <span
                            class="bg-white/20 px-2 py-1 rounded-full text-xs"
                        >
                            {{ formatPrice(total) }}
                        </span>
                    </span>

                    <span
                        v-else
                        class="flex items-center justify-center space-x-2"
                    >
                        <svg
                            class="w-5 h-5 animate-spin"
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
                        <span>Processing...</span>
                    </span>
                </button>

                <div class="mt-4 text-center">
                    <p
                        class="text-xs text-gray-500 flex items-center justify-center space-x-1"
                    >
                        <svg
                            class="w-4 h-4 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>Secure WhatsApp checkout</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
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
</style>
