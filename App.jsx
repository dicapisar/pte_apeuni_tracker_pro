import React, { useState, useEffect } from 'react';
import { Info, Flame, AlertCircle, Save, CheckCircle2, X, BookOpen, Target, Lightbulb, Dumbbell } from 'lucide-react';

// --- DATA DEL PTE ---
// Datos basados en el PTE Academic. Los impactos son aproximados 
// basados en las guías oficiales de puntuación de Pearson.
const PTE_DATA = [
  {
    category: "Speaking",
    tests: [
      { 
        code: "RA", name: "Read Aloud", impact: 22, color: "bg-red-400", desc: "Lee un texto en voz alta. Evalúa tanto Speaking como Reading. Crucial para la fluidez.",
        strategy: {
          goal: "Demostrar fluidez oral y pronunciación clara. Aporta enormes puntos a tu banda de Reading.",
          main: [
            "La fluidez (Oral Fluency) es EL factor más importante, muy por encima de pronunciar todo perfecto.",
            "Agrupa las palabras en bloques lógicos (chunks) de 3 a 5 palabras para sonar natural y no como un robot leyendo palabra por palabra."
          ],
          tips: [
            "REGLA DE ORO: ¡NUNCA te corrijas! Si lees mal una palabra o tartamudeas, sigue adelante de inmediato. Corregirse arruina el puntaje de fluidez.",
            "Aprovecha los 35-40 segundos previos para leer el texto en voz baja e identificar palabras difíciles.",
            "Si no sabes cómo se dice una palabra, murmúrala o inventa su pronunciación sin detener tu ritmo."
          ],
          practice: "Practica 10-15 textos diarios. Grábate y enfócate exclusivamente en mantener un ritmo constante sin importar los errores que cometas al leer."
        }
      },
      { 
        code: "RS", name: "Repeat Sentence", impact: 32, color: "bg-red-500", desc: "Escucha y repite la oración exactamente. ¡La prueba más importante de todo el PTE! Afecta Speaking y Listening.",
        strategy: {
          goal: "Retener la estructura de una oración escuchada e imitar la fluidez y entonación del hablante.",
          main: [
            "Entiende el significado: Es más fácil recordar 'El estudiante fue a la biblioteca a estudiar' si imaginas la escena, que si solo intentas memorizar sonidos.",
            "Método de las Iniciales: Mientras escuchas, anota rápido solo la primera letra de cada palabra en tu libreta borrable (ej. 'T s w t t l t s')."
          ],
          tips: [
            "Con decir el 50% de las palabras en el orden correcto, ya tienes la mayoría de los puntos de contenido.",
            "Cierra los ojos mientras escuchas, ayuda muchísimo a la concentración.",
            "Si olvidas la mitad de la frase, repite la mitad que recuerdes con TOTAL fluidez y seguridad. No dudes ni te quedes callado."
          ],
          practice: "Haz 30-50 diarios en APEuni. Usa audios a velocidad 1.0x primero y luego sube a 1.2x. Nunca repitas a medias, dilo con convicción."
        }
      },
      { 
        code: "DI", name: "Describe Image", impact: 11, color: "bg-orange-400", desc: "Describe una imagen gráfica. Aquí importa más la fluidez y el uso de plantillas que el contenido exacto.",
        strategy: {
          goal: "Hablar continuamente durante 25-30 segundos sobre una imagen sin pausas.",
          main: [
            "Usa SIEMPRE una plantilla (Template). El algoritmo de Pearson no es tan inteligente para saber si tu análisis de la gráfica es brillante, solo le importa que hables de corrido usando palabras clave de la imagen."
          ],
          tips: [
            "Solo lee el título de la gráfica, los ejes (X y Y), colores visibles y di qué valor es el máximo y cuál es el mínimo.",
            "No intentes analizar los datos profundamente. Si es un mapa, solo lee los nombres de los países o ciudades que veas.",
            "Detente alrededor de los 30-35 segundos. No llegues a los 40 para evitar cortes abruptos."
          ],
          practice: "Memoriza tu plantilla a la perfección. Practica con 5 imágenes aleatorias al día hasta que la plantilla salga en automático de tu boca."
        }
      },
      { 
        code: "RL", name: "Retell Lecture", impact: 12, color: "bg-orange-400", desc: "Escucha una clase y resúmela. Usa tus plantillas para mantener la fluidez.",
        strategy: {
          goal: "Extraer información clave de un audio de nivel universitario y reestructurarlo oralmente.",
          main: [
            "Igual que Describe Image: La plantilla es tu mejor amiga. Te salvará de quedarte en blanco.",
            "Mientras escuchas el audio, no intentes entender todo. Anota frases cortas de 2-3 palabras (keywords), no palabras sueltas."
          ],
          tips: [
            "Escribe al menos 4-5 frases del audio en tu libreta.",
            "Inserta esas frases directamente en los espacios en blanco de tu plantilla y léelas con fluidez.",
            "Si no lograste anotar mucho, repite la misma frase dos veces en diferentes partes de la plantilla."
          ],
          practice: "Practica tomar notas rápidamente sin mirar el papel. Haz 3-5 audios al día."
        }
      },
      { 
        code: "ASQ", name: "Answer Short Question", impact: 2, color: "bg-yellow-400", desc: "Preguntas de cultura general. Bajo impacto, no pierdas mucho tiempo estudiando esto.",
        strategy: {
          goal: "Responder una pregunta sencilla con una o dos palabras.",
          main: [
            "Responde de inmediato. El micrófono se cierra si hay 3 segundos de silencio."
          ],
          tips: [
            "Si no sabes la respuesta, di 'I don't know' o simplemente repite una de las palabras que escuchaste en la pregunta. Nunca te quedes callado.",
            "Aporta muy pocos puntos, así que no te estreses si fallas."
          ],
          practice: "No inviertas más del 2% de tu tiempo de estudio aquí. Escucha algunos ejemplos ocasionalmente."
        }
      },
    ]
  },
  {
    category: "Writing",
    tests: [
      { 
        code: "SWT", name: "Summarize Written Text", impact: 7, color: "bg-teal-400", desc: "Resume un texto en UNA sola oración. Afecta Reading y Writing.",
        strategy: {
          goal: "Condensar ideas clave en una sola frase gramaticalmente perfecta.",
          main: [
            "REGLA ABSOLUTA: Tu respuesta debe tener solo UN PUNTO FINAL (.).",
            "Busca las 2 o 3 oraciones más importantes del texto original (generalmente la primera, alguna del medio y la conclusión)."
          ],
          tips: [
            "Copia y pega (literalmente, escribe) esas oraciones y únelas usando conectores simples como 'and', 'but', 'because', 'moreover', y comas.",
            "Mantén tu respuesta entre 35 y 45 palabras. Menos de 5 o más de 75 te dará cero puntos.",
            "Revisa exhaustivamente mayúsculas y ortografía antes de darle 'Next'."
          ],
          practice: "Practica 2-3 resúmenes al día. Enfócate en tu uso de conjunciones (, and / ; however, / etc)."
        }
      },
      { 
        code: "WE", name: "Write Essay", impact: 11, color: "bg-teal-500", desc: "Escribe un ensayo. Memoriza una buena plantilla y cuida la ortografía/gramática. Afecta solo Writing.",
        strategy: {
          goal: "Producir un texto estructurado demostrando vocabulario y gramática (200-300 palabras).",
          main: [
            "Usa una plantilla pre-fabricada de 4 párrafos (Introducción, Ventajas/Idea 1, Desventajas/Idea 2, Conclusión).",
            "El contenido (tus ideas) apenas importa. Importa cero errores de ortografía y usar el formato correcto."
          ],
          tips: [
            "Identifica las 'keywords' de la pregunta y espárcelas a lo largo de tu plantilla.",
            "No intentes usar vocabulario complejo si no sabes cómo se escribe. Palabras simples y correctas ganan más puntos que palabras difíciles mal escritas.",
            "Escribe entre 220 y 250 palabras para ir a lo seguro."
          ],
          practice: "Tu único trabajo es tipear tu plantilla en menos de 10 minutos sin errores. Practica 1 ensayo cada dos días."
        }
      },
    ]
  },
  {
    category: "Reading",
    tests: [
      { 
        code: "FIB-RW", name: "Reading & Writing: Fill in Blanks", impact: 22, color: "bg-blue-500", desc: "Selecciona palabras de un menú desplegable. Muy importante para vocabulario y gramática.",
        strategy: {
          goal: "Elegir la palabra correcta basada en el contexto y la gramática (Collocations).",
          main: [
            "Lee la oración completa antes de elegir. A veces la pista está en la palabra inmediatamente anterior o posterior al espacio.",
            "Aprende 'Collocations' (palabras que siempre van juntas en inglés, ej: 'make a decision', no 'do a decision')."
          ],
          tips: [
            "Aplica descarte gramatical. Si el espacio está después de una preposición (in, on, at), a menudo necesita un verbo con '-ing'.",
            "Si no sabes, adivina y avanza. No te quedes más de 2 minutos por texto, el tiempo general de Reading no se detiene."
          ],
          practice: "Practica 10-20 textos al día. Mantén una libreta con las 'collocations' y vocabulario nuevo en los que te equivoques."
        }
      },
      { 
        code: "FIB-R", name: "Reading: Fill in the Blanks", impact: 15, color: "bg-blue-400", desc: "Arrastra palabras a los espacios. Práctica vital para tu puntaje de lectura.",
        strategy: {
          goal: "Arrastrar la palabra correcta a los espacios usando pistas gramaticales.",
          main: [
            "Agrupa las palabras sobrantes en categorías mentales (sustantivos, verbos, adjetivos).",
            "Determina qué tipo de palabra requiere el espacio vacío (ej. después de 'The' usualmente va un sustantivo)."
          ],
          tips: [
            "Busca pistas en plurales y singulares, o tiempos verbales.",
            "Usa la lógica de las preposiciones: algunos verbos siempre rigen con 'to' (contribute to), otros con 'on' (rely on)."
          ],
          practice: "Haz 10 diarios. El análisis gramatical es más rápido y seguro que solo intentar traducir y ver 'qué suena mejor'."
        }
      },
      { 
        code: "RO", name: "Re-order Paragraphs", impact: 6, color: "bg-indigo-400", desc: "Ordena los párrafos lógicamente. Busca pares lógicos, es difícil pero no de altísimo impacto.",
        strategy: {
          goal: "Restaurar el orden lógico de un texto desordenado.",
          main: [
            "Primero, encuentra la 'Topic Sentence' (Oración Principal). Esta oración es independiente, no usa pronombres (he, it, they) ni conectores (however, therefore) y presenta un tema nuevo.",
            "Luego, forma 'Pares Lógicos'. Es mejor encontrar pares unidos que intentar ordenar del 1 al 5 de golpe."
          ],
          tips: [
            "Sigue la regla Noun-Pronoun: Si un párrafo dice 'John Smith', el siguiente probablemente diga 'He'.",
            "Sigue cronologías (años, fechas) de pasado a presente."
          ],
          practice: "No te frustres, es una sección tramposa. Dedica tiempo, pero recuerda que WFD o RA te dan el triple de puntos."
        }
      },
      { 
        code: "MCM-R", name: "Multiple Choice, Multiple Answers", impact: 2, color: "bg-gray-400", desc: "Opción múltiple con varias respuestas. ¡Resta puntos si te equivocas! Solo marca si estás 100% seguro.",
        strategy: {
          goal: "Seleccionar más de una respuesta correcta basándote en la lectura.",
          main: [
            "¡CUIDADO! Esta sección tiene puntaje negativo. Si marcas una correcta (+1) y una incorrecta (-1), tu puntaje es 0.",
            "La estrategia de los expertos: Selecciona SOLAMENTE UNA opción de la que estés 100% seguro y avanza."
          ],
          tips: [
            "Lee la pregunta y las opciones ANTES de leer el texto.",
            "Evita las opciones que usan palabras absolutas como 'always', 'never', 'all'."
          ],
          practice: "Ignora la práctica intensa aquí. Tu tiempo de estudio vale más en FIB-RW."
        }
      },
      { 
        code: "MCS-R", name: "Multiple Choice, Single Answer", impact: 1, color: "bg-gray-400", desc: "Opción múltiple de una sola respuesta. Impacto mínimo.",
        strategy: {
          goal: "Seleccionar la única respuesta correcta.",
          main: [
            "Lee la pregunta, ubica la palabra clave en el texto y elige la respuesta."
          ],
          tips: [
            "No tiene puntaje negativo.",
            "Si el tiempo apremia, elige una al azar y avanza. No quemes minutos valiosos de Reading aquí."
          ],
          practice: "Práctica ocasional. No amerita estudio profundo."
        }
      },
    ]
  },
  {
    category: "Listening",
    tests: [
      { 
        code: "SST", name: "Summarize Spoken Text", impact: 13, color: "bg-purple-500", desc: "Escucha y escribe un resumen. Requiere buena ortografía e identificar palabras clave.",
        strategy: {
          goal: "Escribir un resumen de 50-70 palabras basado en un audio académico.",
          main: [
            "Usa una plantilla. Mientras escuchas, anota 4 a 6 frases clave (no palabras sueltas, mejor pequeñas frases).",
            "La gramática y ortografía son revisadas estrictamente. Un error ortográfico arruina tu puntaje."
          ],
          tips: [
            "NUNCA escribas menos de 50 ni más de 70 palabras (recomendado: 60-65).",
            "Si no sabes escribir una palabra, usa un sinónimo más fácil.",
            "Deja 2-3 minutos al final exclusivamente para revisar la gramática de lo que escribiste."
          ],
          practice: "Practica 2 audios diarios. Acostúmbrate a escribir rápido en tu libreta mientras escuchas."
        }
      },
      { 
        code: "FIB-L", name: "Listening: Fill in the Blanks", impact: 7, color: "bg-purple-400", desc: "Escucha y escribe la palabra faltante. Cuidado con la ortografía y plurales.",
        strategy: {
          goal: "Teclear exactamente la palabra que falta mientras escuchas.",
          main: [
            "Escribe la palabra en la libreta borrable mientras escuchas. No intentes teclear directamente porque te puedes atrasar con la lectura del audio."
          ],
          tips: [
            "Una vez termine el audio, pasa las palabras de tu libreta a la pantalla.",
            "¡Peligro con la 'S'! Muchos estudiantes pierden puntos por no poner el plural (students vs student) o el pasado (worked vs work). Presta atención al final de la palabra."
          ],
          practice: "Practica usar la tecla 'Tab' para saltar de casilla en casilla si prefieres teclear en vivo. Practica deletrear palabras comunes (academic, accommodation, etc)."
        }
      },
      { 
        code: "HIW", name: "Highlight Incorrect Words", impact: 9, color: "bg-purple-400", desc: "Sigue la lectura y marca palabras incorrectas. ¡Penaliza por errores! Da muchos puntos fáciles si practicas.",
        strategy: {
          goal: "Hacer clic en las palabras de la transcripción que difieren del audio.",
          main: [
            "Mantén el cursor del mouse siguiendo cada palabra de la pantalla exactamente al ritmo de la voz del audio.",
            "Tiene puntaje negativo. No adivines ni hagas clics al azar."
          ],
          tips: [
            "El audio a veces va más rápido que tu velocidad normal de lectura. No leas para entender, solo lee para coincidir sonidos.",
            "Las diferencias suelen estar en palabras similares (development vs developing) o verbos."
          ],
          practice: "Haz 5-10 diarios. En APEuni, sube la velocidad del audio a 1.2x. Cuando vayas al examen real a velocidad 1.0x, te parecerá cámara lenta."
        }
      },
      { 
        code: "WFD", name: "Write From Dictation", impact: 20, color: "bg-pink-500", desc: "Dictado de oración. ¡La segunda más importante del examen! Escribe iniciales primero y rellena. Afecta Listening y Writing.",
        strategy: {
          goal: "Escribir la oración dictada palabra por palabra sin errores.",
          main: [
            "Esta es la mina de oro del puntaje. Cada palabra correcta te da puntos tanto en Writing como en Listening.",
            "Usa el Método de Iniciales: El audio dice 'The assignment is due tomorrow'. Escribes rápido: 'T a i d t'. Luego reconstruyes."
          ],
          tips: [
            "EL GRAN TRUCO DEL PTE: Puedes añadir palabras extra sin penalización. Si dudas si dijo 'student' o 'students', escribe ambas en tu respuesta ('The student students...'). El sistema buscará la correcta y te dará el punto.",
            "Si dudas del artículo, escribe 'a the an' en la oración.",
            "Verifica la ortografía antes de enviar."
          ],
          practice: "Practica intensamente. 30 a 50 oraciones diarias. Haz simulacros completos de WFD porque esta sección aparece al final del examen cuando estás más cansado."
        }
      },
      { 
        code: "HCS", name: "Highlight Correct Summary", impact: 2, color: "bg-gray-400", desc: "Elige el mejor resumen. Consume mucho tiempo, hazlo rápido.",
        strategy: {
          goal: "Seleccionar el párrafo que mejor resume el audio.",
          main: [
            "Toma notas de las ideas principales mientras escuchas.",
            "Lee rápido, esta sección consume minutos vitales que necesitas guardar para la joya de la corona: el WFD (Write From Dictation)."
          ],
          tips: [
            "Si tardas más de un minuto leyendo las opciones, adivina y avanza. ¡El tiempo de Listening es general!"
          ],
          practice: "Baja prioridad. Estudia cómo leer en diagonal."
        }
      },
      { 
        code: "MCM-L", name: "Multiple Choice, Multiple Answers", impact: 2, color: "bg-gray-400", desc: "¡Penaliza por errores! Si no sabes, marca solo una o ninguna.",
        strategy: {
          goal: "Seleccionar varias respuestas correctas sobre el audio.",
          main: [
            "Al igual que en Reading, tiene puntaje negativo.",
            "Elige solo UNA respuesta de la que estés seguro. Aseguras tu punto y avanzas."
          ],
          tips: [
            "No pierdas tiempo leyendo las opciones mientras habla el audio, mejor concéntrate en escuchar o tomar notas."
          ],
          practice: "Baja prioridad. No gastes tu energía mental aquí."
        }
      },
      { 
        code: "MCS-L", name: "Multiple Choice, Single Answer", impact: 1, color: "bg-gray-400", desc: "Impacto mínimo. No te estanques aquí.",
        strategy: {
          goal: "Seleccionar una opción correcta sobre el audio.",
          main: [
            "No hay puntaje negativo. Responde guiándote por tus notas y el sentido general."
          ],
          tips: [
            "Adivina y avanza si tienes dudas. Salva el tiempo."
          ],
          practice: "No amerita práctica específica."
        }
      },
      { 
        code: "SMW", name: "Select Missing Word", impact: 1, color: "bg-gray-400", desc: "Adivina la última palabra del audio. Impacto mínimo.",
        strategy: {
          goal: "Predecir con qué palabra o frase terminaba el audio cortado.",
          main: [
            "Sigue el hilo de la historia del audio. Si el tono es de conclusión, la respuesta probablemente sea un resultado."
          ],
          tips: [
            "Mira la barra de progreso del audio, prepárate mentalmente cuando esté a punto de terminar."
          ],
          practice: "Baja prioridad. Una vez que haces un par para entender la mecánica, es suficiente."
        }
      },
    ]
  }
];

// Valores iniciales por defecto (vacíos)
const initialProgressState = PTE_DATA.reduce((acc, category) => {
  category.tests.forEach(test => {
    acc[test.code] = { myScore: '', targetScore: 79 }; // Meta de 79 (equivale a IELTS 8.0 aprox)
  });
  return acc;
}, {});

const UI_TEXT = {
  es: {
    headerSubtitle: 'Control de progreso inteligente para tu maestria en Australia.',
    autoSaving: 'Guardado automatico...',
    savedInBrowser: 'Datos guardados en tu navegador',
    studyGuide: 'Guia de Estudio:',
    highPriority: 'Alta Prioridad',
    mediumPriority: 'Media Prioridad',
    lowPriority: 'Baja Prioridad',
    myScore: 'Mi %',
    targetScore: 'Target %',
    impactPrefix: 'Impacto:',
    footer:
      'Recuerda: Enfoca al menos el 70% de tu tiempo de estudio en los items marcados en rojo (Alta Prioridad: RS, WFD, RA y FIB). Exitos con tu master en Australia!',
    modal: {
      objective: 'Objetivo Principal',
      provenStrategy: 'Estrategia Comprobada',
      tips: 'Trucos y Tips',
      practice: 'Como Practicar',
    },
    language: 'Idioma',
  },
  en: {
    headerSubtitle: 'Smart progress tracking for your master in Australia.',
    autoSaving: 'Auto-saving...',
    savedInBrowser: 'Your data is saved in your browser',
    studyGuide: 'Study Guide:',
    highPriority: 'High Priority',
    mediumPriority: 'Medium Priority',
    lowPriority: 'Low Priority',
    myScore: 'My %',
    targetScore: 'Target %',
    impactPrefix: 'Impact:',
    footer:
      'Remember: Focus at least 70% of your study time on the items marked in red (High Priority: RS, WFD, RA and FIB). Good luck with your master in Australia!',
    modal: {
      objective: 'Main Goal',
      provenStrategy: 'Proven Strategy',
      tips: 'Tips and Tricks',
      practice: 'How to Practice',
    },
    language: 'Language',
  },
};

const EN_TEST_CONTENT = {
  RA: {
    desc: 'Read a text aloud. It evaluates both Speaking and Reading. Crucial for fluency.',
    strategy: {
      goal: 'Demonstrate oral fluency and clear pronunciation. It contributes heavily to your Reading score.',
      main: [
        'Fluency is the most important factor, far more than pronouncing every word perfectly.',
        'Group words into logical chunks of 3 to 5 words to sound natural and avoid reading like a robot.',
      ],
      tips: [
        'Golden rule: never correct yourself. If you misread a word or stumble, keep going immediately. Self-correction destroys fluency.',
        'Use the 35-40 seconds before the task to read silently and spot difficult words.',
        'If you do not know how to say a word, murmur it or invent a pronunciation without breaking your rhythm.',
      ],
      practice: 'Practice 10-15 texts daily. Record yourself and focus exclusively on keeping a steady pace no matter the errors.',
    },
  },
  RS: {
    desc: 'Listen and repeat the sentence exactly. The most important task in the PTE! It affects Speaking and Listening.',
    strategy: {
      goal: "Retain the structure of a sentence you heard and imitate the speaker's fluency and intonation.",
      main: [
        'Understand the meaning: it is easier to remember "The student went to the library to study" if you picture the scene than if you only try to memorize sounds.',
        'Initials method: while listening, quickly jot down only the first letter of each word in your erasable notebook (e.g. "T s w t t l t s").',
      ],
      tips: [
        'If you say 50% of the words in the correct order, you already get most of the content points.',
        'Close your eyes while listening; it helps concentration a lot.',
        'If you forget half the sentence, repeat the part you remember with TOTAL fluency and confidence. Do not hesitate or go silent.',
      ],
      practice: 'Do 30-50 daily on APEuni. Use 1.0x audio first and then increase to 1.2x. Never repeat halfway; say it confidently.',
    },
  },
  DI: {
    desc: 'Describe an image or graph. Fluency and template use matter more than exact content.',
    strategy: {
      goal: 'Speak continuously for 25-30 seconds about an image without pauses.',
      main: [
        "Always use a template. Pearson's algorithm is not smart enough to know whether your graph analysis is brilliant; it mainly cares that you speak continuously using keywords from the image.",
      ],
      tips: [
        'Only read the title, the axes (X and Y), visible colors, and say which value is highest and which is lowest.',
        'Do not try to analyze the data deeply. If it is a map, just read the names of the countries or cities you can see.',
        'Stop around 30-35 seconds. Do not go all the way to 40 to avoid abrupt cuts.',
      ],
      practice: 'Memorize your template perfectly. Practice with 5 random images a day until the template comes out automatically.',
    },
  },
  RL: {
    desc: 'Listen to a lecture and summarize it. Use templates to keep fluency.',
    strategy: {
      goal: 'Extract key information from a university-level audio and reshape it orally.',
      main: [
        'Same as Describe Image: the template is your best friend. It will save you from going blank.',
        'While listening, do not try to understand everything. Write short 2-3 word phrases (keywords), not isolated words.',
      ],
      tips: [
        'Write at least 4-5 phrases from the audio in your notebook.',
        'Insert those phrases directly into the blanks of your template and read them fluently.',
        'If you did not manage to note much, repeat the same phrase twice in different parts of the template.',
      ],
      practice: 'Practice quick note-taking without looking at the paper. Do 3-5 audios a day.',
    },
  },
  ASQ: {
    desc: 'General knowledge questions. Low impact, do not spend much time studying this.',
    strategy: {
      goal: 'Answer a simple question with one or two words.',
      main: ['Answer immediately. The microphone closes after 3 seconds of silence.'],
      tips: [
        'If you do not know the answer, say "I do not know" or simply repeat one of the words you heard in the question. Never stay silent.',
        'It contributes very few points, so do not stress if you miss it.',
      ],
      practice: 'Do not spend more than 2% of your study time here. Listen to some examples occasionally.',
    },
  },
  SWT: {
    desc: 'Summarize a text in a single sentence. It affects Reading and Writing.',
    strategy: {
      goal: 'Condense key ideas into one grammatically perfect sentence.',
      main: [
        'Absolute rule: your response must contain only ONE period (.).',
        'Find the 2 or 3 most important sentences in the original text (usually the first one, one from the middle, and the conclusion).',
      ],
      tips: [
        'Copy and paste (literally, write) those sentences and join them with simple connectors like "and", "but", "because", "moreover", and commas.',
        'Keep your response between 35 and 45 words. Fewer than 5 or more than 75 will give you zero points.',
        'Check capitalization and spelling thoroughly before pressing Next.',
      ],
      practice: 'Practice 2-3 summaries a day. Focus on your use of conjunctions (, and / ; however, / etc).',
    },
  },
  WE: {
    desc: 'Write an essay. Memorize a good template and take care of spelling and grammar. It affects Writing only.',
    strategy: {
      goal: 'Produce a structured text showing vocabulary and grammar (200-300 words).',
      main: [
        'Use a pre-made 4-paragraph template (Introduction, Advantage/Idea 1, Disadvantage/Idea 2, Conclusion).',
        'The content (your ideas) barely matters. What matters is zero spelling errors and using the correct format.',
      ],
      tips: [
        'Identify the question keywords and sprinkle them throughout your template.',
        'Do not try to use complex vocabulary if you do not know how to spell it. Simple, correct words score better than difficult misspelled ones.',
        'Write between 220 and 250 words to stay safe.',
      ],
      practice: 'Your only job is to type your template in under 10 minutes without mistakes. Practice one essay every two days.',
    },
  },
  'FIB-RW': {
    desc: 'Select words from a dropdown menu. Very important for vocabulary and grammar.',
    strategy: {
      goal: 'Choose the correct word based on context and grammar (collocations).',
      main: [
        'Read the full sentence before choosing. Sometimes the clue is in the word immediately before or after the blank.',
        'Learn collocations (words that always go together in English, for example "make a decision", not "do a decision").',
      ],
      tips: [
        'Use grammar-based elimination. If the blank comes after a preposition (in, on, at), it often needs a verb ending in -ing.',
        'If you do not know, guess and move on. Do not spend more than 2 minutes per text; Reading time does not stop.',
      ],
      practice: 'Practice 10-20 texts a day. Keep a notebook with collocations and new vocabulary you get wrong.',
    },
  },
  'FIB-R': {
    desc: 'Drag words into the blanks. Essential practice for your reading score.',
    strategy: {
      goal: 'Drag the correct word into the blanks using grammatical clues.',
      main: [
        'Group the remaining words into mental categories (nouns, verbs, adjectives).',
        'Determine what type of word the blank requires (for example, after "The" a noun usually comes next).',
      ],
      tips: [
        'Look for clues in plurals and singulars, or verb tenses.',
        'Use preposition logic: some verbs always take "to" (contribute to), others "on" (rely on).',
      ],
      practice: 'Do 10 per day. Grammar analysis is faster and safer than translating and guessing what sounds better.',
    },
  },
  RO: {
    desc: 'Arrange paragraphs logically. Look for logical pairs; it is tricky but not among the highest-impact tasks.',
    strategy: {
      goal: 'Restore the logical order of a scrambled text.',
      main: [
        'First find the Topic Sentence. This sentence is independent, uses no pronouns (he, it, they) or connectors (however, therefore), and introduces a new topic.',
        'Then form logical pairs. It is better to find connected pairs than to try to order 1 to 5 all at once.',
      ],
      tips: [
        'Follow the noun-pronoun rule: if one paragraph says "John Smith", the next will likely say "He".',
        'Follow chronologies (years, dates) from past to present.',
      ],
      practice: 'Do not get frustrated; this section is tricky. Spend time on it, but remember WFD or RA give you three times more points.',
    },
  },
  'MCM-R': {
    desc: 'Multiple choice with multiple answers. Wrong answers lose points! Mark only if you are 100% sure.',
    strategy: {
      goal: 'Select more than one correct answer based on the reading.',
      main: [
        'Warning: this section has negative scoring. If you mark one correct (+1) and one wrong (-1), your score is 0.',
        'The expert strategy: select ONLY ONE option you are 100% sure about and move on.',
      ],
      tips: [
        'Read the question and the options BEFORE reading the text.',
        'Avoid options that use absolute words like "always", "never", "all".',
      ],
      practice: 'Ignore intense practice here. Your study time is worth more on FIB-RW.',
    },
  },
  'MCS-R': {
    desc: 'Single-answer multiple choice. Minimal impact.',
    strategy: {
      goal: 'Select the single correct answer.',
      main: ['Read the question, locate the keyword in the text, and choose the answer.'],
      tips: [
        'It has no negative scoring.',
        'If time is tight, pick one at random and move on. Do not spend valuable Reading minutes here.',
      ],
      practice: 'Occasional practice. No deep study needed.',
    },
  },
  SST: {
    desc: 'Listen and write a summary. Requires good spelling and identifying keywords.',
    strategy: {
      goal: 'Write a 50-70 word summary based on an academic audio.',
      main: [
        'Use a template. While listening, note 4 to 6 key phrases (not isolated words; short phrases work better).',
        'Grammar and spelling are checked strictly. One spelling mistake can ruin your score.',
      ],
      tips: [
        'Never write fewer than 50 or more than 70 words (recommended: 60-65).',
        'If you do not know how to spell a word, use an easier synonym.',
        'Leave 2-3 minutes at the end exclusively to review the grammar of what you wrote.',
      ],
      practice: 'Practice 2 audios daily. Get used to writing quickly in your notebook while listening.',
    },
  },
  'FIB-L': {
    desc: 'Listen and type the missing word. Watch spelling and plurals.',
    strategy: {
      goal: 'Type exactly the missing word while listening.',
      main: [
        'Write the word in your erasable notebook while listening. Do not try to type directly or you may fall behind the audio.',
      ],
      tips: [
        'Once the audio ends, transfer the words from your notebook to the screen.',
        'Beware of the S! Many students lose points because they forget the plural (students vs student) or the past tense (worked vs work). Pay attention to the end of the word.',
      ],
      practice: 'Practice using the Tab key to jump from blank to blank if you prefer typing live. Practice spelling common words (academic, accommodation, etc).',
    },
  },
  HIW: {
    desc: 'Follow the reading and mark incorrect words. Penalized for mistakes! It gives many easy points if you practice.',
    strategy: {
      goal: 'Click the words in the transcript that differ from the audio.',
      main: [
        'Keep your mouse cursor following each word on the screen exactly at the pace of the audio.',
        'It has negative scoring. Do not guess or click randomly.',
      ],
      tips: [
        'The audio may move faster than your normal reading speed. Do not read to understand; read only to match the sounds.',
        'Differences are often in similar words (development vs developing) or verbs.',
      ],
      practice: 'Do 5-10 daily. In APEuni, increase the audio speed to 1.2x. When you go to the real exam at 1.0x, it will feel slow.',
    },
  },
  WFD: {
    desc: 'Dictation of a sentence. The second most important task in the exam! Write initials first and fill in the rest. It affects Listening and Writing.',
    strategy: {
      goal: 'Write the dictated sentence word for word without mistakes.',
      main: [
        'This is the gold mine of scoring. Every correct word gives you points in both Writing and Listening.',
        'Use the initials method: if the audio says "The assignment is due tomorrow", quickly write "T a i d t". Then rebuild it.',
      ],
      tips: [
        'The big PTE trick: you can add extra words without penalty. If you are unsure whether it said "student" or "students", write both in your response ("The student students..."). The system will find the correct one and award the point.',
        'If you are unsure about the article, write "a the an" in the sentence.',
        'Check spelling before submitting.',
      ],
      practice: 'Practice intensely. 30 to 50 sentences daily. Do full WFD simulations because this section appears at the end of the exam when you are most tired.',
    },
  },
  HCS: {
    desc: 'Pick the best summary. It takes a lot of time, so do it quickly.',
    strategy: {
      goal: 'Select the paragraph that best summarizes the audio.',
      main: [
        'Take notes of the main ideas while listening.',
        'Read quickly; this section uses up minutes you need to save for the crown jewel: WFD (Write From Dictation).',
      ],
      tips: ['If you spend more than a minute reading the options, guess and move on. Listening time is shared.'],
      practice: 'Low priority. Learn how to read diagonally.',
    },
  },
  'MCM-L': {
    desc: 'Multiple choice with multiple answers. Wrong answers are penalized. If unsure, mark one or none.',
    strategy: {
      goal: 'Select several correct answers about the audio.',
      main: [
        'As in Reading, it has negative scoring.',
        'Choose only ONE answer you are sure about. Secure your point and move on.',
      ],
      tips: ['Do not waste time reading the options while the audio is playing; focus on listening or taking notes.'],
      practice: 'Low priority. Do not spend mental energy here.',
    },
  },
  'MCS-L': {
    desc: 'Minimal impact. Do not get stuck here.',
    strategy: {
      goal: 'Select one correct option about the audio.',
      main: ['There is no negative scoring. Answer based on your notes and the general sense.'],
      tips: ['Guess and move on if you are unsure. Save time.'],
      practice: 'No specific practice needed.',
    },
  },
  SMW: {
    desc: 'Guess the last word of the audio. Minimal impact.',
    strategy: {
      goal: 'Predict the word or phrase the cut audio ended with.',
      main: ['Follow the flow of the audio. If the tone is conclusive, the answer is likely a result.'],
      tips: ['Watch the audio progress bar and prepare mentally when it is about to end.'],
      practice: 'Low priority. Once you understand the mechanic after a couple of tries, that is enough.',
    },
  },
};

const getLocalizedPteData = (language) => {
  if (language === 'es') return PTE_DATA;

  return PTE_DATA.map(category => ({
    ...category,
    tests: category.tests.map(test => ({
      ...test,
      ...(EN_TEST_CONTENT[test.code] || {}),
    })),
  }));
};


export default function App() {
  // Estado principal que se nutre del LocalStorage
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('pte_progress_data');
      return saved ? JSON.parse(saved) : initialProgressState;
    } catch (e) {
      return initialProgressState;
    }
  });

  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem('pte_language');
      return saved === 'en' ? 'en' : 'es';
    } catch (e) {
      return 'es';
    }
  });
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [selectedStrategyTest, setSelectedStrategyTest] = useState(null); // Estado para el Modal
  const ui = UI_TEXT[language];
  const displayData = getLocalizedPteData(language);

  // Guardar en LocalStorage cada vez que cambie 'progress'
  useEffect(() => {
    localStorage.setItem('pte_progress_data', JSON.stringify(progress));
    setIsAutoSaving(true);
    const timer = setTimeout(() => setIsAutoSaving(false), 2000);
    return () => clearTimeout(timer);
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('pte_language', language);
  }, [language]);

  const handleInputChange = (code, field, value) => {
    // Validar que no pase de 100 ni baje de 0
    let numValue = parseInt(value);
    if (isNaN(numValue)) numValue = '';
    if (numValue > 100) numValue = 100;
    if (numValue < 0) numValue = 0;

    setProgress(prev => ({
      ...prev,
      [code]: {
        ...prev[code],
        [field]: numValue
      }
    }));
  };

  const calculateBarWidth = (myScore, target) => {
    const score = Number(myScore) || 0;
    const tgt = Number(target) || 100;
    if (tgt === 0) return 0;
    const percentage = (score / tgt) * 100;
    return Math.min(percentage, 100);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 md:p-8">
      {/* HEADER */}
      <header className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            PTE Tracker Pro <CheckCircle2 className="text-blue-500" />
          </h1>
          <p className="text-slate-500 mt-1">{ui.headerSubtitle}</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-white p-1 shadow-sm">
            <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{ui.language}</span>
            <button
              type="button"
              onClick={() => setLanguage('es')}
              className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${language === 'es' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'}`}
            >
              ES
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${language === 'en' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'}`}
            >
              EN
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
            <Save size={16} />
            <span>{isAutoSaving ? ui.autoSaving : ui.savedInBrowser}</span>
          </div>
        </div>
      </header>

      {/* LEYENDA DE PRIORIDAD */}
      <div className="max-w-6xl mx-auto mb-8 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-4 items-center text-sm">
        <span className="font-semibold mr-2">{ui.studyGuide}</span>
        <div className="flex items-center gap-1 text-red-600 font-medium">
          <Flame size={16} /> {ui.highPriority} (&gt;15%)
        </div>
        <div className="flex items-center gap-1 text-orange-500 font-medium">
          <AlertCircle size={16} /> {ui.mediumPriority} (5% - 15%)
        </div>
        <div className="flex items-center gap-1 text-slate-400">
          <Info size={16} /> {ui.lowPriority} (&lt;5%)
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {displayData.map((categoryData) => (
          <div key={categoryData.category} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            
            {/* Título de Categoría */}
            <div className="bg-slate-100/50 px-6 py-4 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-800">{categoryData.category}</h2>
            </div>

            {/* Lista de Pruebas */}
            <div className="p-4 space-y-6">
              {categoryData.tests.map((test) => {
                const currentData = progress[test.code];
                const barWidth = calculateBarWidth(currentData.myScore, currentData.targetScore);
                const isHighImpact = test.impact >= 15;
                const isMediumImpact = test.impact >= 5 && test.impact < 15;

                return (
                  <div key={test.code} className="flex flex-col gap-3">
                    
                    {/* Fila de Info y Inputs */}
                    <div className="flex items-start md:items-center justify-between gap-4 flex-col md:flex-row">
                      
                      {/* Lado Izquierdo: Icono + Nombres + Impacto (Ahora clickeable) */}
                      <div 
                        className="flex items-center gap-3 w-full md:w-auto flex-1 cursor-pointer hover:bg-slate-50 p-2 -ml-2 rounded-xl transition-all border border-transparent hover:border-slate-200"
                        onClick={() => setSelectedStrategyTest(test)}
                      >
                        
                        {/* Tooltip personalizado CSS para el Icono */}
                        <div className="relative group cursor-help">
                          <div className={`w-12 h-12 flex items-center justify-center rounded-lg text-white font-bold tracking-wider shadow-sm text-xl ${test.color}`}>
                            {test.code}
                          </div>
                          
                          {/* Caja del Tooltip */}
                          <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-slate-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 shadow-xl pointer-events-none">
                            <p className="font-bold text-sm mb-1">{test.name}</p>
                            <p className="text-slate-300">{test.desc}</p>
                            <div className="absolute -bottom-1 left-4 w-2 h-2 bg-slate-800 transform rotate-45"></div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-bold text-slate-800 leading-tight">{test.name}</h3>
                          <div className="flex items-center gap-1 mt-1">
                            {isHighImpact ? <Flame size={14} className="text-red-500" /> : null}
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                              isHighImpact ? 'bg-red-50 text-red-600 border border-red-100' :
                              isMediumImpact ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                              'bg-slate-50 text-slate-500 border border-slate-200'
                            }`}>
                              {ui.impactPrefix} {test.impact}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Lado Derecho: Inputs */}
                      <div className="flex items-center gap-4 w-full md:w-auto shrink-0 bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <div className="flex flex-col items-center">
                          <label className="text-[10px] uppercase font-bold text-slate-400 mb-1">{ui.myScore}</label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            placeholder="--"
                            value={currentData.myScore}
                            onChange={(e) => handleInputChange(test.code, 'myScore', e.target.value)}
                            className="w-16 h-10 text-center font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </div>
                        <div className="text-slate-300 text-2xl font-light">/</div>
                        <div className="flex flex-col items-center">
                          <label className="text-[10px] uppercase font-bold text-slate-400 mb-1">{ui.targetScore}</label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={currentData.targetScore}
                            onChange={(e) => handleInputChange(test.code, 'targetScore', e.target.value)}
                            className="w-16 h-10 text-center font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>

                    </div>

                    {/* Barra de Progreso */}
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex relative">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ease-out ${
                          barWidth >= 100 ? 'bg-green-500' : 
                          barWidth > 50 ? 'bg-blue-500' : 'bg-slate-400'
                        }`}
                        style={{ width: `${barWidth}%` }}
                      ></div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </main>
      
      <footer className="max-w-6xl mx-auto mt-12 text-center text-slate-400 text-sm pb-8">
        {ui.footer}
      </footer>

      {/* MODAL DE ESTRATEGIAS */}
      {selectedStrategyTest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedStrategyTest(null)}>
          <div 
            className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col transform transition-all"
            onClick={e => e.stopPropagation()}
          >
            {/* Cabecera del Modal */}
            <div className={`p-6 text-white sticky top-0 z-10 flex justify-between items-start ${selectedStrategyTest.color}`}>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-3xl font-black tracking-wider drop-shadow-sm">{selectedStrategyTest.code}</span>
                  <h2 className="text-2xl font-bold drop-shadow-sm">{selectedStrategyTest.name}</h2>
                </div>
                <p className="text-white/90 text-sm font-medium">{selectedStrategyTest.desc}</p>
              </div>
              <button 
                onClick={() => setSelectedStrategyTest(null)}
                className="p-1.5 bg-white/20 rounded-full hover:bg-white/40 transition-colors backdrop-blur-sm"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            {/* Cuerpo del Modal */}
            <div className="p-6 space-y-8">
              {/* Objetivo */}
              <section>
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-3">
                  <Target className="text-blue-500" /> {ui.modal.objective}
                </h3>
                <p className="text-slate-700 leading-relaxed bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                  {selectedStrategyTest.strategy.goal}
                </p>
              </section>

              {/* Estrategia Principal */}
              <section>
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-3">
                  <BookOpen className="text-indigo-500" /> {ui.modal.provenStrategy}
                </h3>
                <div className="text-slate-700 leading-relaxed space-y-3 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
                  {selectedStrategyTest.strategy.main.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </section>

              {/* Trucos y Tips */}
              <section>
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-3">
                  <Lightbulb className="text-amber-500" /> {ui.modal.tips}
                </h3>
                <ul className="space-y-3">
                  {selectedStrategyTest.strategy.tips.map((tip, i) => (
                    <li key={i} className="flex gap-3 text-slate-700 bg-white p-3 rounded-xl border border-slate-200 shadow-sm hover:border-amber-200 transition-colors">
                      <span className="text-amber-500 font-bold shrink-0 mt-0.5">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Cómo Practicar */}
              <section>
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-3">
                  <Dumbbell className="text-green-500" /> {ui.modal.practice}
                </h3>
                <p className="text-slate-700 leading-relaxed bg-green-50/50 p-4 rounded-xl border border-green-100">
                  {selectedStrategyTest.strategy.practice}
                </p>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}