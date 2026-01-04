// Test script to verify all product image URLs are working
// Run with: node test-images.js

const https = require('https');
const http = require('http');

// Product image URLs to test
const imageUrls = [
    // Primary images from Unsplash
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    "https://images.unsplash.com/photo-1609592282030-8bb2d049e0e9?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop&crop=center&auto=format&q=80",

    // Fallback images from Picsum
    "https://picsum.photos/400/300?random=1",
    "https://picsum.photos/400/300?random=2",
    "https://picsum.photos/400/300?random=3"
];

const productNames = [
    "Wireless Headphones",
    "Smart Watch",
    "Bluetooth Speaker",
    "Smartphone Case",
    "Wireless Charger",
    "Gaming Mouse",
    "Laptop Stand",
    "USB-C Hub",
    "Portable Power Bank",
    "Webcam HD",
    "Mechanical Keyboard",
    "Phone Tripod",
    "Fallback Image 1",
    "Fallback Image 2",
    "Fallback Image 3"
];

console.log('🖼️  Testing product image URLs...\n');

function testImage(url, name, index) {
    return new Promise((resolve) => {
        const client = url.startsWith('https:') ? https : http;

        const req = client.request(url, { method: 'HEAD', timeout: 10000 }, (res) => {
            const status = res.statusCode;
            const contentType = res.headers['content-type'];

            if (status >= 200 && status < 300) {
                if (contentType && contentType.startsWith('image/')) {
                    console.log(`✅ ${index + 1}. ${name}`);
                    console.log(`    Status: ${status} | Type: ${contentType}`);
                } else {
                    console.log(`⚠️  ${index + 1}. ${name}`);
                    console.log(`    Status: ${status} | Type: ${contentType} (Not an image)`);
                }
            } else {
                console.log(`❌ ${index + 1}. ${name}`);
                console.log(`    Status: ${status} | Error: HTTP ${status}`);
            }
            resolve();
        });

        req.on('error', (err) => {
            console.log(`❌ ${index + 1}. ${name}`);
            console.log(`    Error: ${err.message}`);
            resolve();
        });

        req.on('timeout', () => {
            console.log(`⏱️  ${index + 1}. ${name}`);
            console.log(`    Error: Request timeout`);
            req.destroy();
            resolve();
        });

        req.end();
    });
}

async function testAllImages() {
    const promises = imageUrls.map((url, index) =>
        testImage(url, productNames[index], index)
    );

    await Promise.all(promises);

    console.log('\n🎯 Image URL Test Summary:');
    console.log('✅ = Image loaded successfully');
    console.log('⚠️  = URL accessible but not an image');
    console.log('❌ = Failed to load');
    console.log('⏱️  = Request timeout\n');

    console.log('💡 Tips for fixing image issues:');
    console.log('- Check if your internet connection is stable');
    console.log('- Try opening the URLs directly in your browser');
    console.log('- Replace failed URLs with working alternatives');
    console.log('- Consider hosting images locally for better reliability\n');

    console.log('🔗 Alternative image sources:');
    console.log('- Unsplash: https://unsplash.com/');
    console.log('- Pexels: https://www.pexels.com/');
    console.log('- Pixabay: https://pixabay.com/');
    console.log('- Lorem Picsum: https://picsum.photos/');
}

// Run the test
testAllImages().catch(console.error);
