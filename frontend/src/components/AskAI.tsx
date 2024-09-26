import { useState } from 'react';
import { useSquid } from '@squidcloud/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import LoadingIndicator from './LoadingIndicator';

function AskAI() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const squid = useSquid();

  const askPressed = async () => {
    if (!text) return;
    setLoading(true);
    const result = await squid.executeFunction('askQuestion', text);
    setResult(result);
    setText('');
    setLoading(false);
  };

  const closeResult = () => {
    setResult('');
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-center">
        Ask a Question!
      </h3>
      <div className="flex space-x-4">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your question..."
        />
        {loading ? (
          <LoadingIndicator />
        ) : (
          <Button
            onClick={askPressed}
            className="bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Ask
          </Button>
        )}
      </div>
      {result && (
        <div className="mt-6 space-y-4">
          <Textarea value={result} rows={4} readOnly />
          <Button
            onClick={closeResult}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Close
          </Button>
        </div>
      )}
    </div>
  );
}

export default AskAI;
