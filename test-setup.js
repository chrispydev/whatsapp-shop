// Simple test script to verify project functionality
// Run with: node test-setup.js

console.log("🚀 Testing WhatsApp Shop setup...\n");

// Test 1: Check if required files exist
const fs = require("fs");
const path = require("path");

const requiredFiles = [
    "package.json",
    "src/main.ts",
    "src/App.vue",
    "src/components/ProductCard.vue",
    "src/components/Cart.vue",
    "src/components/Toast.vue",
    "src/data/products.ts",
    "src/types/index.ts",
    "src/assets/main.css",
    "index.html",
];

console.log("✅ Checking required files...");
let allFilesExist = true;

requiredFiles.forEach((file) => {
    if (fs.existsSync(file)) {
        console.log(`   ✓ ${file}`);
    } else {
        console.log(`   ✗ ${file} - MISSING`);
        allFilesExist = false;
    }
});

if (allFilesExist) {
    console.log("\n✅ All required files are present!\n");
} else {
    console.log("\n❌ Some required files are missing!\n");
    process.exit(1);
}

// Test 2: Check package.json dependencies
console.log("✅ Checking dependencies...");
try {
    const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
    const requiredDeps = ["vue", "tailwindcss"];
    const requiredDevDeps = ["vite", "@vitejs/plugin-vue", "typescript"];

    requiredDeps.forEach((dep) => {
        if (packageJson.dependencies && packageJson.dependencies[dep]) {
            console.log(`   ✓ ${dep}: ${packageJson.dependencies[dep]}`);
        } else {
            console.log(`   ✗ ${dep} - MISSING in dependencies`);
        }
    });

    requiredDevDeps.forEach((dep) => {
        if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
            console.log(`   ✓ ${dep}: ${packageJson.devDependencies[dep]}`);
        } else {
            console.log(`   ✗ ${dep} - MISSING in devDependencies`);
        }
    });

    console.log("\n✅ Dependencies check completed!\n");
} catch (error) {
    console.log("❌ Error reading package.json:", error.message);
}

// Test 3: Verify product data structure
console.log("✅ Checking product data structure...");
try {
    // Read the products file content as text to avoid import issues
    const productsContent = fs.readFileSync("src/data/products.ts", "utf8");

    if (productsContent.includes("export const products")) {
        console.log("   ✓ Products export found");
    } else {
        console.log("   ✗ Products export not found");
    }

    if (
        productsContent.includes("id:") &&
        productsContent.includes("name:") &&
        productsContent.includes("price:") &&
        productsContent.includes("image:")
    ) {
        console.log(
            "   ✓ Product structure appears correct (id, name, price, image)",
        );
    } else {
        console.log("   ✗ Product structure may be incomplete");
    }

    console.log("\n✅ Product data check completed!\n");
} catch (error) {
    console.log("❌ Error reading products file:", error.message);
}

// Test 4: Check TypeScript configuration
console.log("✅ Checking TypeScript configuration...");
try {
    if (fs.existsSync("tsconfig.json") && fs.existsSync("tsconfig.app.json")) {
        console.log("   ✓ TypeScript configuration files found");
    } else {
        console.log("   ✗ TypeScript configuration files missing");
    }

    const envDts = fs.readFileSync("env.d.ts", "utf8");
    if (envDts.includes('declare module "*.vue"')) {
        console.log("   ✓ Vue module declaration found in env.d.ts");
    } else {
        console.log("   ✗ Vue module declaration missing in env.d.ts");
    }

    console.log("\n✅ TypeScript configuration check completed!\n");
} catch (error) {
    console.log("❌ Error checking TypeScript configuration:", error.message);
}

// Test 5: Check Vite configuration
console.log("✅ Checking Vite configuration...");
try {
    const viteConfig = fs.readFileSync("vite.config.ts", "utf8");

    if (viteConfig.includes("@vitejs/plugin-vue")) {
        console.log("   ✓ Vue plugin configured");
    } else {
        console.log("   ✗ Vue plugin not found in Vite config");
    }

    if (viteConfig.includes("tailwindcss")) {
        console.log("   ✓ Tailwind CSS configured");
    } else {
        console.log("   ✗ Tailwind CSS not found in Vite config");
    }

    if (viteConfig.includes("'@': fileURLToPath")) {
        console.log("   ✓ Path aliases configured");
    } else {
        console.log("   ✗ Path aliases not configured");
    }

    console.log("\n✅ Vite configuration check completed!\n");
} catch (error) {
    console.log("❌ Error checking Vite configuration:", error.message);
}

console.log("🎉 Professional WhatsApp Shop setup verification completed!");
console.log("\n📋 Next Steps:");
console.log('1. Run "npm install" to install dependencies');
console.log(
    "2. Update the WhatsApp phone number in src/components/Cart.vue (line ~74)",
);
console.log('3. Run "npm run dev" to start the development server');
console.log("4. Visit http://localhost:5173 to see your professional shop");
console.log("\n✨ Professional Features Included:");
console.log("- Hero section with animated elements");
console.log("- Features section highlighting benefits");
console.log("- How it works step-by-step guide");
console.log("- Customer testimonials for credibility");
console.log("- Professional product cards with hover effects");
console.log("- Advanced shopping cart with quantity controls");
console.log("- Toast notifications for better UX");
console.log("- Responsive design for all devices");
console.log("- Professional footer with links");
console.log("\n💡 Customization Tips:");
console.log("- Update products in src/data/products.ts");
console.log("- Modify testimonials to match your customers");
console.log("- Customize colors in Tailwind classes");
console.log("- Replace placeholder images with real product photos");
console.log("- Update business information in footer");
console.log("- Test WhatsApp integration with your business number");
