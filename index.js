// index.js
const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const respuestas = require("./respuestas.json");
const canciones = require("./canciones.json");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once("ready", () => {
  console.log(`Bot conectado como ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  manejarMensaje(message);
});

function manejarMensaje(message) {
  if (message.author.bot) return;

  const texto = message.content.toLowerCase();

  // ✅ Solo responde si mencionan su nombre
  if (!texto.includes("cejota")) return;

  // 🎵 Canción 
  if (texto.includes("cancion")) {
    const aleatoria = canciones[Math.floor(Math.random() * canciones.length)];
    message.reply(`Te recomiendo: 🎵 **${aleatoria}**`);
    return;
  }

  // 📊 ¿Qué tan...?
  if (texto.includes("que tan")) {
    const porcentaje = Math.floor(Math.random() * 100) + 1;
    message.reply(`Diría que un ${porcentaje}% 😁`);
    return;
  }

  // 🌈 ¿X es gay?
  const regexGay = /(\w+)\s+es\s+gay\??/i;
  const match = texto.match(regexGay);
  if (match) {
    const respuesta = Math.random() < 0.5 ? "Sí" : "No";
    message.reply(`${respuesta} 🌈`);
    return;
  }

  // 💬 Respuestas predefinidas
  for (const clave in respuestas) {
    if (texto.includes(clave)) {
      message.reply(respuestas[clave]);
      break;
    }
  }
}

client.login(process.env.TOKEN);