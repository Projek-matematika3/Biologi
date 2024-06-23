// Initialize Three.js scenes for different sections
function initScene(containerId, color) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 2 / 400, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth / 2, 400);
    document.getElementById(containerId).appendChild(renderer.domElement);

    // Create a 3D model (Icosahedron) and add it to the scene
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshStandardMaterial({ color: color, flatShading: true });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Add lights
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    camera.position.z = 4;

    // Add OrbitControls for interactivity
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.maxPolarAngle = Math.PI / 2;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
        controls.update();
        renderer.render(scene, camera);
    }

    animate();
}

// Initialize animations for different sections
document.addEventListener("DOMContentLoaded", function() {
    initScene("animation-container", 0x00ff00);
    initScene("divisio-animation", 0x0000ff);
    initScene("peranan-animation", 0xff0000);
});

// Handle window resize
window.addEventListener('resize', () => {
    const containers = ['animation-container', 'divisio-animation', 'peranan-animation'];
    containers.forEach(containerId => {
        const container = document.getElementById(containerId);
        if (container) {
            container.querySelector('canvas').style.width = window.innerWidth / 2 + 'px';
        }
    });
});
