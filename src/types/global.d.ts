import { PerspectiveCamera } from 'three'

declare global {
  interface Window {
    camera: PerspectiveCamera
  }
}