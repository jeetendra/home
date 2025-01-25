import { OllamaFunctions } from "@langchain/community/experimental/chat_models/ollama_functions";
import { HumanMessage } from "@langchain/core/messages";

const toolSystemPromptTemplate = `You have access to the following tools:

{tools}

To use a tool, respond with a JSON object with the following structure:
{{
  "tool": <name of the called tool>,
  "tool_input": <parameters for the tool matching the above JSON schema>
}}

if user has not provided all required parameters then ask to provide those parameters in content property.

`;


const model = new OllamaFunctions({
  temperature: 0.1,
  model: "llama3.1",
  toolSystemPromptTemplate
}).bind({
  functions: [
    {
      name: "get_current_weather",
      description: "Get the current weather in a given location",
      parameters: {
        type: "object",
        properties: {
          location: {
            type: "string",
            description: "The city and state, e.g. San Francisco, CA",
            required: true
          },
          unit: { type: "string", enum: ["celsius", "fahrenheit"], required: true },
        },
        required: ["location", "unit"],
      },
    },
  ],
  // You can set the `function_call` arg to force the model to use a function
//   function_call: {
//     name: "get_current_weather",
//   },
});

const response = await model.invoke([
    
  new HumanMessage({
    content: "What's the weather in Boston?  ",
  }),
]);

console.log(response);

/*
  AIMessage {
    content: '',
    additional_kwargs: {
      function_call: {
        name: 'get_current_weather',
        arguments: '{"location":"Boston, MA","unit":"fahrenheit"}'
      }
    }
  }
*/