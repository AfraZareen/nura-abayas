const fs = require('fs');
const files = ['src/constants.ts', 'src/pages/Home.tsx', 'src/pages/About.tsx', 'src/pages/Checkout.tsx', 'src/pages/Cart.tsx'];
files.forEach(f => {
  let data = fs.readFileSync(f, 'utf8');
  // Replace src="/ with src="./
  data = data.replace(/src="\//g, 'src="./');
  // Replace icon: '/ with icon: './
  data = data.replace(/icon: '\//g, "icon: './");
  // Replace image: '/ with image: './
  data = data.replace(/image: '\//g, "image: './");
  // Replace '/product and '/pexels with './product and './pexels
  data = data.replace(/'\/product/g, "'./product");
  data = data.replace(/'\/pexels/g, "'./pexels");
  fs.writeFileSync(f, data);
  console.log('Fixed', f);
});
