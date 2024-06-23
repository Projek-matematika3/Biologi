// Initialize Three.js scenes for different sections
function initScene(containerId, modelType) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 2 / 400, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth / 2, 400);
    document.getElementById(containerId).appendChild(renderer.domElement);

    // Function to create different plant models
    function createModel(type) {
        switch(type) {
            case 'leaf':
                const leafGeometry = new THREE.PlaneGeometry(1, 2);
                const leafMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
                const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
                leaf.rotation.x = Math.PI / 2;
                return leaf;
            case 'stem':
                return new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 2, 32), new THREE.MeshStandardMaterial({ color: 0x8B4513 }));
            case 'root':
                const rootGeometry = new THREE.ConeGeometry(0.5, 2, 32);
                const rootMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
                const root = new THREE.Mesh(rootGeometry, rootMaterial);
                root.rotation.x = Math.PI;
                return root;
            case 'tree':
                const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 3, 32), new THREE.MeshStandardMaterial({ color: 0x8B4513 }));
                const foliage = new THREE.Mesh(new THREE.SphereGeometry(1.5, 32, 32), new THREE.MeshStandardMaterial({ color: 0x00ff00 }));
                foliage.position.y = 2.5;
                const tree = new THREE.Group();
                tree.add(trunk);
                tree.add(foliage);
                return tree;
            default:
                return new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshStandardMaterial({ color: 0x00ff00 }));
        }
    }

    // Create and add model to the scene
    const model = createModel(modelType);
    scene.add(model);

    // Add lights
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    camera.position.z = 4;

    // Add OrbitControls for interactivity
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.maxPolarAngle = Math.PI / 2;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        model.rotation.x += 0.01;
        model.rotation.y += 0.01;
        controls.update();
        renderer.render(scene, camera);
    }

    animate();
}

// Initialize animations for different sections
document.addEventListener("DOMContentLoaded", function() {
    initScene("animation-container", 'tree');
    initScene("divisio-animation", 'leaf');
    initScene("peranan-animation", 'stem');
    initScene("anatomy-animation", 'root');
});

// Handle window resize
window.addEventListener('resize', () => {
    const containers = ['animation-container', 'divisio-animation', 'peranan-animation', 'anatomy-animation'];
    containers.forEach(containerId => {
        const container = document.getElementById(containerId);
        if (container) {
            const canvas = container.querySelector('canvas');
            if (canvas) {
                canvas.style.width = window.innerWidth / 2 + 'px';
            }
        }
    });
});

// Function to toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
}

// Event listener for dark mode toggle button
const darkModeButton = document.getElementById('dark-mode-toggle');
if (darkModeButton) {
    darkModeButton.addEventListener('click', toggleDarkMode);
}
