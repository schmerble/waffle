import { Application } from '@splinetool/runtime';



const canvas = document.getElementById('canvas3d');
const app = new Application(canvas);
app.load('https://prod.spline.design/1MCM5V-E-dhxjzCI/scene.splinecode');
console.log("loaded")


function moveCanvas(event) {
    // Get the bounding rectangle of the canvas
    const rect = canvas.getBoundingClientRect();
    
    // Calculate the mouse position in the canvas
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Calculate the distance from the center of the canvas
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate the movement factor, you can adjust the divisor for more/less movement
    const moveX = (x - centerX) / 6;
    const moveY = (y - centerY) / 6;
    
    // Use GSAP to animate the canvas
    gsap.to(canvas, {
      x: moveX,
      y: moveY,
      ease: 'ease-in',
      overwrite: 'auto'
    });
}
  
function rotateObject(event) {
    const splineObject = app.findObjectByName('waffle_lp')
    // Assuming the canvas is full width and height
    const xPercent = event.clientX / window.innerWidth - 0.5;
    const yPercent = event.clientY / window.innerHeight - 0.5;
  
    // Convert percentage to rotation angle, e.g., -10 degrees to 10 degrees range
    const maxRotationAngle = 60; // Max rotation angle in degrees
    const xRotation = maxRotationAngle * -yPercent; // Negative because moving the mouse up should rotate the object down
    const yRotation = maxRotationAngle * xPercent;
  
    // Use GSAP to animate the rotation for a smooth transition
    gsap.to(splineObject.rotation, {
      y: -(yRotation * (Math.PI / 30)), // Convert degrees to radians for 3D libraries
      x: -(xRotation * (Math.PI / 30)),
      duration: 1.5,
      ease: 'power12.inOut',
      overwrite: 'auto'
    });
}

canvas.addEventListener('mousemove', moveCanvas);
window.addEventListener('mousemove', rotateObject); 