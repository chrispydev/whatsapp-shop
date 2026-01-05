<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

const props = defineProps<{
    show: boolean;
    message: string;
    type?: "success" | "error" | "info" | "warning";
    duration?: number;
}>();

const emit = defineEmits<{
    (e: "hide"): void;
}>();

const visible = ref(false);
const timeoutId = ref<number | null>(null);

const typeClasses = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
};

const iconPaths = {
    success: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    error: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
    info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    warning:
        "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z",
};

const hideToast = () => {
    visible.value = false;
    setTimeout(() => {
        emit("hide");
    }, 300); // Wait for animation to complete
};

const startTimer = () => {
    if (timeoutId.value) {
        clearTimeout(timeoutId.value);
    }

    const duration = props.duration || 3000;
    timeoutId.value = window.setTimeout(() => {
        hideToast();
    }, duration);
};

watch(
    () => props.show,
    (newShow) => {
        if (newShow) {
            visible.value = true;
            startTimer();
        } else {
            visible.value = false;
        }
    },
    { immediate: true },
);

onMounted(() => {
    if (props.show) {
        visible.value = true;
        startTimer();
    }
});
</script>

<template>
    <Teleport to="body">
        <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-2 scale-95"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="transition-all duration-300 ease-in"
            leave-from-class="opacity-100 translate-y-0 scale-100"
            leave-to-class="opacity-0 translate-y-2 scale-95"
        >
            <div
                v-if="visible"
                class="fixed top-4 right-4 z-50 max-w-sm w-full"
            >
                <div
                    :class="[
                        'rounded-lg border shadow-lg p-4',
                        typeClasses[type || 'info'],
                    ]"
                >
                    <div class="flex items-start">
                        <div class="shrink-0">
                            <svg
                                class="w-5 h-5 mt-0.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    :d="iconPaths[type || 'info']"
                                />
                            </svg>
                        </div>
                        <div class="ml-3 flex-1">
                            <p class="text-sm font-medium">{{ message }}</p>
                        </div>
                        <div class="ml-4 shrink-0 flex">
                            <button
                                @click="hideToast"
                                class="rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <span class="sr-only">Close</span>
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
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Progress bar -->
                    <div
                        class="mt-2 w-full bg-black/10 rounded-full h-1 overflow-hidden"
                    >
                        <div
                            class="h-full bg-current opacity-50 rounded-full animate-shrink"
                            :style="{
                                animationDuration: `${duration || 3000}ms`,
                            }"
                        ></div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
@keyframes shrink {
    from {
        width: 100%;
    }
    to {
        width: 0%;
    }
}

.animate-shrink {
    animation: shrink linear forwards;
}
</style>
