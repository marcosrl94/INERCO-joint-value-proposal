import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import Markdown from "react-markdown";

const ai = new GoogleGenAI({ apiKey: "AIzaSyBHtMaKqEnOBrgggFKdlSZiAtwETpVhf5Q" });

type Message = {
  id: string;
  role: "user" | "model";
  content: string;
};

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "model",
      content: "¡Hola! Soy tu asesor virtual de ESG Nfq. ¿En qué puedo ayudarte hoy sobre nuestra propuesta de valor en finanzas sostenibles, Net Zero, Analytics o Corporates?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [chatSession, setChatSession] = useState<any>(null);

  useEffect(() => {
    // Initialize chat session
    const initChat = async () => {
      try {
        const chat = ai.chats.create({
          model: "gemini-3.1-flash-preview",
          config: {
            systemInstruction: "Eres un asesor experto de la empresa 'ESG Nfq'. Tu objetivo es ayudar a los usuarios a entender la propuesta de valor de la empresa. Los pilares son: Sustainable Finance, Net Zero, Risk & Analytics, y Reporting & Corporates. Responde de manera profesional, clara y concisa. Usa formato Markdown para estructurar tus respuestas.",
          }
        });
        setChatSession(chat);
      } catch (error) {
        console.error("Failed to initialize chat:", error);
      }
    };
    initChat();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chatSession || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { id: Date.now().toString(), role: "user", content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await chatSession.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: "model", 
        content: response.text || "Lo siento, no pude procesar tu solicitud." 
      }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: "model", 
        content: "Ha ocurrido un error al conectar con el servicio. Por favor, inténtalo de nuevo más tarde." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[700px]">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white">Asesor ESG Nfq</h3>
        <p className="text-sm text-slate-400">Resuelve tus dudas sobre nuestros servicios y capacidades.</p>
      </div>

      <ScrollArea className="flex-1 pr-4 mb-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "model" && (
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-amber-500" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl p-4 ${
                msg.role === "user" 
                  ? "bg-amber-500 text-slate-900 rounded-tr-sm" 
                  : "bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-sm"
              }`}>
                {msg.role === "user" ? (
                  <p>{msg.content}</p>
                ) : (
                  <div className="prose prose-sm prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-slate-900 prose-pre:text-slate-300">
                    <Markdown>{msg.content}</Markdown>
                  </div>
                )}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-slate-300" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 text-amber-500" />
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-tl-sm p-4 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                <span className="text-sm text-slate-400">Escribiendo...</span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="flex gap-2 pt-4 border-t border-slate-700">
        <Input 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Escribe tu pregunta aquí..." 
          className="flex-1 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-amber-500"
          disabled={isLoading}
        />
        <Button onClick={handleSend} disabled={isLoading || !input.trim()} className="bg-amber-500 text-slate-900 hover:bg-amber-600">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
