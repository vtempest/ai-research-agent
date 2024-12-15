export default {
    particles: {
      color: { value: '#ffffff' },
      links: {
        enable: true,
        color: '#ffffff',
        distance: 150,
        opacity: 0.5,
        width: 1
      },
      move: {
        enable: true,
        speed: 3,
        direction: 'none',
        random: true,
        straight: false,
        outModes: { default: 'bounce' }
      },
      number: {
        value: 150,
        density: { enable: true, area: 800 }
      },
      size: { value: { min: 1, max: 3 } },
      opacity: { value: 0.8 }
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'grab' }
      },
      modes: {
        grab: {
          distance: 200,
          links: { opacity: 1 }
        }
      }
    },
    background: { opacity: 0 }
  };