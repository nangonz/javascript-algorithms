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
    let validPair = new Set;

    for (let i=0; i<n; i++) {
      for (let j=i+1; j<n; j++) {
        if ((ar[i]+ar[j]) % k === 0) {
          validPair.add(`${Math.min(i,j)}, ${Math.max(i,j)}`)
        }
      }
    }

    return validPair.size

}

console.log (divisibleSumPairs(6, 3, [1,3,2,6,1,2]))

function divisibleSumPairsAlternative(n, k, ar) {
    let count = 0;
    for(let i = 0; i < n; i++){
        for(let j = i+1; j < n; j++){
            if((ar[i]+ ar[j]) % k === 0)
                count++;
        }
    }
    return count;
}

console.log (divisibleSumPairsAlternative(6, 3, [1,3,2,6,1,2]))
