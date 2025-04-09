import { Groq } from 'groq-sdk';

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });
const MODEL = 'llama3-groq-70b-8192-tool-use-preview';

function calculate(expression) {
    try {
        const result = eval(expression);
        return JSON.stringify({ result });
    } catch {
        return JSON.stringify({ error: "Invalid expression" });
    }
}

async function runConversation(userPrompt) {
    const messages = [
        {
            role: "system",
            content: "You are a calculator assistant. Use the calculate function to perform mathematical operations and provide the results."
        },
        {
            role: "user",
            content: userPrompt,
        }
    ];

    const tools = [
        {
            type: "function",
            function: {
                name: "calculate",
                description: "Evaluate a mathematical expression",
                parameters: {
                    type: "object",
                    properties: {
                        expression: {
                            type: "string",
                            description: "The mathematical expression to evaluate",
                        }
                    },
                    required: ["expression"],
                },
            },
        }
    ];

    const response = await client.chat.completions.create({
        model: MODEL,
        messages: messages,
        stream: false,
        tools: tools,
        tool_choice: "auto",
        max_tokens: 4096
    });

    const responseMessage = response.choices[0].message;
    const toolCalls = responseMessage.tool_calls;

    if (toolCalls) {
        const availableFunctions = {
            "calculate": calculate,
        };

        messages.push(responseMessage);

        for (const toolCall of toolCalls) {
            const functionName = toolCall.function.name;
            const functionToCall = availableFunctions[functionName];
            const functionArgs = JSON.parse(toolCall.function.arguments);
            const functionResponse = functionToCall(functionArgs.expression);

            messages.push({
                tool_call_id: toolCall.id,
                role: "tool",
                name: functionName,
                content: functionResponse,
            });
        }

        const secondResponse = await client.chat.completions.create({
            model: MODEL,
            messages: messages
        });

        return secondResponse.choices[0].message.content;
    }

    return responseMessage.content;
}
