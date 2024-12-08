'use client'

import React, {useEffect, useRef} from 'react'
import * as THREE from 'three'

import {StaticImageData} from 'next/image'
import {cn} from '#/src/lib/utils'

type Props = {
  src: string | StaticImageData
  alt?: string
  className?: string
}

export default function ImageShader({src, alt = '', className}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  const isMobileDevice = () => {
    return typeof window !== 'undefined' && window.matchMedia('(max-width: 990px)').matches
  }

  useEffect(() => {
    if (isMobileDevice()) return

    let scene: THREE.Scene
    let camera: THREE.PerspectiveCamera
    let renderer: THREE.WebGLRenderer
    let planeMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>
    let animationFrameId: number

    const easeFactor = {current: 0.02}
    const mousePosition = {x: 0.5, y: 0.5}
    const targetMousePosition = {x: 0.5, y: 0.5}
    const prevPosition = {x: 0.5, y: 0.5}
    let aberrationIntensity = 0.0

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
      uniform float u_aberrationIntensity;

      void main() {
        vec2 gridUV = floor(vUv * vec2(20.0, 20.0)) / vec2(20.0, 20.0);
        vec2 centerOfPixel = gridUV + vec2(1.0 / 20.0, 1.0 / 20.0);

        vec2 mouseDirection = u_mouse - u_prevMouse;

        vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
        float pixelDistanceToMouse = length(pixelToMouseDirection);
        float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);

        vec2 uvOffset = strength * -mouseDirection * 0.2;
        vec2 uv = vUv - uvOffset;

        vec4 colorR = texture2D(u_texture, uv + vec2(strength * u_aberrationIntensity * 0.01, 0.0));
        vec4 colorG = texture2D(u_texture, uv);
        vec4 colorB = texture2D(u_texture, uv - vec2(strength * u_aberrationIntensity * 0.01, 0.0));

        gl_FragColor = vec4(colorR.r, colorG.g, colorB.b, 1.0);
      }
    `

    const createTexture = (): THREE.Texture => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!
      canvas.width = 1024
      canvas.height = 1024

      const image = new Image()
      image.crossOrigin = 'anonymous'
      image.src = typeof src === 'string' ? src : src.src

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
      const container = containerRef.current
      if (!container) return

      const {clientWidth: width, clientHeight: height} = container

      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(80, width / height, 0.01, 10)
      camera.position.z = 1

      const texture = createTexture()
      const shaderUniforms = {
        u_mouse: {value: new THREE.Vector2()},
        u_prevMouse: {value: new THREE.Vector2()},
        u_aberrationIntensity: {value: 0.0},
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
      renderer.setSize(width, height)
      renderer.setPixelRatio(window.devicePixelRatio)

      container.appendChild(renderer.domElement)
    }

    const animateScene = () => {
      animationFrameId = requestAnimationFrame(animateScene)

      mousePosition.x += (targetMousePosition.x - mousePosition.x) * easeFactor.current
      mousePosition.y += (targetMousePosition.y - mousePosition.y) * easeFactor.current

      planeMesh.material.uniforms.u_mouse.value.set(mousePosition.x, 1.0 - mousePosition.y)
      planeMesh.material.uniforms.u_prevMouse.value.set(prevPosition.x, 1.0 - prevPosition.y)

      aberrationIntensity = Math.max(0.0, aberrationIntensity - 0.05)
      planeMesh.material.uniforms.u_aberrationIntensity.value = aberrationIntensity

      renderer.render(scene, camera)
    }

    const handleMouseMove = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      prevPosition.x = targetMousePosition.x
      prevPosition.y = targetMousePosition.y

      targetMousePosition.x = (event.clientX - rect.left) / rect.width
      targetMousePosition.y = (event.clientY - rect.top) / rect.height

      aberrationIntensity = 1.0
    }

    const container = containerRef.current
    initializeScene()
    animateScene()

    container?.addEventListener('mousemove', handleMouseMove)

    return () => {
      cancelAnimationFrame(animationFrameId)
      container?.removeChild(renderer.domElement)
    }
  }, [src])

  if (isMobileDevice()) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={typeof src === 'string' ? src : src.src} alt={alt} className={className} />
  }

  return <div ref={containerRef} className={cn('relative', className)} aria-label={alt} style={{width: '100%', height: '100%'}} />
}
