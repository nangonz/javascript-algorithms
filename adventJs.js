/*
  Día 01 - Primer regalo repetido

    En la fábrica de juguetes del Polo Norte, cada juguete tiene un número de
    identificación único. Sin embargo, debido a un error en la máquina de juguetes,
    algunos números se han asignado a más de un juguete.

    ¡Encuentra el primer número de identificación que se ha repetido, donde la
    segunda ocurrencia tenga el índice más pequeño! En otras palaras, si hay más
    de un número repetido, debes devolver el número cuya segunda ocurrencia aparezca
    primero en la lista. Sin no hay números repetidos, devuelve -1.
*/

function findFirstRepeated(gifts) {
  let setOfGifts = new Set();

  for (let item of gifts) {
    if (setOfGifts.has(item)) {
      return item;
    } else {
      setOfGifts.add(item);
    }
  }

  return -1;
}

const giftIds = [2, 1, 3, 5, 3, 2];
const firstRepeatedId = findFirstRepeated(giftIds);
// console.log(firstRepeatedId)

function alternativeSolution01(gifts) {
  return gifts.find((id, index) => gifts.indexOf(id) !== index) ?? -1;
}

function anotherAlternative(gifts) {
  const mapa = {};

  for (const numero of gifts) {
    if (mapa[numero]) return numero;
    mapa[numero] = true;
  }

  return -1;
}

/*
  Día 02 - Ponemos en marcha la fábrica

    En el taller de Santa, los elfos tienen una lista de regalos que desean fabricar
    y un conjunto limitado de materiales. Los regalos son cadenas de texto y los
    materiales son caracteres. Tu tarea es escribir una función que, dada una lista
    de regalos y los materiales disponibles, devuelva una lista de los regalos
    que se pueden fabricar. Un regalo se puede fabricar si contamos con todos los
    materiales necesarios para fabricarlo.

    const gifts = ['tren', 'oso', 'pelota']
    const materials = 'tronesa'

    manufacture(gifts, materials) // ["tren", "oso"]
    'tren' SÍ porque sus letras están en 'tronesa'
    'oso' SÍ porque sus letras están en 'tronesa'
    'pelota' NO porque sus letras NO están en 'tronesa'

    const gifts = ['libro', 'ps5']
    const materials = 'psli'

    manufacture(gifts, materials) // []
*/

function manufacture(gifts, materials) {
  // Code here
  let giftArray = [];

  for (let gift of gifts) {
    let check = true;
    let neededMaterials = gift.split("");

    for (let material of neededMaterials) {
      if (!materials.split("").includes(material)) {
        check = false;
        break;
      }
    }

    if (check) {
      giftArray.push(gift);
    }
  }
  return giftArray;
}

const giftsToBuild = ["tren", "oso", "pelota"];
const buildingMaterials = "tronesa";

// console.log(manufacture(giftsToBuild, buildingMaterials))

function alternativeSolution02(gifts, materials) {
  return gifts.filter((regalo) => {
    return [...regalo].every((letter) => materials.includes(letter));
  });
}

/*
  Día 03 - El elfo travieso

    En el taller de Santa, un elfo travieso ha estado jugando en la cadena de
    fabricación de regalos, añadiendo o eliminando un paso no planificado.
    Tienes la secuencia original de pasos en la fabricación original y la secuencia
    modificada "modified" que puede incluir un paso extra o faltar un paso.
    Tu tarea es escribir una función que identifique y devuelva el primer paso extra
    que se ha añadido o eliminado en la cadena de fabricación. Si no hay ninguna
    diferencia entre las secuencias, devuelve una cadena vacia.

    Ejemplo:

    const original = 'abcd'
    const modified = 'abcde'
    findNaughtyStep(original, modified) // 'e'

    const original = 'stepfor'
    const modified = 'stepor'
    findsNaughtyStep(original, modified) // 'f'
*/

function findNaughtyStep(original, modified) {
  // Code here
  if (original.length === modified.length) return "";
  const iterator = original.length > modified.length ? original : modified;

  for (let index = 0; index < iterator.length; index++) {
    if (original[index] !== modified[index]) return iterator[index];
  }
}

// console.log(findNaughtyStep('stepfor', 'stepor'))

/*
  Día 04 - Dale la vuelta a los paréntesis.

    En el taller de Santa, algunos mensajes navideños han sido escritos de manera
    peculiar: las letras dentro de los paréntesis deben ser leídas al revés. Santa
    necesrita que estos mensajes estén correctamente formateados. Tu tareaes escribir
    una función qeu tome una cadena de texto y revierta los caracteres dentro de cada
    par de paréntesis, eliminando los paréntesis en el orden correcto.

    const a = decode('hola (odnum)')
    console.log(a) -> hola mundo

    const c = decode('sa(u(cla)atn)s')
    console.log(b) = santaclaus
*/

function decode(message) {
  // Code here
  const match = message.match(/\(([^()]+)\)/);

  if (!match) return message;

  const sanitized = match[0].slice(1, -1).split("").reverse().join("");
  const result = message.replace(match[0], sanitized);

  return decode(result);
}

/*
  Día 05 - El Cybertruk de Santa

    Santa está comprobando su nuevo trineo eléctrico, el CyberReindeer, en una
    carretera del Polo Norte. La carretera se representa con una cadena de caracteres
    donde:

    - . es igual a Carretera
    - S es igual a Trineo de Santa
    - * es igual a Barrera abierta
    - | es igual a Barrera cerrada
    Ejemlo: S...|....|....

    Cada unidad de tiempo, el trineo avanza una posición a la derecha. Si encuentra una
    barrera cerrada, se detiene hasta que la barrera se abra. Si está abierta, la
    atraviesa directamente. Todas las barreras empiezan cerradas, pero después de 5
    unidades de tiempo, se abren todas para siempre.

    Crea una función que simule el movimiento del trineo derante un tiempo dado y
    devuelva un array de cadenas representando el estado de la carretera en cada
    unidad de tiempo:

    const road = 'S..|...|..'
    const time = 10 // unidades de tiempo
    const result = cyberReindeer(road, time)

    result: [
      'S..|...|..', // estado inicial
      '.S.|...|..', // avanza el trineo la carretera
      '..S|...|..', // avanza el trineo la carretera
      '..S|...|..', // el trineo para en la barrera
      '..S|...|..', // el trineo para en la barrera
      '...S...*..', // se abre la barrera, el trineo avanza
      '...*S..*..', // avanza el trineo la carretera
      '...*.S.*..', // avanza el trineo la carretera
      '...*..S*..', // avanza el trineo la carretera
      '...*...S..', // avanza por la barrera abierta
    ]

    El resultado es una array donde cada elemento muestra la carretera en cada unidad
    de tiempo.
*/

function cyberReindeer(road, time) {
  const snapshots = [road];
  let lastChar = ".";

  for (let iteracion = 1; iteracion < time; iteracion++) {
    if (iteracion === 5) road = road.replaceAll("|", "*");

    const matches = road.match(/S[\*\.]/g);
    console.log(matches);

    if (matches) {
      road = road.replace(matches[0], lastChar + "S");
      lastChar = matches[0][1];
    }

    snapshots.push(road);
  }

  return snapshots;
}

const road = "S..|...|..";
const time = 10;
// console.log(cyberReindeer(road, time))

/*
  Día 06 - Los renos a prueba

    Los elfos están catalogando los renos de Santa según la distancia
    que pueden recorrer. Para ello tienen una cadena de texto movements
    donde cada caracter representa la dirección del movimiento del reno:

    - > igual a Avanza a la derecha
    - < igual a Avanza a la izquierda
    - * igual a Puede avanzar o retroceder

    Por ejemplo, si el movimiento es >>*< va hacia la derecha dos veces,
    luego puede ir a derecha o izquierda (lo que maximice la distancia
    recorrida final) y luego ir a la izquierda. Los elfos quieren saber
    cuál es la máxima distancia que recorre el reno al finalizar todos
    los movimientos. En el ejemplo anterior, la máxima distancia que
    recorre es 2. Va a la derecha dos veces +2, luego con el * puede ir
    a la derecha otra vez para maximizar la distancia +1 y luego va a la
    izquierda -1.

    Crea una función maxDistance que reciba la cadena de texto movements
    y devuelva la máxima distancia que puede recorrer el reno en cualquier
    dirección:

    const movements = '>>*<'
    const result = maxDistance(movements)
    console.log(result) // -> 2

    const movements2 = '<<<>'
    const result2 = maxDistance(movements2)
    console.log(result2) // -> 2

    const movements3 = '>***>'
    const result3 = maxDistance(movements3)
    console.log(result3) // -> 5

    Ten en cuenta que no importa si es a la izquierda o la derecha,
    la distancia es el valor absoluto de la distancia recorrida máxima
    al finalizar los movimientos.

*/

function maxDistance(movements) {
  // Code here
  let rd = 0;
  let ld = 0;
  let lor = 0;

  for (let move of movements) {
    if (move === "<") ld += 1;
    if (move === ">") rd += 1;
    if (move === "*") lor += 1;
  }

  return rd > ld ? rd + lor - ld : ld + lor - rd;
}

const movements3 = ">***>";
const result3 = maxDistance(movements3);
// console.log(result3) // -> 5

function alternativeSolution06(movements) {
  const distancia = 0;
  const comodines = 0;

  for (const signo of movements) {
    if (signo === ">") distancia++;
    if (signo === "<") distancia--;
    if (signo === "*") comodines++;
  }

  return Math.abs(distancia) + comodines;
}

/*
    Día 07 - Las cajas en 3D

      Santa está experimentando con nuevos diseños de regalos y
      necesita tu ayuda para visualizarlos en 3D. Tu tarea es escribir
      una función que, dado un tamaño n (entero), genere un dibujo de un
      regalo en 3D utilizando caracteres ASCII. Las líneas de los regalos
      se dibujan con # y las cara con el símbolo que nos pasan como
      parámetros:

      drawGift(4, '+')

   ####
  #++##
 #++#+#
####++#
#++#+#
#++##
####

*/

function drawGift(size, symbol) {
  if (size === 1) return "#\n";
  const filas = [];

  filas[0] = "#".repeat(size).padStart(size * 2 - 1); // la primer fila
  filas[size * 2 - 2] = "#".repeat(size); // la última fila
  filas[size - 1] = `${"#".repeat(size)}${symbol.repeat(size - 2)}#`; // fila del centro

  for (let fila = 1; fila < size - 1; fila++) {
    let draft = `#${symbol.repeat(size - 2)}#${symbol.repeat(fila - 1)}#`;

    filas[fila] = draft.padStart(size * 2 - 1, " ");
    filas[size * 2 - 2 - fila] = draft;
  }

  return filas.join("\n").concat("\n");
}

// console.log(drawGift(4, '+'))

/*
  Día 08 - Ordenando el almacén

    Los elfos están muy ocupados en el taller de Santa Claus
    organizando regalos para la víspera de Navidad. El formato
    de entrada es especial, ya que indica el número de regalos
    y el tipo de regalo con letras de la a a la z. Por ejemplo,
    '66a11b'.

    Los elfos tienen un sistema especial para organizar los regalos:

    - Cada 10 regalos del mismo tipo se empaquetan en una caja,
      representada por {x}. Por ejemplo, 20 regalos tipo a se
      empaquetan en 2 cajas así: {a}{a}.
    - Cada 5 cajas se apilan en un palé, representado por [x].
      Por ejemplo, 10 cajas de a se apilan en 2 palés de esta manera:
      [a][a]
    - Cualquier regalo adicional se coloca en una bolsa, representada
      por () y se colocan todas dentro. Por ejemplo 4 regalos de b se
      colocan en una bolsa así (bbbb)

    Los regalos luego se colocan en el siguiente orden: palés, cajas y
    bolsas y los regalos aparecen en el mismo ordn que la cadena de
    entrada. Tu tarea es escribir una función organizedGifts que tome
    una cadena de regalos como argumento y devuelva una cadena
    representando el almacén.

    const result1 = organizeGifts(`76a11b`)
    console.log(result1) // '[a]{a}{a}(aaaaaa){b}(b)'

    Explicación:

    76a:
      76 regalos tipo 'a' se empaquetarían en 7 cajas y
      sobrarían 6 regalos, resultando en 1 palé [a]
      (por las primeras 5 cajas), 2 cajas sueltas {a}{a} y
      una bolsa con 6 regalos (aaaaaa)

      11b: 11 regalos tipo 'b' se empaquetarían en 1 caja
      y sobraría 1 regalo, resultando en 1 caja suelta {b} y
      una bolsa con 1 regalo (b)
*/

function organizeGifts(gifts) {
  const matches = gifts.match(/\d*\w/g); // por ejemplo: [ '76a', '11b' ]
  if (!matches) return gifts;

  for (let match of matches) {
    let count = match.slice(0, -1); // 76 11
    let gift = match.at(-1); // a b
    let draft = "";

    const palets = Math.floor(count / 50);
    count -= palets * 50;
    const boxes = Math.floor(count / 10);
    count -= boxes * 10;

    if (palets) draft += `[${gift}]`.repeat(palets);
    if (boxes) draft += `{${gift}}`.repeat(boxes);
    if (count) draft += `(${gift.repeat(count)})`;

    gifts = gifts.replace(match, draft);
  }

  return gifts;
}

// console.log(organizeGifts('76a11b')) // [a]{a}{a}(aaaaaa){b}(b)

/*
  Día 09 - Alterna las luces.

    Están encendiendo las luces de Navidad en la ciudad y como cada año
    ¡Hay que arreglarlas! Las luces son de dos colores: 🟢 y 🔴. Para
    que el efecto sea el adecuado, siempre deben estar alternadas. Es
    decir, si la primera luz es roja, la segunda debe ser verde, la
    tercera roja, la cuarta verde, etc.

    Nos han pedido que scribamos una función adjustLights que, dado un
    array de strigs con el color de cada luz (representados con los
    emojis 🟢 para el verde y 🔴 para el rojo), devuelve el número
    mínimo de luces que hay que cambiar para que estén los colores
    alternos.

    adjustLights(['🟢', '🔴', '🟢', '🟢', '🟢'])
    -> 1 (cambias la cuarta luz a 🔴)

    adjustLights(['🔴', '🔴', '🟢', '🟢', '🔴'])
    -> 2 (cambias la segunda luz a 🟢 y la tercera a 🔴)

    adjustLights(['🟢', '🔴', '🟢', '🔴', '🟢'])
    -> 0 (ya están alternadas)

    adjustLights(['🔴', '🔴', '🔴'])
    -> 1 (cambias la segunda luz a 🟢)

*/

function adjustLights(lights) {
  // Code here
  function checkLights(lights) {
    let cambios = 0;

    for (let indice = 1; indice < lights.length; indice++) {
      if (lights[indice] === lights[indice - 1]) {
        cambios++;
        lights[indice] = lights[indice] === "🟢" ? "🔴" : "🟢";
      }
    }
    return cambios;
  }

  return Math.min(checkLights([...lights]), checkLights([...lights].reverse()));
}

// console.log(adjustLights(["🟢", "🔴", "🟢", "🟢", "🟢"]))

/*
  Día 10 - Crea tu propio árbol de Navidad.

    ¡Vaya idea ha tenido Sam Elfman! Quiere ofrecer un servicio que te
    crea un árbol de Navidad personalizado en cuestión de segundos.
    Para crearlo nos pasan una cadena de caracteres para formar el árbol
    y un número que indica la altura del mismo. Cada carácter de la cadena
    representa un adorno del árbol y vamos utilizándolos de forma cíclica
    hasta llegar a la altura indicada. Como mínimo siempre nos pasarán uno.
    Debemos devolver un string multilínea con el árbol de Navidad formado
    con los adornos, la altura indicada más una última línea con el tronco
    formado por el carácter | en el centro y finalmente un salto de línea
    /n.

    Por ejemplo si recibimos la cadena "123" y el número 4 como
    altura, tendríamos que construir este árbol:

       1
      2 3
     1 2 3
    1 2 3 1
       |

    Si recibimos la cadena *@o y el número 3,
    el árbol que debemos devolver es:

       *
      @ o
     * @ o
       |

    Nota:
    El árbol siempre debe estar centrado, para ello añade espacios en
    blanco a la izquierda de cada línea. Crea espacios sólo a la
    izquierda de cada línea del árbol. No dejes espacios en blanco
    a la derecha. Los adornos tienen un espacio en blanco entre
    ellos de separación.

*/

function createChristmasTree(ornaments, height) {
  let arbol = "";
  let index = 0;

  for (let fila = 0; fila < height; fila++) {
    const ornamentos = Array.from(
      { length: fila + 1 },
      () => ornaments[index++ % ornaments.length]
    );
    arbol += `${ornamentos.join(" ").padStart(height + fila)}\n`;
    console.log(ornamentos);
  }

  return `${arbol}${"|".padStart(height)}\n`;
}

// console.log(createChristmasTree('123', 4))

/*
  Día 11 - Los elfos estudiosos.

    En el taller de Santa, los elfos aman los acertijos. Este año, han
    creado uno especial: un desafío para formar un palíndromo navideños.

    Un palíndromo es una palabra que se lle eigual hacia adelante y
    hacia atrás. Los elfos quieren saber si es posible formar un
    palíndromo haciendo, como mucho, un intercambio de letras.

    Crea una finción getIndexForPalindrome que recibe una cadena de
    caracteres y devolverá:

    - Si ya es un palíndromo, un array vacío.
    - Si no es posible, null.
    - Si se puede formar un palíndromo con un cambio, un array con las
      dos posiciones (índices) que se deben intercambiar para poder
      crearlo.

    Por ejemplo:

    getIndexsForPalindrome('anna') // []
    getIndexsForPalindrome('abab') // [0, 1]
    getIndexsForPalindrome('abac') // null
    getIndexsForPalindrome('aaaaaaaa') // []
    getIndexsForPalindrome('aaababa') // [1, 3]
    getIndexsForPalindrome('caababa') // null

    Si se puede formar el palíndromo con deferentes intercambios,
    siempre se debe devolver el primero que se encuentre.

*/

function getIndexForPalindrome(word) {
  // funcion que comprueba si la palabra es palíndromo
  const checkPalindrome = (word) => {
    return word === word.split("").reverse().join("");
  };
  // funcion que intercambia dos letras de acuerdo a un indice start y end
  const swap = (word, start, end) => {
    const palabra = word.split("");

    [palabra[start], palabra[end]] = [palabra[end], palabra[start]];

    return palabra.join("");
  };

  if (checkPalindrome(word)) return []; // si la palabra ya es un palindromo retornamos []

  for (let start = 0; start < word.length; start++) {
    for (let end = 0; end < word.length; end++) {
      if (checkPalindrome(swap(word, start, end))) {
        return [start, end];
      }
    }
  }

  return null;
}

// console.log(getIndexForPalindrome('aaababa'))

/*
  Día 12 ¿Es una copia válida?

    En el Polo Norte todavía usan fotocopiadoreas de papel. Los elfos  
    las usan para copiar las cartas que los noños envían a Santa y así  
    poder enviarlas a todos los departamentos de regalos.  

    Sin embargo ya son muy viejas y no funcionan muy bien. Cada vez que  
    hacen una copia, la calidad de la copia desminuye ligeramente, un  
    fenómeno conocido como pérdida generacional.  

    Necesitas detectar si una carta es una copia de otra. Las cartas  
    son muy largas y no puedes leerlas, pero puedes comparalas con un  
    algoritmo.  
    
    Existe una gran probabilidad de que un caracter se degrade en cada  
    copia (¡no pasa siempre!). Y al ocurrir, la regla que sigue es:

    - Los caracteres de la A a la Z se degradan de mayúsculas a minúsculas  
    (A-Z => a-z)

    - Las letras se degradan en una seie de caracteres en este orden:  
    a-z => # => + => : => . =>

    - Una vez degradadas las letras en los símbolos, se pueden continuar  
    degrandando.

    - Ten en cuenta que el último es una espacio en blanco, no un  
    caracter vacío.

    - Los caracteres que no son letras (como los dígitos) no se degradan.

    Sabiendo esto y recibiendo dos cartas. La supuesta original y la  
    copia. Debes determinar si la copia es una copia de la otra.  
    Para entender cómo funcionan las fotocopiadoras y su degradación,  
    mira este ejemplo:

    checkIsValidCopy(
      'Santa Claus is coming',
      'sa#ta Cl#us i+ comin#'
    ) // true

    checkIsValidCopy(
      's#nta Cla#s is coming',
      'p#nt: cla#s #s c+min#'
    ) // false (por la p inicial)

    Para entender como funcionan las fotocopiadoras y su degradación,  
    mira este ejemplo:

    original:  'Santa Claus'
      1ª copia:  'santa cla#s'
      2ª copia:  'sa#t# cl#+s'
      3ª copia:  'sa+## c#+:s'
      4ª copia:  's#++. c+:.s'
      5ª copia:  's#+:. c:. s'

    Por lo tanto, s#+:. c+:++ es una copia válida de Santa Claus. Y,  
    como ves la degradación de las letras no se produce en un orden  
    específico, es aleatorio. (Basado en el desafío de CodeWars Photocopy  
    decay)

*/

function checkIsValidCopy(original, copy) {
  for (let indice = 0; indice < original.length; indice++) {
    let char = original[indice].match(/\w/g);
    const valid = `${char ? `${char}${char[0].toLowerCase()}` : ""}#+:. `;

    if (valid.indexOf(copy[indice]) < valid.indexOf(original[indice]))
      return false;
  }
  return true;
}

// console.log(
//   checkIsValidCopy(
//     'Santa Claus is coming',
//     'sa#ta Cl#us i+ comin#'
//   )
// )

/*

    Día 13

      Los elfos están preparando la víspera de Navidad y necesitan  
      tu ayuda para calcular si van sobrados o no de tiempo. Para ello  
      te pasan un array con la duración de cada entrega. El formato de  
      la duración es HH:mm:ss, las entregas empiezan a las 00:00:00  
      y el límite de tiempo es 07:00:00.  

      Tu función debe devolver el tiempo que les faltará o el tiempo que  
      les sobrará para terminar las entregas. El formato de la duración  
      devuelta debe ser HH:mm:ss.  

      Sin terminan antes de las 07:00:00, el tiempo restante hasta las  
      07:00:00 debe ser mostrado con un signo negativo. Por ejemplo,  
      si sobran 1 hora y 30 minutos, devuelve -01:30:00.

      calculateTime(['00:10:00', '01:00:00', '03:30:00'])
      //  '-02:20:00'

      calculateTime(['02:00:00', '05:00:00', '00:30:00'])
      // '00:30:00'

      calculateTime([
        '00:45:00',
        '00:45:00',
        '00:00:30',
        '00:00:30'
      ]) // '-05:29:00'

*/

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function calculateTime(deliveries) {
  let remainingTime = 7 * 3600;
  let totalTimeDelivery = 0;

  for (let delivery of deliveries) {
    let [hour, min, seconds] = delivery.split(":");
    totalSeconds = Number(hour) * 3600 + Number(min) * 60 + Number(seconds);
    remainingTime -= totalTimeDelivery;
  }
  let result =
    remainingTime > 0
      ? `-${formatTime(Math.abs(remainingTime))}`
      : formatTime(Math.abs(remainingTime));
  console.log(result);
  return result;
}

// calculateTime(["02:00:00", "05:00:00", "00:30:00"]); // '00:30:00'

/*
  Día 14 - Evita la alarma

    Con el tema de las redes sociales Santa Claus tiene pánico que  
    los niños se despierten mientras él está repartiendo regalos en  
    sus casas, usen el móvil para grabarlo y se haga viral en Tiktok.  

    Quiere evitarlo a toda costa. Cada casa en esa calle tiene un número  
    de regalos preparados. Sin embargo, las casas tienen un sistema de  
    seguridad conectado entre casas adyacentes, por lo que no puede  
    dejar los regalos en dos casas seguidas, o se activará la alarma  
    que alertará a los niños.  
    
    Dado un array de enteros no negativos regalos que representa la  
    cantidad de regalos en cada casa, tu tarea es ayudar a Papá Noel  
    a determinar la máxima cantidad de regalos que puede entregar en  
    una noche sin activar ninguna alarma.

    maxGifts([2, 4, 2]) // 4 (4)
    maxGifts([5, 1, 1, 5]) // 10 (5 + 5)
    maxGifts([4, 1, 1, 4, 2, 1]) // 9 (4 + 4 + 1)
    maxGifts([1, 3, 1, 3, 100]) // 103 (3 + 100)

*/

function maxGifts(houses) {
  return 0;
}

/*
  Día 15 - Robot autónomo

    Estamos progrmando unos robots llamados giftbot que navegan de  
    forma autónoma por los almacenes de regalos. Estamos creando una  
    función a la que le pasamos: el almacén que deben navegar y los  
    movimientos que pueden realizar. El almacén se representa como un  
    array de cadenas de texto, donde:  
    
    - . significa que hay vía libre.
    - * significa que hay un obstáculo.
    - ! es la posición inicial del robot.

    Los movimientos son un array de cadenas de texto, donde:

    - R mueve al robot una posición a la derecha.
    - L mueve al robot una posición a la izquierda.
    - U mueve al robot una posición hacia arriba.
    - D mueve al robot una posición hacia abajo.

    Hay que tener en cuenta que el robot no puede superar los obstáculos  
    ni los límites del almacén. Dados un almacén y los movimientos,  
    debemos devolver el array con la posición final de nuestro robot.  

    const store = ['..!....', '...*.*.']

    const movements = ['R', 'R', 'D', 'L']
    const result = autonomousDrive(store, movements)
    console.log(result)

    [
      ".......",
      "...*!*."
    ]


El último movimiento es hacia la izquierda, pero no puede moverse  
porque hay un obstáculo.

Ten en cuenta que la store es un array que puede ser de un número  
de filas que va de 1 a 100, ya que tenemos almacenes de todos los  
tamaños. También que el robot es posible que termine en su posición  
inicial si no puede moverse o si está dando vueltas.

*/

/*
  Día 16 - Despliegue en viernes.

    Ayer viernes alguien hizo despliegue a producción y se rompió  
    la aplicación de montaje de árboles de Navidad. Nos han pedido  
    que lo arreglemos lo antes posible.  

    El problema es que el formato de los árboles ha cambiado. Es un  
    array de números... ¡pero debería ser un objeto! Por ejemplo el  
    árbol: [3, 1, 0, 8, 12, null, 1] se ve así:

          3
        /   \
       1     0
      / \     \
     8  12     1

     Lo que necesitamos es transformar el array en un objeto donde  
     cada nodo del árbol tiene las propiedades value, left, right.  
     Por ejemplo, al ejecutar tu función transformTree con  
     [3, 1, 0, 8, 12, null, 1] debería devolver esto:

    {
      value: 3,
      left: {
        value: 1,
        left: {
          value: 8,
          left: null,
          right: null
        },
        right: {
          value: 12,
          left: null,
          right: null
        }
      },
      right: {
        value: 0,
        left: null,
        right: {
          value: 1,
          left: null,
          right: null
        }
      }
    }

    El elfo que está de guardia y que intentó solucionar el problema  
    antes de irse a casa, nos ha dejado algunas pistas:

    - Si un nodo no tiene valor, se representa con null. Por lo tanto  
    si un nodo tiene valor null, no tendrá hijos.

    - El nodo raíz se encuentra en el índice 0 del array.

    - Existe una relación entre el índice de un nodo y el índice de  
    sus hijos. ¡Busca el patrón!

*/

/*
  Write a function to determine whether a given string is valid.
  A string is valid if its parentheses are valid and balanced:
  that is, every type of parenthesis (round, square, bracket)
  must be closed by the corresponding close-parenthesis. For example:

  Killing roaches [pt2] ({how} i learned to love the pesticide)        is a balanced string
  Hello (world])                                                       is not balanced
  Sample Input For Custom Testing
  "([({}[(abcdefg)]other chars)][nonparentheses]{})abc"
  Sample Output
  True
  Sample Input For Custom Testing
  "([({}[(abcdefg]other chars)][nonparentheses]{})abc"
  Sample Output
  False
  Sample Input For Custom Testing
  "[(})]"
  Sample Output
  False



  // Test cases
const testString1 = "([({}[(abcdefg]other chars)][nonparentheses]{})abc";
console.log(isValidString(testString1)); // Output: false
const testString2 = "([]{()})";
console.log(isValidString(testString2)); // Output: true
// Una forma más sencilla y compacta de verificar la validez de los paréntesis en una cadena
// es utilizando un enfoque que recorre la cadena y utiliza un contador para verificar el equilibrio
// de los paréntesis. Versión más concisa:
function isValidString(str) {
    let count = 0;  // Defino un contador 'count' y lo inicio en 0.
    for (let char of str) {
      if (char === '(' || char === '[' || char === '{') { // los de apertura
        count++; // Incremento el contador 'count'.
      } else if (char === ')' || char === ']' || char === '}') { // los de cierre
        count--;  // Decremento el contador 'count'.
      }
      if (count < 0) { // Si el contador es negativo, la cadena es inválida, retorna 'false'.
        return false;
      }
    }
    return count === 0; // Retorna 'true' si el contador 'count' es 0 al final
    //(todos los paréntesis se cerraron correctamente).
  }
  // Ejemplos de prueba
  const testString3 = "([({}[(abcdefg]other chars)][nonparentheses]{})abc";
  console.log(isValidString(testString3)); // Salida: false
  const testString4 = "([]{()})";
  console.log(isValidString(testString4)); // Salida: true

*/

function isValidString(str) {
  const stack = [];
  const openBrackets = { "(": ")", "[": "]", "{": "}" };
  const closeBrackets = { ")": true, "]": true, "}": true };

  for (let char of str) {
    if (openBrackets[char]) {
      stack.push(char);
    } else if (closeBrackets[char]) {
      const lastOpenBracket = stack.pop();
      if (openBrackets[lastOpenBracket] !== char) {
        return false;
      }
    }
  }
  return stack.length === 0;
}

function miniMaxSum(arr) {
  // Write your code here
  let sumsArray = [];

  for (let int of arr) {
    sumsArray.push(
      arr.reduce((el, acc) => {
        return el + acc;
      }, 0) - int
    );
  }

  return `${Math.min(...sumsArray)} ${Math.max(...sumsArray)}`;
}

// console.log(miniMaxSum([1,2,3,4,5]))

/*
  Given a time un 12 hour AM/PM format, convert it to military (24-hour)
  time. Example:

  s = '12:01:00PM'
  return -> '12:01:00'

  s = '12:01:00AM'
  return -> '00:01:00'

  Function Description: Complete the timeConversion function. It should
  return a new string representing the input in 24 hour format.
  timeConversion has the following parameters: string s: time a 12 hour format.

  Sample input: 07:05:45PM
  Sample ouput: 19:05:45

*/

function timeConversion(s) {
  // Write your code here
  let referenceTime = s.slice(-2);
  let time = s.slice(0, -2).split(":");

  if (referenceTime === "PM") {
    if (time[0] !== "12") {
      time[0] = (Number(time[0]) + 12).toString();
      return time.join(":");
    } else {
      return time.join(":");
    }
  } else if (referenceTime === "AM" && time[0] === "12") {
    time[0] = "00";
    return time.join(":");
  } else {
    return time.join(":");
  }
}

// console.log(timeConversion('12:40:22AM'))

function timeConversionAltSolution(timer) {
  const tm = timer.includes("AM") ? "AM" : "PM";
  let h = timer[0] + timer[1];
  const m = timer[3] + timer[4];
  const s = timer[6] + timer[7];

  h < 12 && h > 0 && tm == "PM" && (h = parseInt(h) + 12);
  h == 12 && tm == "AM" && (h = "00");

  return `${h + ":" + m + ":" + s}`;
}

// input: 12:40:22AM
// expected ouput: 00:40:22

/*
  Maria plays college basketball and wants to go pro. Each season she  
  mantains a record of her play. She tabulates the number of times she  
  breaks her season record for most points and least points in a game.  
  Points scored in the first game establish her record for the season,  
  and she begins counting from there.

  Example:
  scores = [12, 24, 10, 24]
  Scores are in the same order as the games played. She tabulates  
  her results as follows:

  Game Score Minimum Maximum Count: Min Max
  0     12    12      12              0   0
  1     24    12      24              0   1
  2     10    10      24              1   1
  3     24    10      24              1   1

  Given the scores for a season, detemine the number of times María  
  breaks he records for most and least points scored per game.

  Function Description: the function has the following parameters
  - int scores[n]: points scored per game.

  Returns: an array with numbers of times she broke her record. Index 0  
  is for breaking most point records, and index 1 is for breaking least  
  points records.


*/

function breakingRecords(scores) {
  //Write your code here
  let recordBreakMostPoints = 0;
  let recordBreakLeastPoints = 0;
  let seasonMostPoints = scores[0];
  let seasonLeastPoints = scores[0];

  for (let score of scores) {
    if (score > seasonMostPoints) {
      seasonMostPoints = score;
      recordBreakMostPoints += 1;
    } else if (score < seasonLeastPoints) {
      seasonLeastPoints = score;
      recordBreakLeastPoints += 1;
    } else {
      continue;
    }
  }

  return [recordBreakMostPoints, recordBreakLeastPoints];
}

// console.log(breakingRecords([10, 5, 20, 20, 4, 5, 2, 25, 1]))

function breakingRecordsAltSolution(scores) {
  let br_max = 0;
  let br_min = 0;
  let curr_min = scores[0];
  let curr_max = scores[0];

  for (let i = 0; i < scores.length; i++) {
    const curr_numb = scores[i];
    if (curr_numb > curr_max) {
      br_max += 1;
      curr_max = curr_numb;
    } else if (curr_numb < curr_min) {
      br_min += 1;
      curr_min = curr_numb;
    }
  }

  return [br_max, br_min];
}

/* 
  Escribe una función que reciba una palabra y devuelva true si la misma  
  es una palíndromo o falso en caso contrario.

*/

function esPalindromo(palabra) {
  let palabraLimpia = palabra.toLowerCase().replace(/\s/g, "");

  return palabraLimpia === palabraLimpia.split("").reverse().join("");
}

// console.log(esPalindromo('oso'))
// console.log(esPalindromo('camioneta azul'))

/*
Camel Case is a naming style common in many programming languages. In Java, method and variable names  
typically start with a lowercase letter, with all subsequent words starting with a capital letter  
(example: startThread). Names of classes follow the same pattern, except that they start with a capital letter  
(example: BlueCar).

Your task is to write a program that creates or splits Camel Case variable, method, and class names.

INPUT FORMAT:  
Each line of the input file will begin with an operation (S or C) followed by a semi-colon followed by   
M, C, or V followed by a semi-colon followed by the words you'll need to operate on.  
The operation will either be S (split) or C (combine)  
M indicates method, C indicates class, and V indicates variable
In the case of a split operation, the words will be a camel case method, class or variable name that  
you need to split into a space-delimited list of words starting with a lowercase letter.  
In the case of a combine operation, the words will be a space-delimited list of words starting with  
lowercase letters that you need to combine into the appropriate camel case String. Methods should end  
with an empty set of parentheses to differentiate them from variable names.  

OUTPUT FORMAT:
For each input line, your program should print either the space-delimited list of words (in the case of  
a split operation) or the appropriate camel case string (in the case of a combine operation).  

SAMPLE INPUT:
S;M;plasticCup()  
C;V;mobile phone  
C;C;coffee machine  
S;C;LargeSoftwareBook  
C;M;white sheet of paper  
S;V;pictureFrame
  
SAMPLE OUTPUT:  
plastic cup  
mobilePhone  
CoffeeMachine  
large software book  
whiteSheetOfPaper()  
picture frame  
*/

function processData(input) {
  //Enter your code here
  const [operation, dataType, words] = input.split(";");
  let result = ""

  if (operation === "S") {
    let wordsArray = words.split("")
    for(let i=0; i<wordsArray.length; i++){
      if(/[A-Z]/.test(wordsArray[i])){
        wordsArray[i] = " " + wordsArray[i].toLowerCase()
      }
    }
    result = dataType == "M" ? wordsArray.join("").slice(0, -2) : wordsArray.join("").trim()
    console.log(result)
  } else {
    let strArray = words.split(" ").map(el => el.charAt(0).toUpperCase() + el.slice(1))
    result = dataType === "C" ? strArray.join("")
      : dataType === "M" ? strArray.join("").charAt(0).toLowerCase() + strArray.join("").slice(1) + "()"
      : strArray.join("").charAt(0).toLowerCase() + strArray.join("").slice(1)
    console.log(result)
  }
}

// // Split Operations
// processData("S;M;plasticCup()");
// processData("S;C;LargeSoftwareBook");
// processData("S;V;pictureFrame");

// //Combine Operations
// processData("C;V;mobile phone");
// processData("C;C;coffee machine");
// processData("C;M;white sheet of paper");

// processData("S;V;iPad")
// processData("C;M;mouse pad")
// processData("C;C;code swarm")
// processData("S;C;OrangeHighlighter")

function processData(input) {
  let words = input.split('\r\n')
  for(let i = 0; i < words.length; i++){
    let split = words[i].substring(0,1) === 'S';
    let type = words[i].substring(2,3);
    let word = words[i].substring(4, words[i].length);
    if(split){
      if(type === 'M'){
        word = word.substring(0,word.length-2) //remove ()
      }
        word = word.split(/(?=[A-Z])/).join(' ').toLowerCase();
      } else {
        let arr = word.split(' ')
        word = concat(arr, type)
      }
        console.log(word)
    }
}

function concat(array, type){
  array.forEach( (e, j) => {
    array[j] = e.substring(0,1).toUpperCase() + e.substring(1, e.length)
      if(j === 0 && type !== 'C'){
        array[j] = e.substring(0,1).toLowerCase() + e.substring(1, e.length)
      }
  } )
  
  return array.join('').concat( type === 'M'? '()': '')
}

/* 
  DIVISIBLE SUM PAIR
  Given an array of integers and a positive integer K, determine
  the number of (i,j) pairs where i<j and ar[i] + ar[j] is divisible  
  by k  

  EXAMPLE:  
  ar = [ 1,2,3,4,5,6]  
  k = 5  
  Three pairs meet the criteria [1,4], [2,3] and [4,6]  

  PARAMETERS:  
  int n: the length of array ar  
  int ar[n]: an array of integers  
  int k: the integer divisor  

  RETURNS  
  int: the number of pairs  

  INPUT FORMAT:  
  The first line contains 2 space-separated integers, n and k.  
  The second line contains n space-separated integers, each a value of ar[i]  

  SAMPLE INPUT:
  * STDIN
  6 3 
  1 3 2 6 1 2
  * FUNCTION
  n=6, k=3
  [1, 3, 2, 2, 6, 1, 2]
  
  SAMPLE OUTPUT
  5 -> Valid pairs
*/

function divisibleSumPairs(n, k, ar) {
    // Write your code here
    let validPair = 0;

    for (let i=0; i<n; i++) {
      for (let j=i+1; j<n; j++) {
        if ((ar[i]+ar[j]) % k === 0) {
          validPair +=1
        }
      }
    }

    return validPair

}

// console.log (divisibleSumPairs(6, 3, [1,3,2,6,1,2]))

/*
  SPARSE ARRAY CHALLENGE
  There is a collection of inputs strings and a collection of  
  query strings. For each query string, determine how many times  
  it occurs in the list of input strings. Return an array of the  
  results.

  EXAMPLE:  
  string = [ "ab", "ab", "abc" ]  
  queries = [ "ab", "abc", "bc" ]  
  There are 2 instances of "ab", 1 of "abc" and 0 of "bc". For each  
  query string in strings.  
  matchingStrings has the following parameters:  
  * string strings[n] - an array of strings to search.  
  * string queries[q] - an array of query strings.  
  
  RETURNS:
  int[q]: an array of results for each query
*/

function matchingStrings(strings, queries) {
    // Write your code here
    let appearences = []
    for (let query of queries) {
      appearences.push(strings.filter((str)=> str === query).length)
    }
    return appearences
}

// console.log(matchingStrings(["aba", "baba", "aba", "xzxb"], ["aba", "xzxb", "ab"]));

/*
  PLUS MINUS
  Given an array of integers, calculate the ratios of its elements  
  that are positive, negative, and zero. Print the decimal value of  
  each fraction on a new line with 6 places after the decimal.

  NOTE: This challenge intoduces precision problems. The test cases  
  are scaled to six decimal places, though anwers with absolute error  
  of up to 10-4 are acceptable. 

  EXAMPLE:
  arr = [1,1,0,-1,-1]
  There are n=5 elements, two positive, two negative and one zero.  
  Their ratios are 2/5 = 0,400000, 2/5 = 0.400000 and 1/5 = 0.200000  
  Resutls are printed as:
  0,400000
  0,400000
  0,200000

  FUNCTION DESCRIPTION:
  plusMinus has the following parameters:
  * int arr[n]: an array of integers

  PRINT:
  Print the ratios of positive, negative and zeros values in the  
  array. Each value should be printed on a separate line with 6  
  digits after the decimal. The function should not return a value.  
  
  Print the following 3 lines, each to 6 decimals:
  1. proportion of positive values.
  2. proportion of negative values.
  3. proportion of zeros.

*/

function plusMinus (arr) {
  let n = arr.length
  let positives = (arr.filter(int => int > 0).length / n).toFixed(6)
  let negatives = (arr.filter(int => int < 0).length / n).toFixed(6)
  let zeros = (arr.filter(int => int === 0).length / n).toFixed(6)

  console.log(positives);
  console.log(negatives);
  console.log(zeros);
}

// console.log(plusMinus([-4, 3, -9, 0, 4, 1]))

/*
  LONELY INTEGER
  Given an array of integers, where all elements but one occur twice  
  find the unique element.

  EXAMPLE:
  a = [1,2,3,4,3,2,1]
  The unique element is 4

  FUNCTION DESCRIPTION:
  Complete the lonely integer in the editor below.
  lonely integer has the following parameters:
  * int a[n]: an array of integers

  RETURNS:
  * int: the element that occurs only once

  INPUT FORMAT:
  The first line contains a single integer, n, the number of  
  integers in the array. The second line contains line n space-separated  
  integers that describe the values in a.
*/

function lonelyinteger (a) {
  for (let int of a) {
    if(a.indexOf(int) === a.lastIndexOf(int)) return int
  }
}

// console.log(lonelyinteger([2,3,5,6,2,5,3]))

/*
  GRADING STUDENTS
  HackerLand University has the following grading policy:  
  Every student receives a grade in the inclusive range from 0 to 100.  
  Any grade less than 40 is a failing grade. Sam is a professor at the university and likes  
  to round each student's grade according to these rules:
  
  * If the difference between the grade and the next multiple of 5 is less than 3, round grade up to the next multiple of 5.
  * If the value of grade is less than 38, no rounding occurs as the result will still be a failing grade.

  EXAMPLES:
  * grade = 84 round to 85 (85-84 is less than 3)
  * grade = 29 do not round (result is less than 40)
  * grade = 57 do not round (60-57 is 3 or higher)
  Given the initial value of grade for each of Sam's n students, write code to automate the rounding process.

  FUNCTION DESCRIPTION:
  Complete the function gradingStudents in the editor below.
  gradingStudents has the following parameter(s):
  int grades[n]: the grades before rounding.

  RETURNS:
  int[n]: the grades after rounding as appropriate.

*/

function nextMult(int) {
  while (int % 5 !== 0) {
    int ++
  }
  return int
}

function gradingStudents (grades) {
  let roundedGrades = []
  for (let grade of grades) {
    let multiple = nextMult(grade)
    let difference = multiple - grade
    if (multiple >= 40 && difference < 3) {
      roundedGrades.push(multiple)
    } else {
      roundedGrades.push(grade)
    }
  }
    return roundedGrades
}

// console.log( gradingStudents([33, 57, 84, 78, 29]) )

/*
  DIAGONAL DIFFERENCE
  Given a square matrix, calculate the absolute difference between the sums of
  its diagonals.

  FUNCTION DESCRIPTION:
  diagonalDifference takes the following parameters:
  * int arr[n][m]: an array of integers

  RETURN:
  int: the absolute diagonal difference
*/

function diagonalDifference ( array ) {
  let arrSize = array.length - 1
  let diagonalRight = 0
  let diagonalLeft = 0

  for (let i = 0; i <= arrSize; i++) {
    diagonalRight += array[i][i]
    diagonalLeft += array[i][arrSize-i]
    console.log(array[i][i], array[i][arrSize-i])
  }
  return Math.abs(diagonalRight - diagonalLeft)
}

const diagonalArray = [
  [1, 2, 3, 5, 6],
  [5, 3, 7, 5, 6],
  [1, 6, 2, 5, 6],
  [1, 6, 2, 5, 6],
  [1, 6, 2, 5, 6],
]

// console.log(diagonalDifference(diagonalArray));

/*
  COUNTING SORT
  Quick sort usually has a running time of n x log(n), but id there an
  algorithm that can sort even faster? In general, this is not possible. 
  Most sorting algorithm are comparison sorts, they sort a list just by 
  comparing the elements to one another.
  A comparison sort algorithm cannot beat n x log(n) (worst-case) running 
  time, since n x log(n) represents the minimum number of comparisons needed 
  to know where to place each element.

  ALTERNATIVE SORTING:
  Another sorting method, the counting sort, does not require comparison.
  Instead, you create an integer array whose index range covers the entire
  range of values in your array to sort. Each time a value occurs in the
  original array, you increment the counter at that index. At the end, tun
  through your counting array, printing the value of each non-zero valued
  index that number of times.

  EXAMPLE:
  arr = [1, 1, 3, 2, 1]
  All of the values are in the range [0,,,3] so create an array of zeros
  result = [0, 0, 0 ,0]. The result of each iteration follow:

  i  arr[i]  result
  0  1       [0, 1, 0, 0]
  1  1       [0, 2, 0, 0]
  2  3       [0, 2, 0, 1]
  3  2       [0, 2, 1, 1]
  4  1       [0, 3, 1, 1]

  The frecuency array is [0, 3, 1, 1]. These values can be used to create
  the sorted array as well: sorted = [1,1,1,2,3]

  NOTE:
  For this exercise always return a frequency array with 100 elements. The 
  example above shows only the first 4 elements, the remainder being zeros.

  CHALLENGE:
  Given a list of integers, count and return the number of times each value
  appears as an array of integers.

  PARAMETERS:
  countingSort has the following parameters:
  * arr[n]: an array of integers

  RETURN:
  * int[100]: a frequency array
*/

function countingSort ( array ) {
  let appearencesArray = new Array(100).fill(0)

  for (let i = 0; i < array.length; i++){
    appearencesArray[array[i]] = appearencesArray[array[i]] + 1
  }

  return appearencesArray
}

// console.log(countingSort(
//   [
//   '63', '25', '73', '1',  '98', '73', '56', '84', '86', '57',
//   '16', '83', '8',  '25', '81', '56', '9',  '53', '98', '67',
//   '99', '12', '83', '89', '80', '91', '39', '86', '76', '85',
//   '74', '39', '25', '90', '59', '10', '94', '32', '44', '3',
//   '89', '30', '27', '79', '46', '96', '27', '32', '18', '21',
//   '92', '69', '81', '40', '40', '34', '68', '78', '24', '87',
//   '42', '69', '23', '41', '78', '22', '6',  '90', '99', '89',
//   '50', '30', '20', '1',  '43', '3',  '70', '95', '33', '46',
//   '44', '9',  '69', '48', '33', '60', '65', '16', '82', '67',
//   '61', '32', '21', '79', '75', '75', '13', '87', '70', '33'
//   ]
// ))


/*
  COUNTING VALLEYS
  An avid hiker meticulous records of their hikes. During the last hike that
  took exactly "[steps]" steps, for every step it was noted if it was an uphill
  , (U), or a downhill, (D) step. Hikes always start and end at sea level, 
  and each step up or down represents a 1 unit change in altitude. We define
  the following terms:

    * A mountain is a sequence of consecutive steps above sea level, starting
      with a step up from sea level and ending with a step down to sea level.

    * A valley is a sequence of consecutive steps below sea level, starting
      with a step down from sea level and ending with a step up to sea level.
    
  Given the sequence of up and down steps during a hike, find and print the
  number of valleys walked through.

  EXAMPLE:
  steps = 8 path = [D D U U U U D D]
  The hiker first enters a valley 2 units deep. Then they climb out an up onto
  a mountain 2 units high. Finally, the hiker returns to sea level and ends the
  hike.

  FUNCTION DESCRIPTION:
  countingValleys has the following parameters:
    * int steps: the number of steps on the hike.
    * string path: a string describinf the path.
  
  RETURNS:
    * int: the number of valleys traversed.
*/

function countingValleys(steps, path) {
  // Write your code here
  let seaLevel = 0
  let pathTravelled = [0]
  
  for (let step of path) {
    step === "U" ? seaLevel ++ : seaLevel --
    seaLevel === 0 
      ? pathTravelled.push(0) 
      : seaLevel < 0 
        ? pathTravelled.push("V") 
        : pathTravelled.push("M")
  }

  return pathTravelled.join("").split(0).filter(el => el.includes("V")).length
}

// console.log(countingValleys(8, "DDUUUDDDUU"))

function countingValleysAlt (steps, path) {
  sea_level = 0
  cur_level = 0
  past_sea_level = false

  total_passed = 0

  for (let step of path) {
    if (step == "U"){
      cur_level +=1
      if(cur_level >= sea_level && past_sea_level){
        past_sea_level = false
        total_passed += 1
      }
    } else {
      cur_level -= 1
      if(cur_level < sea_level) {
        past_sea_level = true
      }
    }
  }
  return total_passed
}

/*
  PANGRAMS
  Roy quiere mejorar su velocidad de escritura en máquina para concursos de 
  programación. Su amigo le dijo que escribiera la oración " The quick brown 
  fox jumps over the lazy dog" repetidamente porque es un pangrama (pangrama son 
  oraciones construidas usando todas las letras del alfabeto, por lo menos una 
  vez).

  Después de escribir la oración muchas veces, Roy se aburrió. Entonces comenzó a 
  buscar otros pangramas. Dada una oración "s", dile a Roy si es un pangrama o no.

  EXAMPLE:
  Inpupt - "We promptly judge antique ivory buckles for the next prize"
  Output - pangram
*/

function pangrams (string) {
  let alphabet = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
  ]
  let isPangram = alphabet.every(letter=> string.toLowerCase().includes(letter))
  return isPangram? "pangram" : "not pangram"
}

// console.log(pangrams("We promptly judge antique ivory buckles for the next prize"))


/*
  MARS EXPLORATION
  A space explorer's ship crashed on Mars. They send a series of SOS messages to Earth
  for help. Letter in some of the SOS messages are altered by cosmic radiation during
  transmission. Given the signal received by Earth as a string, s, determine how many
  letters of the SOS message have been chaged by radiation.

  EXAMPLE:
  S = SOSSPSSQSSOR, and signal length = 12. Sami sent 4 SOS messages (12/3 = 4)
  Expected signal: SOSSOSSOSSOS
  Recieved signal: SOSSPSSQSSOR
  We print the number of changed letters, which is 3.

  F
*/

function marsExploration (message) {
  let signal_length = message.length
  let signal_message = new Array(signal_length/3).fill("SOS").join("").split("")
  let changed_letters = message
    .split("")
    .filter((letter, index)=> letter !== signal_message[index])
    .length

  return changed_letters
}

// console.log(marsExploration("SOSSPSSQSSOR"));

/*
  PERMUTING TWO ARRAYS
  There are two n-elements arrays of integers, A and B. Permute them into 
  some A' and B' such that the relation A'[i] + B'[i] >= k holds for all
  i where 0 <= i < n.

  There will be q queries consisting of A, B and k. For each query, return
  YES if some permutation A', B' satysfying the relation exists. Otherwise
  return NO

  EXAMPLE:
  A = [0,1]
  B = [0,2]
  k =1
  A valid A', B' is A'=[1,0] and B'=[0,2]  1+0>=1 and 0+2>=1  
  Return YES.

  FUNCTION DESCRIPTION:
  Complete the twoArrays function in the editor below, it should return a
  string, either YES o NO.
  twoArrays has the following parameters:
    * int k: an integer
    * int A[n]: an array of integers
    * int B[n]: an array of integers
  
  RETURNS:
    * string: either YES or NO.
*/

function twoArrays(k, A, B) {
  // Write your code here
  const A2 = A.sort((a,b) => a - b)
  const B2 = B.sort((a,b) => b - a)

  const isSatisfying = A2.every((a, index)=> {
    return a + B2[index] >= k
  })

  return isSatisfying ? 'YES' : 'NO';
}

/*
  The problem asks for if it exists any permutation of A and B as for
  every "i" from 0 to n A[i]+B[I] >= k
  Therefore, finding just one pair of permutation A and permutation B
  that satisfy the condition is enough for the program to yield "YES"

  Actually finding the permutation for A and B is a trap here. You don't
  really need to brute force all permutation, the idea is to sort A in
  ascending order and to sort B in descending order (which, both of them
  is valid permutation of A and B, respectively) and make your comparison
  on that permutation. If this pair of permutations fails to satisfy the 
  condition, then all of other permutation cannot satisfy the condition.
*/

/* SUBARRAY DIVISION ------------------------------------------------------

  Two children, Lyli and Ron, want to share a chocolate bar. Each of the 
  squares has an integer on it.

  Lyli decides to share a continuous segment of the bar selected such that:
    * The length of the segment matches Ron's birth month and,
    * The sum of the integers on the squares is equal to his birth day.
  Determine how many ways she can divide the chocolate.
  
  EXAMPLE:
  s = [2,2,1,3,2]
  d = 4
  m = 2
  Lily wants to find segments summing to Ron's birth day, d=4 with a length
  equalling his birth month m=2. In this case there are two segments meeting
  her criteria: [2,2] and [1,3]

  FUNCTION DESCRIPTION:
  birthday has the following parameters:
  * int s[n]: the number on each of the squares of chocolate
  * int d: Ron's birth day
  * int m: Ron's birth month
  
  RETURNS:
  int: the number of ways the bar can be divided

  1. deben ser consecutivos
  2. la longitud debe ser igual al mes
  3. la suma debe ser igual al dia
*/

function birthday (s, d, m) {
  let arr_length = s.length
  let matching_arr = []

  for (let i=0; i<arr_length; i++) {
    let test_arr = s.slice(i, (i+m))
    let items_sum = test_arr.reduce((acc, value)=> acc + value, 0)
    if (test_arr.length === m &&  items_sum === d){
      matching_arr.push(test_arr)
    }
  }
  return matching_arr.length
}

// console.log(birthday([2,2,1,3,2], 4, 2))

/* XOR STRING 3 ----------------------------------------------------------
  In this challenge, the task is to debug the existing code to successfully
  execute provided test files.

  Given two strings consisting of digits 0 and 1 only, find the XOR of the
  two strings. Debug the given function string_xor to find the xor of the 
  two given string appropriately.

  NOTE: You can modify ar most three lines in the given code and you cannot
  add or remove lines to the code.

  To know more about XOR follow the link: https://en.wikipedia.org/wiki/Exclusive_or

*/

function stringsXOR(s, t) {
  let result = ""
  for(i = 0; i < s.length; i++) {
    if(s.charAt(i) == t.charAt(i)){
      result += "0";
    } else {
      result += "1";
    }
  }
  return result;
}

// console.log(stringsXOR("10101", "00101"))

/* SALES BY MATCH
  There is a large pile of socks that must be paired by color. Given an 
  array of integers representing the color of each sock, determine how many 
  pairs of socks with matching colors there are.
  
  EXAMPLE:
  n = 7
  ar = [1,2,1,2,1,3,2]

  There is one pair of color 1 and one of color 2. There are three odd socks
  left, one of eack color. The number of pairs is 2.

  FUNCTION DESCRIPTION:
  sockMerchant function has the following parameters:
    * int n: the number of socks in the pile
    * int ar[n]: the colors of each sock
  
  RETURNS:
    * int: the number of pairs
*/

function sockMerchant (n, arr) {
  let sock_colors = [...new Set(arr)]
  let sock_pair_drawer = 0

  for (let color of sock_colors) {
    let same_color_socks = arr.filter(sock => sock === color)
    sock_pair_drawer += Math.floor(same_color_socks.length / 2)
  }

  return sock_pair_drawer
}

function sockMerchantAlt(n, ar) {
    return ar.sort().reduce((acc, el) => 
        el === acc.lastColor 
            ? {lastColor: '', pairCnt: acc.pairCnt + 1}
            : {lastColor: el, pairCnt: acc.pairCnt}
    , {lastColor: '', pairCnt: 0}).pairCnt;
}

// console.log(sockMerchant(9, [10,20,20,10,10,30,50,10,20]))

/* MIGRATORY BIRDS -----------------------------------------------------
  Given an array of birds sighting where every element represents a bird
  type id, determine the id of the most frequently sighted type. If more 
  than 1 type has been spotted that maximum amount, return the smallest
  of their ids.

  EXAMPLE:
  arr = [1,1,2,2,3]
  There are two each of types 1 and 2, and one sigting of type 3. Pick the
  lower of the two types seen twice: type 1.

  FUNCTION DESCRIPTION:
  migratoryBirds has the following parameters:
    * int arr[n]: the types of birds sighted.

  RETURNS:
  int: the lowest type id of the most frequently sighted birds.
  It is guarateed that each type is 1,2,3,4 or 5.
*/

function migratoryBirds (arr) {
  let bird_types = new Array(6).fill(0)
  const types_ordered = arr.sort()
  console.log(types_ordered)

  let sight_times = types_ordered.reduce((acc, current_type) => {
    acc[current_type] += 1;
    console.log(acc)
    return acc;
  }, bird_types);

  return sight_times.indexOf(Math.max(...sight_times))
}

console.log(migratoryBirds([1,4,4,4,5,3]))