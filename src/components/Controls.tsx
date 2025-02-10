import { useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import Stats from 'stats.js'
import gsap from 'gsap'

const ControlsContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1000;
`

const Button = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`

const StatsContainer = styled.div`
  margin-left: 10px;
`

interface ControlsProps {
  onLayoutChange: () => void
}

export const Controls = ({ onLayoutChange }: ControlsProps) => {
  const statsRef = useRef<Stats | null>(null)

  useEffect(() => {
    // 初始化Stats
    statsRef.current = new Stats()
    statsRef.current.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
    const statsEl = statsRef.current.dom
    const container = document.createElement('div')
    container.id = 'stats-container'
    document.body.appendChild(container)
    container.appendChild(statsEl)

    // 开始更新FPS
    function animate() {
      statsRef.current?.update()
      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      if (container && statsEl) {
        container.removeChild(statsEl)
        document.body.removeChild(container)
      }
    }
  }, [])

  const handleResetCamera = () => {
    const camera = window.camera
    if (!camera) return

    // 使用GSAP添加动画效果
    gsap.to(camera.position, {
      duration: 1,
      x: 0,
      y: 0,
      z: 8,
      ease: 'power2.inOut'
    })

    gsap.to(camera.rotation, {
      duration: 1,
      x: 0,
      y: 0,
      z: 0,
      ease: 'power2.inOut'
    })

    // 确保相机朝向原点
    camera.lookAt(0, 0, 0)
  }

  return (
    <ControlsContainer>
      <Button onClick={handleResetCamera}>重置视角</Button>
      <Button onClick={onLayoutChange}>切换布局</Button>
      <StatsContainer id="stats-container" />
    </ControlsContainer>
  )
}