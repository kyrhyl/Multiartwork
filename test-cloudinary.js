const { v2: cloudinary } = require('cloudinary');
require('dotenv').config({ path: '.env.local' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('Testing Cloudinary connection...');
console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('API Key:', process.env.CLOUDINARY_API_KEY ? '***' + process.env.CLOUDINARY_API_KEY.slice(-4) : 'NOT SET');
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? '***' + process.env.CLOUDINARY_API_SECRET.slice(-4) : 'NOT SET');
console.log('');

// Test connection by fetching account details
cloudinary.api.ping()
  .then((result) => {
    console.log('✅ Cloudinary connection successful!');
    console.log('Response:', result);
    
    // Try to get usage stats
    return cloudinary.api.usage();
  })
  .then((usage) => {
    console.log('\n📊 Account Usage:');
    console.log('Plan:', usage.plan);
    console.log('Resources:', usage.resources);
    console.log('Bandwidth:', usage.bandwidth);
    console.log('Storage:', usage.storage);
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Cloudinary connection failed!');
    console.error('Error:', error.message);
    if (error.error) {
      console.error('Details:', error.error);
    }
    process.exit(1);
  });
