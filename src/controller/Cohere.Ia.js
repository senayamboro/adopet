import { CohereClient } from "cohere-ai";

const cohere = new CohereClient({
  token: "TAEzzXtYCtOffFo1ilwcVgG8C9DL9wR9claclqfG", // Reemplaza con tu API key
});

const formatResponse = (text) => {
  return text
    .replace(/\n- /g, "\n\n- ") // Añadir doble salto de línea antes de las viñetas
    .replace(/:\n/g, ":\n\n"); // Añadir doble salto de línea después de los dos puntos
};

export const main = async (req, res) => {
  try {
    const {mensaje} = req.body
    const stream = await cohere.chatStream({
      model: "command-r-plus",
      message: mensaje,
      temperature: 0.3,
      chatHistory: [],
      promptTruncation: "AUTO",
      connectors: [{"id":"web-search"}]
    });

    let responseText = "";

    for await (const chat of stream) {
      if (chat.eventType === "text-generation") {
        responseText += chat.text;
      }
    }

    const formattedText = formatResponse(responseText);

    res.status(200).json({ text: formattedText });
  } catch (error) {
    console.error("Error durante la transmisión del chat:", error);
    res.status(500).json({ error: "Error durante la transmisión del chat" });
  }
};
