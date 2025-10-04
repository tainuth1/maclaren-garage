# McLaren Garage - 3D Showcase

A stunning 3D McLaren garage showcase built with Vite and Three.js, featuring realistic car models, environment mapping, and advanced lighting.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

- `src/main.js` - Main Three.js application with McLaren garage scene
- `src/style.css` - Full-screen 3D canvas styling
- `index.html` - HTML entry point
- `vite.config.js` - Vite configuration
- `public/models/` - 3D model assets (garage.glb, mclaren.glb)

## Features

### 🚗 **3D Models**

- **McLaren Car Model** - Detailed GLTF model with realistic materials
- **Garage Environment** - Complete garage scene with proper lighting
- **Glass Materials** - Advanced PBR glass with transmission, IOR, and tinting

### 🎨 **Advanced Rendering**

- **Environment Mapping** - Real-time cube reflection mapping
- **PBR Materials** - Physically Based Rendering with proper material properties
- **ACES Filmic Tone Mapping** - Professional color grading
- **Physically Correct Lights** - Realistic lighting calculations

### 🎮 **Interactive Controls**

- **Orbit Controls** - Smooth camera movement with constrained angles
- **Responsive Design** - Adapts to window resizing
- **Optimized Viewing** - Pre-configured camera limits for best viewing experience

### 🔧 **Technical Features**

- **GLTF Loader** - Efficient 3D model loading
- **Shadow Mapping** - Realistic shadows with soft edges
- **Material Optimization** - Automatic material enhancement for reflections
- **Performance Optimized** - Efficient rendering pipeline

## Model Details

### McLaren Car

- **Scale**: 0.7x (optimized for garage fit)
- **Position**: Centered in garage
- **Materials**: Enhanced with environment mapping and glass properties
- **Glass Effects**: Windshield with transmission, IOR, and dark tinting

### Garage Environment

- **Lighting**: Ambient + multiple point lights (configurable)
- **Materials**: All surfaces enhanced with reflection mapping
- **Optimization**: Hidden unnecessary geometry for performance

## Controls

- **Mouse Drag**: Rotate camera around the scene
- **Mouse Wheel**: Zoom in/out (constrained between 3.5-4.5 units)
- **Constrained Movement**: Limited azimuth and polar angles for optimal viewing

## Development

The project uses modern ES modules and Vite for fast development with hot module replacement. All 3D assets are optimized GLTF models with proper material definitions.

Perfect for showcasing McLaren vehicles in an immersive 3D environment!
