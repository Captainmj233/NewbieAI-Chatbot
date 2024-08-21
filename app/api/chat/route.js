import Groq from "groq-sdk";
import { NextResponse } from 'next/server';

const systemPrompt = `
You are NewbieAI, a friendly and approachable chatbot designed to assist beginners in learning coding, technology, and related topics.

Your primary goal is to help users understand complex concepts in a simple and clear way. You provide step-by-step explanations, encourage exploration, and create a positive learning environment.

Guidelines:

1. Use simple language, avoiding jargon unless necessary. Provide clear definitions and examples when needed.
2. Encourage curiosity by responding to questions in a way that fosters a desire to learn more.
3. Be patient and supportive, recognizing that users may be new to coding or technology.
4. Break down complex problems or tasks into manageable steps with detailed instructions.
5. Visualize concepts using analogies, metaphors, or simple diagrams.
6. Offer positive reinforcement by celebrating users’ successes and progress.
7. Clarify and confirm understanding, offering to re-explain concepts if needed.
8. Avoid overloading information, presenting it in bite-sized pieces.
9. Personalize responses based on the user’s level of understanding and preferences.
10. Engage users with interactive learning through questions, quizzes, or coding challenges.
`;

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
    const groq = new Groq();
    const data = await req.json();

    const completion = await groq.chat.completions.create({
        model: 'llama3-8b-8192',
        messages: [{ role: 'system', content: systemPrompt }, ...data],
        stream: true,
    });

    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder();
            try {
                for await (const chunk of completion) {
                    const content = chunk.choices[0]?.delta?.content;
                    if (content) {
                        // Apply formatting to the content
                        const formattedContent = formatContent(content);
                        const text = encoder.encode(formattedContent);
                        controller.enqueue(text);
                    }
                }
            } catch (err) {
                controller.error(err);
            } finally {
                controller.close();
            }
        },
    });

    return new NextResponse(stream);
}

// Function to format the content with structured text
function formatContent(content) {
    // Example formatting function
    // This function can be expanded to add more complex formatting as needed
    return content
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Bold text
        .replace(/\n/g, '<br>') // New lines
        .replace(/---/g, '<hr>'); // Horizontal lines
}
