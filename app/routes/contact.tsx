import { useState } from "react";
import { SendHorizontal } from "lucide-react";
import { DecoderText } from "~/components/decoder-text";
import MouseMoveEffect from "~/components/mouse-move-effect";
import { Input } from "~/components/ui/input";
import emailjs from "@emailjs/browser";
import { useLanguage } from "~/lib/language-context";

export default function Contact() {
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceID || !templateID || !publicKey) {
      setStatus(
        language === "en"
          ? "Configure EmailJS in .env before using the contact form."
          : "Configure o EmailJS no arquivo .env antes de usar o formulário.",
      );
      return;
    }

    const templateParams = {
      from_email: email,
      message: message,
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      setStatus(
        language === "en"
          ? "Message sent successfully! ✅"
          : "Mensagem enviada com sucesso! ✅",
      );
      setEmail("");
      setMessage("");
    } catch (error) {
      setStatus(
        language === "en"
          ? "Something went wrong. Please try again. ❌"
          : "Ocorreu um erro. Tente novamente. ❌",
      );
      console.error("Erro ao enviar e-mail:", error);
    }
  };

  return (
    <div className="relative min-h-[calc(100svh-5rem)] overflow-hidden">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="absolute right-0 top-0 h-[min(500px,80vw)] w-[min(500px,80vw)] bg-blue-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[min(500px,80vw)] w-[min(500px,80vw)] bg-purple-500/10 blur-[100px]" />
      </div>

      <MouseMoveEffect />

      <div className="relative z-10 flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center gap-6 px-4 py-10 sm:px-6">
        <h1 className="text-center text-3xl font-bold tracking-wide text-foreground sm:text-4xl">
          <DecoderText
            text={language === "en" ? "Send me a message!" : "Envie uma mensagem!"}
            delay={500}
          />
        </h1>

        <form
          onSubmit={sendEmail}
          className="flex w-full max-w-md flex-col gap-6 rounded-lg"
        >
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold">
              E-mail:
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@example.com"
              className="p-3 border rounded-md focus:outline-none focus:ring-1 focus:custonText"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-semibold">
              {language === "en" ? "Message:" : "Mensagem:"}
            </label>
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                language === "en"
                  ? "Write your message."
                  : "Insira sua mensagem."
              }
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:custonText"
              required
            />
          </div>

          <button
            type="submit"
            className="font-semibold relative overflow-hidden bg-transparent text-purple-300 px-4 py-1 transition duration-300 group"
          >
            <span className="absolute inset-0 bg-custonText transition-transform duration-300 scale-x-0 group-hover:scale-x-100 origin-left" />
            <span className="flex flex-row relative gap-2 items-center z-10 text-foreground">
              <SendHorizontal />{" "}
              {language === "en" ? "Send message" : "Enviar mensagem"}
            </span>
          </button>
        </form>

        {status && <p className="text-center text-sm text-foreground">{status}</p>}
      </div>
    </div>
  );
}
