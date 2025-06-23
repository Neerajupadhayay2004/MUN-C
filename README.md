# 🏢 MUN-C Inventory Management System

A comprehensive, modern inventory management system built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. Features include product management, QR code scanning, dark mode, real-time notifications, and advanced inventory tracking.

![MUN-C Dashboard](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.0-38B2AC)

## 🌟 Features

### 📦 **Product Management**
- ✅ **Dynamic Product Types**: Simple, Variable, and Bundle products
- ✅ **Goods & Services**: Support for both physical products and services
- ✅ **Advanced Variants**: Color, size, material variations with individual pricing
- ✅ **Bundle Products**: Multiple items sold together with automatic pricing
- ✅ **QR Code Integration**: Barcode and EAN scanning/generation
- ✅ **Image Management**: Multiple images per product and variant
- ✅ **SEO Optimization**: Meta titles, descriptions, and AI-powered keywords

### 📊 **Inventory Tracking**
- ✅ **Real-time Stock Management**: Current, minimum, and maximum stock levels
- ✅ **Low Stock Alerts**: Automatic notifications for reorder levels
- ✅ **Serial & Batch Tracking**: Advanced tracking for variable products
- ✅ **Multi-warehouse Support**: Location-based inventory management
- ✅ **Lead Time Management**: Supplier delivery time tracking

### 💰 **Pricing & Tax**
- ✅ **Dynamic Pricing**: Purchase, selling, wholesale, and discount pricing
- ✅ **Tax Management**: GST, HSN/SAC codes, and tax-inclusive pricing
- ✅ **Profit Margin Calculation**: Real-time profit analysis
- ✅ **Bulk Pricing Tiers**: Multiple discount levels for wholesale

### 📱 **User Experience**
- ✅ **Dark/Light Mode**: Seamless theme switching with persistence
- ✅ **Responsive Design**: Mobile-first approach for all devices
- ✅ **Real-time Notifications**: Success, error, and info notifications
- ✅ **Advanced Search**: Filter by category, type, and product attributes
- ✅ **Grid/List Views**: Flexible product display options

### 🔐 **Authentication & Security**
- ✅ **User Authentication**: Login/signup with role-based access
- ✅ **Local Storage**: Secure data persistence
- ✅ **Session Management**: Automatic logout and session handling

### 📈 **Analytics & Reports**
- ✅ **Dashboard Analytics**: Sales, stock, and performance metrics
- ✅ **Sales Management**: Order tracking and customer management
- ✅ **Document Management**: Invoice, receipt, and report storage
- ✅ **Export Capabilities**: Data export for external analysis

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- Modern web browser with JavaScript enabled

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/Neerajupadhayay2004/munc-inventory-system.git
   cd munc-inventory-system
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   # Using npm
   npm install --legacy-peer-deps
   
   # Or using yarn
   yarn install
   \`\`\`

3. **Start development server**
   \`\`\`bash
   # Using npm
   npm run dev
   
   # Or using yarn
   yarn dev
   \`\`\`

4. **Open your browser**
   \`\`\`
   http://localhost:3000
   \`\`\`

### Build for Production

\`\`\`bash
# Build the application
npm run build

# Start production server
npm start
\`\`\`

## 📁 Project Structure

\`\`\`
munc-inventory-system/
├── 📁 app/                    # Next.js App Router
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── 📁 src/                   # Source code
│   ├── 📁 components/        # React components
│   │   ├── 📁 form-steps/    # Multi-step form components
│   │   ├── AddProduct.tsx    # Product creation form
│   │   ├── Dashboard.tsx     # Main dashboard
│   │   ├── Header.tsx        # Navigation header
│   │   ├── ProductCard.tsx   # Product display card
│   │   ├── QRScanner.tsx     # QR code scanner
│   │   └── Sidebar.tsx       # Navigation sidebar
│   ├── 📁 contexts/          # React contexts
│   │   └── AuthContext.tsx   # Authentication context
│   ├── 📁 types/             # TypeScript definitions
│   │   ├── auth.ts           # Auth types
│   │   └── product.ts        # Product types
│   └── App.tsx               # Main application
├── 📁 public/                # Static assets
├── package.json              # Dependencies
├── tailwind.config.js        # Tailwind configuration
├── next.config.mjs           # Next.js configuration
└── README.md                 # This file
\`\`\`

## 🎯 Usage Guide

### 1. **Getting Started**
- Sign up for a new account or login with existing credentials
- The dashboard provides an overview of your inventory status
- Use the sidebar to navigate between different sections

### 2. **Adding Products**
- Click "Add Product" button in the header or sidebar
- Choose between **Goods** (physical products) or **Services**
- Select product type:
  - **Simple**: Single product without variations
  - **Variable**: Product with multiple variants (color, size, etc.)
  - **Bundle**: Multiple products sold together

### 3. **Product Configuration**
- **Step 1**: General information, categories, and suppliers
- **Step 2**: Pricing, tax rates, and profit margins
- **Step 3**: Descriptions, images, and SEO optimization
- **Step 4**: Variants or bundle configuration

### 4. **QR Code Features**
- Scan existing barcodes/EAN codes using the camera
- Generate random codes for new products
- Upload QR code images for processing
- Manual code entry for offline scenarios

### 5. **Inventory Management**
- Monitor stock levels in real-time
- Receive low stock notifications
- Track products across multiple warehouses
- Manage reorder levels and lead times

## 🛠️ Technology Stack

### **Frontend**
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript development
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library

### **State Management**
- **React Context**: Global state management
- **Local Storage**: Data persistence
- **React Hooks**: Component state management

### **Development Tools**
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## 🎨 Customization

### **Theme Configuration**
\`\`\`typescript
// Modify theme in src/contexts/AuthContext.tsx
const toggleTheme = () => {
  const newTheme = theme === "light" ? "dark" : "light"
  // Custom theme logic here
}
\`\`\`

### **Adding New Product Types**
\`\`\`typescript
// Extend product types in src/types/product.ts
export interface Product {
  // Add new fields here
  customField?: string
}
\`\`\`

### **Custom Components**
\`\`\`typescript
// Create new components in src/components/
export const CustomComponent: React.FC = () => {
  return <div>Your custom component</div>
}
\`\`\`

## 📊 Sample Data

The application comes with pre-loaded sample data including:

- **5 Sample Products**: Mix of goods and services
- **Variable Products**: Headphones with color variants
- **Bundle Products**: Office starter package
- **Service Packages**: Technical consultation bundles
- **Stock Data**: Realistic inventory levels
- **Sales Records**: Sample transaction history

## 🔧 Configuration

### **Environment Variables**
Create a `.env.local` file for custom configuration:

\`\`\`env
# Application Settings
NEXT_PUBLIC_APP_NAME=MUN-C Inventory System
NEXT_PUBLIC_APP_VERSION=1.0.0

# API Configuration (if needed)
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Feature Flags
NEXT_PUBLIC_ENABLE_QR_SCANNER=true
NEXT_PUBLIC_ENABLE_DARK_MODE=true
\`\`\`

### **Tailwind Customization**
\`\`\`javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Add your custom colors
        brand: {
          primary: '#3B82F6',
          secondary: '#10B981',
        }
      }
    }
  }
}
\`\`\`

## 🚨 Troubleshooting

### **Common Issues**

1. **Dependency Conflicts**
   \`\`\`bash
   rm -rf node_modules package-lock.json
   npm install --legacy-peer-deps
   \`\`\`

2. **PostCSS Configuration Error**
   \`\`\`bash
   # Ensure postcss.config.js exports plugins correctly
   module.exports = {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     },
   }
   \`\`\`

3. **Dark Mode Not Working**
   \`\`\`bash
   # Check if 'dark' class is applied to <html> element
   # Verify theme persistence in localStorage
   \`\`\`

4. **Build Errors**
   \`\`\`bash
   rm -rf .next
   npm run build
   \`\`\`

### **Performance Optimization**

- **Image Optimization**: Use Next.js Image component for better performance
- **Code Splitting**: Components are automatically code-split
- **Lazy Loading**: Implement for large product lists
- **Caching**: Browser caching for static assets

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   \`\`\`bash
   git checkout -b feature/amazing-feature
   \`\`\`
3. **Commit your changes**
   \`\`\`bash
   git commit -m 'Add amazing feature'
   \`\`\`
4. **Push to the branch**
   \`\`\`bash
   git push origin feature/amazing-feature
   \`\`\`
5. **Open a Pull Request**

### **Development Guidelines**

- Follow TypeScript best practices
- Use meaningful component and variable names
- Add comments for complex logic
- Ensure responsive design for all components
- Test dark mode compatibility
- Maintain consistent code formatting

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing React framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icon library
- **Vercel** for hosting and deployment platform

## 📞 Support

For support and questions:

- 📧 **Email**: support@munc-inventory.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/Neerajupadhayay2004/munc-inventory-system/issues)
- 📖 **Documentation**: [Wiki](https://github.com/Neerajupadhayay2004/munc-inventory-system/wiki)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/Neerajupadhayay2004/munc-inventory-system/discussions)

## 🗺️ Roadmap

### **Version 2.0 (Upcoming)**
- [ ] **Database Integration**: PostgreSQL/MongoDB support
- [ ] **API Development**: RESTful API for external integrations
- [ ] **Advanced Analytics**: Charts and detailed reports
- [ ] **Multi-user Support**: Team collaboration features
- [ ] **Mobile App**: React Native companion app
- [ ] **Barcode Printing**: Label generation and printing
- [ ] **Import/Export**: CSV/Excel data handling
- [ ] **Advanced Search**: Elasticsearch integration

### **Version 2.1**
- [ ] **Supplier Management**: Vendor relationship management
- [ ] **Purchase Orders**: Automated ordering system
- [ ] **Audit Trails**: Complete activity logging
- [ ] **Role-based Permissions**: Granular access control
- [ ] **Multi-language Support**: Internationalization
- [ ] **Cloud Storage**: AWS S3/Google Cloud integration

---

<div align="center">

**Made with ❤️ by the MUN-C Team**

[⭐ Star this repo](https://github.com/Neerajupadhayay2004/munc-inventory-system) | [🐛 Report Bug](https://github.com/Neerajupadhayay2004/munc-inventory-system/issues) | [✨ Request Feature](https://github.com/Neerajupadhayay2004/munc-inventory-system/issues)

</div>
