// Projete a matriz, desenhe como quiser - observe que:
// "x" é a matriz padrão
// "*" tem muito mais probabilidade de brilhar
// "O" é onde a "destruição" começa quando a animação de fade out é acionada.
let matrixTemplate = 
    "           *           \n" +
    "          xxx          \n" +
    "       x*xxxxx*x       \n" +
    "          xxx          \n" +
    "       xxxxxxxxx       \n" +
    "    x*xxxxxOxxxxx*x    \n" +
    "        xxxOxxx        \n" +
    "      xxxxxOxxxxx      \n" +
    "  x*xxxxxxxxxxxxxxx*x  \n" +
    "    xxxxxxxxxxxxxxx    \n" +
    "x*xxxxxxxxxxxxxxxxxxx*x\n" +
    "          xxx          \n" +
    "          xxx          \n";
// Ajuste para alterar quais caracteres a matriz mostra
let matrixChars = ["0","1"];
// Ajuste a animação da matriz com estes:
let frameTimer = 60;        // Atraso entre quadros de desenho - menor para maior 
let frameLifespan = 150;   // Tempo de eliminação de quadros em ms - maior para mais "suavidade"           
let sparkleNess = 0.05;     // Entre 0 e 1 - ajuste o brilho da matriz
// Ajuste a animação de dissolução:
let decayStart = 2000;      // Tempo em ms quando o efeito de dissolução é acionado
let decaySpeed = 200;       // Tempo de queda de quadro em ms - maior para mais "suave"
let horizontalSpeed = 0.8;   // Taxa entre 0 e 1 para controlar a propagação horizontal da deterioração
let verticalSpeed = 0.3;     // Taxa entre 0 e 1 para controlar a propagação vertical do decaimento
(function($) {
 
  let frameCount = 0;            
  let isDecaying = false;
  function decay() {
    isDecaying = true;
    // destruição horizontal
    matrixTemplate.split('').forEach((c, i) => {
      // Espalhe para a esquerda
      if (c == "O" && i > 0 && matrixTemplate[i - 1] !== "\n" && Math.random() < horizontalSpeed) matrixTemplate = [matrixTemplate.slice(0, i - 1), "O", matrixTemplate.slice(i)].join('');
      // Espalhe para a direita
      if (c == "O" && i < matrixTemplate.length - 1 && matrixTemplate[i + 1] !== "\n"  && Math.random() < horizontalSpeed) matrixTemplate = [matrixTemplate.slice(0, i + 1), "O", matrixTemplate.slice(i+2)].join('');
    });
    // destruição vertical
    let lines = matrixTemplate.split('\n');
    lines.forEach((line,i) => {                    
      line.split('').forEach((c, j) => {
        // para  cima
        if (i > 0 && j > 0 && c == "O" && Math.random() < verticalSpeed) lines[i-1] = [lines[i-1].slice(0, j-1), "O", lines[i-1].slice(j)].join('');
        // para baixo
        if (i < lines.length - 1 && j > 0 && c == "O" && Math.random() < verticalSpeed) lines[i+1] = [lines[i+1].slice(0, j-1), "O", lines[i+1].slice(j)].join('');
      });
    });
    matrixTemplate = lines.join('\n');
    // Alinhe a próxima etapa de destrição
    setTimeout(decay, decaySpeed);
  }
  // Irá renderizar um quadro de matriz na tela
  function render() {
    let matrixframe = "";
    matrixTemplate.split('').forEach((c)=>{
      // chance igual de zero ou um
      let randomChar = matrixChars[(Math.floor(Math.random() * matrixChars.length))];
      // Caracteres com mais probabilidade de serem brilhantes
      let isSparkly = c == "*" ? Math.random() <= 1.0 - sparkleNess : Math.random() > 1.0 - sparkleNess;
      // Aplique a máscara de destruição
      c = (c == "O" && isDecaying ? " " : c);
      // Aplicar zeros e umas à máscara de matriz
      c = (c !== " " && c !== "\n" ? randomChar : c);
      // pedaços brilhantes
      matrixframe += isSparkly ? "<sparkles>" + c + "</sparkles>" : c;
    });
    // Envie a matriz final para a tela
    $('matrix')[0].innerHTML += "<matrixframe id='matrixframe"+frameCount+"'>" + matrixframe.replace(/ /g, '&nbsp;').replace(/\n/g,"<br>") + "</matrixframe>";
    $("#matrixframe"+frameCount)[0].classList.add("fadeout");
    // Agendar quadro de matriz para remoção
    setTimeout(function() {$("#matrixframe"+this)[0].remove()}.bind(frameCount), frameLifespan);
    frameCount ++;
  }
  // Inicializar
  function initialise() {                
    // animar
    setInterval(render, frameTimer);
    setTimeout(decay, decayStart);
  }
  initialise();
})(document.querySelectorAll.bind(document));
const heading_arr = ["Feliz Natal"];
function TypeWriterHeading ()
{
  let i = 0;
  let text_elem = document.getElementById ("typewriter_heading");
  let word = heading_arr[i].split ("");
  let delword = heading_arr[i].split ("");
  let type = function ()
  {
    if (word.length > 0) {
      text_elem.innerHTML += word.shift ();
    }
  }
  setInterval (type, 125);
}
let body_arr = ["E um 2024 repleto de códigos"];
let body_delword = "coisas boas";
function TypeWriterBody()
{
  let i = 0;
  let text_elem = document.getElementById ("typewriter_body");
  let word = body_arr[i].split ("");
  let delword = body_arr[i].split ("");
  let delcounter = 0;    
  let finished = false;
  let type = function () {
    if(word.length > 0) {
      text_elem.innerHTML += word.shift();
    } else if (delcounter < 7) {
      text_elem.innerText = text_elem.innerText.slice(0, text_elem.innerText.length - 1)
      delcounter++;
    } else if (!finished) {
      word = body_delword.split("");
      finished = true
    }
  }
  setInterval (type, 125);
}
setTimeout(function(){ 
  TypeWriterHeading();
  $('.typewriter_caret.heading').show();
}, 6000);
setTimeout(function(){ 
  TypeWriterBody();
  $('.typewriter_caret.heading').hide();
  $('.typewriter_caret.body').show();
}, 9000);