const btnLeer = document.getElementById('btnLeer');
const cartaCerrada = document.getElementById('cartaCerrada');
const cartaAbierta = document.getElementById('cartaAbierta');
const btnExplosion = document.getElementById('btnExplosión');
const canvas = document.getElementById('corazones');
const ctx = canvas.getContext('2d');
const mensajeFinal = document.getElementById('mensajeFinal');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

btnLeer.addEventListener('click', () => {
  cartaCerrada.style.transform = 'scaleY(0)';
  setTimeout(() => {
    cartaCerrada.style.display = 'none';
    cartaAbierta.classList.add('show');
  }, 1000);
});

// Clase para los corazones
function Heart(x, y, size, speed, color) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.speed = speed;
  this.color = color;
  this.angle = Math.random() * Math.PI * 2;

  this.update = function() {
    this.y += this.speed;
    this.x += Math.sin(this.angle) * 2;
    this.angle += 0.05;

    if (this.y > canvas.height + this.size) this.y = -this.size;
    if (this.x > canvas.width + this.size) this.x = -this.size;
    if (this.x < -this.size) this.x = canvas.width + this.size;
  }

  this.draw = function() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x, this.y - this.size/2, this.x - this.size, this.y - this.size/2, this.x - this.size, this.y);
    ctx.bezierCurveTo(this.x - this.size, this.y + this.size/2, this.x, this.y + this.size/1.5, this.x, this.y + this.size);
    ctx.bezierCurveTo(this.x, this.y + this.size/1.5, this.x + this.size, this.y + this.size/2, this.x + this.size, this.y);
    ctx.bezierCurveTo(this.x + this.size, this.y - this.size/2, this.x, this.y - this.size/2, this.x, this.y);
    ctx.fill();
  }
}

let hearts = [];

btnExplosion.addEventListener('click', () => {
  cartaAbierta.style.display = 'none';
  hearts = [];

  const colors = ['rgba(255,0,100,0.8)', 'rgba(255,50,150,0.8)', 'rgba(255,0,150,0.8)'];
  const numHearts = 150; // muchos corazones para llenar la pantalla

  for (let i = 0; i < numHearts; i++) {
    let size = 20 + Math.random() * 40;
    let speed = 1 + Math.random() * 3;
    let x = Math.random() * canvas.width;   // todo el ancho
    let y = Math.random() * canvas.height;  // todo el alto
    let color = colors[Math.floor(Math.random() * colors.length)];
    hearts.push(new Heart(x, y, size, speed, color));
  }

  animateHearts();
  setTimeout(() => {
    mensajeFinal.style.display = 'block';
  }, 2000);
});

function animateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(h => {
    h.update();
    h.draw();
  });
  requestAnimationFrame(animateHearts);
}
