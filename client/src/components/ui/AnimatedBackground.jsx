import React, { useEffect, useRef, useState } from 'react';
import { useThemeStore } from '../../store/themeStore';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const { theme } = useThemeStore();
  const [currentTheme, setCurrentTheme] = useState(theme || 'dark');

  // Sync theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      setCurrentTheme(activeTheme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Track mouse position for subtle magnetic interaction
    const mouse = { x: -1000, y: -1000, radius: 180 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize canvas dynamically
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Rich domain-specific Computer Science & Math symbols
    const csSymbols = [
      // DSA
      'O(N log N)', 'binary_tree', 'DP[i][j]', 'graph.addEdge()', 'ListNode*', 'quickSort()', 'O(1)',
      // Aptitude & Math
      '∑(x_i)', 'π', '∫ f(x)dx', '√x', 'P(A|B)', '2^N', '%',
      // Web Dev
      'GET /api/v1', '<div className>', 'HTTP/2.0', 'JWT', 'MongoDB', 'CORS', 'React.useState',
      // AI Engineer
      'RAG.embed()', 'transformer.attn', 'vector.cosine()', 'ChromaDB', 'PyTorch.Tensor', 'LLM.generate()'
    ];

    const isDark = currentTheme === 'dark';

    // Theme-tailored particle palettes
    const darkColors = ['#4fffb0', '#7b61ff', '#00f0ff', '#ffa94d', '#ff5c5c'];
    const lightColors = ['#4f46e5', '#7c3aed', '#059669', '#0284c7', '#d97706'];
    const colors = isDark ? darkColors : lightColors;

    // Create particles
    const particleCount = Math.min(Math.floor(window.innerWidth / 22), 60);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.65,
        vy: (Math.random() - 0.5) * 0.65 - 0.2,
        size: Math.random() * 2.5 + 1.5,
        symbol: Math.random() > 0.35 ? csSymbols[Math.floor(Math.random() * csSymbols.length)] : null,
        fontSize: Math.floor(Math.random() * 6) + 12,
        alpha: isDark ? Math.random() * 0.45 + 0.25 : Math.random() * 0.5 + 0.4,
        alphaSpeed: (Math.random() * 0.008 + 0.004) * (Math.random() > 0.5 ? 1 : -1),
        colorIndex: Math.floor(Math.random() * colors.length)
      });
    }

    // Algorithmic Data Array Bars at bottom edge
    const arrayBarCount = 28;
    const arrayBars = Array.from({ length: arrayBarCount }, () => ({
      height: Math.random() * 40 + 10,
      targetHeight: Math.random() * 40 + 10,
      speed: Math.random() * 0.05 + 0.02
    }));

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const activeIsDark = document.documentElement.getAttribute('data-theme') !== 'light';
      const activeColors = activeIsDark ? darkColors : lightColors;

      // 1. Draw Constellation Network Lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const lineOpacity = (1 - dist / 150) * (activeIsDark ? 0.22 : 0.28);
            ctx.strokeStyle = activeIsDark
              ? `rgba(123, 97, 255, ${lineOpacity})`
              : `rgba(99, 102, 241, ${lineOpacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // 2. Draw Interactive Particles & CS Glyphs
      particles.forEach((p) => {
        // Mouse magnetic effect
        const mdx = mouse.x - p.x;
        const mdy = mouse.y - p.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < mouse.radius) {
          const force = (1 - mdist / mouse.radius) * 2;
          p.x -= (mdx / mdist) * force;
          p.y -= (mdy / mdist) * force;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaSpeed;

        const maxAlpha = activeIsDark ? 0.8 : 0.85;
        const minAlpha = activeIsDark ? 0.2 : 0.35;

        if (p.alpha > maxAlpha || p.alpha < minAlpha) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        // Screen wrap
        if (p.x < -40) p.x = canvas.width + 40;
        if (p.x > canvas.width + 40) p.x = -40;
        if (p.y < -40) p.y = canvas.height + 40;
        if (p.y > canvas.height + 40) p.y = -40;

        const currentColor = activeColors[p.colorIndex % activeColors.length];

        if (p.symbol) {
          ctx.font = `600 ${p.fontSize}px 'Fira Code', 'Courier New', monospace`;
          ctx.fillStyle = currentColor;
          ctx.globalAlpha = p.alpha;
          ctx.fillText(p.symbol, p.x, p.y);
          ctx.globalAlpha = 1.0;
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = currentColor;
          ctx.globalAlpha = p.alpha + 0.1;
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      });

      // 3. Draw Algorithmic Sorting Array Bars at Bottom Edge
      const barWidth = canvas.width / arrayBarCount;
      for (let k = 0; k < arrayBarCount; k++) {
        const bar = arrayBars[k];
        bar.height += (bar.targetHeight - bar.height) * bar.speed;
        if (Math.abs(bar.height - bar.targetHeight) < 1) {
          bar.targetHeight = Math.random() * 50 + 10;
        }

        ctx.fillStyle = activeIsDark
          ? k % 2 === 0 ? 'rgba(79, 255, 176, 0.08)' : 'rgba(123, 97, 255, 0.08)'
          : k % 2 === 0 ? 'rgba(91, 63, 196, 0.06)' : 'rgba(10, 158, 110, 0.06)';
        ctx.fillRect(k * barWidth, canvas.height - bar.height, barWidth - 4, bar.height);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentTheme]);

  const isDarkTheme = currentTheme === 'dark';

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* Interactive CS Canvas (Particles, Code Glyphs, Neural Network Constellations) */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Cyber Grid Matrix Pattern Overlay */}
      <div className={`absolute inset-0 bg-dot-pattern ${isDarkTheme ? 'opacity-60' : 'opacity-45'}`} />

      {/* Dynamic Glowing Background Orbs tuned for Dark and Light themes */}
      {isDarkTheme ? (
        <>
          <div className="absolute top-[-10%] left-[10%] w-[38rem] h-[38rem] rounded-full bg-[var(--accent)]/35 blur-[85px] animate-float-slow" />
          <div className="absolute bottom-[5%] right-[5%] w-[42rem] h-[42rem] rounded-full bg-[var(--accent2)]/35 blur-[95px] animate-float-reverse" />
          <div className="absolute top-[30%] right-[20%] w-[30rem] h-[30rem] rounded-full bg-cyan-400/25 blur-[80px] animate-pulse-glow" />
          <div className="absolute bottom-[15%] left-[15%] w-[32rem] h-[32rem] rounded-full bg-amber-400/25 blur-[85px] animate-float-slow" style={{ animationDelay: '-7s' }} />
        </>
      ) : (
        <>
          <div className="absolute top-[-10%] left-[10%] w-[38rem] h-[38rem] rounded-full bg-[#5b3fc4]/10 blur-[90px] animate-float-slow" />
          <div className="absolute bottom-[5%] right-[5%] w-[42rem] h-[42rem] rounded-full bg-[#0a9e6e]/10 blur-[100px] animate-float-reverse" />
          <div className="absolute top-[30%] right-[20%] w-[30rem] h-[30rem] rounded-full bg-blue-500/08 blur-[85px] animate-pulse-glow" />
          <div className="absolute bottom-[15%] left-[15%] w-[32rem] h-[32rem] rounded-full bg-amber-500/08 blur-[90px] animate-float-slow" style={{ animationDelay: '-7s' }} />
        </>
      )}

      {/* Rotating Ambient Cyber Gradient Ring */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[85vh] rounded-full blur-2xl animate-spin-slow ${
        isDarkTheme
          ? 'bg-gradient-to-tr from-[var(--accent)]/20 via-transparent to-[var(--accent2)]/20'
          : 'bg-gradient-to-tr from-[#5b3fc4]/08 via-transparent to-[#0a9e6e]/08'
      }`} />
    </div>
  );
};

export default AnimatedBackground;
