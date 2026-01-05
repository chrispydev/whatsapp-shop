<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { Product, CartItem } from "./types";

import { sanityClient } from "../sanity/client";
import { urlFor } from "../sanity/image";

import ProductCard from "./components/ProductCard.vue";
import Cart from "./components/Cart.vue";
import Toast from "./components/Toast.vue";

/* -------------------- STATE -------------------- */
const products = ref<Product[]>([]);
const cart = ref<CartItem[]>([]);
const isCartOpen = ref(false);

const showToast = ref(false);
const toastMessage = ref("");
const toastType = ref<"success" | "error" | "info" | "warning">("success");

/* -------------------- FETCH PRODUCTS -------------------- */
const fetchProducts = async () => {
    const query = `
      *[_type == "product"]{
        _id,
        name,
        price,
        in_stock,
        image{
          asset->
        }
      }
    `;

    const data = await sanityClient.fetch(query);

    products.value = data.map((item: any) => ({
        id: item._id,
        name: item.name,
        price: item.price,
        in_stock: item.in_stock,
        image: item.image ? urlFor(item.image) : "",
    }));
};

onMounted(fetchProducts);

/* -------------------- CART LOGIC -------------------- */
const addToCart = (product: Product) => {
    const existing = cart.value.find((item) => item.id === product.id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.value.push({ ...product, quantity: 1 });
    }

    toastMessage.value = `${product.name} added to cart`;
    toastType.value = "success";
    showToast.value = true;
};

// const updateCartQuantity = (id: string, quantity: number) => {
const updateCartQuantity = (id: any, quantity: any) => {
    const item = cart.value.find((item) => item.id === id);
    if (item) item.quantity = quantity;
};

// const removeFromCart = (id: string) => {
const removeFromCart = (id: any) => {
    const index = cart.value.findIndex((item) => item.id === id);
    if (index !== -1) {
        const item = cart.value[index];
        cart.value.splice(index, 1);

        toastMessage.value = `${item?.name} removed from cart`;
        toastType.value = "info";
        showToast.value = true;
    }
};

/* -------------------- UI HELPERS -------------------- */
const hideToast = () => (showToast.value = false);

const cartItemCount = computed(() =>
    cart.value.reduce((total, item) => total + item.quantity, 0),
);

const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value;
};

const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({
        behavior: "smooth",
    });
};

/* -------------------- WHATSAPP TEST -------------------- */
const testWhatsApp = () => {
    const phoneNumber = "233553782097"; // CHANGE THIS
    const message = encodeURIComponent(
        "👋 Hello! I'm testing your WhatsApp Shop.\n\nThis is a test message.",
    );

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
};
</script>

<template>
    <div class="min-h-screen bg-white">
        <!-- Navigation Header -->
        <nav class="bg-white shadow-sm border-b sticky top-0 z-40">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center">
                        <div class="shrink-0">
                            <a
                                href="/"
                                class="text-xl cursor-pointer font-bold text-gray-900"
                            >
                                WhatsApp Shop
                            </a>
                        </div>
                    </div>

                    <div class="flex items-center space-x-4">
                        <button
                            @click="scrollToProducts"
                            class="text-gray-600 hover:text-gray-900 cursor-pointer px-3 py-2 text-sm font-medium transition-colors"
                        >
                            Products
                        </button>

                        <button
                            @click="scrollToProducts"
                            class="relative p-2 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors"
                        >
                            <svg
                                class="h-6 w-6"
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
                            <span
                                v-if="cartItemCount > 0"
                                class="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                            >
                                {{ cartItemCount }}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section
            class="relative bg-linear-to-br from-green-50 via-white to-blue-50 overflow-hidden"
        >
            <div class="absolute inset-0">
                <div
                    class="absolute inset-0 bg-linear-to-br from-green-400/10 to-blue-600/10"
                ></div>
                <!-- Decorative elements -->
                <div
                    class="absolute top-10 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-pulse"
                ></div>
                <div
                    class="absolute top-40 right-20 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"
                ></div>
                <div
                    class="absolute bottom-20 left-1/4 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-2000"
                ></div>
            </div>

            <div
                class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32"
            >
                <div class="text-center">
                    <h1
                        class="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
                    >
                        Shop Smart,
                        <span
                            class="text-transparent bg-clip-text bg-linear-to-r from-green-600 to-blue-600"
                        >
                            Order Easy
                        </span>
                    </h1>
                    <p
                        class="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
                    >
                        Browse our premium collection and place orders instantly
                        via WhatsApp. No registration required, no complicated
                        checkout process.
                    </p>

                    <div
                        class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
                    >
                        <button
                            @click="scrollToProducts"
                            class="bg-green-600 cursor-pointer hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
                        >
                            Start Shopping
                        </button>
                        <a
                            href="#how-it-works"
                            class="border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all"
                        >
                            How It Works
                        </a>
                    </div>

                    <!-- Cart Status Indicator -->
                    <div
                        v-if="cartItemCount > 0"
                        class="inline-flex items-center gap-3 bg-green-50 border border-green-200 px-6 py-3 rounded-full"
                    >
                        <div class="flex items-center gap-2">
                            <svg
                                class="w-5 h-5 text-green-600"
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
                            <span class="text-green-800 font-medium">
                                {{ cartItemCount }} items in cart
                            </span>
                        </div>
                        <button
                            @click="scrollToProducts"
                            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                            View Cart
                        </button>
                    </div>

                    <!-- WhatsApp Badge -->
                    <div
                        class="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200"
                    >
                        <svg
                            class="w-5 h-5 text-green-600"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"
                            />
                        </svg>
                        <span class="text-sm text-gray-600"
                            >Order via WhatsApp</span
                        >
                    </div>

                    <!-- Test WhatsApp Button -->
                    <div class="mt-8">
                        <button
                            @click="testWhatsApp"
                            class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
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
                            Test WhatsApp Now
                        </button>
                        <p class="text-xs text-gray-500 mt-2 text-center">
                            Test our WhatsApp ordering system
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section class="py-16 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">
                        Why Choose Us?
                    </h2>
                    <p class="text-lg text-gray-600">
                        Simple shopping experience with instant ordering
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div
                        class="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                        <div
                            class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4"
                        >
                            <svg
                                class="w-6 h-6 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">
                            Instant Ordering
                        </h3>
                        <p class="text-gray-600">
                            Order directly via WhatsApp with pre-filled
                            messages. No complex checkout process.
                        </p>
                    </div>

                    <div
                        class="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                        <div
                            class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4"
                        >
                            <svg
                                class="w-6 h-6 text-blue-600"
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
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">
                            Secure & Trusted
                        </h3>
                        <p class="text-gray-600">
                            Your data is safe. We use WhatsApp's secure
                            messaging for all communications.
                        </p>
                    </div>

                    <div
                        class="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                        <div
                            class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4"
                        >
                            <svg
                                class="w-6 h-6 text-purple-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">
                            24/7 Support
                        </h3>
                        <p class="text-gray-600">
                            Get instant support through WhatsApp. We're always
                            here to help you.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- How It Works Section -->
        <section id="how-it-works" class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">
                        How It Works
                    </h2>
                    <p class="text-lg text-gray-600">
                        Simple 3-step process to get your products
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="relative text-center">
                        <div
                            class="w-16 h-16 bg-linear-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl"
                        >
                            1
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">
                            Browse & Add to Cart
                        </h3>
                        <p class="text-gray-600">
                            Browse our products and add your favorites to the
                            shopping cart.
                        </p>

                        <!-- Connector line for larger screens -->
                        <div
                            class="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 -z-10"
                        >
                            <div
                                class="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gray-300 rounded-full"
                            ></div>
                        </div>
                    </div>

                    <div class="relative text-center">
                        <div
                            class="w-16 h-16 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl"
                        >
                            2
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">
                            Click Order via WhatsApp
                        </h3>
                        <p class="text-gray-600">
                            Review your cart and click the WhatsApp button to
                            place your order.
                        </p>

                        <div
                            class="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 -z-10"
                        >
                            <div
                                class="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gray-300 rounded-full"
                            ></div>
                        </div>
                    </div>

                    <div class="text-center">
                        <div
                            class="w-16 h-16 bg-linear-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl"
                        >
                            3
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">
                            Send & Receive
                        </h3>
                        <p class="text-gray-600">
                            Send the pre-filled message and get instant
                            confirmation from us!
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Products Section -->
        <section id="products" class="py-16 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">
                        Our Products
                    </h2>
                    <p class="text-lg text-gray-600">
                        Discover our curated collection of premium products
                    </p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <!-- Products Grid -->
                    <div class="lg:col-span-3">
                        <div
                            class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                        >
                            <ProductCard
                                v-for="product in products"
                                :key="product.id"
                                :product="product"
                                @add-to-cart="addToCart"
                            />
                        </div>
                    </div>

                    <!-- Permanent Cart Section -->
                    <div class="lg:col-span-1">
                        <div class="sticky top-24">
                            <Cart
                                :cart="cart"
                                @update-quantity="updateCartQuantity"
                                @remove-item="removeFromCart"
                                @scroll-to-products="scrollToProducts"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Testimonials Section -->
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">
                        What Our Customers Say
                    </h2>
                    <p class="text-lg text-gray-600">
                        Join thousands of satisfied customers who trust us
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <!-- Testimonial 1 -->
                    <div
                        class="bg-linear-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200"
                    >
                        <div class="flex items-center mb-4">
                            <div class="flex text-yellow-400">
                                <svg
                                    v-for="i in 5"
                                    :key="i"
                                    class="w-4 h-4 fill-current"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <p class="text-gray-700 mb-4 italic">
                            "Amazing experience! Ordering via WhatsApp was so
                            simple and fast. Got my headphones within 2 days.
                            Highly recommend!"
                        </p>
                        <div class="flex items-center">
                            <div
                                class="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center mr-3"
                            >
                                <span class="text-green-700 font-semibold"
                                    >KA</span
                                >
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-900">
                                    Kwame Asante
                                </h4>
                                <p class="text-sm text-gray-600">
                                    Accra, Ghana
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Testimonial 2 -->
                    <div
                        class="bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200"
                    >
                        <div class="flex items-center mb-4">
                            <div class="flex text-yellow-400">
                                <svg
                                    v-for="i in 5"
                                    :key="i"
                                    class="w-4 h-4 fill-current"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <p class="text-gray-700 mb-4 italic">
                            "Best customer service ever! They replied instantly
                            on WhatsApp and helped me choose the perfect
                            smartwatch. Love it!"
                        </p>
                        <div class="flex items-center">
                            <div
                                class="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center mr-3"
                            >
                                <span class="text-blue-700 font-semibold"
                                    >AO</span
                                >
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-900">
                                    Ama Osei
                                </h4>
                                <p class="text-sm text-gray-600">
                                    Kumasi, Ghana
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Testimonial 3 -->
                    <div
                        class="bg-linear-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200"
                    >
                        <div class="flex items-center mb-4">
                            <div class="flex text-yellow-400">
                                <svg
                                    v-for="i in 5"
                                    :key="i"
                                    class="w-4 h-4 fill-current"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <p class="text-gray-700 mb-4 italic">
                            "Quality products at great prices! No complicated
                            checkout process, just WhatsApp and done. Will
                            definitely order again!"
                        </p>
                        <div class="flex items-center">
                            <div
                                class="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center mr-3"
                            >
                                <span class="text-purple-700 font-semibold"
                                    >FK</span
                                >
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-900">
                                    Fiifi Koomson
                                </h4>
                                <p class="text-sm text-gray-600">Tema, Ghana</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Trust Indicators -->
                <div class="mt-12 text-center">
                    <div
                        class="flex flex-wrap justify-center items-center gap-8 text-gray-500"
                    >
                        <div class="flex items-center space-x-2">
                            <svg
                                class="w-5 h-5 text-green-500"
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
                            <span class="text-sm font-medium"
                                >5000+ Happy Customers</span
                            >
                        </div>
                        <div class="flex items-center space-x-2">
                            <svg
                                class="w-5 h-5 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                            <span class="text-sm font-medium"
                                >Same Day Delivery</span
                            >
                        </div>
                        <div class="flex items-center space-x-2">
                            <svg
                                class="w-5 h-5 text-green-500"
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
                            <span class="text-sm font-medium"
                                >100% Secure Orders</span
                            >
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-16 bg-linear-to-r from-green-600 to-blue-600">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 class="text-3xl font-bold text-white mb-4">
                    Ready to Start Shopping?
                </h2>
                <p class="text-xl text-green-100 mb-8">
                    Join thousands of happy customers who love our products
                </p>
                <button
                    @click="scrollToProducts"
                    class="bg-white text-green-600 hover:bg-gray-50 px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
                >
                    Shop Now
                </button>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-gray-900 text-white py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div class="col-span-1 md:col-span-2">
                        <h3 class="text-xl font-bold mb-4">WhatsApp Shop</h3>
                        <p class="text-gray-400 mb-4">
                            Your trusted online store with instant WhatsApp
                            ordering. Quality products, fast delivery, and
                            excellent customer service.
                        </p>
                        <div class="flex space-x-4">
                            <a
                                href="#"
                                class="text-gray-400 hover:text-white transition-colors"
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
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 class="font-semibold mb-4">Quick Links</h4>
                        <ul class="space-y-2 text-gray-400">
                            <li>
                                <a
                                    href="#products"
                                    class="hover:text-white transition-colors"
                                    >Products</a
                                >
                            </li>
                            <li>
                                <a
                                    href="#how-it-works"
                                    class="hover:text-white transition-colors"
                                    >How It Works</a
                                >
                            </li>
                            <li>
                                <a
                                    href="#"
                                    class="hover:text-white transition-colors"
                                    >About Us</a
                                >
                            </li>
                            <li>
                                <a
                                    href="#"
                                    class="hover:text-white transition-colors"
                                    >Contact</a
                                >
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 class="font-semibold mb-4">Customer Service</h4>
                        <ul class="space-y-2 text-gray-400">
                            <li>
                                <a
                                    href="#"
                                    class="hover:text-white transition-colors"
                                    >Help Center</a
                                >
                            </li>
                            <li>
                                <a
                                    href="#"
                                    class="hover:text-white transition-colors"
                                    >Shipping Info</a
                                >
                            </li>
                            <li>
                                <a
                                    href="#"
                                    class="hover:text-white transition-colors"
                                    >Returns</a
                                >
                            </li>
                            <li>
                                <a
                                    href="#"
                                    class="hover:text-white transition-colors"
                                    >Privacy Policy</a
                                >
                            </li>
                        </ul>
                    </div>
                </div>

                <div
                    class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
                >
                    <p>&copy; 2024 WhatsApp Shop. All rights reserved.</p>
                </div>
            </div>
        </footer>

        <!-- Floating Cart (Mobile) -->
        <div
            v-if="isCartOpen"
            class="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
            @click="toggleCart"
        >
            <div
                class="fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out"
                @click.stop
            >
                <div class="p-4 border-b">
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-semibold">Shopping Cart</h2>
                        <button
                            @click="toggleCart"
                            class="p-2 hover:bg-gray-100 rounded-full"
                        >
                            <svg
                                class="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="flex-1 overflow-auto p-4">
                    <Cart
                        :cart="cart"
                        @update-quantity="updateCartQuantity"
                        @remove-item="removeFromCart"
                        @scroll-to-products="scrollToProducts"
                    />
                </div>
            </div>
        </div>

        <!-- Desktop Cart Sidebar -->
        <div
            v-if="isCartOpen"
            class="hidden lg:block fixed right-0 top-16 h-[calc(100vh-4rem)] w-96 bg-white shadow-xl border-l z-40 transform transition-transform duration-300 ease-in-out"
        >
            <div class="p-4 border-b">
                <div class="flex items-center justify-between">
                    <h2 class="text-lg font-semibold">Shopping Cart</h2>
                    <button
                        @click="toggleCart"
                        class="p-2 hover:bg-gray-100 rounded-full"
                    >
                        <svg
                            class="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="flex-1 overflow-auto p-4">
                <Cart
                    :cart="cart"
                    @update-quantity="updateCartQuantity"
                    @remove-item="removeFromCart"
                    @scroll-to-products="scrollToProducts"
                />
            </div>
        </div>

        <!-- Toast Notifications -->
        <Toast
            :show="showToast"
            :message="toastMessage"
            :type="toastType"
            @hide="hideToast"
        />
    </div>
</template>

<style scoped>
@keyframes pulse {
    0%,
    100% {
        opacity: 0.2;
    }
    50% {
        opacity: 0.4;
    }
}

.animate-pulse {
    animation: pulse 3s ease-in-out infinite;
}

.delay-1000 {
    animation-delay: 1s;
}

.delay-2000 {
    animation-delay: 2s;
}
</style>
