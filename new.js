function handleScrollAnimation() {
  const element = document.querySelector('.main_h_2');
  if (!element) return;

  const elementTop = element.getBoundingClientRect().top;
  const elementHeight = element.offsetHeight;
  const windowHeight = window.innerHeight;

  const triggerPoint = windowHeight * 0.75;

  if (elementTop < triggerPoint) {
    element.classList.add('visible');
  } else {
    element.classList.remove('visible');
  }
}

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleScrollAnimation();
      ticking = false;
    });
    ticking = true;
  }
});

handleScrollAnimation();


// Обновить функцию handleScrollAnimation
function handleScrollAnimation() {
  const elements = [
      document.querySelector('.main_h_2'),
      document.querySelector('.video-container'),
      document.querySelector('.course-card')
  ];

  elements.forEach(element => {
      if (!element) return;

      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const triggerPoint = windowHeight * 0.75;

      if (elementTop < triggerPoint) {
          element.classList.add('visible');
      } else {
          element.classList.remove('visible');
      }
  });
}


document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
          }
      });
  }, {
      threshold: 0.1 
  });
  
  cards.forEach(card => {
      observer.observe(card);
  });
});


const sphereContainer = document.getElementById('sphere-container');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
sphereContainer.appendChild(renderer.domElement);

const createGradientTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext('2d');

  const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0.0, '#8A2BE2'); 
  gradient.addColorStop(0.3, '#4B0082'); 
  gradient.addColorStop(0.5, '#0000FF'); 
  gradient.addColorStop(0.7, '#FF4500'); 

  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

const geometry = new THREE.SphereGeometry(5, 128, 128);
const material = new THREE.MeshStandardMaterial({
  map: createGradientTexture(),
  emissive: '#EE82EE',
  emissiveIntensity: 0.2,
  metalness: 0.5,
  roughness: 0,
  transparent: true,
  opacity: 0.9,
  side: THREE.DoubleSide
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Добавление света
const pointLight1 = new THREE.PointLight(0xffffff, 2, 100);
pointLight1.position.set(10, 10, 10);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xffffff, 2, 100);
pointLight2.position.set(-10, -10, -10);
scene.add(pointLight2);

const ambientLight = new THREE.AmbientLight(0x404040, 1.5); 
scene.add(ambientLight);

camera.position.z = 12;
camera.position.x = -8;
camera.position.y = 2;

const vertices = sphere.geometry.attributes.position.array;
const originalVertices = [...vertices];

function animate() {
  requestAnimationFrame(animate);

  const time = Date.now() * 0.001;
  for (let i = 0; i < vertices.length; i += 3) {
    const x = originalVertices[i];
    const y = originalVertices[i + 1];
    const z = originalVertices[i + 2];

    const wave = Math.sin(x * 0.7 + time) * Math.cos(y * 0.7 + time) * Math.sin(z * 0.8 + time);
    vertices[i] = x + wave * 0.5;
    vertices[i + 1] = y + wave * 0.5;
    vertices[i + 2] = z + wave * 0.5;
  }

  sphere.geometry.attributes.position.needsUpdate = true;
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});



