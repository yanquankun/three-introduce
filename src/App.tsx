import "./App.css";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Text,
  Stars,
} from "@react-three/drei";
import styled from "@emotion/styled";
import { ProjectCard } from "./components/ProjectCard";
import { Controls } from "./components/Controls";
import { useState } from "react";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #000;
  position: relative;
`;

const projects = [
  {
    title: "个人博客系统",
    description: "React + Node.js 开发的全栈应用",
    color: "linear-gradient(45deg, #FF6B6B, #FF8E8E)",
    position: [-2, -2, 0] as [number, number, number],
    url: "https://blog.example.com",
  },
  {
    title: "在线协作工具",
    description: "Vue3 + WebSocket 实时协作平台",
    color: "linear-gradient(45deg, #4ECDC4, #45B7AF)",
    position: [0, -2, 0] as [number, number, number],
    url: "https://collab.example.com",
  },
  {
    title: "移动端商城",
    description: "React Native 跨平台应用",
    color: "linear-gradient(45deg, #A8E6CF, #94D3BC)",
    position: [2, -2, 0] as [number, number, number],
    url: "https://shop.example.com",
  },
];

interface SceneProps {
  layoutMode: "grid" | "circle";
}

const Scene = ({ layoutMode }: SceneProps) => {
  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 10]}
        ref={(camera) => {
          if (camera) {
            window.camera = camera;
          }
        }}
      />
      <OrbitControls enableZoom={false} />
      <Stars />
      <Text
        position={[0, 1, 0]}
        fontSize={0.5}
        color="transparent"
        anchorX="center"
        anchorY="middle"
        style={{
          background: 'linear-gradient(to right, #ff0000, #ff8000, #ffff00, #00ff00, #0080ff, #a000ff)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          animation: 'rainbow 6s linear infinite',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          transformStyle: 'preserve-3d',
          transform: 'perspective(1000px) rotateX(10deg)'
        }}
      >
        欢迎来到我的项目展示
      </Text>
      <Text
        position={[0, 2, 0]}
        fontSize={0.8}
        color="transparent"
        anchorX="center"
        anchorY="middle"
        style={{
          background: 'linear-gradient(to right, #ff0000, #ff8000, #ffff00, #00ff00, #0080ff, #a000ff)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          animation: 'rainbow 6s linear infinite',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          transformStyle: 'preserve-3d',
          transform: 'perspective(1000px) rotateX(10deg)'
        }}
      >
        前端开发工程师
      </Text>
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          {...project}
          position={project.position}
          layoutMode={layoutMode}
          index={index}
          totalCards={projects.length}
        />
      ))}
    </>
  );
};

function App() {
  const [layoutMode, setLayoutMode] = useState<"grid" | "circle">("grid");

  return (
    <Container>
      <Canvas>
        <Scene layoutMode={layoutMode} />
      </Canvas>
      <Controls onLayoutChange={() => setLayoutMode(layoutMode === "grid" ? "circle" : "grid")} />
    </Container>
  );
}

export default App;
