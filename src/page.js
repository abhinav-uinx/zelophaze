import { createIcons, Shield, ShieldCheck, Box, Cpu, Lock, Globe, Server, Activity, Terminal, Zap, ArrowUpRight, CheckCircle2, AlertTriangle, Play, Sliders, BarChart3, Cloud, Layers, Database, Eye, ChevronDown, ArrowLeft, Layers3, Network, Key, RefreshCw, FileText, Settings } from 'lucide';

// Initialize Lucide Icons for Detail Pages
createIcons({
  icons: {
    Shield, ShieldCheck, Box, Cpu, Lock, Globe, Server, Activity, Terminal, Zap, ArrowUpRight, CheckCircle2, AlertTriangle, Play, Sliders, BarChart3, Cloud, Layers, Database, Eye, ChevronDown, ArrowLeft, Layers3, Network, Key, RefreshCw, FileText, Settings
  }
});

// Setup background interactive canvas for detail pages
function initPageCanvas() {
  const canvas = document.getElementById('page-bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const nodes = [];
  const nodeCount = 35;
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1.5
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw subtle connections
    ctx.lineWidth = 0.8;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          ctx.strokeStyle = `rgba(37, 99, 235, ${0.12 * (1 - dist / 140)})`;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Move and draw nodes
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      ctx.fillStyle = 'rgba(37, 99, 235, 0.35)';
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(render);
  }
  render();
}

document.addEventListener('DOMContentLoaded', () => {
  initPageCanvas();
});
