import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { Ollama } from "@langchain/community/llms/ollama";
import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { createOpenAIFunctionsAgent, AgentExecutor } from "langchain/agents";

import { config } from "dotenv";
config();
import { OllamaFunctions } from "@langchain/community/experimental/chat_models/ollama_functions";

const llm = new OllamaFunctions({
  temperature: 0.1,
  model: "llama3.1",
});
// const llm = new Ollama({
//     baseUrl: "http://localhost:11434", // Set your Ollama server URL
//     model: "llama3.1", // Choose the desired model (e.g., llama3)
// });

// const llm = new ChatOpenAI({
//     baseUrl: "http://localhost:11434/v1", 
//     model: "llama3.1", // Choose the desired model (e.g., llama3)
// });

// const llm = new ChatOllama({
//     baseUrl: "http://localhost:11434", // Default value
//     model: "llama3.1",
//   });

/**
 * Note that the descriptions here are crucial, as they will be passed along
 * to the model along with the class name.
 */
const calculatorSchema = z.object({
  operation: z
    .enum(["add", "subtract", "multiply", "divide"])
    .describe("The type of operation to execute."),
  number1: z.number().describe("The first number to operate on."),
  number2: z.number().describe("The second number to operate on."),
});

const calculatorTool = tool(
  async ({ operation, number1, number2 }) => {
    // Functions must return strings
    if (operation === "add") {
      return `${number1 + number2}`;
    } else if (operation === "subtract") {
      return `${number1 - number2}`;
    } else if (operation === "multiply") {
      return `${number1 * number2}`;
    } else if (operation === "divide") {
      return `${number1 / number2}`;
    } else {
      throw new Error("Invalid operation.");
    }
  },
  {
    name: "calculator",
    description: "Can perform mathematical operations.",
    schema: calculatorSchema,
  }
);

const tools = [calculatorTool];

const llmWithTools = llm.bindTools([calculatorTool]);


const answer = await llmWithTools.invoke("what is 2+2");
console.log(answer);

// const agent = await createOpenAIFunctionsAgent({
//     llm: llm,
//     tools,
//     prompt: "",
//   });

//   const agentExecutor = new AgentExecutor({
//     agent,
//     tools,
//     verbose: true,
//   });

//   const agentResult = await agentExecutor.invoke({
//     input: "how can LangSmith help with testing?",
//   });
  
//   console.log(agentResult.output);

// const prompt = ChatPromptTemplate.fromTemplate(
//   `Answer the following question to the best of your ability:\n{question}`
// );

// const model = new ChatOpenAI({
//   temperature: 0.8,
//   baseURL: "http://localhost:11434/api/",
//   apiKey: ""
// });

// const outputParser = new StringOutputParser();

// const chain = prompt.pipe(model).pipe(outputParser);

// const stream = await chain.stream({
//   question: "Why is the sky blue?",
// });

// for await (const chunk of stream) {
//   console.log(chunk);
// }
