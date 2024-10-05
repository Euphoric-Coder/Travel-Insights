import { useState } from 'react';
import { useSquid } from '@squidcloud/react';
import { ChatGroq } from '@langchain/groq';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LoadingIndicator from './LoadingIndicator';
import { cn } from '@/lib/utils';


const llm = new ChatGroq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  model: 'llama-3.1-70b-versatile',
  temperature: 0.7,
  maxTokens: undefined,
});
function AskAI() {
  const [text, setText] = useState('');
  const [chatHistory, setChatHistory] = useState<
    { text: string; response: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // To toggle chat box open/close
  const squid = useSquid(); // Initialize Squid to interact with the database

  // Function to fetch travel-related data from Squid AI's database
  const fetchTravelData = async ({text}: { text: string }) => {
    try {
      const travelData = await squid.executeFunction('askQuestion', text );
      return travelData;
    } catch (error) {
      console.error('Error fetching travel data:', error);
      return null;
    }
  };

  // Function to handle asking the question to ChatGroq
  const askPressed = async () => {
    if (!text) return;
    setLoading(true);

    
    const message = ChatPromptTemplate.fromTemplate("Answer in a rational way, {text}")
    const prompt = ChatPromptTemplate.fromMessages([
      [
        'system',
        'You are Answer Extracting Agent from an AI Agent System of Squid AI. Extract all the data from the AI Agent.',
      ],
      [
        'human',
        `Ask the AI Agent in a ordered manner and ask it to {text}. By returning only a query as string in question mark. Make sure that the query extracts all the travelling data from the AI Agent including the Dates, Place of Travel, the Trip Plan (if any) and the notes (if any) from the user side. Also one thing is that ask the AI Agent to give a detailed description of the notes, trip planning for all days starting from the start date to the end date.`,
      ],
    ]);
    
    const chain = message.pipe(llm);
    const response = await chain.invoke({ text: "Bill Gates" });
    
    const chain1 = prompt.pipe(llm);
    const response1 = await chain1.invoke({ text: "Extract all Data from the AI Agent using a Query as string" });
    
    // Fetch travel data from Squid AI Integrated Database
    const travelData = await fetchTravelData({text: "Give me all the details of the trip including trip planning (from the starting date till the ending date) in a very very detailed manner, notes in a very very detailed manner and with a proper description to the data that you are giving to me! ALSO DON'T TRUNCATE ANY DETAILED ITINARY AS I NEED EVERY KNOCK AND CORNER OF THE DATA IN A DETAILED MANNER! AND YES I NEED THE FULL DESCRIPTION OF THE TRAVEL PLAN AND NOTES PROVIDED"});

    console.log(travelData);

    setChatHistory((prev) => [...prev, { text, response: response.text }]);
    setText('');
    setLoading(false);
  };

  return (
    <>
      {/* Floating button to toggle chatbot */}
      <div className="fixed bottom-5 right-5 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
        >
          {isOpen ? 'X' : '💬'}
        </Button>
      </div>

      {/* Chatbot UI */}
      <div
        className={cn(
          'fixed bottom-20 right-5 z-40 w-96 p-4 bg-white shadow-md rounded-lg transform transition-all duration-300',
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0',
        )}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Chat with AI</h3>
          <Button
            onClick={() => setIsOpen(false)}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Close
          </Button>
        </div>

        {/* Chat history */}
        <div className="space-y-3 max-h-64 overflow-y-auto mb-3">
          {chatHistory.map((chat, index) => (
            <div key={index} className="bg-gray-100 p-3 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>You:</strong> {chat.text}
              </p>
              <p className="text-sm text-gray-700 mt-2">
                <strong>AI:</strong> {chat.response}
              </p>
            </div>
          ))}
        </div>

        {/* Input field to ask a question */}
        <div className="flex space-x-3">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your question..."
            className="w-full"
          />
          {loading ? (
            <LoadingIndicator />
          ) : (
            <Button
              onClick={askPressed}
              className="bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Send
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default AskAI;
