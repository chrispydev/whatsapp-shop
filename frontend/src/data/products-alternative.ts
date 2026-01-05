import type { Product } from "../types";

// Alternative product data with more reliable image sources
// Use this as backup if the main products.ts images don't load

export const alternativeProducts: Product[] = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 250,
        image: "https://picsum.photos/400/300?random=headphones",
        fallbackImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzM0OThmNCIvPgogIDx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+V2lyZWxlc3MgSGVhZHBob25lczwvdGV4dD4KPC9zdmc+",
        category: "Audio",
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 400,
        image: "https://picsum.photos/400/300?random=watch",
        fallbackImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzEwYjk4MSIvPgogIDx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+U21hcnQgV2F0Y2g8L3RleHQ+Cjwvc3ZnPg==",
        category: "Wearables",
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        price: 180,
        image: "https://picsum.photos/400/300?random=speaker",
        fallbackImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzhmNWNmNiIvPgogIDx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Qmx1ZXRvb3RoIFNwZWFrZXI8L3RleHQ+Cjwvc3ZnPg==",
        category: "Audio",
    },
    {
        id: 4,
        name: "Smartphone Case",
        price: 45,
        image: "https://picsum.photos/400/300?random=phonecase",
        fallbackImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y1OWUwYiIvPgogIDx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+U21hcnRwaG9uZSBDYXNlPC90ZXh0Pgo8L3N2Zz4=",
        category: "Accessories",
    },
    {
        id: 5,
        name: "Wireless Charger",
        price: 75,
        image: "https://picsum.photos/400/300?random=charger",
        fallbackImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2VmNDQ0NCIvPgogIDx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+V2lyZWxlc3MgQ2hhcmdlcjwvdGV4dD4KPC9zdmc+",
        category: "Charging",
    },
    {
        id: 6,
        name: "Gaming Mouse",
        price: 120,
        image: "https://picsum.photos/400/300?random=mouse",
        fallbackImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzYzNjZmMSIvPgogIDx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+R2FtaW5nIE1vdXNlPC90ZXh0Pgo8L3N2Zz4=",
        category: "Gaming",
    },
    {
        id: 7,
        name: "Laptop Stand",
        price: 85,
        image: "https://picsum.photos/400/300?random=laptopstand",
        fallbackImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzA2YjZkNCIvPgogIDx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TGFwdG9wIFN0YW5kPC90ZXh0Pgo8L3N2Zz4=",
        category: "Accessories",
    },
    {
        id: 8,
        name: "USB-C Hub",
        price: 65,
        image: "https://picsum.photos/400/300?random=usbhub",
        fallbackImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzg0Y2M2ZiIvPgogIDx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+VVNCLUMgSHViPC90ZXh0Pgo8L3N2Zz4=",
        category: "Accessories",
    },
    {
        id: 9,
        name: "Portable Power Bank",
        price: 55,
        image: "https://picsum.photos/400/300?random=powerbank",
        fallbackImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2ZiN2IxOSIvPgogIDx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UG9ydGFibGUgUG93ZXIgQmFuazwvdGV4dD4KPC9zdmc+",
        category: "Charging",
    },
    {
        id: 10,
        name: "Webcam HD",
        price: 90,
        image: "https://picsum.photos/400/300?random=webcam",
        fallbackImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y0M2Y1ZSIvPgogIDx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+V2ViY2FtIEhEPC90ZXh0Pgo8L3N2Zz4=",
        category: "Electronics",
    },
    {
        id: 11,
        name: "Mechanical Keyboard",
        price: 150,
        image: "https://picsum.photos/400/300?random=keyboard",
        fallbackImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzM3NDE1MSIvPgogIDx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TWVjaGFuaWNhbCBLZXlib2FyZDwvdGV4dD4KPC9zdmc+",
        category: "Accessories",
    },
    {
        id: 12,
        name: "Phone Tripod",
        price: 35,
        image: "https://picsum.photos/400/300?random=tripod",
        fallbackImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzljMjc0OSIvPgogIDx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UGhvbmUgVHJpcG9kPC90ZXh0Pgo8L3N2Zz4=",
        category: "Photography",
    },
];

// Static image data URLs for ultimate fallback (these will always work)
export const staticFallbackImages = {
    default: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmM2Y0ZjY7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6I2U1ZTdlYjtzdG9wLW9wYWNpdHk6MSIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSJ1cmwoI2dyYWQpIi8+CiAgPGNpcmNsZSBjeD0iMjAwIiBjeT0iMTIwIiByPSIzMCIgZmlsbD0iIzljYTNhZiIgb3BhY2l0eT0iMC41Ii8+CiAgPHRleHQgeD0iMjAwIiB5PSIxODAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIFVuYXZhaWxhYmxlPC90ZXh0Pgo8L3N2Zz4=",

    audio: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzM0OThmNCIvPgogIDxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IndoaXRlIiBvcGFjaXR5PSIwLjIiLz4KICA8cGF0aCBkPSJNMTcwIDEyMGgxMHY2MGgtMTB6bTIwIDBoMTB2NjBoLTEwem0yMCAwaDEwdjYwaC0xMHoiIGZpbGw9IndoaXRlIiBvcGFjaXR5PSIwLjgiLz4KICA8dGV4dCB4PSIyMDAiIHk9IjIyMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QXVkaW8gRGV2aWNlPC90ZXh0Pgo8L3N2Zz4=",

    electronics: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzEwYjk4MSIvPgogIDxyZWN0IHg9IjE1MCIgeT0iMTAwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiByeD0iMTAiIGZpbGw9IndoaXRlIiBvcGFjaXR5PSIwLjIiLz4KICA8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxNDAiIHI9IjE1IiBmaWxsPSJ3aGl0ZSIgb3BhY2l0eT0iMC44Ii8+CiAgPHRleHQgeD0iMjAwIiB5PSIyMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkVsZWN0cm9uaWMgRGV2aWNlPC90ZXh0Pgo8L3N2Zz4=",

    accessory: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y1OWUwYiIvPgogIDxwb2x5Z29uIHBvaW50cz0iMjAwLDEwMCAyMzAsMTQwIDE3MCwxNDAiIGZpbGw9IndoaXRlIiBvcGFjaXR5PSIwLjMiLz4KICA8cG9seWdvbiBwb2ludHM9IjIwMCwyMDAgMTcwLDE2MCAyMzAsMTYwIiBmaWxsPSJ3aGl0ZSIgb3BhY2l0eT0iMC4zIi8+CiAgPHRleHQgeD0iMjAwIiB5PSIyNDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkFjY2Vzc29yeTwvdGV4dD4KPC9zdmc+"
};

// Function to get the most appropriate fallback based on category
export function getCategoryFallback(category?: string): string {
    if (!category) return staticFallbackImages.default;

    const categoryLower = category.toLowerCase();

    if (categoryLower.includes('audio')) return staticFallbackImages.audio;
    if (categoryLower.includes('electronic')) return staticFallbackImages.electronics;
    if (categoryLower.includes('accessory') || categoryLower.includes('accessories')) return staticFallbackImages.accessory;

    return staticFallbackImages.default;
}

// Export both for flexibility
export { alternativeProducts as products };
