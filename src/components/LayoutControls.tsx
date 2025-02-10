import { Html } from '@react-three/drei'
import { useState } from 'react'

interface LayoutControlsProps {
  onLayoutChange: (mode: 'grid' | 'circle') => void
}

export const LayoutControls = ({ onLayoutChange }: LayoutControlsProps) => {
  const [currentLayout, setCurrentLayout] = useState<'grid' | 'circle'>('grid')

  const toggleLayout = () => {
    const newLayout = currentLayout === 'grid' ? 'circle' : 'grid'
    setCurrentLayout(newLayout)
    onLayoutChange(newLayout)
  }

  return (
    <Html position={[8, 5, 0]} style={{ pointerEvents: 'auto' }}>
      <button
        onClick={toggleLayout}
        style={{
          padding: '8px 16px',
          backgroundColor: '#1a1a1a',
          color: '#ffffff',
          border: '1px solid #333',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#333'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#1a1a1a'
        }}
      >
        {currentLayout === 'grid' ? '切换到圆形布局' : '切换到网格布局'}
      </button>
    </Html>
  )
}