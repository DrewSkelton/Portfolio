#!/bin/bash

echo "🚀 Setting up Netflix-style Portfolio Carousel..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "🎬 Starting the Netflix-style carousel..."
echo "   The app will open in your browser at http://localhost:3000"
echo ""
echo "💡 Tips:"
echo "   - Use arrow keys to navigate"
echo "   - Hover over cards for details"
echo "   - Click on demo/GitHub links to visit projects"
echo ""

# Start the development server
npm start
