import { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Send, Volume2, VolumeX, Bot, Trash2, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

type Msg = { role: 'user' | 'assistant'; content: string };

const CHAT_URL = '/api/chat';

const langMap: Record<string, string> = { en: 'en-US', ta: 'ta-IN', hi: 'hi-IN', ml: 'ml-IN' };

const placeholders: Record<string, string> = {
  en: 'Ask me anything about cooking...',
  ta: 'சமையல் பற்றி எதையும் கேளுங்கள்...',
  hi: 'खाना पकाने के बारे में कुछ भी पूछें...',
  ml: 'പാചകത്തെക്കുറിച്ച് എന്തും ചോദിക്കൂ...',
};

const greetings: Record<string, string> = {
  en: "👨‍🍳 Hi! I'm Chef AI, your personal cooking assistant. Ask me for recipes, ingredient substitutes, nutrition info, or meal suggestions!",
  ta: '👨‍🍳 வணக்கம்! நான் செஃப் AI, உங்கள் சமையல் உதவியாளர். சமையல் குறிப்புகள், மாற்று பொருட்கள், ஊட்டச்சத்து தகவல்கள் கேளுங்கள்!',
  hi: '👨‍🍳 नमस्ते! मैं शेफ AI हूं, आपका व्यक्तिगत कुकिंग असिस्टेंट। रेसिपी, सामग्री विकल्प, पोषण जानकारी पूछें!',
  ml: '👨‍🍳 ഹായ്! ഞാൻ ഷെഫ് AI, നിങ്ങളുടെ പാചക സഹായി. പാചകക്കുറിപ്പുകൾ, ചേരുവ പകരക്കാർ, പോഷക വിവരങ്ങൾ ചോദിക്കൂ!',
};

const suggestions: Record<string, string[]> = {
  en: ['Chicken biryani recipe', '5 minute snack', 'What can I use instead of butter?'],
  ta: ['சிக்கன் பிரியாணி ரெசிபி', '5 நிமிட சிற்றுண்டி', 'வெண்ணெய்க்கு மாற்று என்ன?'],
  hi: ['चिकन बिरयानी रेसिपी', '5 मिनट का नाश्ता', 'मक्खन का विकल्प क्या है?'],
  ml: ['ചിക്കൻ ബിരിയാണി റെസിപ്പി', '5 മിനിറ്റ് ലഘുഭക്ഷണം', 'വെണ്ണയ്ക്ക് പകരം എന്ത്?'],
};

const ChatBot = () => {
  const { language } = useLanguage();
  const { profile } = useAuth();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Stop any request and speech when the component unmounts
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      window.speechSynthesis?.cancel();
    };
  }, []);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!('speechSynthesis' in window)) return;
      stopSpeaking();
      const cleaned = text.replace(/[#*_`|>[\]()]/g, '').replace(/\n+/g, '. ');
      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.lang = langMap[language] || 'en-US';
      utterance.rate = 0.9;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    },
    [language, stopSpeaking]
  );

  const appendAssistant = (content: string) => {
    setMessages(prev => {
      const last = prev[prev.length - 1];
      if (last?.role === 'assistant') {
        return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content } : m));
      }
      return [...prev, { role: 'assistant', content }];
    });
  };

  const send = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Msg = { role: 'user', content: trimmed };
    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setInput('');
    setIsLoading(true);

    let assistantSoFar = '';
    const controller = new AbortController();
    abortRef.current = controller;

    // Handles one SSE line; returns true when the stream is finished
    const handleLine = (rawLine: string): boolean => {
      const line = rawLine.endsWith('\r') ? rawLine.slice(0, -1) : rawLine;
      if (line.startsWith(':') || line.trim() === '') return false;
      if (!line.startsWith('data: ')) return false;
      const jsonStr = line.slice(6).trim();
      if (jsonStr === '[DONE]') return true;
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) {
          assistantSoFar += content;
          appendAssistant(assistantSoFar);
        }
      } catch {
        // Incomplete JSON: ignored here, the caller re-buffers when needed
        throw new Error('partial');
      }
      return false;
    };

    try {
      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: allMessages,
          language,
          userProfile: profile
            ? {
                diet_type: profile.diet_type,
                fitness_goal: profile.fitness_goal,
                allergies: profile.allergies,
                medical_conditions: profile.medical_conditions,
              }
            : null,
        }),
        signal: controller.signal,
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: '' }));
        if (resp.status === 429) throw new Error('Too many requests. Please wait a moment and try again.');
        if (resp.status === 402) throw new Error('AI credits are used up. Please add credits to continue.');
        throw new Error(err.error || `Error ${resp.status}`);
      }

      if (!resp.body) throw new Error('No response body');

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          const line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          try {
            if (handleLine(line)) {
              streamDone = true;
              break;
            }
          } catch {
            // Put the line back and wait for more data
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      // Flush anything left in the buffer after the stream closes
      if (!streamDone && textBuffer.trim()) {
        for (const line of textBuffer.split('\n')) {
          try {
            if (handleLine(line)) break;
          } catch {
            /* ignore incomplete trailing data */
          }
        }
      }
    } catch (e) {
      const err = e as Error;
      if (err.name !== 'AbortError') {
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: `❌ ${err.message || 'Something went wrong'}` },
        ]);
      }
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  };

  const clearChat = () => {
    abortRef.current?.abort();
    setMessages([]);
    setIsLoading(false);
    stopSpeaking();
  };

  const quickQuestions = suggestions[language] || suggestions.en;

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Bot className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-card-foreground">Chef AI</h3>
            <p className="text-xs text-muted-foreground">Cooking Assistant</p>
          </div>
        </div>
        <div className="flex gap-1">
          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              aria-label="Stop speaking"
              className="rounded-lg p-2 text-destructive hover:bg-destructive/10"
            >
              <VolumeX className="h-4 w-4" />
            </button>
          )}
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              aria-label="Clear chat"
              className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <div className="rounded-xl bg-primary/5 p-4 text-sm text-card-foreground">
            <ReactMarkdown>{greetings[language] || greetings.en}</ReactMarkdown>
            <div className="mt-3 flex flex-wrap gap-2">
              {quickQuestions.map(q => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`relative max-w-[85%] rounded-xl px-4 py-3 text-sm ${
                msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-card-foreground'
              }`}
            >
              {msg.role === 'assistant' ? (
                <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-heading prose-headings:text-card-foreground prose-p:text-card-foreground prose-li:text-card-foreground prose-strong:text-card-foreground prose-table:text-card-foreground">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                <p className="whitespace-pre-wrap">{msg.content}</p>
              )}
              {msg.role === 'assistant' && msg.content.length > 20 && !msg.content.startsWith('❌') && (
                <button
                  onClick={() => speak(msg.content)}
                  className="mt-2 flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
                >
                  <Volume2 className="h-3 w-3" /> Listen
                </button>
              )}
            </div>
          </div>
        ))}

        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <div className="flex justify-start">
            <div className="rounded-xl bg-muted px-4 py-3">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border p-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                send();
              }
            }}
            placeholder={placeholders[language] || placeholders.en}
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            disabled={isLoading}
          />
          <button
            onClick={send}
            disabled={isLoading || !input.trim()}
            aria-label="Send message"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;