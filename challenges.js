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
    return acc;
  }, bird_types);

  return sight_times.indexOf(Math.max(...sight_times))
}

// console.log(migratoryBirds([1,4,4,4,5,3]))

/* MAXIMUM PERIMETER TRIANGLE -----------------------------------------------
  Given an array of stick lengths, use 3 of them to construct a non-degenerate
  triangle with the maximum possible perimeter. Return an array of the lengths
  of its sides as 3 integers in non-decreasing order.

  If there are several valid triangles having the maximum perimeter:
    1. Choose the one with the longest maximum side.
    2. If more than one has that maximum, choose from them the one with
      the longest minimum side.
    3. If more tha one has that maximum as well, print any one of them.
  
  If non-degenerate triangle exists, retur [-1]

  EXAMPLE:
  sticks = [1,2,3,4,5,10]
  The triplet (1,2,3) will not form triangle. Neither will (4,5,10) or (2,3,5),
  so the problem is reduced to (2,3,4) and (3,4,5). The longer perimeter is
  3+4+5 = 12

  FUNCTION DESCRIPTION:
  maximumPerimeterTriangle function has the following parameters:
    * int sticks[n]: the lengths of sticks available.

  RETURNS:
    * int[3] or int[1]: the side lengths of the chosen triangle in 
      non-decreasing order or -1
*/

function maximumPerimeterTriangle(sticks) {
  let valid_triangles = []
  let ordered_sticks = sticks.sort((a,b)=> b-a)
  let n = sticks.length

  for (let i=0; i<n-2; i++) {
    let a = ordered_sticks[i]
    let b = ordered_sticks[i+1]
    let c = ordered_sticks[i+2]
    let sum = a+b+c
    
    if (a < b + c) return ([c,b,a])
  }
  return valid_triangles ? [-1] : valid_triangles 
}

// console.log(maximumPerimeterTriangle([1,2,3]))

/* ZIG ZAG SEQUENCE ---------------------------------------------------------
  In this challenge, the task is to debug the existing code to seccessfully
  execute all provided test files.
  
  Given an array of n distinct integers, transform the arrary into a zig zag
  sequence by permuting the array elements. A sequence will be called a zig zag
  sequence if the first k elements in the sequence are in increasing order and
  the last k elements are in decreasing order, where k= (n + 1)/2.
  You need to find the lexicographically smallest zig zag sequence of the given
  array.
  
  EXAMPLE:
  a = [2,3,5,1,4]
  Now if we permute the array a [1,4,5,3,2] the resutl is a zig zag sequence.
  Debug the given function findZigZagSequence to return the appropiate zig zag
  sequence for the given input array.

  NOTE: You can modify at most three lines in the given code. You cannot add
  or remove lines of code.

*/

/*
Here is the explanation without code: 
1. Sort the given array. 
2. Take the mid value of the sorted array. 
3. Swap the mid value and the last value of the sorted value. 
  Since we need the largest number at the mid. 
  This step brings our largest value in the middle of the array. 
4. Now, take the start and end variable and initialize end as 
  the last element and start as our next immediate element to the 
  middle element. 
5. Run a while loop till the start value is less than or equal to 
  the end value and keep swapping the values at start and end indexes. 
  6. Increase the start with 1 and decrease end value with 1 simultaneously.
*/

function findZigZagSequence(arr, n) {
  let mid = Math.floor((n + 1) / 2) - 1;
  let sorted_asc = arr.sort();
  [sorted_asc[n - 1], sorted_asc[mid]] = [sorted_asc[mid], sorted_asc[n - 1]];

  let start = mid + 1;
  let end = n - 2;

  while (start <= end) {
    [sorted_asc[start], sorted_asc[end]] = [sorted_asc[end], sorted_asc[start]];
    start = start + 1;
    end = end - 1;
  }

  return sorted_asc;
}


// console.log(findZigZagSequence([2,3,5,1,6,8,7,4,9], 9))

/* DRAWING BOOK -------------------------------------------------------------
  A teacher asks the class to open their books to a page number. A student can 
  either start turning pages from the front of the book or from the back of
  the book. They always turn pages one at a time. When they open the book, 
  page 1 is always on the right side.

  When they flip page 1 they see paes 2 and 3. Each page except the last page
  will always be printed on both sides. The last page may only be printed on
  the front, given the length of the book. If the book is n pages long, and a
  student wants to turn to page p, what is the minimum number of pages to turn?
  They can start at the beginning or the end of the book.

  Given n and p, find and print the minumum number of pages that must be turned
  in order to arrive at page p.

  EXAMPLE:
  n = 5
  p = 3
  
  Using the diagram above, if the student wants to ger to page 3, they open the 
  book to page 1, flip 1 page and they are on the correct page. If they open
  the book to the last page, page 5, they turn 1 page and are at the correct
  page. Return 1.

  FUNCTION DESCRIPTION:
  pageCount has the following parameters:
    * int n: the number of pages in the book.
    * int p: the page number to turn to.
  
  RETURN:
  int: the minimum number of pages to turn.
*/

function pageCount (n,p) {
  let frontPageGroup = Math.floor(p / 2); 5/2
  let backPageGroup = Math.floor(n / 2); 6/2

  return Math.min(frontPageGroup, (backPageGroup - frontPageGroup));
}

// console.log(pageCount(6,5))

/* PICKING NUMBERS ------------------------------------------------------
Given an array of integers, find the longest subarray where the absolute
difference between any two elements is less than or equal to 1.

EXAMPLE:
a = [1,1,2,2,4,4,5,5,5]
There are two subarrays meeting the criterion: [1,1,2,2] and [4,4,5,5,5]
The maximum length subarray has 5 elements.

FUNCTION DESCRIPTION:
pickingNumbers has the following parameters:
  * int a[n]: an array of integers.

RETURNS:
  * int: the length of the longest subarray that meets the criterion.
*/ 

function pickingNumbers(a) {
  const {maxStreak, currStreak} = a.sort((a,b)=>a-b).reduce(
    ({maxStreak, currStreak, lastEl}, el) => {
      if (lastEl > 0) {
        if (Math.abs(el - lastEl) <= 1) {
          currStreak++;
        } else {
          if (currStreak > maxStreak) {
            maxStreak = currStreak;
          }
          lastEl = el;
          currStreak = 0;
        }
      } else {
        lastEl = el;    
      }
      return {maxStreak, currStreak, lastEl}
  } ,{maxStreak: 0, currStreak: 0, lastEl: -1});
  
  return (currStreak > maxStreak ? currStreak : maxStreak) + 1;
}

// console.log(pickingNumbers([1,1,2,2,4,4,5,5,5]))

/* LEFT ROTATION ---------------------------------------------------------
  A left rotation operation on an array of size n shifts each of the array's
  elements 1 unit to the left. Given an integer "d" rotate the array that many 
  steps left and return the result.

  EXAMPLE:
  d = 2
  arr = [1,2,3,4,5]
  After rotation arr' = [3,4,5,1,2]

  FUNCTION DESCRIPTION:
  rotateLeft has the following parameters:
    * int d: the amounts to rotate by.
    * int arr[n]: the array to rotate.
  
  RETURN:
    * int[n]: the rotated array.

  EXPLANATION:
  To perform d=4 left rotations, the array undergoes the following suquence of
  changes:
  [1,2,3,4,5] -> [2,3,4,5,1] -> [3,4,5,1,2] -> [4,5,1,2,3] -> [5,1,2,3,4]

*/

function rotateLeft(d, arr) {
    for (let i = 0; i < d; i++){
        arr.push(arr.shift());
    }
    return arr;
}

// console.log(rotateLeft(4, [1,2,3,4,5]))

function rotateLeftAlt (d, array) {
  if (d == 0) return array
  let n = array.length
  let rotated_arr = new Array(n)

  for (let i=0; i<n; i++) {
    let newpos = i - 1
    if (newpos < 0) newpos = n - 1
    rotated_arr[newpos] = array[i]
  }

  return rotateLeft(d-1, rotated_arr)
}


/* NUMBER LINE JUMPS ----------------------------------------------------
  You are choreographing a circus show with various animals. For one act,
  you are given two kangaroos on a number line ready to jump in the positive
  direction (towards positive infinity).

    * The first kagaroo starts at location x1 and moves at a rate of v1 
      meters per jump.
    * The second kangaroo starts at location x2 and moves at a rate of v2
      meters per jump.
  
  You have to figure out a way to get both kagaroos at the same location at
  the same time as part of the show. If it is possible, return YES, otherwise
  return NO.

  EXAMPLE:
  x1 = 2
  v1 = 1
  x2 = 1
  v2 = 2
  After one jump, they are both at x=3, (x1+v1=2+1, x2+v2=1+2), so the 
  answer is YES.

  FUNCTION DESCRIPTION:
  kangaroo has the following parameters:
    * int x1, int v1: starting position naf jump distance for kangaroo 1.
    * int x2, int v2: starting position and jump distance for kangaroo 2.
  
  RETURNS: string either YES o NO.
*/

function kangaroo(x1, v1, x2, v2) {
  let kang_jumps = Math.max(x1,x2,v1,v2)
  let kangaroo_pos1 = x1 
  let kangaroo_pos2 = x2 

  for(let jump=0; jump<kang_jumps; jump++) {
    kangaroo_pos1 += v1
    kangaroo_pos2 += v2
    if(kangaroo_pos1 === kangaroo_pos2) return 'YES'
  }

  return 'NO'
}

// console.log(kangaroo(0,3,4,2))

/*  SEPARATE THE NUMBERS --------------------------------------------------
  A numeric string "s" is beautiful if it can be split into a sequence of two
  or more positive integers, a[1], a[2],...,a[n], stisfying the following 
  conditions:

    1. a[1] - a[i-1] = 1 for any 1<i<=n (i.e., each element in the sequence
      is 1 more than the previous element).

    2. No a[i] contains a leading zero. For example, we can split s=10203
      into the sequence {1,02,03} but it is not beautiful because 02 and 03
       have leading zeroes.

    3. The contents of the suquence cannot be rearrange. For example, we can
      split s= 312 into the sequence {3,2,1} but it is not beautiful because
      it breaks our first constraint (i.e., 1-3 != 1).

  The diagram below depicts some beautiful strings:
    * "1234" = "1"+ "2" + "3" + "4"
    * "91011" = "91" + "10" + "11"
    * "99100" = "99" + "100"
  
  Perform "q" queries where each query consist of some integer string "s"
  For each query print whether or not the string id beautiful on a new line.
  If it is beautiful print YES x, where "x" is the first number of the 
  increasing suquence. If there are multiple such values of "x" choose
  the smallest. Otherwise, print NO.

  FUNCTION DESCRIPTION:
  separateNumbers has the following parameters:
   * s: an integer value represented as a string.

  PRINTS:
   * string: print a string as described above. Return nothing.

  INPUT FORMAT:
  The first line contains an intefer q, the number of strings to evaluate.
  Each of the next q lines contains an integer string s to query.

  CONSTRAINS:
  * 1<=q<=10
  * 1<=|s|<=32
  * s[i] E [0-9]

  NOTES:
*/

function separateNumbers(s) {
  // string cannot be split into a sequence of two or more positive integers
  if (s.length === 1) {
    return "NO";
  }
  // first number length of beautiful sequence
  // cannot be greater the half length of string
  for (let i = 1; i <= Math.floor(s.length / 2); i++) {
    const firstNumStr = s.slice(0, i)
    const firstNum = BigInt(firstNumStr)
    let currentNum = firstNum
    let currentStr = firstNum.toString()

    // gets the substring thar represents the first number of 
    // the sequence, BigInt is used to handle big numbers with presicion.
    while (currentStr.length < s.length) {
      currentNum++;
      currentStr += currentNum.toString()

      if (currentStr === s) {
        return "YES " + firstNumStr
      }
    }
  }
  return "NO";
}


// console.log(separateNumbers("90071992547409929007199254740993"))
// console.log(separateNumbers("12345"))

/* CLOSEST NUMBERS ----------------------------------------------------------
  Sorting is useful as the first step in many different tasks. The most commom
  task is to make finding things easier, but there are other uses as well. In
  this case, it will make it easier to determine which pair or pairs of elements
  have the smallest absolute difference between them.

  EXAMPLE:
  arr = [5,2,3,4,1]
  Several pairs have the minimum difference of 1:
  [(1,2), (2,3), (3,4), (4,5)]
  Return the array [1,2,2,3,3,4,4,5]

  NOTE:
  As shown in the example, pairs may overlap.
  Given a list of unsorted integers, "arr", find the pair of elements that
  have the smallest absolute difference between them. If there are multiple
  pairs, find them all.

  FUNCTION DESCRIPTION:
  Complete the closestNumbers which has the following parameters:
    * int arr[n]: an array of integers

  RETURNS:
    * int[]: an array of integers as describe.
*/

function closestNumbers (arr) {
  let sorted_arr = arr.sort((a,b)=> a-b)
  let loop_len = sorted_arr.length - 1
  let minimum_diference_pairs = []
  let smallest_dif = Infinity

  for (let ind=0; ind<loop_len; ind++) {
    let curr_dif = Math.abs(sorted_arr[ind+1] - sorted_arr[ind])
    if (curr_dif === smallest_dif){
      minimum_diference_pairs.push(sorted_arr[ind])
      minimum_diference_pairs.push(sorted_arr[ind+1])
    } else if (curr_dif < smallest_dif) {
      smallest_dif = curr_dif
      minimum_diference_pairs = [sorted_arr[ind], sorted_arr[ind+1]]
    }
  }
  return minimum_diference_pairs
}

function closestNumbersAlt (arr) {
  return arr
    .sort((a,b)=> a-b)
    .reduce(({lastEl, min, minArr}, el, ind)=>{
      if (ind > 0) {
        let diff = el - lastEl
        if(diff < min || min === null) {
          min = diff
          minArr = [lastEl, el]
        } else if (diff === min){
          minArr = [...minArr, lastEl, el]
        }
      }
      return {lastEl: el, min, minArr}
    }, {lastEl: null, min: null, minArr:[]}).minArr
}

/*
console.log(closestNumbers([
  -20,
  -3916237, 
  -357920, 
  -3620601, 
  7374819, 
  -7330761, 
  30,
  6246457, 
  -6461594, 
  266854, 
  -520, 
  -470
]))
*/

/*  TOWER BREAKERS ----------------------------------------------------
  Two players are playing a game of Tower Breakers! Player 1 always 
  moves first and both players always play optimally. The rules of the
  game are as follows:

    * Initially there are "n" towers.
    * Each tower is of height "m"
    * The players move in alternating turns.
    * In each turn, a player can choose a tower of height "x" and reduce
      its height to "y" where 1 <= y < x and "y" evenly divides "x".
    * If the current player is unable to make a move, they lose the game.

  Given the values of n and m, determine which player will win. If the first
  player wins, return 1. Otherwise, return 2.

  EXAMPLE:
  n=2
  m=6

  There are 2 towers, each 6 units tall. Player 1 has a choice of two moves:
  - remove 3 pieces from a tower to leave 3 as 6%3 = 0
  - remove 5 pieces to leave 1.
  Let player 1 remove 3. Now the towers are 3 and 6 units tall.
  Player 2 matches the move. NOw the towers are both 3 units tall.
  Now player 1 has only one move.
  Player 1 removes 2 pieces leaving 1. Towers are 1 and 3 units tall.
  Player 2 matches again. Towers are both 1 unit tall.
  Player 1 has no move and loses. Return 2

  FUNCTION DESCRIPTION:
  towerBreakers has the following parameters:
    * int n: the number of towers.
    * int m: the height of each tower.
  
  RETURN:
    * int: the winner of the game.

  tenemos n torres de altura m
  2 jugadores que van alternando
  en cada turno pueden reducir la altura de una
  torre en una cantidad 1<=y<x y que divide x de manera pareja
*/

function towerBreakers(n, m) {
  return (n%2==0||m==1)?2:1;
}

// console.log(2, 6)

/* MINIMUM ABSOLUTE DIFFERENCE IN AN ARRAY -----------------------------
  The absolute difference is the positive between two values "a" and "b"
  is written |a-b| or |b-a| and they are equal. If a=3 and b=2,
  |3-2|-|2-3|=1. Given an array of integers, find the minimum absolute
  difference between any two elements in the array.

  EXAMPLE: arr = [-2,2,4]
  There are 3 pairs of numbers: |-2,2|, |-2,4| and |2,4|
  The absolute differences for these pairs are 
  |(-2)-2|= 4
  |(-2)-4|= 6
  |2-4|= 2
  The minimum absolute difference is 2.

  FUNCTION DESCRIPTION:
  It should return an integer that represents the minimum absolute
  difference between any pair of elements. The function has the following
  parameters:
    * int arr[n]: an array of integers.

  RETURNS:
    * int: the minimum absolute difference found
*/

function minimumAbsoluteDifference(arr) {
  let abs_dif = []
  let sorted_arr = arr.sort((a,b)=> a-b)
  console.log(sorted_arr)
  
  for (let i=0; i<sorted_arr.length-1; i++){
      abs_dif.push(Math.abs(sorted_arr[i] - sorted_arr[i+1]))
  }
  return Math.min(...abs_dif)
}

function minimumAbsDiffAlt (arr) {
  return arr.sort((a,b)=> a-b).reduce(({prev, minDiff}, curr)=>{
    let diff = Math.abs(curr - prev)
    return {
      prev: curr,
      minDiff: diff < minDiff ? diff : minDiff
    }

  }, {prev: 0, minDiff: Infinity}).minDiff
}

// console.log(minimumAbsDiffAlt([-2,2,4]))

/* CAESAR CIPHER --------------------------------------------------------
  Julius Caesar protected his confidential information by encrypting it 
  using a cipher. Caesar's cipher shifts eaxh letter by a number of letters
  If the shift takes you past the end of the alphaber, just rotate back to
  the front of the alphaber. In the case of a rotation by 3 w,x,y and z 
  woulf map to z, a, b and c.

  Original Alphabet: abcdefghijklmnopqrstuvwxyz
  Alphabet rotated: defghijklmnopqrstuvwxyzabc

  EXAMPLE:
  s= There's-a-starman-waiting-in-the-sky
  k= 3

  The alphabet is rotated by 3, matching the mapping above. The encrypted
  string is: Wkhuh'v-d-vwdupdq-zdlwlqj-lq-wkh-vnb
  NOTE: The cipher only encrypts letters; symbols, such as - remain unencrypted

  FUNCTION DESCRIPTION:
  caesarCipher has the following parameters:
    * string s: clear text
    * int k: the alphabet rotation factor
  
  RETURN:
  string: the encrypted string
  k = 6  n = 28
  32 - 26 = 6
*/

function caesarCipher(message, k) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const alp_len = alphabet.length
  let ciphered_msg = ""

    for (let letter of message) {
      let is_uppercase = (/[A-Z]/).test(letter)
      let alp_pos = alphabet.indexOf(letter.toLowerCase())
      let cipher_pos = (alp_pos + (k%alp_len)) >= alp_len
        ? alp_pos + (k%alp_len) - alp_len
        : alp_pos + (k%alp_len)
      
      if(letter.match(/[A-Za-z]/g)) {
        is_uppercase 
          ? ciphered_msg += alphabet[cipher_pos].toUpperCase() 
          : ciphered_msg += alphabet[cipher_pos]
      } else {
        ciphered_msg += letter
      }
    }
  return ciphered_msg
}

// console.log(caesarCipher("www.abc.xy",87))

function caesarCipherAlt (message, k) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const alp_lowerarr = alphabet.split("")
  const alp_upperarr = alphabet.toUpperCase().split("")
  k = k % alphabet.length

  return message.split("").map(
    (letter)=>{
      let idx = alphabet.indexOf(letter)
      if(idx != -1) {
        return alp_lowerarr[
          idx + k > alphabet.length
            ? idx + k - alphabet.length
            : idx + k
        ]
      }
      idx = alp_upperarr.indexOf(letter)
      if(idx != -1) {
        return alp_upperarr[
          idx + k > alphabet.length
            ? idx + k - alphabet.length
            : idx + k
        ]
      }
      return letter
    }
  ).join("")
}

// console.log(caesarCipherAlt("www.abc.xy",87))

/* MAXMIN -------------------------------------------------------------
  You will be given a list of integers, "arr" and a single integer "k".
  You must create an array of length "k" from elements of "arr" such that
  its unfairnes is minimized. Call that array "arr'".Unfairness of an array
  is calculated as:

  max(arr') - min(arr')

  Where:
    * max denotes the largest integer in arr'
    * min denotes the smallest integer in arr'
  
  EXAMPLE:
  arr = [1,4,7,2]
  k = 2
  Pick any two elements say arr' = [4,7]
  unfairness = max(4,7) - min(4,7) = 7 - 4 = 3
  Testing for all pairs, the solution [1,2] provides the minimum unfairness

  NOTE: Integers in arr may not be unique.

  FUNCTION DESCRIPTION:
  maxMin function has the following parameters:
    * int k: the number of elements to select.
    * int arr[n]: an array of integers.
  
  RETURN:
  int: the minimum possible unfairness.

  EXPLANATION:
  Here K=4; selecting th 4 integers 1,2,3,4, unfairness equals.
  max(1,2,3,4) - min(1,2,3,4) = 4-1 = 3
*/

function maxMin (k, arr) {
  let sorted_arr = [...arr].sort((a,b)=>a-b)
  let result = []
  
  for (let i=0; i<=sorted_arr.length - k; i++) {
    let diff = sorted_arr[i+k-1] - sorted_arr[i]
    result.push(diff)
  }
  return Math.min(...result)
}

console.log(maxMin(2, [1,4,7,2]))

/* STRONG PASSWORD
  Louise joined a social networking site to stay in touch with her friends
  The signup page required her to input a name and a password. However, the 
  password must be strong. The website considers a password to be strong if 
  it sastisfies the following criteria:

    * Its length is at least 6
    * It contains at least one digit
    * It contains at least one lowecase English character.
    * It contains at least one uppercase English character.
    * It contains at least one special character. The special character are:
      - !@#$%^&*()-+
  
  She typed a random string of length "n" in the password field but wasn't sure
  if it was strong. Given the string she typed, can you find the minimum number
  of characters she must add to make her password strong?
  NOTE: Here's the set of types of characters in a form you can paste in your
  solution:

    numbers = "01234566789"
    lower_case = "abcdefghijklmnopqrstuvwxxyz"
    upper_case = "ABCDEFGHIJKLMNOPQRSTYVWXYZ"
    special_characters = "!@#$%^&*()-+"

  EXAMPLE:
  password = "2bbbb"
  This password is 5 characters long and is missing an uppercase and a special
  character. The minimum number of characters to add is 2.
  password = "2bb#A"
  This password is 5 characters long and has at least one of each character
  type. The minimum number of characters to add is 1.

  FUNCITON DESCRIPTION:
  minimumNumber function has the following parameters:
    * int n: the length of the password.
    * string password: the password to test.
  
  RETURNS:
    * int: the minimum number of characters to add
  CONSTRAINS:
    * 1 <= n <= 100
    * All characters in password are in [a-z], [0-9], or [!@#$%^&*()-+]
*/