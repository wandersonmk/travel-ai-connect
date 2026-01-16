import { useState } from "react";
import { 
  FaWhatsapp, FaRobot, FaCheckCircle, FaCheck,
  FaEnvelope, FaPhone, FaDownload, FaStar, FaRocket,
  FaShieldAlt, FaBolt, FaClock, FaHeadset, FaGraduationCap,
  FaServer, FaCreditCard, FaCalendarAlt, FaUsers, FaHeart
} from "react-icons/fa";
import { 
  MdAutoAwesome, MdSupport, MdSpeed, MdSavings
} from "react-icons/md";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from 'react-hot-toast';
import jsPDF from "jspdf";

const Index = () => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    toast.loading("Gerando PDF profissional...", { duration: 2000 });

    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = 210;
      const margin = 15;
      const contentWidth = pageWidth - (margin * 2);
      let y = 0;

      // Header gradient
      pdf.setFillColor(15, 23, 42);
      pdf.rect(0, 0, pageWidth, 50, 'F');
      
      // Accent line
      pdf.setFillColor(34, 197, 94);
      pdf.rect(0, 50, pageWidth, 3, 'F');

      // Title
      pdf.setFontSize(24);
      pdf.setTextColor(255, 255, 255);
      pdf.text('PROPOSTA COMERCIAL', pageWidth / 2, 22, { align: 'center' });
      
      pdf.setFontSize(14);
      pdf.setTextColor(148, 163, 184);
      pdf.text('Automação Inteligente para WhatsApp', pageWidth / 2, 35, { align: 'center' });

      y = 65;

      // Investment Section
      pdf.setFillColor(240, 253, 244);
      pdf.roundedRect(margin, y, contentWidth, 55, 4, 4, 'F');
      pdf.setDrawColor(34, 197, 94);
      pdf.setLineWidth(1);
      pdf.roundedRect(margin, y, contentWidth, 55, 4, 4, 'S');

      pdf.setFontSize(16);
      pdf.setTextColor(22, 101, 52);
      pdf.text('INVESTIMENTO', margin + 10, y + 15);

      // Main price
      pdf.setFontSize(28);
      pdf.setTextColor(15, 23, 42);
      pdf.text('R$ 2.500,00', margin + 10, y + 35);
      pdf.setFontSize(12);
      pdf.setTextColor(100, 116, 139);
      pdf.text('em 6x sem juros no cartão', margin + 85, y + 35);

      // PIX price
      pdf.setFillColor(34, 197, 94);
      pdf.roundedRect(margin + 10, y + 42, 80, 10, 2, 2, 'F');
      pdf.setFontSize(11);
      pdf.setTextColor(255, 255, 255);
      pdf.text('PIX: R$ 2.200,00 (economize R$ 300)', margin + 15, y + 49);

      y += 65;

      // What's included
      pdf.setFontSize(14);
      pdf.setTextColor(15, 23, 42);
      pdf.text('O QUE ESTÁ INCLUÍDO', margin, y + 5);

      y += 12;

      const includes = [
        'Configuração para 2 números de WhatsApp',
        '5 dias de suporte e acompanhamento',
        'Treinamento completo do sistema',
        'Esclarecimento de dúvidas',
        'Implementação rápida (2 a 3 dias úteis)'
      ];

      pdf.setFontSize(10);
      includes.forEach((item, idx) => {
        pdf.setTextColor(34, 197, 94);
        pdf.text('✓', margin + 5, y + (idx * 7));
        pdf.setTextColor(71, 85, 105);
        pdf.text(item, margin + 12, y + (idx * 7));
      });

      y += 45;

      // Monthly costs section
      pdf.setFillColor(239, 246, 255);
      pdf.roundedRect(margin, y, contentWidth, 45, 4, 4, 'F');
      pdf.setDrawColor(59, 130, 246);
      pdf.setLineWidth(0.5);
      pdf.roundedRect(margin, y, contentWidth, 45, 4, 4, 'S');

      pdf.setFontSize(14);
      pdf.setTextColor(30, 64, 175);
      pdf.text('CUSTOS MENSAIS / ANUAIS', margin + 10, y + 12);

      pdf.setFontSize(10);
      pdf.setTextColor(71, 85, 105);

      const costs = [
        { label: 'NotificaMais (plataforma)', value: 'R$ 29,90/mês' },
        { label: 'VPS Hostinger (N8N)', value: 'R$ 451,00/ano (link de indicação)' },
        { label: 'OpenAI (IA)', value: '$10 USD inicial (recarga conforme uso - consumo baixíssimo)' }
      ];

      costs.forEach((cost, idx) => {
        pdf.setTextColor(59, 130, 246);
        pdf.text('•', margin + 8, y + 22 + (idx * 7));
        pdf.setTextColor(51, 65, 85);
        pdf.text(`${cost.label}:`, margin + 13, y + 22 + (idx * 7));
        pdf.setTextColor(15, 23, 42);
        pdf.text(cost.value, margin + 60, y + 22 + (idx * 7));
      });

      y += 55;

      // Optional support
      pdf.setFillColor(254, 249, 195);
      pdf.roundedRect(margin, y, contentWidth, 30, 4, 4, 'F');
      pdf.setDrawColor(234, 179, 8);
      pdf.setLineWidth(0.5);
      pdf.roundedRect(margin, y, contentWidth, 30, 4, 4, 'S');

      pdf.setFontSize(12);
      pdf.setTextColor(133, 77, 14);
      pdf.text('SUPORTE OPCIONAL (após os 5 dias iniciais)', margin + 10, y + 12);

      pdf.setFontSize(10);
      pdf.setTextColor(113, 63, 18);
      pdf.text('• Suporte mensal: R$ 500,00/mês', margin + 10, y + 22);
      pdf.text('• Suporte avulso: R$ 150,00/hora', margin + 100, y + 22);

      y += 40;

      // Benefits
      pdf.setFontSize(14);
      pdf.setTextColor(15, 23, 42);
      pdf.text('BENEFÍCIOS', margin, y + 5);

      y += 12;

      const benefits = [
        'Economia significativa com atendimento automatizado',
        'Alta qualidade e desempenho da IA',
        'Atendimento 24 horas, 7 dias por semana',
        'Redução de erros e tempo de resposta'
      ];

      pdf.setFontSize(10);
      benefits.forEach((item, idx) => {
        pdf.setTextColor(34, 197, 94);
        pdf.text('★', margin + 5, y + (idx * 7));
        pdf.setTextColor(71, 85, 105);
        pdf.text(item, margin + 12, y + (idx * 7));
      });

      y += 38;

      // Footer
      pdf.setFillColor(15, 23, 42);
      pdf.rect(0, 270, pageWidth, 27, 'F');

      pdf.setFontSize(14);
      pdf.setTextColor(255, 255, 255);
      pdf.text('Wanderson Silveira', pageWidth / 2, 280, { align: 'center' });
      
      pdf.setFontSize(10);
      pdf.setTextColor(148, 163, 184);
      pdf.text('Especialista em Automação e Inteligência Artificial', pageWidth / 2, 287, { align: 'center' });
      
      pdf.setTextColor(34, 197, 94);
      pdf.text('WhatsApp: (11) 91460-0243  •  contato@agzap.com.br', pageWidth / 2, 294, { align: 'center' });

      pdf.save('Proposta_IA_WhatsApp_WandersonSilveira.pdf');

      toast.success("PDF gerado com sucesso!", { duration: 3000, icon: '📄' });
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      toast.error("Erro ao gerar PDF. Tente novamente.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
        {/* Decorative Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          
          {/* Header */}
          <header className="text-center mb-10 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <FaRocket className="w-4 h-4" />
              Proposta Especial
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 leading-tight">
              Automação Inteligente
              <br />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                para WhatsApp
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
              Economize tempo e aumente a qualidade do atendimento com IA de alto desempenho
            </p>
          </header>

          {/* Main Investment Card */}
          <Card className="mb-8 overflow-hidden border-0 shadow-2xl bg-white">
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-white text-xl sm:text-2xl font-bold mb-2">
                    Investimento para Implementação
                  </h2>
                  <p className="text-slate-300 text-sm sm:text-base">
                    Sistema completo de IA no WhatsApp
                  </p>
                </div>
                <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm px-4 py-2 self-start">
                  <FaBolt className="w-3 h-3 mr-1" />
                  2-3 dias úteis
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-6 sm:p-8">
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                {/* Parcelado */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 border-2 border-slate-200 hover:border-slate-300 transition-all">
                  <div className="text-sm font-medium text-slate-500 mb-2 uppercase tracking-wide">
                    Parcelado
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl sm:text-5xl font-bold text-slate-900">R$ 2.500</span>
                  </div>
                  <p className="text-slate-600">
                    em <span className="font-semibold text-slate-900">6x sem juros</span> no cartão
                  </p>
                </div>

                {/* PIX */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-300 hover:border-emerald-400 transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0">
                    <Badge className="bg-emerald-500 text-white rounded-bl-xl rounded-tr-none px-3 py-1">
                      <MdSavings className="w-4 h-4 mr-1" />
                      Economize R$ 300
                    </Badge>
                  </div>
                  <div className="text-sm font-medium text-emerald-600 mb-2 uppercase tracking-wide">
                    À Vista no PIX
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl sm:text-5xl font-bold text-emerald-600">R$ 2.200</span>
                  </div>
                  <p className="text-emerald-700 font-medium">
                    Melhor custo-benefício!
                  </p>
                </div>
              </div>

              {/* Includes */}
              <div className="mt-8 pt-8 border-t border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <FaCheckCircle className="text-emerald-500" />
                  O que está incluído:
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { icon: FaWhatsapp, text: "Configuração para 2 números de WhatsApp" },
                    { icon: FaHeadset, text: "5 dias de suporte e acompanhamento" },
                    { icon: FaGraduationCap, text: "Treinamento completo do sistema" },
                    { icon: MdSupport, text: "Esclarecimento de todas as dúvidas" },
                    { icon: MdSpeed, text: "Implementação rápida (2-3 dias úteis)" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-emerald-600" />
                      </div>
                      <span className="text-sm sm:text-base text-slate-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Costs Card */}
          <Card className="mb-8 border-2 border-blue-100 bg-gradient-to-br from-blue-50/50 to-white shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl text-slate-900">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FaCalendarAlt className="w-6 h-6 text-blue-600" />
                </div>
                Custos Mensais / Anuais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    title: "NotificaMais", 
                    desc: "Plataforma de notificações", 
                    price: "R$ 29,90", 
                    period: "/mês",
                    icon: FaServer,
                    color: "blue"
                  },
                  { 
                    title: "VPS Hostinger", 
                    desc: "Servidor N8N (link de indicação)", 
                    price: "R$ 451,00", 
                    period: "/ano",
                    icon: FaServer,
                    color: "purple"
                  },
                  { 
                    title: "OpenAI", 
                    desc: "Inteligência Artificial", 
                    price: "$10 USD", 
                    period: " inicial",
                    note: "Recarga conforme consumo (consumo baixíssimo)",
                    icon: FaRobot,
                    color: "emerald"
                  }
                ].map((cost, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-all hover:shadow-md gap-3">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-${cost.color}-100 rounded-xl flex items-center justify-center shrink-0`}>
                        <cost.icon className={`w-6 h-6 text-${cost.color}-600`} />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{cost.title}</div>
                        <div className="text-sm text-slate-500">{cost.desc}</div>
                        {cost.note && (
                          <div className="text-xs text-emerald-600 font-medium mt-1">{cost.note}</div>
                        )}
                      </div>
                    </div>
                    <div className="text-right sm:text-left">
                      <span className="text-xl sm:text-2xl font-bold text-slate-900">{cost.price}</span>
                      <span className="text-slate-500">{cost.period}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Optional Support Card */}
          <Card className="mb-8 border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50/50 shadow-xl">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl text-slate-900">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <MdSupport className="w-6 h-6 text-amber-600" />
                  </div>
                  Suporte Opcional
                </CardTitle>
                <Badge className="bg-amber-100 text-amber-700 border border-amber-300 self-start">
                  Após os 5 dias iniciais
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-xl border-2 border-amber-200 hover:border-amber-300 transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <FaCalendarAlt className="w-5 h-5 text-amber-600" />
                    <span className="font-semibold text-slate-900">Suporte Mensal</span>
                  </div>
                  <div className="text-3xl font-bold text-amber-600">R$ 500,00<span className="text-lg text-slate-500">/mês</span></div>
                  <p className="text-sm text-slate-500 mt-2">Acompanhamento contínuo e ilimitado</p>
                </div>
                <div className="bg-white p-5 rounded-xl border-2 border-amber-200 hover:border-amber-300 transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <FaClock className="w-5 h-5 text-amber-600" />
                    <span className="font-semibold text-slate-900">Suporte Avulso</span>
                  </div>
                  <div className="text-3xl font-bold text-amber-600">R$ 150,00<span className="text-lg text-slate-500">/hora</span></div>
                  <p className="text-sm text-slate-500 mt-2">Pague apenas quando precisar</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <section className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 mb-8">
              Por que escolher essa solução?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { icon: MdSavings, title: "Economia", desc: "Reduza custos com atendimento automatizado", color: "emerald" },
                { icon: FaStar, title: "Qualidade", desc: "IA de alto desempenho e precisão", color: "blue" },
                { icon: FaClock, title: "24/7", desc: "Atendimento ininterrupto, todos os dias", color: "purple" },
                { icon: FaShieldAlt, title: "Segurança", desc: "Dados protegidos e sistema confiável", color: "amber" }
              ].map((benefit, idx) => (
                <Card key={idx} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-white">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 bg-${benefit.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <benefit.icon className={`w-8 h-8 text-${benefit.color}-600`} />
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 mb-2">{benefit.title}</h3>
                    <p className="text-slate-600 text-sm">{benefit.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA */}
          <Card className="mb-8 overflow-hidden border-0 shadow-2xl">
            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 sm:p-10 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Pronto para transformar seu atendimento?
              </h2>
              <p className="text-emerald-100 mb-6 max-w-xl mx-auto">
                Entre em contato agora e comece a automatizar seu WhatsApp em até 3 dias úteis!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://wa.me/5511914600243?text=Olá!%20Vi%20a%20proposta%20de%20automação%20de%20WhatsApp%20e%20tenho%20interesse.%20Gostaria%20de%20mais%20informações!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-emerald-600 font-bold py-4 px-8 rounded-xl hover:bg-emerald-50 transition-all hover:scale-105 shadow-lg"
                >
                  <FaWhatsapp className="w-6 h-6" />
                  Falar no WhatsApp
                </a>
                <a 
                  href="mailto:contato@agzap.com.br"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-700 text-white font-bold py-4 px-8 rounded-xl hover:bg-emerald-800 transition-all hover:scale-105"
                >
                  <FaEnvelope className="w-5 h-5" />
                  Enviar Email
                </a>
              </div>
            </div>
          </Card>

          {/* Footer */}
          <footer className="text-center py-8 border-t border-slate-200">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <FaRobot className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">Wanderson Silveira</h3>
            <p className="text-slate-500 mb-4">Especialista em Automação e Inteligência Artificial</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
              <a href="https://wa.me/5511914600243" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700">
                <FaWhatsapp className="w-4 h-4" />
                (11) 91460-0243
              </a>
              <a href="mailto:contato@agzap.com.br" className="flex items-center gap-2 text-slate-600 hover:text-slate-900">
                <FaEnvelope className="w-4 h-4" />
                contato@agzap.com.br
              </a>
            </div>
            <p className="text-slate-400 text-sm mt-6 flex items-center justify-center gap-1">
              Feito com <FaHeart className="text-red-500 w-3 h-3" /> por Wanderson Silveira
            </p>
          </footer>
        </div>

        {/* Floating Download Button */}
        <button
          onClick={handleDownloadPDF}
          disabled={isGeneratingPDF}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-gradient-to-r from-slate-800 to-slate-900 text-white px-5 sm:px-8 py-4 sm:py-5 rounded-2xl shadow-2xl hover:shadow-3xl transition-all hover:scale-105 flex items-center gap-3 font-bold disabled:opacity-70 z-50"
        >
          <FaDownload className="w-5 h-5" />
          <span className="hidden sm:inline">Baixar Proposta em PDF</span>
          <span className="sm:hidden">Baixar PDF</span>
        </button>
      </div>
    </>
  );
};

export default Index;
