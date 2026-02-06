# 💝 Valentine's Special - Interactive Love Experience

A beautiful, interactive Valentine's Day web application built with React and Vite, featuring two unique romantic experiences.

## ✨ Features

### 🎴 Scratch Card
- **Interactive scratch-off effect** with canvas-based rendering
- **Particle effects** and sparkles while scratching
- **4 reveal stages** with progressive animations
- **Yes/No buttons** with playful interaction:
  - "Yes" button glows and pulses
  - "No" button intelligently dodges your cursor (impossible to click!)
- **Confetti explosion** on reveal
- **Hearts explosion** when "Yes" is clicked

### 📅 Valentine Week Journey
- **8 Days of Love** (Feb 7-14):
  - 🌹 Rose Day
  - 💍 Propose Day
  - 🍫 Chocolate Day
  - 🧸 Teddy Day
  - 🤝 Promise Day
  - 🤗 Hug Day
  - 😘 Kiss Day
  - ❤️ Valentine's Day
- **Date-based unlocking system** - Days unlock progressively
- **Parallax scrolling effects**
- **3D card animations** with morphing gradients
- **Letter-by-letter text animations**
- **Rotating hearts** and emoji rain effects
- **Locked day overlays** with countdown

### 🎨 Design Features
- **3D transforms** and perspective effects
- **Gradient orbs** and particle systems
- **Glitch effects** and rainbow text
- **Elastic animations** with custom easing
- **Responsive design** for all devices
- **Smooth transitions** throughout

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/valentine-special.git
cd valentine-special
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## 🎯 Usage

1. **Main Menu**: Choose between Scratch Card or Valentine Week
2. **Scratch Card**: 
   - Scratch the card to reveal the message
   - Try to click "No" (you can't! 😄)
   - Click "Yes" for a celebration
3. **Valentine Week**:
   - Scroll through the 8 days
   - Days unlock based on the date
   - Click navigation buttons to jump to specific days

## 🛠️ Technologies Used

- **React** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Advanced animations and effects
- **Canvas API** - Scratch card effect
- **JavaScript ES6+** - Modern JavaScript features

## 📱 Responsive Design

Fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🎨 Customization

### Change Unlock Dates
Edit the `unlockDate` in `src/ValentineWeek.jsx`:
```javascript
unlockDate: new Date('2025-02-07') // Change to your desired date
```

### Customize Messages
Edit messages in:
- `src/ScratchCard.jsx` - Scratch card message
- `src/ValentineWeek.jsx` - Day messages

### Modify Colors
Update gradients and colors in:
- `src/App.css`
- `src/ScratchCard.css`
- `src/ValentineWeek.css`

## 📄 License

This project is open source and available under the MIT License.

## 💖 Made with Love

Created with ❤️ for someone special

---

**Note**: This is a romantic web application designed to create memorable Valentine's Day experiences. Feel free to customize it for your loved one!
