# Contributing to MUN-C Inventory Management System

Thank you for your interest in contributing to MUN-C! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn package manager
- Git
- Code editor (VS Code recommended)

### Development Setup

1. **Fork and Clone**
   \`\`\`bash
   git clone https://github.com/Neerajupadhayay2004/munc-inventory-system.git
   cd munc-inventory-system
   \`\`\`

2. **Install Dependencies**
   \`\`\`bash
   npm install --legacy-peer-deps
   \`\`\`

3. **Start Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

## 📋 How to Contribute

### 🐛 Reporting Bugs

1. Check if the bug has already been reported
2. Use the bug report template
3. Include:
   - Clear description of the issue
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, Node version)

### ✨ Suggesting Features

1. Check existing feature requests
2. Use the feature request template
3. Explain:
   - The problem you're trying to solve
   - Your proposed solution
   - Alternative solutions considered
   - Additional context

### 🔧 Code Contributions

1. **Create a Branch**
   \`\`\`bash
   git checkout -b feature/your-feature-name
   \`\`\`

2. **Make Changes**
   - Follow the coding standards
   - Add tests if applicable
   - Update documentation

3. **Commit Changes**
   \`\`\`bash
   git commit -m "feat: add amazing new feature"
   \`\`\`

4. **Push and Create PR**
   \`\`\`bash
   git push origin feature/your-feature-name
   \`\`\`

## 📝 Coding Standards

### TypeScript Guidelines
- Use strict TypeScript configuration
- Define proper interfaces and types
- Avoid `any` type usage
- Use meaningful variable and function names

### React Best Practices
- Use functional components with hooks
- Implement proper error boundaries
- Follow React naming conventions
- Use TypeScript for prop definitions

### CSS/Styling
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain dark mode compatibility
- Use consistent spacing and colors

### File Organization
\`\`\`
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts
├── types/              # TypeScript definitions
├── utils/              # Utility functions
└── hooks/              # Custom React hooks
\`\`\`

## 🧪 Testing

### Running Tests
\`\`\`bash
npm run test
npm run test:watch
npm run test:coverage
\`\`\`

### Writing Tests
- Write unit tests for utility functions
- Add integration tests for components
- Include edge cases and error scenarios
- Maintain good test coverage

## 📚 Documentation

### Code Documentation
- Add JSDoc comments for functions
- Document complex logic
- Include usage examples
- Keep README.md updated

### Component Documentation
\`\`\`typescript
/**
 * ProductCard component for displaying product information
 * @param product - Product data object
 * @param onEdit - Callback function for edit action
 * @param onDelete - Callback function for delete action
 */
export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete
}) => {
  // Component implementation
}
\`\`\`

## 🎯 Pull Request Process

### Before Submitting
- [ ] Code follows project standards
- [ ] Tests pass locally
- [ ] Documentation is updated
- [ ] No console errors or warnings
- [ ] Dark mode compatibility verified
- [ ] Mobile responsiveness checked

### PR Template
\`\`\`markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] Cross-browser testing done

## Screenshots
Include screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
\`\`\`

## 🏷️ Commit Message Convention

Use conventional commits format:

\`\`\`
type(scope): description

[optional body]

[optional footer]
\`\`\`

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples
\`\`\`bash
feat(auth): add user authentication system
fix(dashboard): resolve dark mode toggle issue
docs(readme): update installation instructions
style(components): improve button styling consistency
\`\`\`

## 🌟 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation
- Special contributor badges

## 📞 Getting Help

- **Discord**: [Join our community](https://discord.gg/munc-inventory)
- **GitHub Discussions**: Ask questions and share ideas
- **Email**: dev@munc-inventory.com

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to MUN-C Inventory Management System! 🎉
