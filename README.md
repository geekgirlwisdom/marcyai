This project built with [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started
Data already populated via npm run seed into [Astra DB](https://astra.datastax.com/)

To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000)  
 
## Application
- [Datastax Database](https://docs.datastax.com/)
- [Open AI](https://openai.com/)
- Package Restrictions  
- @ai-sdk/openai - 3.0.19 
- @ai-sdk/react - 3.0.178 
- @datastax/astra-db-ts - 1.1.0 
- ai - 2.2.37 
- next - 14.2.3 
- openai - 4.41.0  
- react - 18 

## Resources
Project built with incredible assistance from 

- [Build Your Own Rag Chatbot](https://www.freecodecamp.org/news/build-your-own-rag-chatbot-with-javascript/) -  build app using Next.js  
- [Hands on AI: Building LLM Powered Apps](https://www.linkedin.com/learning/hands-on-ai-building-llm-powered-apps) - tutorial on llms using python
 - [How to Build a Custom AI Chat](https://medium.com/@nakiboddin.saiyad/how-to-build-a-custom-ai-chat-application-with-next-js-3f4f411b5c2e)
 - [Build a RAG Chatbot](https://www.youtube.com/watch?v=3E5OxozYuA8)
 - [Build an AI Chatbot for your Website with Next.JS](https://dev.to/karendijital/how-to-build-an-ai-chatbot-for-your-website-with-nextjs-openai-2026-guide-i1n)
 - [Build RAG Chatbot with Next.JS](https://github.com/gopinav/Next.js-AI-SDK-RAG-Chatbot)
 - [How to Build a Custom AI Chat](https://medium.com/@nakiboddin.saiyad/how-to-build-a-custom-ai-chat-application-with-next-js-3f4f411b5c2e)
 - [AI Programming for JavaScript Developers](https://www.linkedin.com/learning/ai-programming-for-javascript-developers/learn-to-build-ai-enhanced-applications)
 - [Simple Streaming OpenAI](https://johnmaeda.medium.com/simple-streaming-openai-chat-with-nextjs-tailwind-yarn-2024-289c3deaee5e)

 ## Instructions
- To use, click chat bubbles for initial prompts
- You can also type prompts into the textarea box
- DB responses will appear in the  command line console (this will be updated later)

## Potential Errors \ Concerns
- If application does not run, you might have to npm install the following packages
- next
- react
- react-dom
- @datastax/astra-db-ts 
- langchain 
- openai 
- dotenv
- ts-node
- langchain
- @langchain/community
- @langchain/core
- @langchain/core
- puppeteer
- ai
- @ai-sdk/react

Additional Comments:
- Make certain that the package versions installed match the versions mentioned above 
-  If necessary, consider downgrading the node \ typescript versions for the local package
- Verify the package version with 'check node version' or 'check react version'
- For node, you can also use 'npx next -v' or 'npm -v' 
- To install and use a different node package, try: 'nvm install 22.x.x' and 'nvm use 22.15.0'
- If necessary, consider adjusting the typescript and npm versions:
- npm install --save-dev typescript@5.7
- npx npm@10 install
- To downgrade other packages try npm i [packagename]@version i.e. npm i ts-node@10.9.2
 