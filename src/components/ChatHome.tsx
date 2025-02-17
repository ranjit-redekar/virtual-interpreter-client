import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent } from "@/components/ui/card";
import ListenButton from "./ListenButton";

import { RootState } from '../store';

interface Message {
  role: "clinician" | "patient";
  displayText: string;
}

export default function ChatHome() {
  const messages = useSelector((state: RootState) => state.conversation.messages) as Message[];

  return (
    <>
      <div className="flex flex-col h-screen p-4">
        <div className="flex-col overflow-y-auto space-y-2  ">
          {messages.map((msg, index) => (
            <Card
            key={index}
            className={`w-fit p-2 flex items-center space-x-2 ${
              msg.role === "clinician"
                ? "self-start bg-gray-200 justify-start" // Align clinician's messages to the start (left)
                : "self-end bg-blue-200 justify-end" // Align patient's messages to the end (right)
            }`}
            >
              <CardContent className='p-2' >{msg.displayText}</CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2">
        <ListenButton />
      </div>
    </>
  );
}
