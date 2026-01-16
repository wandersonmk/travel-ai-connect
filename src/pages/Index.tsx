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
        <div className="max-w-2xl mx-auto px-4 py-6">
          
          {/* Header Compacto */}
          <header className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium mb-3">
              <FaRocket className="w-3 h-3" />
              Proposta Especial
            </div>
            
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Automação Inteligente
              <span className="block bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                para WhatsApp
              </span>
            </h1>
            
            <p className="text-sm text-slate-600">
              Economize tempo e aumente a qualidade do atendimento com IA
            </p>
          </header>

          {/* Investment Card Compacto */}
          <Card className="mb-4 overflow-hidden border-0 shadow-lg bg-white">
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-white text-base font-bold">Investimento</h2>
                  <p className="text-slate-300 text-xs">Sistema completo de IA</p>
                </div>
                <Badge className="bg-emerald-500 text-white text-xs px-2 py-1">
                  <FaBolt className="w-2.5 h-2.5 mr-1" />
                  2-3 dias
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-4">
              {/* Preços lado a lado */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                  <div className="text-xs text-slate-500 uppercase mb-1">Parcelado</div>
                  <div className="text-xl font-bold text-slate-900">R$ 2.500</div>
                  <p className="text-xs text-slate-600">6x sem juros</p>
                </div>

                <div className="bg-emerald-50 rounded-xl p-3 border-2 border-emerald-300 relative">
                  <Badge className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] px-1.5 py-0.5">
                    -R$300
                  </Badge>
                  <div className="text-xs text-emerald-600 uppercase mb-1">PIX</div>
                  <div className="text-xl font-bold text-emerald-600">R$ 2.200</div>
                  <p className="text-xs text-emerald-700">Melhor opção!</p>
                </div>
              </div>

              {/* Incluído - Lista compacta */}
              <div className="border-t border-slate-100 pt-3">
                <h3 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1">
                  <FaCheckCircle className="text-emerald-500 w-3 h-3" />
                  Incluído:
                </h3>
                <div className="grid grid-cols-1 gap-1.5 text-xs">
                  {[
                    "Configuração para 2 WhatsApp",
                    "5 dias de suporte",
                    "Treinamento completo",
                    "Implementação rápida"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-700">
                      <FaCheck className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Custos Mensais - Compacto */}
          <Card className="mb-4 border border-blue-100 bg-blue-50/30 shadow-md">
            <CardContent className="p-4">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <FaCalendarAlt className="w-4 h-4 text-blue-600" />
                Custos Mensais / Anuais
              </h3>
              <div className="space-y-2">
                {[
                  { name: "NotificaMais", price: "R$ 29,90/mês" },
                  { name: "VPS Hostinger (N8N)", price: "R$ 451,00/ano" },
                  { name: "OpenAI", price: "$10 USD inicial", note: "consumo baixíssimo" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white rounded-lg p-2.5 border border-slate-100">
                    <span className="text-xs text-slate-700">{item.name}</span>
                    <div className="text-right">
                      <span className="text-xs font-semibold text-slate-900">{item.price}</span>
                      {item.note && <div className="text-[10px] text-emerald-600">{item.note}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Suporte Opcional - Compacto */}
          <Card className="mb-4 border border-amber-200 bg-amber-50/50 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <MdSupport className="w-4 h-4 text-amber-600" />
                  Suporte Opcional
                </h3>
                <Badge className="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5">
                  Após 5 dias
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-3 border border-amber-200 text-center">
                  <div className="text-lg font-bold text-amber-600">R$ 500</div>
                  <div className="text-[10px] text-slate-600">/mês contínuo</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-amber-200 text-center">
                  <div className="text-lg font-bold text-amber-600">R$ 150</div>
                  <div className="text-[10px] text-slate-600">/hora avulso</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefícios - Grid 2x2 compacto */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { icon: MdSavings, title: "Economia", color: "bg-emerald-100 text-emerald-600" },
              { icon: FaStar, title: "Qualidade", color: "bg-blue-100 text-blue-600" },
              { icon: FaClock, title: "24/7", color: "bg-purple-100 text-purple-600" },
              { icon: FaShieldAlt, title: "Segurança", color: "bg-amber-100 text-amber-600" }
            ].map((b, idx) => (
              <div key={idx} className="bg-white rounded-xl p-3 shadow-sm border border-slate-100 flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${b.color}`}>
                  <b.icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-slate-900">{b.title}</span>
              </div>
            ))}
          </div>

          {/* CTA Compacto */}
          <Card className="mb-4 overflow-hidden border-0 shadow-lg">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-center">
              <h2 className="text-base font-bold text-white mb-2">
                Pronto para transformar seu atendimento?
              </h2>
              <div className="flex gap-2 justify-center">
                <a 
                  href="https://wa.me/5511914600243?text=Olá!%20Vi%20a%20proposta%20de%20automação%20e%20tenho%20interesse!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-white text-emerald-600 font-bold py-2 px-4 rounded-lg text-sm hover:bg-emerald-50 transition-all"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  WhatsApp
                </a>
                <a 
                  href="mailto:contato@agzap.com.br"
                  className="inline-flex items-center gap-1.5 bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg text-sm hover:bg-emerald-800 transition-all"
                >
                  <FaEnvelope className="w-4 h-4" />
                  Email
                </a>
              </div>
            </div>
          </Card>

          {/* Footer Compacto */}
          <footer className="text-center py-4 border-t border-slate-200">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <FaRobot className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-bold text-slate-900">Wanderson Silveira</h3>
                <p className="text-[10px] text-slate-500">Especialista em Automação e IA</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 text-xs">
              <a href="https://wa.me/5511914600243" className="text-emerald-600 flex items-center gap-1">
                <FaWhatsapp className="w-3 h-3" />
                (11) 91460-0243
              </a>
              <a href="mailto:contato@agzap.com.br" className="text-slate-600 flex items-center gap-1">
                <FaEnvelope className="w-3 h-3" />
                contato@agzap.com.br
              </a>
            </div>
          </footer>
        </div>

        {/* Floating Download Button - Compacto */}
        <button
          onClick={handleDownloadPDF}
          disabled={isGeneratingPDF}
          className="fixed bottom-4 right-4 bg-gradient-to-r from-slate-800 to-slate-900 text-white px-4 py-3 rounded-xl shadow-xl hover:scale-105 transition-all flex items-center gap-2 text-sm font-bold disabled:opacity-70 z-50"
        >
          <FaDownload className="w-4 h-4" />
          <span className="hidden sm:inline">Baixar PDF</span>
        </button>
      </div>
    </>
  );
};

export default Index;
