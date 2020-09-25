# Reglas de juego categorías (o cultura chupística):

* Cada vez que empieza un nuevo juego se elige aleatoriamente una categoría de una lista de categorías predefinida y aparece en la parte superior de la pantalla.
* Se juega por turnos. 
* Cada turno tiene un contador de 10, 8 y 5 segundos que depende si es la primera, segunda o tercera ronda en adelante.
* Si el contador llega a 0 pierde
* En su turno el jugador tiene que pensar y escribir una palabra/cosa que pertenezca a la categoría.
* El sistema no deja que se digan palabras repetidas (caseinsensitive, sin mirar tíldes)
* Luego de enviar la palabra los otros jugadores votan si la palabra es válida para la categoría. Si al menos 2 personas votan que no, el jugador pierde.
* Si tiene una votación favorable se pasa al siguiente turno.
* Cuando un jugador pierde está la opción de reiniciar el juego




# Funcionamiento de simulación del juego

* Se simula la participación de los otros jugadores como "bots"
* Todos los bots comparten una lista de palabras para cada categoría
* En su turno, un bot se demora un tiempo aleatorio en decir una de estas palabras. Si no quedan palabras no dice nada y pierde.
* La votación del bot es aleatoria. Dice ***No*** con menor probabilidad
