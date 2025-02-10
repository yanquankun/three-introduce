import { Text } from "@react-three/drei";
import { useRef, useState } from "react";
import { Mesh, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";

interface ProjectCardProps {
  position: [number, number, number];
  title: string;
  description: string;
  color: string;
  layoutMode?: "grid" | "circle";
  index?: number;
  totalCards?: number;
  url: string;
}

export const ProjectCard = ({
  position,
  title,
  description,
  color,
  layoutMode = "grid",
  index = 0,
  totalCards = 1,
  url,
}: ProjectCardProps) => {
  const meshRef = useRef<Mesh>(null);
  const [groupHovered, setGroupHovered] = useState(false);

  const handleClick = () => {
    if (url) {
      // 防止重复点击
      const currentTime = Date.now();
      if (meshRef.current) {
        if (
          !meshRef.current.userData.lastClickTime ||
          currentTime - meshRef.current.userData.lastClickTime > 1000
        ) {
          meshRef.current.userData.lastClickTime = currentTime;
          window.open(url, "_blank");
        }
      }
    }
  };

  useFrame((state) => {
    if (meshRef.current) {
      if (layoutMode === "circle") {
        // 计算圆形布局的位置
        const radius = 2.3; // 圆的半径，从3.5减小到2.3
        const angle =
          (index / totalCards) * Math.PI * 2 +
          state.clock.getElapsedTime() * 0.5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const targetPosition = new Vector3(x, position[1], z);

        // 平滑过渡到目标位置
        meshRef.current.position.lerp(targetPosition, 0.05);

        // 始终面向圆心
        meshRef.current.lookAt(0, position[1], 0);
      } else {
        // 网格布局模式
        const targetPosition = new Vector3(
          position[0],
          position[1],
          position[2]
        );
        meshRef.current.position.lerp(targetPosition, 0.05);
        meshRef.current.rotation.y += groupHovered ? 0.02 : 0.005; // 悬停时加快旋转速度
      }
    }
  });

  return (
    <group
      onPointerOver={() => setGroupHovered(true)}
      onPointerOut={() => setGroupHovered(false)}
    >
      <mesh
        ref={meshRef}
        onClick={handleClick}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onPointerDown={(e: any) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <boxGeometry args={[1.5, 1.2, 0.1]} />{" "}
        {/* 将卡片尺寸从[2, 1.5, 0.1]缩小到[1.5, 1.2, 0.1] */}
        <meshPhysicalMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.2}
          envMapIntensity={2}
        />
        {/* 正面文字 */}
        <Text
          position={[0, 0.2, 0.06]}
          fontSize={0.15} /* 调整字体大小从0.18减小到0.15 */
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.2} /* 调整文本最大宽度从1.6减小到1.2 */
          textAlign="center"
          renderOrder={1}
        >
          {title}
        </Text>
        <Text
          position={[0, -0.2, 0.06]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.6}
          textAlign="center"
          renderOrder={1}
        >
          {description}
        </Text>
        {/* 背面文字 */}
        <Text
          position={[0, 0.2, -0.06]}
          fontSize={0.18}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.6}
          textAlign="center"
          renderOrder={1}
          rotation={[0, Math.PI, 0]}
        >
          {title}
        </Text>
        <Text
          position={[0, -0.2, -0.06]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.6}
          textAlign="center"
          renderOrder={1}
          rotation={[0, Math.PI, 0]}
        >
          {description}
        </Text>
      </mesh>
    </group>
  );
};
