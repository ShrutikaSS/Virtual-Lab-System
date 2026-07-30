// build_atom.js – Interactive Build an Atom Simulation Engine
(() => {
  const canvas = document.getElementById('atomCanvas');
  if (!canvas) {
    console.error('Canvas element "atomCanvas" not found');
    return;
  }
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  let width = 0;
  let height = 0;
  let cx = 0;
  let cy = 0;

  const shellRadii = { 1: 95, 2: 155, 3: 215 };

  // Chemistry Database
  const ELEMENTS = {
    0: { name: 'Empty', symbol: '-', desc: 'Add protons to start building an atom!' },
    1: { name: 'Hydrogen', symbol: 'H' },
    2: { name: 'Helium', symbol: 'He' },
    3: { name: 'Lithium', symbol: 'Li' },
    4: { name: 'Beryllium', symbol: 'Be' },
    5: { name: 'Boron', symbol: 'B' },
    6: { name: 'Carbon', symbol: 'C' },
    7: { name: 'Nitrogen', symbol: 'N' },
    8: { name: 'Oxygen', symbol: 'O' },
    9: { name: 'Fluorine', symbol: 'F' },
    10: { name: 'Neon', symbol: 'Ne' }
  };

  const STABLE_ISOTOPES = {
    1: { 0: 'Protium', 1: 'Deuterium' },
    2: { 1: 'Helium-3', 2: 'Helium-4' },
    3: { 3: 'Lithium-6', 4: 'Lithium-7' },
    4: { 5: 'Beryllium-9' },
    5: { 5: 'Boron-10', 6: 'Boron-11' },
    6: { 6: 'Carbon-12', 7: 'Carbon-13' },
    7: { 7: 'Nitrogen-14', 8: 'Nitrogen-15' },
    8: { 8: 'Oxygen-16', 9: 'Oxygen-17', 10: 'Oxygen-18' },
    9: { 10: 'Fluorine-19' },
    10: { 10: 'Neon-20', 11: 'Neon-21', 12: 'Neon-22' }
  };

  function getIsotopeName(z, n) {
    if (z === 0) return '-';
    if (STABLE_ISOTOPES[z] && STABLE_ISOTOPES[z][n]) {
      return STABLE_ISOTOPES[z][n];
    }
    const elem = ELEMENTS[z] || { name: 'Heavy Element', symbol: 'X' };
    return `${elem.name}-${z + n}`;
  }

  function isIsotopeStable(z, n) {
    if (z === 0) return true;
    return STABLE_ISOTOPES[z] && STABLE_ISOTOPES[z][n] !== undefined;
  }

  // Particle Class Definition
  class Particle {
    constructor(type, x, y) {
      this.type = type; // 'proton', 'neutron', 'electron'
      this.x = x;
      this.y = y;
      this.isDragged = false;
      this.snapState = 'free'; // 'free', 'nucleus', 'orbit'
      this.targetX = x;
      this.targetY = y;
      this.angle = Math.random() * Math.PI * 2;
      this.shell = 0; // 0, 1, 2, 3
      this.radius = type === 'electron' ? 8 : 13;
    }
  }

  const activeParticles = [];
  let draggedParticle = null;

  // Golden Spiral Packing for Nucleus
  function getNucleusPosition(index) {
    if (index === 0) return { x: 0, y: 0 };
    const spacing = 18; // spacing between nuclear spheres
    const theta = index * 2.39996; // golden angle
    const r = spacing * Math.sqrt(index);
    return {
      x: r * Math.cos(theta),
      y: r * Math.sin(theta)
    };
  }

  const resizeCanvas = () => {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.resetTransform();
    ctx.scale(dpr, dpr);
    cx = width / 2;
    cy = height / 2 - 35; // offset upward to make room for baskets
  };

  // Helper to render 3D-ish spheres
  function drawSphere(x, y, radius, baseColor) {
    ctx.save();
    const grad = ctx.createRadialGradient(x - radius/3, y - radius/3, radius * 0.1, x, y, radius);
    if (baseColor === 'proton') {
      grad.addColorStop(0, '#ffa4a2');
      grad.addColorStop(0.3, '#ef5350');
      grad.addColorStop(1, '#b71c1c');
    } else if (baseColor === 'neutron') {
      grad.addColorStop(0, '#f1f5f9');
      grad.addColorStop(0.3, '#cbd5e1');
      grad.addColorStop(1, '#475569');
    } else if (baseColor === 'electron') {
      grad.addColorStop(0, '#93c5fd');
      grad.addColorStop(0.3, '#3b82f6');
      grad.addColorStop(1, '#1d4ed8');
    } else {
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(1, baseColor);
    }
    
    // Add subtle shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 2;

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Draw particle label (+/-)
    if (baseColor !== 'neutron') {
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${baseColor === 'electron' ? '10px' : '14px'} "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const text = baseColor === 'proton' ? '+' : '−';
      ctx.fillText(text, x, y + (baseColor === 'electron' ? -0.5 : 0.5));
    }
  }

  // Draw a glassmorphic container for particle baskets
  function drawBasket(x, y, label, color) {
    // Capsule/Bowl background
    ctx.fillStyle = 'rgba(23, 29, 46, 0.65)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(x - 50, y - 35, 100, 56, 12);
    ctx.fill();
    ctx.stroke();

    // Decorative basket pile
    drawSphere(x - 14, y - 6, 11, color);
    drawSphere(x + 14, y - 6, 11, color);
    drawSphere(x, y - 14, 11, color);

    // Label below
    ctx.fillStyle = '#8e9bb8';
    ctx.font = '600 11px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x, y + 36);
  }

  // Physics Snap & Snug Updates
  function updateChemistry() {
    const protons = activeParticles.filter(p => p.snapState === 'nucleus' && p.type === 'proton');
    const neutrons = activeParticles.filter(p => p.snapState === 'nucleus' && p.type === 'neutron');
    const electrons = activeParticles.filter(p => p.snapState === 'orbit' && p.type === 'electron');

    const z = protons.length;
    const n = neutrons.length;
    const e = electrons.length;

    // Distribute electrons into Bohr Shells (2, 8, 8)
    electrons.forEach((el, index) => {
      if (index < 2) el.shell = 1;
      else if (index < 10) el.shell = 2;
      else el.shell = 3;
    });

    const elem = ELEMENTS[z] || { name: 'Heavy Element', symbol: 'X' };
    const isotopeName = getIsotopeName(z, n);
    const mass = z + n;
    const charge = z - e;
    const stable = isIsotopeStable(z, n);

    // Sync Text Readouts
    document.getElementById('elemName').innerText = z > 0 ? elem.name : '-';
    
    const isotopeField = document.getElementById('isotopeName');
    if (z > 0) {
      if (stable) {
        isotopeField.innerText = isotopeName;
        isotopeField.style.color = 'var(--success)';
      } else {
        isotopeField.innerText = `${isotopeName} (Unstable)`;
        isotopeField.style.color = 'var(--danger)';
      }
    } else {
      isotopeField.innerText = '-';
      isotopeField.style.color = '';
    }

    document.getElementById('atomicNum').innerText = z;
    document.getElementById('massNumber').innerText = mass;

    // Highlight Periodic Table cell
    document.querySelectorAll('.periodic-cell').forEach(cell => {
      cell.classList.remove('active');
      const cellZ = parseInt(cell.dataset.z, 10);
      if (cellZ === z) {
        cell.classList.add('active');
      }
    });

    // Update Net Charge Scale
    const chargeStatus = document.getElementById('chargeStatus');
    const balanceBar = document.getElementById('balanceBar');
    
    if (z === 0 && e === 0) {
      chargeStatus.innerText = 'Empty';
      chargeStatus.className = 'charge-status-badge';
      if (balanceBar) balanceBar.style.transform = 'rotate(0deg)';
    } else {
      if (charge === 0) {
        chargeStatus.innerText = 'Neutral Atom';
        chargeStatus.className = 'charge-status-badge neutral';
        if (balanceBar) balanceBar.style.transform = 'rotate(0deg)';
      } else if (charge > 0) {
        chargeStatus.innerText = `Positive Ion (+${charge})`;
        chargeStatus.className = 'charge-status-badge positive';
        const rot = Math.max(-20, -5 * charge);
        if (balanceBar) balanceBar.style.transform = `rotate(${rot}deg)`;
      } else {
        chargeStatus.innerText = `Negative Ion (${charge})`;
        chargeStatus.className = 'charge-status-badge negative';
        const rot = Math.min(20, -5 * charge);
        if (balanceBar) balanceBar.style.transform = `rotate(${rot}deg)`;
      }
    }

    // Update Nuclear Symbol Display
    const symMass = document.getElementById('symMass');
    const symProtons = document.getElementById('symProtons');
    const symCharge = document.getElementById('symCharge');
    const symElement = document.getElementById('symElement');

    if (z > 0) {
      symMass.innerText = mass;
      symProtons.innerText = z;
      if (charge === 0) {
        symCharge.innerText = '';
      } else {
        const absC = Math.abs(charge);
        symCharge.innerText = `${absC === 1 ? '' : absC}${charge > 0 ? '+' : '−'}`;
      }
      symElement.innerText = elem.symbol;
    } else {
      symMass.innerText = '-';
      symProtons.innerText = '-';
      symCharge.innerText = '-';
      symElement.innerText = '-';
    }
  }

  // Auto-build from Periodic Table Cell clicks
  document.querySelectorAll('.periodic-cell').forEach(cell => {
    cell.addEventListener('click', () => {
      const z = parseInt(cell.dataset.z, 10);
      if (z > 0 && z <= 10) {
        buildElement(z);
      }
    });
  });

  function buildElement(z) {
    activeParticles.length = 0;
    
    // Stable Neutron Counts
    let n = z;
    if (z === 1) n = 0;
    else if (z === 2) n = 2;
    else if (z === 3) n = 4;
    else if (z === 4) n = 5;
    else if (z === 5) n = 6;
    else if (z === 6) n = 6;
    else if (z === 7) n = 7;
    else if (z === 8) n = 8;
    else if (z === 9) n = 10;
    else if (z === 10) n = 10;

    // Spawn Protons
    for (let i = 0; i < z; i++) {
      const p = new Particle('proton', cx + (Math.random() - 0.5) * 30, cy + (Math.random() - 0.5) * 30);
      p.snapState = 'nucleus';
      activeParticles.push(p);
    }
    
    // Spawn Neutrons
    for (let i = 0; i < n; i++) {
      const neut = new Particle('neutron', cx + (Math.random() - 0.5) * 30, cy + (Math.random() - 0.5) * 30);
      neut.snapState = 'nucleus';
      activeParticles.push(neut);
    }
    
    // Spawn Electrons
    for (let i = 0; i < z; i++) {
      const el = new Particle('electron', cx + (Math.random() - 0.5) * 120, cy + (Math.random() - 0.5) * 120);
      el.snapState = 'orbit';
      if (i < 2) el.shell = 1;
      else if (i < 10) el.shell = 2;
      else el.shell = 3;
      el.angle = (i / z) * Math.PI * 2;
      activeParticles.push(el);
    }
    
    updateChemistry();
  }

  // Event handlers
  const getMousePos = (e) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const handleStart = (pos) => {
    // Check if clicked an existing particle to grab it
    for (let i = activeParticles.length - 1; i >= 0; i--) {
      const p = activeParticles[i];
      const d = Math.hypot(pos.x - p.x, pos.y - p.y);
      if (d < p.radius + 8) {
        p.isDragged = true;
        p.snapState = 'free';
        draggedParticle = p;
        // Move to top of drawing stack
        activeParticles.splice(i, 1);
        activeParticles.push(p);
        updateChemistry();
        return;
      }
    }

    // Check if clicked near a basket to spawn a particle
    const basketY = height - 55;
    const pBasketX = width * 0.25;
    const nBasketX = width * 0.5;
    const eBasketX = width * 0.75;

    if (Math.hypot(pos.x - pBasketX, pos.y - basketY) < 35) {
      const newP = new Particle('proton', pos.x, pos.y);
      newP.isDragged = true;
      activeParticles.push(newP);
      draggedParticle = newP;
    } else if (Math.hypot(pos.x - nBasketX, pos.y - basketY) < 35) {
      const newP = new Particle('neutron', pos.x, pos.y);
      newP.isDragged = true;
      activeParticles.push(newP);
      draggedParticle = newP;
    } else if (Math.hypot(pos.x - eBasketX, pos.y - basketY) < 35) {
      const newP = new Particle('electron', pos.x, pos.y);
      newP.isDragged = true;
      activeParticles.push(newP);
      draggedParticle = newP;
    }
  };

  const handleMove = (pos) => {
    if (draggedParticle) {
      draggedParticle.x = pos.x;
      draggedParticle.y = pos.y;
    }
  };

  const handleEnd = () => {
    if (!draggedParticle) return;
    
    const distToCenter = Math.hypot(draggedParticle.x - cx, draggedParticle.y - cy);
    const type = draggedParticle.type;
    
    if (type === 'proton' || type === 'neutron') {
      if (distToCenter < 100) {
        draggedParticle.snapState = 'nucleus';
      } else {
        // Dragged outside, remove particle
        const idx = activeParticles.indexOf(draggedParticle);
        if (idx > -1) activeParticles.splice(idx, 1);
      }
    } else if (type === 'electron') {
      if (distToCenter > 60 && distToCenter < 280) {
        draggedParticle.snapState = 'orbit';
        draggedParticle.angle = Math.atan2(draggedParticle.y - cy, draggedParticle.x - cx);
      } else {
        // Remove electron
        const idx = activeParticles.indexOf(draggedParticle);
        if (idx > -1) activeParticles.splice(idx, 1);
      }
    }
    
    draggedParticle.isDragged = false;
    draggedParticle = null;
    updateChemistry();
  };

  // Canvas Event Listeners
  canvas.addEventListener('mousedown', (e) => handleStart(getMousePos(e)));
  canvas.addEventListener('mousemove', (e) => handleMove(getMousePos(e)));
  window.addEventListener('mouseup', handleEnd);

  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    handleStart(getMousePos(e));
  }, { passive: false });
  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    handleMove(getMousePos(e));
  }, { passive: false });
  window.addEventListener('touchend', handleEnd);

  // Reset Control
  document.getElementById('resetBtn').addEventListener('click', () => {
    activeParticles.length = 0;
    updateChemistry();
  });

  // Main Render Loop
  const draw = () => {
    ctx.clearRect(0, 0, width, height);

    // 1. Determine Nucleus unstable shake offset
    const activeZ = activeParticles.filter(p => p.snapState === 'nucleus' && p.type === 'proton').length;
    const activeN = activeParticles.filter(p => p.snapState === 'nucleus' && p.type === 'neutron').length;
    const unstable = activeZ > 0 && !isIsotopeStable(activeZ, activeN);
    const shouldShake = unstable && document.getElementById('showStability').checked;

    const shakeX = shouldShake ? (Math.random() - 0.5) * 3 : 0;
    const shakeY = shouldShake ? (Math.random() - 0.5) * 3 : 0;
    
    const renderCx = cx + shakeX;
    const renderCy = cy + shakeY;

    // 2. Draw Concentric Bohr Orbits
    if (document.getElementById('showOrbits').checked) {
      const showLabels = document.getElementById('showLabels').checked;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 6]);
      
      [1, 2, 3].forEach(shell => {
        const r = shellRadii[shell];
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.25 - shell * 0.05})`;
        ctx.beginPath();
        ctx.arc(renderCx, renderCy, r, 0, Math.PI * 2);
        ctx.stroke();

        if (showLabels) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
          ctx.font = '500 9px "IBM Plex Mono", monospace';
          ctx.textAlign = 'left';
          ctx.fillText(`Shell ${shell} (max ${shell === 1 ? 2 : 8}e⁻)`, renderCx + 5, renderCy - r - 4);
        }
      });
      ctx.setLineDash([]); // Reset
    }

    // 3. Draw Baskets at the Bottom
    const basketY = height - 55;
    drawBasket(width * 0.25, basketY, 'PROTON', 'proton');
    drawBasket(width * 0.5, basketY, 'NEUTRON', 'neutron');
    drawBasket(width * 0.75, basketY, 'ELECTRON', 'electron');

    // 4. Update Particle Physics (Nucleus Packing and Orbit angles)
    const nucleusProtons = activeParticles.filter(p => p.snapState === 'nucleus' && p.type === 'proton');
    const nucleusNeutrons = activeParticles.filter(p => p.snapState === 'nucleus' && p.type === 'neutron');
    const nucleusParticles = [...nucleusProtons, ...nucleusNeutrons];

    // Rearrange nucleus particles dynamically in the golden spiral
    nucleusParticles.forEach((p, index) => {
      const offset = getNucleusPosition(index);
      p.targetX = renderCx + offset.x;
      p.targetY = renderCy + offset.y;
    });

    activeParticles.forEach(p => {
      if (p.isDragged) return;

      if (p.snapState === 'nucleus') {
        p.x += (p.targetX - p.x) * 0.18;
        p.y += (p.targetY - p.y) * 0.18;
      } else if (p.snapState === 'orbit') {
        // Rotate electrons in orbits
        const orbitalSpeed = 0.035 / Math.sqrt(p.shell);
        p.angle += orbitalSpeed;
        p.targetX = renderCx + shellRadii[p.shell] * Math.cos(p.angle);
        p.targetY = renderCy + shellRadii[p.shell] * Math.sin(p.angle);
        
        // Slide into orbit smoothly
        p.x += (p.targetX - p.x) * 0.25;
        p.y += (p.targetY - p.y) * 0.25;
      }
    });

    // 5. Render Snapped Particles (electrons on orbits first, then nucleus on top)
    const renderOrbitals = activeParticles.filter(p => p.snapState === 'orbit' && !p.isDragged);
    const renderNucleus = activeParticles.filter(p => p.snapState === 'nucleus' && !p.isDragged);
    
    renderOrbitals.forEach(p => drawSphere(p.x, p.y, p.radius, 'electron'));
    
    // Sort nucleus particles by Y coordinates for overlapping 3D layering
    renderNucleus.sort((a, b) => a.y - b.y);
    renderNucleus.forEach(p => drawSphere(p.x, p.y, p.radius, p.type));

    // 6. Render the dragged particle on top of everything
    if (draggedParticle) {
      drawSphere(draggedParticle.x, draggedParticle.y, draggedParticle.radius, draggedParticle.type);
    }

    requestAnimationFrame(draw);
  };

  // Initialize
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  updateChemistry();
  draw();
})();
