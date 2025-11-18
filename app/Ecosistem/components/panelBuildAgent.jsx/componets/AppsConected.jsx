'use client';

import Image from "next/image";
import { motion } from 'framer-motion';
import { useState } from "react";

const techTools = [
    /* ===========================
       🟦 BACKEND FRAMEWORKS
       =========================== */
    {
      name: "FastAPI",
      icon: "/fastapi-svgrepo-com.svg",
      desc: "Framework moderno y de alto rendimiento para crear APIs rápidas con Python.",
      useCase: `FastAPI se convierte en un puente natural para conectar tus agentes de inteligencia artificial con GLYNNE, permitiéndote aprovechar nuestro motor cognitivo sin esfuerzo. No necesitas conocimientos avanzados ni infraestructuras complicadas: todo parte de una integración ligera donde tus servicios pueden conversar directamente con nuestras capacidades cognitivas. Desde el momento en que tu backend se comunica con GLYNNE, tus sistemas comienzan a operar con un nivel completamente nuevo de autonomía y capacidad de decisión.

A través de FastAPI puedes enviar información en tiempo real a nuestro motor, permitiendo que tus agentes reaccionen, interpreten, planifiquen y tomen acciones informadas según el contexto de tu negocio. GLYNNE está diseñado para entender procesos, necesidades y escenarios completos, no simples mensajes. Por eso, cada petición que entra por tu API se transforma en una guía inteligente que optimiza tareas, recomienda acciones o automatiza decisiones sin fricción.

Para conectarte, solo necesitas exportar la llave del modelo que hayas creado dentro de la plataforma GLYNNE. Esa llave autentica a tus agentes y les da acceso directo al ecosistema cognitivo que potencia toda la plataforma. Una vez configurada, tu servicio simplemente realiza fetch al endpoint oficial: https://generative-glynne-motor.onrender.com, donde nuestro motor procesa la solicitud y devuelve una respuesta optimizada con la lógica estratégica que caracteriza a GLYNNE.

Esta integración convierte cualquier arquitectura basada en FastAPI en una estructura mucho más poderosa: una arquitectura que no solo ejecuta funciones, sino que piensa, analiza y aprende del comportamiento de tus usuarios y tus procesos internos. En otras palabras: tus microservicios dejan de ser piezas aisladas y comienzan a operar como unidades inteligentes que se apoyan en una mente central capaz de anticiparse a tus necesidades.

Lo más importante es que GLYNNE oculta toda la complejidad que normalmente implica conectar modelos de inteligencia artificial. Tu equipo no tiene que lidiar con servidores, cargas de cómputo ni calibraciones internas: solo interactúan con un servicio estable, seguro y diseñado para escalar. Así, puedes dedicarte a construir experiencias más fluidas y automatizaciones más profundas, mientras GLYNNE se encarga de todo el poder cognitivo detrás del escenario.`,
      modalImg: "/LogosEdit/FastAPI.png"
    },
    {
        "name": "NestJS",
        "icon": "/icons8-nestjs.svg",
        "desc": "Framework backend modular construido en Node.js.",
        "useCase": "NestJS se convierte en una puerta de enlace poderosa cuando deseas que tus propios agentes de inteligencia artificial trabajen directamente con el motor cognitivo de GLYNNE. Al integrar tu backend construido con NestJS con nuestro servicio, tus flujos internos pueden aprovechar un sistema capaz de pensar, razonar y adaptarse a cada proceso empresarial que quieras automatizar. Lo único que necesitas es exportar la llave del modelo que hayas creado en GLYNNE, seleccionar el agente que deseas activar y permitir que tu servicio se comunique con nuestro endpoint oficial en https://generative-glynne-motor.onrender.com.\n\nAl conectar NestJS con GLYNNE, tus agentes obtienen acceso inmediato a un entorno de inteligencia diseñado para operar como un verdadero cerebro digital. Esto significa que cada petición que salga desde tu servidor hacia nuestro motor puede convertirse en una acción precisa: diagnóstico de información, toma de decisiones, clasificación, análisis profundo o incluso conversaciones autónomas que entienden el contexto de tu negocio. GLYNNE no solo procesa datos: interpreta el propósito detrás de ellos y responde con inteligencia.\n\nEsta integración también permite que NestJS amplifique el rendimiento de tus procesos sin que tengas que modificar la estructura de tu proyecto. GLYNNE está diseñado para adaptarse a tu sistema, no al revés. Por eso, una vez que tus agentes envían sus solicitudes utilizando tu llave privada del modelo, nuestro motor cognitivo devuelve una respuesta optimizada, pensada para ayudarte a reducir tiempos, costos operativos y trabajo manual. Lo hace entendiendo reglas, objetivos y condiciones que definas desde tu propia consola de GLYNNE.\n\nAdemás, integrar tu backend con GLYNNE abre la puerta a que tus servicios crezcan sin fricción. Si mañana decides crear nuevos agentes, ajustar los existentes o aumentar la complejidad de tus workflows, NestJS puede seguir enviando solicitudes al motor cognitivo sin perder consistencia. La arquitectura de GLYNNE está diseñada para escalar a medida que aumentan tus demandas, manteniendo la velocidad, la estabilidad y la capacidad de adaptación como prioridad.\n\nEn esencia, el rol de NestJS es servir como un puente estable y modular que conecta tus procesos con un sistema de inteligencia avanzada que ya está listo para funcionar. GLYNNE se encarga del pensamiento y de la autonomía; tú solo indicas qué modelo quieres usar, exportas tu llave privada y permites que la comunicación fluya hacia nuestro endpoint. Así obtienes un ecosistema donde tus agentes pueden evolucionar, aprender y ejecutar tareas con un nivel de eficiencia imposible de alcanzar con arquitecturas tradicionales.",
        "modalImg": "/LogosEdit/nestBack.png"
      }
      ,
      {
        "name": ".NET Framework",
        "icon": "/icons8-.net-framework.svg",
        "desc": "Plataforma robusta para construir aplicaciones empresariales.",
        "useCase": "Cuando trabajas con .NET, entras en un entorno que históricamente ha sido sinónimo de estabilidad, estructura y rendimiento empresarial. Integrar esta plataforma con el motor cognitivo de GLYNNE te permite ir mucho más allá de los desarrollos tradicionales: convierte tus aplicaciones en sistemas capaces de interpretar información, anticipar necesidades y responder con inteligencia natural. Para lograrlo, solo necesitas exportar la llave del modelo que construiste en GLYNNE y permitir que tu aplicación realice solicitudes directas a nuestro servicio oficial en https://generative-glynne-motor.onrender.com.\n\nEl ecosistema de .NET, con su arquitectura madura y su enfoque corporativo, se transforma en un terreno ideal para que tus agentes de IA cobren vida. GLYNNE se integra sin imponer requisitos complejos ni obligarte a rediseñar tus aplicaciones. Simplemente añades la comunicación hacia nuestro motor y tus servicios obtienen acceso inmediato a capacidades cognitivas que pueden analizar datos, comprender lenguaje natural, ejecutar decisiones y adaptarse a escenarios cambiantes sin esfuerzo adicional.\n\nGracias a esta conexión, .NET puede dejar de limitarse a la lógica tradicional y convertirse en un orquestador inteligente dentro de tus operaciones diarias. Cada solicitud que envíes con tu llave privada de modelo es procesada por una infraestructura capaz de contextualizar la información, evaluar patrones, identificar prioridades y devolverte respuestas mucho más precisas que un motor lógico convencional. Es la diferencia entre un sistema que solo ejecuta instrucciones y uno que entiende el propósito detrás de ellas.\n\nAdemás, la integración con GLYNNE te permite extender tus sistemas sin comprometer rendimiento ni seguridad. Si tu empresa trabaja con procesos complejos, múltiples módulos o grandes volúmenes de datos, nuestro motor cognitivo se adapta a esta escala sin importar la carga o la cantidad de agentes conectados. Tus aplicaciones .NET pueden crecer, ramificarse o incorporar nuevos servicios mientras GLYNNE mantiene la misma velocidad y consistencia en cada interacción.\n\nEn última instancia, la unión entre .NET y GLYNNE crea un ecosistema donde tus aplicaciones empresariales dejan de ser herramientas estáticas y evolucionan hacia soluciones vivas, capaces de interpretar, actuar y mejorar continuamente. Tú defines el modelo en GLYNNE, exportas tu llave privada y conectas tu aplicación al endpoint. Nosotros nos encargamos de todo lo demás: inteligencia, optimización, contexto y autonomía.",
        "modalImg": "/LogosEdit/NET.png"
      }
      ,
      {
        "name": "Laravel",
        "icon": "/laravel-svgrepo-com.svg",
        "desc": "Framework PHP con arquitectura limpia.",
        "useCase": "Laravel es uno de los frameworks más elegantes del ecosistema web, y cuando se conecta al motor cognitivo de GLYNNE, esa elegancia se convierte en inteligencia aplicada a cada flujo que construyas. Con solo exportar la llave del modelo que creaste en GLYNNE y permitir que tu proyecto realice solicitudes al servicio oficial en https://generative-glynne-motor.onrender.com, tus dashboards, APIs y módulos internos pueden empezar a operar con un nivel de comprensión y autonomía que antes solo se veía en sistemas de alta escala.\n\nLa fortaleza de Laravel siempre ha estado en su arquitectura limpia y su enfoque en el orden. GLYNNE potencia esos valores al añadir una capa de razonamiento capaz de contextualizar información, interpretar objetivos y ayudarte a automatizar procesos que antes requerían múltiples pasos humanos. Tus controladores, servicios o workflows ya no se limitan a procesar datos: ahora pueden conectarse a un motor que piensa, analiza y responde según las necesidades que definas en tu propio panel de GLYNNE.\n\nEsta integración permite que Laravel siga siendo el centro organizador de tus aplicaciones mientras delega el peso cognitivo en un sistema preparado para manejar análisis complejos, conversaciones avanzadas y decisiones automatizadas. La llave privada de tu modelo actúa como el vínculo que asegura que cada petición esté asociada al agente correspondiente, garantizando que las respuestas se adapten a tu empresa, tus reglas y tu forma de operar.\n\nAdemás, al integrar tu backend en Laravel con GLYNNE, obtienes una infraestructura que escala sin fricción. A medida que creas nuevos módulos, añades funcionalidades o amplías tus servicios, la conexión con nuestro motor cognitivo se mantiene estable, veloz y lista para soportar mayores demandas. Esto permite que tus sistemas crezcan sin convertirse en un rompecabezas técnico y sin perder coherencia en el manejo de información.\n\nEn esencia, Laravel se convierte en un framework que no solo organiza tu aplicación, sino que también la hace más inteligente. GLYNNE se integra de forma natural, sin obligarte a modificar tu estructura, y convierte tus proyectos en plataformas capaces de comprender, anticipar y optimizar cada tarea. Tú defines el modelo; exportas tu llave; haces que tu servicio consulte nuestro endpoint. Desde ahí, GLYNNE se encarga de transformar cada solicitud en una respuesta con propósito, claridad y valor.",
        "modalImg": "/LogosEdit/laravel.png"
      }
      ,
      {
        "name": "Django",
        "icon": "/icons8-django.svg",
        "desc": "Framework backend seguro y escalable en Python.",
        "useCase": "Django siempre ha destacado por su solidez, su enfoque en la seguridad y su capacidad para estructurar proyectos con precisión quirúrgica. Cuando lo conectas con el motor cognitivo de GLYNNE, esa estructura se transforma en una plataforma capaz de comprender información, procesar intenciones y operar con una autonomía que impulsa todo tu ecosistema digital. Solo necesitas exportar la llave del modelo que hayas creado en GLYNNE y permitir que tu servicio haga peticiones al endpoint oficial en https://generative-glynne-motor.onrender.com; a partir de ahí, la experiencia cambia por completo.\n\nGLYNNE convierte cualquier API REST hecha en Django en un punto de acceso hacia una inteligencia que se adapta a tu empresa. Tus vistas, endpoints y servicios dejan de ser simples receptores de datos y comienzan a interactuar con un motor que entiende contexto, prioridades y objetivos específicos. Todo esto sin modificar la esencia de Django, que sigue controlando permisos, autenticación, estructuras de datos y organización del proyecto.\n\nLa integración aprovecha lo mejor del framework: su claridad, su robustez y su capacidad para mantener una arquitectura ordenada incluso cuando los sistemas crecen. GLYNNE se suma como una capa cognitiva que no complica el backend, sino que lo potencia. Tus agentes creados en la plataforma pueden responder, analizar patrones o coordinar procesos internos simplemente a través de las solicitudes que envíes desde tu proyecto.\n\nAdemás, esta conexión te permite que Django mantenga el control operativo mientras delega la interpretación avanzada de datos en GLYNNE. Esto libera recursos, reduce la necesidad de cálculos pesados en tu servidor y permite que tus aplicaciones sean más rápidas, ligeras y escalables sin perder seguridad. Tus endpoints siguen siendo tuyos; GLYNNE solo amplifica sus capacidades.\n\nEn conjunto, Django y GLYNNE forman un entorno donde la precisión se encuentra con la inteligencia. Tú defines las reglas, exportas tu llave y conectas tu API al motor cognitivo. Desde ese momento, cada interacción con tu backend puede convertirse en una acción más inteligente, más eficiente y alineada con los objetivos de tu organización, manteniendo la esencia profesional y estructurada que caracteriza al mundo Python.",
        "modalImg": "/LogosEdit/django.png"
      }
      ,
  
    /* ===========================
       🟩 LENGUAJES DE PROGRAMACIÓN
       =========================== */
    {
      name: "Node.js",
      icon: "/icons8-nodejs.svg",
      desc: "Entorno de ejecución para JavaScript del lado del servidor.",
     "useCase": "Node.js es el aliado perfecto para quienes buscan velocidad, flexibilidad y un entorno donde las ideas se despliegan sin fricción. Cuando lo conectas con el motor cognitivo de GLYNNE, tu backend en JavaScript deja de ser un simple sistema de ejecución para convertirse en un entorno capaz de razonar, interpretar información y tomar decisiones basadas en tus propios modelos de inteligencia artificial. Solo debes exportar la llave del modelo que generaste dentro del panel de GLYNNE y permitir que tus bots, workers o servicios hagan fetch directamente al endpoint https://generative-glynne-motor.onrender.com; desde ese momento, la experiencia cambia por completo.\n\nGLYNNE transforma cualquier script o microservicio en Node en una unidad inteligente capaz de comprender contexto, detectar patrones y adaptarse en tiempo real. Los bots que antes solo seguían instrucciones rígidas ahora pueden analizar conversaciones, interpretar solicitudes complejas o responder de manera más humana, mientras tus colas de trabajo adquieren una precisión casi predictiva al manejar información masiva.\n\nLa integración con Node es especialmente potente porque encaja naturalmente con su filosofía: procesos rápidos, asincronía eficiente y una ejecución ligera que escala sin esfuerzo. GLYNNE se suma como una capa cognitiva que no interfiere con tu lógica actual, sino que la eleva. Tu backend no necesita transformarse; simplemente accede a un motor que entiende lo que recibe y responde con inteligencia.\n\nTus servicios pueden delegar a GLYNNE las tareas más pesadas de interpretación, análisis semántico o generación de respuestas, lo cual reduce carga en tus procesos locales y te permite mantener una arquitectura más ágil. Esto se traduce en menos consumo, mayor rendimiento y un sistema más estable, especialmente en proyectos donde la velocidad de respuesta es crítica.\n\nAl conectar Node.js con GLYNNE, consigues que cada función, cada worker y cada interacción tenga acceso a una inteligencia adaptable a tu empresa. No estás añadiendo complejidad; estás añadiendo capacidad. Exportas tu llave, llamas al servicio y permites que tu backend dé un salto evolutivo, alineándose con un futuro donde los procesos ya no solo se ejecutan: también entienden lo que hacen.",
        modalImg: "/LogosEdit/node.png"
    },
      ,
      {
        "name": "Java",
        "icon": "/icons8-java.svg",
        "desc": "Lenguaje maduro para aplicaciones robustas.",
        "useCase": "Java siempre ha sido sinónimo de estabilidad, escalabilidad y precisión en el mundo empresarial. Cuando se conecta con el motor cognitivo de GLYNNE, esa fortaleza clásica se amplifica con una capa de inteligencia capaz de interpretar información, anticipar necesidades y adaptarse al funcionamiento interno de cualquier organización. Para iniciar la integración, solo necesitas exportar la llave del modelo que creaste en GLYNNE y permitir que tus microservicios realicen peticiones al endpoint oficial en https://generative-glynne-motor.onrender.com; a partir de ahí, tu arquitectura adquiere una nueva dimensión.\n\nGLYNNE se integra sin fricciones en ecosistemas Java gracias a la naturaleza modular del lenguaje. Tus microservicios, que ya cumplen funciones específicas con alta confiabilidad, pueden ahora conectarse a un motor cognitivo que entiende patrones, analiza solicitudes complejas y devuelve respuestas procesadas con un criterio más humano y estratégico. Nada en tu estructura tiene que cambiar: simplemente incorporas una capa de razonamiento donde antes solo había lógica rígida.\n\nEl impacto es especialmente notable en entornos donde Java gobierna procesos críticos: facturación, logística, sistemas de información, control de operaciones o plataformas financieras. El motor de GLYNNE permite que cada servicio deje de operar de manera aislada y empiece a interactuar con una inteligencia centralizada que entiende la misión global del negocio, optimizando acciones, priorizando tareas y reaccionando a la información con mayor precisión.\n\nEsta integración también ofrece beneficios profundos en materia de rendimiento. Java mantiene el control operativo mientras delega la parte interpretativa y cognitiva a GLYNNE, lo que reduce tiempo de procesamiento en tus servidores y permite liberar recursos para tareas esenciales. Tus microservicios siguen siendo robustos; ahora simplemente están respaldados por un cerebro digital que aprende de tus propios modelos.\n\nLa combinación de Java con GLYNNE crea un entorno donde la confiabilidad tradicional se fusiona con una inteligencia moderna. Exportas la llave, conectas tu servicio y permites que tu infraestructura evolucionada opere con mayor claridad, rapidez y sentido estratégico. Con esta unión, tus sistemas ya no solo ejecutan procesos: entienden su propósito.",
        "modalImg": "/LogosEdit/java.png"
      }
      ,
  
    /* ===========================
       🟧 FRONTEND FRAMEWORKS
       =========================== */
       {
        "name": "Angular",
        "icon": "/icons8-angular.svg",
        "desc": "Framework de frontend estructurado para apps grandes con TypeScript.",
        "useCase": "Angular destaca por su arquitectura sólida y su capacidad para manejar interfaces complejas y demandantes. Cuando lo conectas al motor cognitivo de GLYNNE, tu frontend deja de ser solo una capa visual para convertirse en una experiencia inteligente capaz de interpretar al usuario, adaptarse a sus acciones y automatizar decisiones en tiempo real. El proceso comienza exportando la llave del modelo que generaste dentro de GLYNNE y consumiendo el servicio desde https://generative-glynne-motor.onrender.com; a partir de ahí, cada módulo de Angular puede comunicarse con una inteligencia central que complementa lo que ocurre en la interfaz.\n\nEsta integración transforma la manera en que tus aplicaciones frontales operan. Formularios, paneles interactivos, dashboards y flujos internos pueden apoyarse en un motor capaz de entender contexto, procesar instrucciones complejas y devolver respuestas que guían al usuario sin necesidad de programación adicional en el cliente. Angular mantiene su estructura ordenada, pero ahora trabaja conectado a una mente digital que potencia cada interacción.\n\nLa experiencia del usuario también cambia radicalmente. En lugar de simples validaciones o lógicas estáticas, GLYNNE permite que tu frontend reaccione dinámicamente: identifica intenciones, propone rutas más eficientes, detecta patrones de uso y sugiere pasos relevantes sin que tú tengas que construir reglas rígidas. Angular aporta la base visual; GLYNNE aporta la capacidad de pensar.\n\nA nivel de rendimiento y optimización, el beneficio también es claro. Angular ejecuta lo esencial en el cliente, pero las decisiones cognitivas y el análisis profundo se delegan al motor de GLYNNE, liberando carga en el navegador y asegurando una experiencia fluida incluso en interfaces exigentes. Esto hace que tu aplicación se sienta más rápida, más ligera y, sobre todo, más intuitiva.\n\nConectar Angular a GLYNNE no solo enriquece tu frontend: redefine por completo cómo un usuario interactúa con tu plataforma. Exportas tu llave, consumes el servicio y permites que tu aplicación tenga algo que hasta ahora ningún framework podía ofrecer por sí solo: un sistema visual respaldado por una inteligencia real.",
        "modalImg": "/LogosEdit/angular.png"
      }
      ,
  
    {
        "name": "Next.js",
        "icon": "/icons8-nextjs.svg",
        "desc": "Framework React optimizado para producción.",
        "useCase": "Next.js se ha convertido en el estándar para crear aplicaciones modernas, rápidas y adaptables. Al integrarlo con el motor cognitivo de GLYNNE, tu plataforma deja de ser solo una interfaz bien construida y pasa a operar como un sistema capaz de comprender, responder y anticipar necesidades. La integración inicia exportando la llave del modelo que configuraste dentro de GLYNNE y consumiendo directamente el endpoint oficial en https://generative-glynne-motor.onrender.com;, lo cual permite que cualquier página o API route actúe como un puente directo hacia una inteligencia avanzada.\n\nLa magia ocurre en la forma en que Next.js gestiona el renderizado híbrido. Cada llamada al motor de GLYNNE puede ejecutarse tanto en el cliente como en el servidor, lo que te permite decidir si la interpretación cognitiva se hace antes de enviar la vista o durante la interacción del usuario. Esto abre la puerta a experiencias fluidas, paneles interactivos inteligentes y flujos que evolucionan según el comportamiento de cada persona que navega tu aplicación.\n\nLa capa de IA no se limita a responder preguntas: puede convertirse en el cerebro detrás de formularios, asistentes autónomos, motores de recomendación, sistemas de análisis o procesos internos que antes requerían lógica fija y duplicada. Next.js mantiene la agilidad de React, mientras GLYNNE añade la capacidad de razonar con criterios propios, liberándote de reglas rígidas y permitiendo que la aplicación tome decisiones más humanas y estratégicas.\n\nA nivel de optimización, el impacto es evidente. Gracias al renderizado en el servidor, tus solicitudes al motor cognitivo pueden procesarse sin afectar la carga del navegador, garantizando tiempos de respuesta más predecibles incluso en escenarios altamente demandantes. GLYNNE se convierte en un aliado invisible que trabaja detrás de cada vista, haciendo que la experiencia final sea más rápida, coherente y personal.\n\nIntegrar Next.js con GLYNNE es una forma directa de transformar tu plataforma en un producto con pensamiento propio. Exportas tu llave, conectas tu frontend y permites que cada interacción esté respaldada por una inteligencia profunda, diseñada para que tus procesos y tus usuarios se sientan entendidos desde el primer clic.",
        "modalImg": "/LogosEdit/nextjs.png"
      }
      ,
      {
        "name": "Vue.js",
        "icon": "/icons8-vue-js.svg",
        "desc": "Framework progresivo y rápido.",
        "useCase": "Vue es conocido por su fluidez, su curva de aprendizaje amable y su capacidad para crear interfaces altamente reactivas. Cuando lo conectas con el motor cognitivo de GLYNNE, esa reactividad deja de ser solamente visual y se convierte en inteligencia aplicada directamente a la experiencia del usuario. El proceso comienza exportando la llave del modelo que configuraste dentro de GLYNNE y realizando las solicitudes al servicio central en https://generative-glynne-motor.onrender.com;, permitiendo que cualquier componente de Vue se comunique con un sistema capaz de analizar, comprender y responder con criterio.\n\nEsta conexión eleva tus interfaces a un nuevo nivel. Vue sigue gestionando los cambios en tiempo real como de costumbre, pero ahora esas actualizaciones pueden estar impulsadas por una mente digital que entiende el contexto, interpreta intenciones y sugiere acciones sin necesidad de reglas programadas manualmente. Cada interacción deja de ser un simple evento y se convierte en una oportunidad para que el sistema aporte valor.\n\nLos componentes de Vue pueden transformarse en asistentes inteligentes: formularios que ayudan al usuario a completar información de forma más eficiente, paneles que anticipan decisiones críticas, módulos que se ajustan automáticamente según el comportamiento detectado. GLYNNE aporta un nivel de autonomía que complementa perfectamente la filosofía progresiva de Vue.\n\nEl rendimiento también se ve favorecido. GLYNNE se encarga de la parte cognitiva más pesada, mientras Vue mantiene la experiencia rápida, suave y dinámica. Esto permite que tus usuarios disfruten de interfaces más ligeras, pero con un trasfondo analítico profundo que mejora cada flujo sin saturar el navegador.\n\nConectar Vue con GLYNNE es una manera sencilla y poderosa de transformar tus aplicaciones en sistemas que no solo reaccionan a los cambios, sino que los entienden. Exportas tu llave, consumes el motor cognitivo y desbloqueas una nueva generación de interfaces inteligentes capaces de adaptarse a cada usuario como si tuvieran una intuición propia.",
        "modalImg": "/LogosEdit/vue.png"
      }
      ,
  
    /* ===========================
       🟪 CLOUD Y DEVOPS
       =========================== */
       {
        "name": "AWS",
        "icon": "/iconosGooglS/icons8-aws.svg",
        "desc": "Servicios cloud escalables y robustos.",
        "useCase": "AWS es el espacio donde tus sistemas pueden crecer sin límites, y cuando lo conectas con el motor cognitivo de GLYNNE, todo tu ecosistema cloud adquiere un nivel de autonomía que antes parecía exclusivo de las grandes corporaciones. La integración comienza exportando la llave del modelo que configuraste dentro de GLYNNE y consumiendo el servicio desde https://generative-glynne-motor.onrender.com;, permitiendo que cualquiera de tus recursos en AWS pueda comunicarse con una inteligencia que analiza, decide y actúa según el propósito de tu arquitectura.\n\nAl unir AWS Lambda con GLYNNE, tus funciones serverless dejan de ser simples ejecutores de lógica y se convierten en puntos de decisión inteligentes. Cada invocación puede recibir contexto, interpretar situaciones y responder de forma más humana, reduciendo reglas mecánicas y automatizando comportamientos que antes requerían mantenimiento constante. GLYNNE potencia la nube para que responda con criterio propio.\n\nTambién puedes llevar esa inteligencia a tus flujos de datos usando S3. Los archivos que llegan al bucket ya no necesitan miles de validaciones rígidas: GLYNNE puede interpretar su contenido, clasificarlos, generar reportes, detectar anomalías o estructurar información sin que tengas que escribir procesos largos y repetitivos. El almacenamiento se convierte en un punto de conocimiento.\n\nSi utilizas API Gateway, la integración con GLYNNE transforma cualquier endpoint en una puerta directa hacia un sistema capaz de comprender el fondo del requerimiento, no solo la forma. Esto habilita automatizaciones más naturales, servicios que aprenden del uso y microarquitecturas que evolucionan conforme aumenta la demanda.\n\nAl final, conectar AWS con GLYNNE no se trata solamente de escalar recursos, sino de hacer que tu nube piense, interprete y optimice en tiempo real. Exportas tu llave, consumes el motor cognitivo y liberas un nivel de eficiencia que convierte a AWS en un entorno autoajustable donde el poder de la inteligencia y el de la infraestructura trabajan juntos para impulsar tu crecimiento.",
        "modalImg": "/LogosEdit/aws.png"
      }
      ,
      {
        name: "AWS CloudFront",
        icon: "/iconosGooglS/icons8-aws-cloudfront.svg",
        desc: "CDN global para entregar contenido a alta velocidad.",
        useCase: `
          CloudFront te permite distribuir contenido generado por tu motor con latencias mínimas, sin importar desde qué región los usuarios accedan al sistema.
      
          Si tu arquitectura incluye automatizaciones que crean archivos, reportes, dashboards o recursos multimedia, CloudFront asegura que la entrega sea inmediata y cacheada en nodos globales.
      
          Tus flujos de IA pueden publicar resultados en S3 mientras CloudFront sirve esas salidas con invalidaciones automáticas, manteniendo la información siempre actualizada.
      
          Con integraciones a Lambda@Edge, puedes ejecutar lógica personalizada en el borde para personalizar respuestas, validar tokens o modificar contenido antes de entregarlo.
      
          En conjunto, CloudFront optimiza el rendimiento de tu plataforma, reduce costos de transferencia y garantiza que tu experiencia de automatización se sienta instantánea a escala mundial.
        `,
        modalImg: "/LogosEdit/AWSCloudFront.png"
      }
      ,
      {
        name: "Google Cloud",
        icon: "/iconosGooglS/icons8-google-cloud.svg",
        desc: "Infraestructura cloud poderosa y flexible.",
        useCase:
          "Puedes hospedar funciones o endpoints que interactúen con tu motor.\n\n" +
          "Al conectar Google Cloud con GLYNNE, tus agentes de inteligencia artificial dejan de ser bloques aislados y pasan a formar parte de un sistema cognitivo centralizado. Nuestro motor de IA actúa como el “cerebro” que coordina todo: entiende el contexto, interpreta lo que tus agentes necesitan hacer y optimiza la forma en que se comunican con tus servicios en la nube. De esta manera, cada interacción que antes era manual, lenta o dispersa se vuelve un flujo orquestado y coherente, diseñado para que tu negocio responda más rápido y con menor fricción.\n\n" +
          "Tus agentes pueden utilizar Google Cloud como su espacio de operación mientras GLYNNE se encarga de pensar por ellos. A través de nuestro motor cognitivo, los agentes pueden consultar información, tomar decisiones y devolver respuestas alineadas con las reglas de tu empresa. Lo único que necesitas es definir el modelo de IA que quieres utilizar dentro de GLYNNE, exportar la llave de ese modelo que has creado y usarla como la credencial principal para que el motor sepa exactamente cómo debe comportarse cuando reciba las solicitudes desde tu entorno en Google Cloud.\n\n" +
          "Para consumir el proyecto desde tus servicios o funciones en la nube, simplemente debes hacer que esas funciones se comuniquen con el servicio de GLYNNE en \"https://generative-glynne-motor.onrender.com\". Desde ahí, nuestro motor cognitivo recibe las instrucciones de tus agentes, aplica las políticas, el contexto y la lógica de negocio que hayas definido, y devuelve una respuesta optimizada para tu caso de uso. No necesitas pelearte con integraciones complejas: GLYNNE se posiciona como la capa inteligente que conecta lo que ocurre en tu infraestructura con lo que tu empresa realmente necesita resolver.\n\n" +
          "El resultado es una arquitectura mucho más ordenada y eficiente: tus agentes ejecutan tareas, pero es GLYNNE quien entiende el “por qué” y el “cómo” de cada acción. Esto se traduce en menos tiempo de configuración, menos errores humanos, menos ajustes manuales y una experiencia de automatización que se siente natural. En lugar de tener múltiples piezas desconectadas, tienes un motor cognitivo que coordina, prioriza y optimiza.\n\n" +
          "En resumen, Google Cloud se convierte en el terreno donde corre tu operación, y GLYNNE en la inteligencia que la impulsa. Exportas la llave del modelo que quieres usar, haces fetch a nuestro servicio y dejas que el motor haga el trabajo pesado: interpretar, decidir, optimizar y mantener a tus agentes de IA trabajando de forma alineada con los objetivos estratégicos de tu negocio.",
        modalImg: "/LogosEdit/googlecloud.png"
      },
      {
        name: "Azure Data Pipeline",
        icon: "/iconosGooglS/icons8-azure-data-pipeline.svg",
        desc: "Pipelines de datos para automatizar procesos ETL.",
        useCase:
          "Puedes enviar datos procesados por tu motor a pipelines automatizados.\n\n" +
          "Cuando conectas Azure Data Pipeline con GLYNNE, tus flujos de datos dejan de ser simples procesos ETL y se convierten en rutas inteligentes donde cada paso es guiado por un motor cognitivo capaz de interpretar el propósito real de la información. Tus agentes de inteligencia artificial pueden conectarse de manera natural a estos pipelines, permitiendo que cada dato que entra o sale esté acompañado de decisiones inteligentes que optimicen la forma en la que tu empresa opera.\n\n" +
          "GLYNNE actúa como el núcleo que piensa por tus agentes: interpreta los datos, los valida, los ordena y los contextualiza antes de que lleguen a tus pipelines en Azure. Esto hace que Azure Data Pipeline no solo reciba datos, sino datos ya procesados con criterio, datos que entienden la lógica de tu negocio. Para habilitar esta conexión, únicamente necesitas exportar la llave del modelo que hayas creado dentro de GLYNNE; esa llave identifica el comportamiento que quieres que tu agente adopte. Al incluirla en tus peticiones, tu infraestructura sabe exactamente cómo coordinarse con nuestro motor cognitivo.\n\n" +
          "Para consumir el servicio desde Azure, simplemente realiza una solicitud a \"https://generative-glynne-motor.onrender.com\" desde tus funciones, actividades o triggers dentro de tu pipeline. Allí es donde GLYNNE recibe los datos, los interpreta, aplica la lógica contextual que definiste y devuelve una respuesta optimizada que puede alimentar directamente las siguientes etapas de tu flujo en Azure. Así, tu pipeline se vuelve más eficiente y menos rígido, porque empieza a recibir información ya lista para impulsar decisiones.\n\n" +
          "GLYNNE elimina la fricción entre la automatización y la inteligencia: no necesitas construir reglas manuales ni añadir capas de validación una por una. El motor cognitivo se encarga de entender exactamente lo que tus agentes necesitan hacer con cada lote de datos y toma decisiones consistentes sin que tengas que intervenir. Esto reduce retrabajos, hace más ágil la operación y evita cuellos de botella propios de los ETL tradicionales.\n\n" +
          "Al final, Azure Data Pipeline se convierte en una autopista de datos más rápida y eficiente, mientras GLYNNE se establece como el sistema que guía el tráfico: decide qué debe ir primero, cómo debe transformarse y por qué es importante para la operación. Tú solo exportas la llave de tu modelo, haces fetch al servicio y dejas que nuestro motor cognitivo se encargue de transformar tus pipelines en flujos inteligentes capaces de adaptarse, aprender y optimizar de manera continua.",
        modalImg: "/LogosEdit/azure.png"
      }
      ,
      {
        name: "Netlify",
        icon: "/netlify-svgrepo-com.svg",
        desc: "Hosting moderno para sitios estáticos.",
        useCase:
          "Puedes conectar tu motor con funciones serverless desplegadas en Netlify.\n\n" +
          "Al integrar Netlify con GLYNNE, tu proyecto deja de ser un sitio estático y se convierte en una plataforma viva, capaz de reaccionar, decidir y aprender gracias a la inteligencia impulsada por nuestro motor cognitivo. Tus funciones serverless pueden comunicarse con nuestros agentes de IA de forma fluida, permitiendo que cualquier acción que antes dependía de procesos manuales ahora esté respaldada por un sistema que entiende el contexto y responde con precisión.\n\n" +
          "GLYNNE se convierte en el punto de conexión que impulsa tus flujos: interpreta lo que tus funciones necesitan lograr, adapta el comportamiento de los agentes y devuelve respuestas optimizadas para que tu aplicación en Netlify funcione con una agilidad superior. Para habilitar esta integración, solo necesitas exportar la llave del modelo que hayas configurado dentro de GLYNNE. Esa llave indica qué tipo de razonamiento y estilo de respuesta deben aplicar los agentes cuando reciban llamadas desde tus endpoints en Netlify.\n\n" +
          "El consumo es sencillo: tus funciones serverless hacen un fetch directamente al servicio de GLYNNE en \"https://generative-glynne-motor.onrender.com\". Allí es donde nuestro motor cognitivo toma el control, procesa la solicitud con la lógica que definiste, evalúa la intención detrás de la acción y devuelve una respuesta alineada con los objetivos de tu aplicación. No tienes que construir arquitecturas complejas ni diseñar patrones de comunicación: GLYNNE se encarga de unir tus endpoints con IA de forma natural.\n\n" +
          "Gracias a esta integración, las funciones serverless en Netlify dejan de ser simples disparadores de lógica y comienzan a operar como extensiones inteligentes de tu plataforma. Las respuestas se vuelven más rápidas, el manejo del contexto más consistente y la experiencia del usuario final más intuitiva. GLYNNE convierte tu stack en una estructura capaz de evolucionar y responder como un sistema de alto nivel sin que tú tengas que intervenir constantemente.\n\n" +
          "En conjunto, Netlify brinda la velocidad y simplicidad del hosting moderno, mientras GLYNNE aporta la inteligencia que hace que tu aplicación se sienta realmente avanzada. Exportas tu llave, realizas el fetch y dejas que nuestro motor cognitivo tome las riendas: analiza, interpreta, decide y devuelve resultados que potencian tu proyecto hasta niveles que antes requerían meses de desarrollo.",
        modalImg: "/LogosEdit/netlify.png"
      }
      ,
      {
        name: "Vercel",
        icon: "/iconosGooglS/vercel-svgrepo-com.svg",
        desc: "Hosting rápido y optimizado para proyectos de frontend.",
        useCase:
          "Puedes desplegar un panel que se comunique con tu motor desde Vercel.\n\n" +
          "Al integrar Vercel con GLYNNE, tu aplicación deja de ser un simple frontend y se transforma en una interfaz respaldada por un motor cognitivo capaz de comprender cada interacción del usuario. Tus componentes y rutas se conectan de manera directa con los agentes de inteligencia artificial, permitiendo que las decisiones no dependan únicamente de la lógica del cliente, sino de una plataforma que interpreta, analiza y responde según el contexto de tu negocio.\n\n" +
          "GLYNNE se convierte en la capa inteligente que potencia cada solicitud que sale de tus endpoints o Server Actions de Vercel. En lugar de limitarte a peticiones estáticas, tu aplicación empieza a funcionar como un sistema que piensa antes de contestar. Solo necesitas exportar la llave del modelo que configuraste dentro de GLYNNE; esa llave define la personalidad, el comportamiento y el tipo de razonamiento que tus agentes utilizarán cuando reciban solicitudes desde tu proyecto desplegado en Vercel.\n\n" +
          "El proceso de consumo es directo y sin fricción. Tu panel o frontend se comunica con GLYNNE mediante un fetch al servicio alojado en \"https://generative-glynne-motor.onrender.com\". Nuestro motor cognitivo procesa la petición, analiza la intención detrás de lo que el usuario necesita y devuelve una respuesta optimizada, diseñada para mejorar la experiencia final sin que tú tengas que crear reglas complejas o múltiples capas de validación manuales.\n\n" +
          "Con esta integración, Vercel potencia la velocidad y eficiencia de tu frontend, mientras GLYNNE aporta la inteligencia que permite a tu sistema tomar decisiones con criterio propio. La comunicación entre ambos se vuelve natural: tus componentes reaccionan en tiempo real a un motor capaz de interpretar contextos, adaptar respuestas y mantener la coherencia en toda tu plataforma sin necesidad de intervenciones constantes.\n\n" +
          "Juntos, Vercel y GLYNNE convierten tu proyecto en una solución moderna, rápida e intuitiva. Exportas tu llave del modelo, realizas el fetch y dejas que nuestro motor cognitivo haga el resto. Con ello, tu panel se transforma en un espacio capaz de evolucionar, predecir necesidades y ofrecer una experiencia más sólida, fluida y completamente alineada con los objetivos de tu negocio.",
        modalImg: "/LogosEdit/vercel.png"
      }
      ,
  
    /* ===========================
       🟫 DATA, ANALYTICS & TOOLS
       =========================== */
       {
        name: "Jupyter",
        icon: "/iconosGooglS/icons8-jupyter.svg",
        desc: "Entornos interactivos para análisis y prototipos.",
        useCase:
          "Puedes hacer pruebas de tu motor integrándolo con notebooks técnicos.\n\n" +
          "Al unir Jupyter con GLYNNE, tu entorno de análisis ya no es solo un espacio para escribir celdas y visualizar resultados, sino un laboratorio impulsado por un motor cognitivo que puede interpretar tus instrucciones, analizar datos y ayudarte a validar ideas con una fluidez sorprendente. La interacción deja de ser lineal y se convierte en un diálogo continuo entre tu notebook y un sistema de inteligencia capaz de responder con criterio propio.\n\n" +
          "GLYNNE se integra como la inteligencia detrás de tus experimentos. Mientras tú escribes, pruebas o exploras conceptos dentro de Jupyter, nuestro motor interpreta las preguntas, entiende el propósito detrás de cada consulta y devuelve respuestas adaptadas al flujo que estés construyendo. Solo necesitas exportar la llave del modelo que definiste dentro de GLYNNE, la cual identifica el estilo y comportamiento que deseas para tus agentes al momento de procesar la información desde el notebook.\n\n" +
          "El proceso de conexión es directo: desde cualquier celda de tu notebook puedes realizar un fetch al servicio oficial en \"https://generative-glynne-motor.onrender.com\". Esa llamada envía tu instrucción al motor cognitivo, que se encarga de analizarla, contextualizarla y ofrecerte un resultado alineado con tus objetivos. Esto te permite concentrarte en la lógica, el análisis y la exploración, sin tener que lidiar con integraciones pesadas o configuraciones extensas.\n\n" +
          "Esta conexión transforma el notebook en un entorno vivo, donde cada bloque puede alimentarse de inteligencia en tiempo real. Puedes evaluar ideas, reflexionar con tus agentes, explorar distintas rutas de pensamiento y validar hipótesis con un sistema que entiende tus prioridades y responde con coherencia. GLYNNE aporta la claridad y el razonamiento que le faltan a los flujos tradicionales de prototipado.\n\n" +
          "El resultado final es un espacio donde tu creatividad avanza más rápido, tus pruebas se vuelven más sólidas y tus decisiones más seguras. Jupyter ofrece la libertad y flexibilidad del entorno interactivo, mientras GLYNNE se encarga de aportar la inteligencia que vuelve tus experimentos más potentes, más claros y mucho más alineados con lo que quieres construir.",
        modalImg: "/LogosEdit/jupyter.png"
      }
      ,
      {
        name: "Google Colab",
        icon: "/iconosGooglS/icons8-google-colab.svg",
        desc: "Entorno cloud para ejecutar Python y ML.",
        useCase:
          "Puedes probar tu motor o prototipos desde notebooks conectados.\n\n" +
          "Cuando integras Google Colab con GLYNNE, tu notebook deja de ser solo un espacio para escribir código y se convierte en una plataforma impulsada por un motor cognitivo capaz de interpretar tus ideas, entender tus objetivos y responder con la misma claridad con la que lo haría un asistente experto. El entorno interactivo de Colab se transforma en un laboratorio guiado por inteligencia, donde cada prueba y cada prototipo cuenta con un sistema capaz de pensar por sí mismo.\n\n" +
          "GLYNNE se integra como la mente que acompaña tus experimentos: mientras tú ejecutas bloques, formulas hipótesis o preparas flujos de análisis, nuestro motor cognitivo recibe tus instrucciones, aplica la lógica del modelo que configuraste y devuelve respuestas optimizadas. Para habilitar esta conexión, solo necesitas exportar la llave del modelo que hayas creado dentro de GLYNNE; esa llave es la que indica qué tipo de razonamiento utilizarán los agentes al comunicarse con tu notebook en Colab.\n\n" +
          "El proceso de uso es sencillo y directo. Desde cualquier celda en tu notebook puedes enviar solicitudes al servicio oficial de GLYNNE en \"https://generative-glynne-motor.onrender.com\". Ese fetch permite que tu instrucción viaje al motor cognitivo, donde se analiza, se contextualiza y se transforma en una respuesta alineada con el propósito de tu experimento. Así, puedes trabajar en tus prototipos sin necesidad de configuraciones avanzadas ni infraestructura adicional.\n\n" +
          "Colab se convierte entonces en un espacio donde cada prueba se fortalece con una capa de inteligencia inmediata. Puedes explorar nuevas ideas, comprobar comportamientos, evaluar escenarios y construir mejor porque GLYNNE te acompaña en cada paso, interpretando tus indicaciones y devolviendo resultados que potencian lo que estás creando. Esto acelera tu ritmo y convierte al notebook en un entorno mucho más dinámico e intuitivo.\n\n" +
          "En conjunto, Google Colab te ofrece la comodidad del entorno cloud y la flexibilidad de Python, mientras GLYNNE aporta la inteligencia que hace que cada prototipo cobre vida. Exportas tu llave, realizas el fetch y permites que nuestro motor cognitivo se convierta en la mente que potencia tus pruebas, simplificando tu flujo y llevándolo a un nivel superior.",
        modalImg: "/LogosEdit/colab.png"
      }
      ,
      {
        name: "Supabase",
        icon: "/iconosGooglS/icons8-supabase.svg",
        desc: "Backend instantáneo con base de datos Postgres.",
        useCase:
          "Puedes usar Supabase para almacenar datos generados por tu motor.\n\n" +
          "Al conectar Supabase con GLYNNE, tu base de datos deja de ser un simple repositorio y se convierte en un punto estratégico dentro de un ecosistema impulsado por inteligencia. Cada dato que guardas, cada registro que creas y cada evento que disparas puede pasar primero por nuestro motor cognitivo, que es capaz de interpretar el contexto, tomar decisiones y enviarte respuestas enriquecidas que fortalecen la operación completa de tu plataforma.\n\n" +
          "GLYNNE actúa como la inteligencia que guía la información antes de que llegue a Supabase. Tus agentes pueden entender qué tipo de dato están procesando, por qué es relevante y cómo encaja en la lógica de tu negocio. Para activar esta integración, solo necesitas exportar la llave del modelo que creaste dentro de GLYNNE; esa llave define el comportamiento que deseas que tus agentes tengan al comunicarse con tus endpoints o middleware que interactúen con Supabase.\n\n" +
          "Una vez configurada la llave, cualquier servicio que trabaje con Supabase puede hacer un fetch al motor cognitivo en \"https://generative-glynne-motor.onrender.com\". Allí GLYNNE analiza la solicitud, evalúa lo que necesitas hacer con los datos y devuelve una respuesta más precisa y más útil, lista para ser almacenada o utilizada dentro de tus tablas y funciones serverless. El proceso es limpio y directo, permitiendo que la inteligencia fluya dentro de tu infraestructura sin configuraciones pesadas.\n\n" +
          "Gracias a esta conexión, tus flujos de datos se vuelven más coherentes. La información deja de entrar “como venga” y comienza a pasar por un filtro cognitivo que ordena, interpreta y optimiza antes de llegar a tu base. Esto reduce errores, evita registros inconsistentes y mejora la armonía entre las distintas piezas de tu sistema. Supabase, con su velocidad y simplicidad, se complementa perfectamente con la capacidad de razonamiento continuo de GLYNNE.\n\n" +
          "En conjunto, Supabase te aporta el backend instantáneo y la estructura sólida, mientras GLYNNE añade la inteligencia que convierte cada operación en un flujo más claro, más smart y completamente alineado con tus objetivos. Exportas tu llave, haces fetch, y permites que nuestro motor cognitivo dé sentido a cada dato que entra en tu plataforma.",
        modalImg: "/LogosEdit/supabase.png"
      }
      ,
  
    /* ===========================
       🟨 CONTROL DE VERSIONES
       =========================== */
       {
        name: "GitHub",
        icon: "/iconosGooglS/icons8-github.svg",
        desc: "Control de versiones profesional y CI/CD.",
        useCase:
          "Puedes automatizar despliegues o acciones que activan tu motor vía GitHub Actions.\n\n" +
          "Cuando integras GitHub con GLYNNE, tu repositorio deja de ser únicamente un lugar para almacenar código y se convierte en el centro de una operación inteligente capaz de reaccionar a cada cambio. Cada push, cada pull request y cada pipeline puede comunicarse con nuestro motor cognitivo, permitiendo que tus procesos de desarrollo y automatización se vuelvan más ágiles, coherentes y alineados con los objetivos de tu plataforma.\n\n" +
          "GLYNNE entra en escena como la mente detrás de tus flujos CI/CD. Mientras tus workflows de GitHub Actions ejecutan tareas, nuestros agentes interpretan el propósito de cada paso, entienden el contexto del proyecto y responden de forma inteligente. Para habilitar esta integración, únicamente necesitas exportar la llave del modelo que hayas creado dentro de GLYNNE; esa llave determina el tipo de razonamiento y comportamiento que tus agentes aplicarán cada vez que GitHub llame al motor.\n\n" +
          "Una vez tengas tu llave lista, cualquier workflow de GitHub Actions puede comunicarse con GLYNNE realizando un fetch directo al servicio en \"https://generative-glynne-motor.onrender.com\". Desde allí, el motor cognitivo recibe la instrucción, analiza lo que está ocurriendo en tu repositorio, interpreta las necesidades del flujo y devuelve una respuesta optimizada que puede influir en despliegues, validaciones, auditorías o cualquier acción que desees automatizar dentro de tu pipeline.\n\n" +
          "Esta integración transforma la experiencia de desarrollo: ya no se trata solo de ejecutar scripts, sino de habilitar un proceso que piensa, revisa y decide. Tus pipelines pueden reaccionar de manera inteligente a cambios en el código, anticipar comportamientos o validar información antes de continuar, todo sin que tengas que añadir reglas manuales o estructuras complejas. GLYNNE hace que tu CI/CD sea más intuitivo, más robusto y menos propenso a errores.\n\n" +
          "En conjunto, GitHub aporta la estabilidad, disciplina y control de versiones que tu proyecto necesita, mientras GLYNNE añade la capa de inteligencia que convierte cada acción en una oportunidad de optimización. Exportas tu llave, haces el fetch y permites que nuestro motor cognitivo acompañe tu ciclo de desarrollo, elevando la calidad y la eficiencia con cada commit.",
        modalImg: "/LogosEdit/github.png"
      }
      
  ];
  export default function AppCards() {
    const [selected, setSelected] = useState(null);
  
    return (
      <div
        className="
          w-full p-6 bg-white rounded-2xl border border-gray-300 shadow-md 
          h-[90vh] flex flex-col
        "
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Herramientas de Desarrollo
        </h2>
        <p className="text-sm text-gray-600 mb-4">
  Estas son las tecnologías que pueden integrarse con nuestro motor <strong>GLYNNE Dynamic Cognitive System</strong>.
</p>

  
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {techTools.map((app) => (
              <motion.div
                key={app.name}
                onClick={() => setSelected(app)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.25 }}
                className="
                  flex flex-col items-center justify-start 
                  bg-white/80 backdrop-blur-md 
                  rounded-2xl 
                  p-7 
                  shadow-md hover:shadow-xl 
                  border border-gray-200 
                  hover:border-gray-300 
                  transition-all duration-300 
                  cursor-pointer
                  min-h-[260px]
                "
              >
                <div className="mb-4">
                  <Image src={app.icon} alt={app.name} width={80} height={80} />
                </div>
  
                <h3 className="font-semibold text-gray-800 text-center text-sm tracking-wide">
                  {app.name}
                </h3>
  
                <p className="text-xs text-center text-gray-500 mt-2 leading-tight px-2">
                  {app.desc}
                </p>
  
                {/* ❌ Eliminado solo el texto largo en cursiva */}
                {/*
                <p className="text-[10px] text-center text-gray-600 mt-3 italic leading-tight px-2">
                  {app.useCase}
                </p>
                */}
              </motion.div>
            ))}
          </div>
        </div>
  
        {selected && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[999] p-4">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="
                bg-white rounded-2xl 
                w-full max-w-5xl 
                border border-gray-300 shadow-xl 
                relative
                h-[90vh]
                flex flex-col
                overflow-hidden
              "
            >
              <button
                onClick={() => setSelected(null)}
                className="
                  absolute top-3 right-3 z-50
                  text-white text-2xl 
                  p-2
                  rounded-full
                  bg-white/20
                  hover:bg-white/30
                  shadow-md
                  animate-pulse
                  transition-all duration-300
                "
              >
                ✕
              </button>
  
              <div
                className="
                  w-full 
                  h-[20%]
                  relative
                  rounded-t-2xl
                  bg-center bg-no-repeat bg-cover
                "
                style={{ backgroundImage: `url(${selected.modalImg})` }}
              >
                <div className="absolute inset-0 bg-black/55 rounded-t-2xl"></div>
              </div>
  
              <div className="flex-1 overflow-y-auto p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {selected.name}
                </h2>
  
                <p className="text-gray-700 mb-4">{selected.desc}</p>
  
                <div className="bg-gray-100 border border-gray-300 p-4 rounded-xl">
                  <p className="text-gray-600 whitespace-pre-line">
                    {selected.useCase}
                  </p>
                </div>
              </div>
  
            </motion.div>
          </div>
        )}
  
      </div>
    );
  }
  
