"use client";

import React, { useEffect, useRef } from "react";

export default function MeshBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse with smooth damping for 3-5% subtle parallax
    const mouse = { x: 0.5, y: 0.5 };
    const targetMouse = { x: 0.5, y: 0.5 };

    const handleMouseMove = (e) => {
      targetMouse.x = e.clientX / window.innerWidth;
      targetMouse.y = 1.0 - e.clientY / window.innerHeight; // flip y for GL coordinates
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      gl.viewport(0, 0, width, height);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Vertex Shader
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment Shader - Atmospheric Organic Dark Crimson Mesh Gradient + Film Noise
    const fsSource = `
      precision highp float;
      varying vec2 v_uv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;

      // Simplex 2D noise generator
      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                 -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      // Pseudo-random function for subtle film grain
      float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        float aspect = u_resolution.x / u_resolution.y;
        st.x *= aspect;

        // Subtle parallax offset (3-5% response)
        vec2 mouseOffset = (u_mouse - 0.5) * 0.04;
        vec2 p = st + mouseOffset;

        float t = u_time * 0.12;

        // Blob 1 - Deep Crimson (#7A001A -> vec3(0.478, 0.0, 0.102))
        vec2 center1 = vec2(0.35 * aspect, 0.65) + vec2(snoise(vec2(t, 1.0)), snoise(vec2(t * 0.8, 2.0))) * 0.25;
        float d1 = length(p - center1);
        float blob1 = smoothstep(0.75, 0.0, d1) * 0.15;

        // Blob 2 - Rich Cherry Red (#D90429 -> vec3(0.85, 0.015, 0.161))
        vec2 center2 = vec2(0.7 * aspect, 0.35) + vec2(snoise(vec2(t * 0.9, 3.0)), snoise(vec2(t * 1.1, 4.0))) * 0.28;
        float d2 = length(p - center2);
        float blob2 = smoothstep(0.65, 0.0, d2) * 0.12;

        // Blob 3 - Dark Burgundy (#3A000D -> vec3(0.228, 0.0, 0.051))
        vec2 center3 = vec2(0.5 * aspect, 0.5) + vec2(snoise(vec2(t * 0.7, 5.0)), snoise(vec2(t * 1.3, 6.0))) * 0.32;
        float d3 = length(p - center3);
        float blob3 = smoothstep(0.85, 0.0, d3) * 0.14;

        // Blob 4 - Secondary Accent drifting Blob
        vec2 center4 = vec2(0.2 * aspect, 0.25) + vec2(snoise(vec2(t * 1.1, 7.0)), snoise(vec2(t * 0.5, 8.0))) * 0.22;
        float d4 = length(p - center4);
        float blob4 = smoothstep(0.55, 0.0, d4) * 0.09;

        // Deep Matte Black (#050505)
        vec3 color = vec3(0.02, 0.02, 0.02);

        // Blend blobs into matte black background
        vec3 crimson = vec3(0.478, 0.0, 0.102);
        vec3 cherry = vec3(0.85, 0.015, 0.161);
        vec3 burgundy = vec3(0.228, 0.0, 0.051);

        color += crimson * blob1;
        color += cherry * blob2;
        color += burgundy * blob3;
        color += crimson * blob4;

        // Soft monochrome film grain/noise overlay (1-2% opacity)
        float grain = (rand(st * 120.0 + fract(u_time * 0.05)) - 0.5) * 0.018;
        color += grain;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    function createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");

    const startTime = performance.now();

    const render = () => {
      // Damped mouse smooth movement
      mouse.x += (targetMouse.x - mouse.x) * 0.04;
      mouse.y += (targetMouse.y - mouse.y) * 0.04;

      const elapsed = (performance.now() - startTime) / 1000;
      gl.uniform2f(uResolution, width, height);
      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uMouse, mouse.x, mouse.y);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    handleResize();
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: "#050505" }}
    />
  );
}
