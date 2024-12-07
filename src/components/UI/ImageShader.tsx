'use client'

import SomeImage from '$/euroclear.jpg'

import React, {useEffect, useRef} from 'react'
import * as THREE from 'three'

export default function ImageShader() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let scene: THREE.Scene
    let camera: THREE.OrthographicCamera
    let renderer: THREE.WebGLRenderer
    let planeMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>
    let animationFrameId: number

    const easeFactor = 0.02
    const mousePosition = {x: 0.5, y: 0.5}
    const targetMousePosition = {x: 0.5, y: 0.5}
    const prevPosition = {x: 0.5, y: 0.5}

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      varying vec2 vUv;
      uniform sampler2D u_texture;
      uniform vec2 u_mouse;
      uniform vec2 u_prevMouse;

      void main() {
        vec2 gridUV = floor(vUv * vec2(40.0, 40.0)) / vec2(40.0, 40.0);
        vec2 centerOfPixel = gridUV + vec2(1.0 / 40.0, 1.0 / 40.0);

        vec2 mouseDirection = u_mouse - u_prevMouse;

        vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
        float pixelDistanceToMouse = length(pixelToMouseDirection);
        float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);

        vec2 uvOffset = strength * -mouseDirection * 0.4;
        vec2 uv = vUv - uvOffset;

        vec4 color = texture2D(u_texture, uv);
        gl_FragColor = color;
      }
    `

    const createTextTexture = (): THREE.Texture => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!
      canvas.width = 1024
      canvas.height = 1024

      const image = new Image()
      image.src = SomeImage.src

      const texture = new THREE.CanvasTexture(canvas)
      image.onload = () => {
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
        texture.needsUpdate = true
      }

      return texture
    }

    const initializeScene = () => {
      scene = new THREE.Scene()
      const aspectRatio = window.innerWidth / window.innerHeight
      camera = new THREE.OrthographicCamera(-1, 1, 1 / aspectRatio, -1 / aspectRatio, 0.1, 1000)
      camera.position.z = 1

      const texture = createTextTexture()
      const shaderUniforms = {
        u_mouse: {value: new THREE.Vector2()},
        u_prevMouse: {value: new THREE.Vector2()},
        u_texture: {value: texture},
      }

      planeMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        new THREE.ShaderMaterial({
          uniforms: shaderUniforms,
          vertexShader,
          fragmentShader,
        }),
      )
      scene.add(planeMesh)

      renderer = new THREE.WebGLRenderer({antialias: true})
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(window.devicePixelRatio)

      const container = containerRef.current
      container?.appendChild(renderer.domElement)
    }

    const animateScene = () => {
      animationFrameId = requestAnimationFrame(animateScene)

      mousePosition.x += (targetMousePosition.x - mousePosition.x) * easeFactor
      mousePosition.y += (targetMousePosition.y - mousePosition.y) * easeFactor

      planeMesh.material.uniforms.u_mouse.value.set(mousePosition.x, 1.0 - mousePosition.y)
      planeMesh.material.uniforms.u_prevMouse.value.set(prevPosition.x, 1.0 - prevPosition.y)

      renderer.render(scene, camera)
    }

    const handleMouseMove = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      prevPosition.x = targetMousePosition.x
      prevPosition.y = targetMousePosition.y

      targetMousePosition.x = (event.clientX - rect.left) / rect.width
      targetMousePosition.y = (event.clientY - rect.top) / rect.height
    }

    const handleResize = () => {
      const aspectRatio = window.innerWidth / window.innerHeight
      camera.left = -1
      camera.right = 1
      camera.top = 1 / aspectRatio
      camera.bottom = -1 / aspectRatio
      camera.updateProjectionMatrix()

      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    const container = containerRef.current
    initializeScene()
    animateScene()

    container?.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      container?.removeChild(renderer.domElement)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <div ref={containerRef} style={{width: '100%', height: '100%'}} />
}
