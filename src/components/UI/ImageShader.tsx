'use client'

import {StaticImageData} from 'next/image'

import React, {useEffect, useRef} from 'react'
import {cn} from '#/src/lib/utils'
import * as THREE from 'three'

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

        uv = clamp(uv, 0.0, 1.0);

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
      texture.wrapS = THREE.ClampToEdgeWrapping
      texture.wrapT = THREE.ClampToEdgeWrapping
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter

      image.onload = () => {
        const imageAspect = image.width / image.height
        const canvasAspect = canvas.width / canvas.height

        let drawWidth, drawHeight
        if (imageAspect > canvasAspect) {
          drawHeight = canvas.height
          drawWidth = canvas.height * imageAspect
        } else {
          drawWidth = canvas.width
          drawHeight = canvas.width / imageAspect
        }

        const x = (canvas.width - drawWidth) / 2
        const y = (canvas.height - drawHeight) / 2

        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(image, x, y, drawWidth, drawHeight)
        texture.needsUpdate = true
      }

      return texture
    }

    const initializeScene = () => {
      const container = containerRef.current
      if (!container) return

      const {clientWidth: width, clientHeight: height} = container
      const aspect = width / height

      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100)
      camera.position.z = 1

      const texture = createTexture()
      const shaderUniforms = {
        u_mouse: {value: new THREE.Vector2()},
        u_prevMouse: {value: new THREE.Vector2()},
        u_aberrationIntensity: {value: 0.0},
        u_texture: {value: texture},
      }

      const planeGeometry = new THREE.PlaneGeometry(2, 2)

      planeMesh = new THREE.Mesh(
        planeGeometry,
        new THREE.ShaderMaterial({
          uniforms: shaderUniforms,
          vertexShader,
          fragmentShader,
        }),
      )
      scene.add(planeMesh)

      renderer = new THREE.WebGLRenderer({antialias: true})
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      container.appendChild(renderer.domElement)
      window.addEventListener('resize', handleResize)
    }

    const handleResize = () => {
      if (!containerRef.current) return
      const {clientWidth: width, clientHeight: height} = containerRef.current

      if (camera && renderer) {
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
      }
    }

    const animateScene = () => {
      animationFrameId = requestAnimationFrame(animateScene)

      mousePosition.x += (targetMousePosition.x - mousePosition.x) * easeFactor.current
      mousePosition.y += (targetMousePosition.y - mousePosition.y) * easeFactor.current

      if (planeMesh) {
        planeMesh.material.uniforms.u_mouse.value.set(mousePosition.x, 1.0 - mousePosition.y)
        planeMesh.material.uniforms.u_prevMouse.value.set(prevPosition.x, 1.0 - prevPosition.y)
        planeMesh.material.uniforms.u_aberrationIntensity.value = aberrationIntensity
      }

      aberrationIntensity = Math.max(0.0, aberrationIntensity - 0.05)

      if (renderer && scene && camera) {
        renderer.render(scene, camera)
      }
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

    initializeScene()
    animateScene()

    const container = containerRef.current
    container?.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (container && renderer) {
        cancelAnimationFrame(animationFrameId)
        container.removeChild(renderer.domElement)
      }
    }
  }, [src])

  if (isMobileDevice()) {
    const imgSrc = typeof src === 'string' ? src : src.src
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={imgSrc} alt={alt} className={cn('object-cover', className)} />
  }

  return <div ref={containerRef} className={cn('relative', className)} aria-label={alt} style={{width: '100%', height: '100%'}} />
}
