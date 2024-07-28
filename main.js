// eslint-disable-next-line no-undef
const client = mqtt.connect('ws://192.168.0.196:9001/mqtt') // Cambiar sólo la IP para el broker local

const ledElement = document.querySelector('.led')
const btnOn = document.getElementById('btn-on')
const btnOff = document.getElementById('btn-off')

// Modificar tópicos y mensajes. Tópico ejemplo "tsTest".
client.on('connect', () => {
   client.subscribe('tsTest/#', (err) => {
      if (!err) {
         client.publish('tsTest/led', 'Activar led')
      }
   })
})

client.on('message', (topic, message) => {
   console.log(`Mensaje recibido: ${message.toString()} Tópico: ${topic}`)
})

btnOn.addEventListener('click', () => {
   client.publish('tsTest/led', 'Encender led') // Cambiar tópico y mensaje
   ledElement.classList.add('led-blue')
})

btnOff.addEventListener('click', () => {
   client.publish('tsTest/led', 'Apagar led') // Cambiar tópico y mensaje
   ledElement.classList.remove('led-blue')
})
