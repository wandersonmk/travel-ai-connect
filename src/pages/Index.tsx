import { useState } from "react";
import { 
  FaWhatsapp, FaRobot, FaCheckCircle, FaCheck,
  FaEnvelope, FaPhone, FaDownload, FaStar, FaRocket,
  FaShieldAlt, FaBolt, FaClock, FaHeadset, FaServer,
  FaImage, FaDatabase, FaBrain, FaCalendarAlt
} from "react-icons/fa";
import { 
  MdAutoAwesome, MdSupport, MdSpeed, MdSavings
} from "react-icons/md";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import toast, { Toaster } from 'react-hot-toast';
import jsPDF from "jspdf";

const Index = () => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    toast.loading("Gerando PDF...", { duration: 1500 });

    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = 210;
      const margin = 12;
      const contentWidth = pageWidth - (margin * 2);
      let y = 0;

      // Header
      pdf.setFillColor(15, 23, 42);
      pdf.rect(0, 0, pageWidth, 32, 'F');
      pdf.setFillColor(34, 197, 94);
      pdf.rect(0, 32, pageWidth, 2, 'F');

      pdf.setFontSize(16);
      pdf.setTextColor(255, 255, 255);
      pdf.text('PROPOSTA COMERCIAL', pageWidth / 2, 14, { align: 'center' });
      pdf.setFontSize(10);
      pdf.setTextColor(148, 163, 184);
      pdf.text('Reconhecimento de Imagem via IA para WhatsApp', pageWidth / 2, 23, { align: 'center' });

      y = 40;

      // Escopo do Serviço
      pdf.setFontSize(10);
      pdf.setTextColor(15, 23, 42);
      pdf.setFont(undefined, 'bold');
      pdf.text('ESCOPO DO SERVIÇO', margin, y);
      pdf.setFont(undefined, 'normal');
      y += 5;

      pdf.setFontSize(8);
      pdf.setTextColor(71, 85, 105);
      const escopo = [
        'Integração para reconhecimento de imagem via API do ChatGuru com n8n.',
        '1. Paciente envia imagem pelo WhatsApp',
        '2. IA processa e identifica o plano de saúde',
        '3. Consulta na base de dados da clínica',
        '4. Resposta automática ao paciente'
      ];
      escopo.forEach((line, idx) => {
        pdf.text(line, margin, y + (idx * 4));
      });

      y += 24;

      // Investment Box
      pdf.setFillColor(240, 253, 244);
      pdf.roundedRect(margin, y, contentWidth, 32, 3, 3, 'F');
      pdf.setDrawColor(34, 197, 94);
      pdf.setLineWidth(0.8);
      pdf.roundedRect(margin, y, contentWidth, 32, 3, 3, 'S');

      pdf.setFontSize(10);
      pdf.setTextColor(22, 101, 52);
      pdf.setFont(undefined, 'bold');
      pdf.text('INVESTIMENTO', margin + 8, y + 8);
      pdf.setFont(undefined, 'normal');

      // Prices side by side
      pdf.setFontSize(9);
      pdf.setTextColor(15, 23, 42);
      pdf.text('Parcelado:', margin + 8, y + 16);
      pdf.setFontSize(14);
      pdf.text('R$ 2.800,00', margin + 8, y + 23);
      pdf.setFontSize(8);
      pdf.setTextColor(100, 116, 139);
      pdf.text('até 10x sem juros', margin + 8, y + 28);

      // PIX
      pdf.setFontSize(9);
      pdf.setTextColor(22, 101, 52);
      pdf.text('PIX:', margin + 70, y + 16);
      pdf.setFontSize(14);
      pdf.setTextColor(34, 197, 94);
      pdf.text('R$ 2.500,00', margin + 70, y + 23);
      pdf.setFontSize(8);
      pdf.text('Economize R$ 300!', margin + 70, y + 28);

      // Badge
      pdf.setFillColor(34, 197, 94);
      pdf.roundedRect(margin + 130, y + 8, 40, 10, 2, 2, 'F');
      pdf.setFontSize(7);
      pdf.setTextColor(255, 255, 255);
      pdf.text('3-4 dias úteis', margin + 136, y + 14);

      y += 38;

      // Infraestrutura VPS
      pdf.setFillColor(239, 246, 255);
      pdf.roundedRect(margin, y, contentWidth, 28, 3, 3, 'F');
      pdf.setDrawColor(59, 130, 246);
      pdf.setLineWidth(0.5);
      pdf.roundedRect(margin, y, contentWidth, 28, 3, 3, 'S');

      pdf.setFontSize(9);
      pdf.setTextColor(30, 64, 175);
      pdf.setFont(undefined, 'bold');
      pdf.text('INFRAESTRUTURA (VPS / n8n)', margin + 8, y + 7);
      pdf.setFont(undefined, 'normal');

      pdf.setFontSize(7);
      const infra = [
        'Opção 1: VPS própria - R$ 450/ano ou R$ 720 (2 anos) - Hostinger',
        'Opção 2: Servidor n8n Agzap - R$ 149,90/mês (pronto e monitorado)'
      ];

      infra.forEach((item, idx) => {
        pdf.setTextColor(59, 130, 246);
        pdf.text('•', margin + 6, y + 13 + (idx * 5));
        pdf.setTextColor(51, 65, 85);
        pdf.text(item, margin + 10, y + 13 + (idx * 5));
      });

      y += 32;

      // Suporte Opcional
      pdf.setFillColor(254, 249, 195);
      pdf.roundedRect(margin, y, contentWidth, 18, 3, 3, 'F');
      pdf.setDrawColor(234, 179, 8);
      pdf.setLineWidth(0.5);
      pdf.roundedRect(margin, y, contentWidth, 18, 3, 3, 'S');

      pdf.setFontSize(9);
      pdf.setTextColor(133, 77, 14);
      pdf.setFont(undefined, 'bold');
      pdf.text('SUPORTE OPCIONAL', margin + 8, y + 7);
      pdf.setFont(undefined, 'normal');

      pdf.setFontSize(8);
      pdf.setTextColor(113, 63, 18);
      pdf.text('Mensal: R$ 600,00/mês', margin + 8, y + 14);
      pdf.text('Sob demanda: R$ 180,00/hora', margin + 90, y + 14);

      y += 24;

      // Fluxo de funcionamento
      pdf.setFontSize(9);
      pdf.setTextColor(15, 23, 42);
      pdf.setFont(undefined, 'bold');
      pdf.text('FLUXO DE FUNCIONAMENTO:', margin, y);
      pdf.setFont(undefined, 'normal');
      y += 5;

      const fluxo = [
        '1. Paciente envia imagem do cartão/documento',
        '2. IA identifica o plano de saúde automaticamente',
        '3. Sistema consulta base de dados da clínica',
        '4. Resposta enviada via WhatsApp em segundos'
      ];

      pdf.setFontSize(8);
      fluxo.forEach((item, idx) => {
        pdf.setTextColor(34, 197, 94);
        pdf.text('✓', margin + 3, y + (idx * 4.5));
        pdf.setTextColor(71, 85, 105);
        pdf.text(item, margin + 9, y + (idx * 4.5));
      });

      y += 22;

      // Validade
      pdf.setFillColor(254, 226, 226);
      pdf.roundedRect(margin, y, contentWidth, 12, 2, 2, 'F');
      pdf.setFontSize(8);
      pdf.setTextColor(153, 27, 27);
      pdf.text('⚠ Proposta válida por 2 dias a contar da data de envio', pageWidth / 2, y + 7, { align: 'center' });

      y += 18;

      // CTA Box
      pdf.setFillColor(34, 197, 94);
      pdf.roundedRect(margin, y, contentWidth, 16, 3, 3, 'F');
      pdf.setFontSize(10);
      pdf.setTextColor(255, 255, 255);
      pdf.text('Pronto para automatizar seu atendimento?', pageWidth / 2, y + 7, { align: 'center' });
      pdf.setFontSize(8);
      pdf.text('Entre em contato e comece em até 4 dias úteis!', pageWidth / 2, y + 12, { align: 'center' });

      // Footer
      pdf.setFillColor(15, 23, 42);
      pdf.rect(0, 270, pageWidth, 27, 'F');

      pdf.setFontSize(11);
      pdf.setTextColor(255, 255, 255);
      pdf.text('Wanderson Silveira', pageWidth / 2, 278, { align: 'center' });
      
      pdf.setFontSize(8);
      pdf.setTextColor(148, 163, 184);
      pdf.text('Agzap Systems - Automação e Inteligência Artificial', pageWidth / 2, 284, { align: 'center' });
      
      pdf.setTextColor(34, 197, 94);
      pdf.text('WhatsApp: (11) 91460-0243  •  contato@agzap.com.br', pageWidth / 2, 290, { align: 'center' });

      pdf.save('Proposta_Reconhecimento_Imagem_IA.pdf');

      toast.success("PDF gerado!", { duration: 2000, icon: '📄' });
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      toast.error("Erro ao gerar PDF.");
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
              <FaBrain className="w-3 h-3" />
              Proposta Comercial
            </div>
            
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Reconhecimento de Imagem
              <span className="block bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                via IA para WhatsApp
              </span>
            </h1>
            
            <p className="text-sm text-slate-600">
              Identificação automática de planos de saúde com Inteligência Artificial
            </p>
          </header>

          {/* Escopo do Serviço */}
          <Card className="mb-4 border border-slate-200 bg-white shadow-md">
            <CardContent className="p-4">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <FaRobot className="w-4 h-4 text-emerald-600" />
                Escopo do Serviço
              </h3>
              <p className="text-xs text-slate-600 mb-3">
                Integração para reconhecimento de imagem via API do ChatGuru, utilizando o n8n como orquestrador do fluxo.
              </p>
              <div className="space-y-2">
                {[
                  { icon: FaImage, text: "Paciente envia imagem pelo WhatsApp" },
                  { icon: FaBrain, text: "IA processa e identifica o plano de saúde" },
                  { icon: FaDatabase, text: "Consulta na base de dados da clínica" },
                  { icon: FaWhatsapp, text: "Resposta automática ao paciente" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-slate-50 rounded-lg p-2">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                      <span className="text-xs font-bold">{idx + 1}</span>
                    </div>
                    <item.icon className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-xs text-slate-700">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Incluso no plano */}
              <div className="mt-4 bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                <h4 className="text-xs font-bold text-emerald-800 mb-2 flex items-center gap-1">
                  <FaCheckCircle className="w-3 h-3" />
                  Incluso no plano:
                </h4>
                <p className="text-xs text-emerald-700">
                  <strong>3 dias de suporte, acompanhamento e treinamento</strong> sobre a integração realizada.
                </p>
                <p className="text-[10px] text-slate-500 mt-1">
                  * Após este período, será necessário contratar um plano de suporte.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Investment Card Compacto */}
          <Card className="mb-4 overflow-hidden border-0 shadow-lg bg-white">
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-white text-base font-bold">Investimento</h2>
                  <p className="text-slate-300 text-xs">Implementação completa</p>
                </div>
                <Badge className="bg-emerald-500 text-white text-xs px-2 py-1">
                  <FaClock className="w-2.5 h-2.5 mr-1" />
                  3-4 dias
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-4">
              {/* Preços lado a lado */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                  <div className="text-xs text-slate-500 uppercase mb-1">Parcelado</div>
                  <div className="text-xl font-bold text-slate-900">R$ 2.800</div>
                  <p className="text-xs text-slate-600">até 10x sem juros</p>
                </div>

                <div className="bg-emerald-50 rounded-xl p-3 border-2 border-emerald-300 relative">
                  <Badge className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] px-1.5 py-0.5">
                    -R$300
                  </Badge>
                  <div className="text-xs text-emerald-600 uppercase mb-1">PIX</div>
                  <div className="text-xl font-bold text-emerald-600">R$ 2.500</div>
                  <p className="text-xs text-emerald-700">Melhor opção!</p>
                </div>
              </div>

              {/* Prazo */}
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                <p className="text-xs text-slate-600">
                  <span className="font-semibold text-blue-700">Prazo:</span> 3 a 4 dias úteis, podendo ser concluído antes, desde que não haja imprevistos ou limitações da API.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Infraestrutura VPS / n8n */}
          <Card className="mb-4 border border-blue-100 bg-blue-50/30 shadow-md">
            <CardContent className="p-4">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <FaServer className="w-4 h-4 text-blue-600" />
                Infraestrutura (VPS / n8n)
              </h3>
              <p className="text-xs text-slate-600 mb-3">
                Escolha como deseja hospedar o n8n para sua automação:
              </p>
              
              <div className="space-y-3">
                {/* VPS Própria */}
                <div className="bg-white rounded-lg p-3 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-900">🖥️ Tenha seu próprio n8n</span>
                    <Badge className="bg-slate-100 text-slate-600 text-[10px]">Você gerencia</Badge>
                  </div>
                  <p className="text-[10px] text-slate-600 mb-2">Assine uma VPS na Hostinger e tenha controle total do seu servidor n8n.</p>
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <div className="text-sm font-bold text-blue-600">R$ 450</div>
                      <div className="text-[10px] text-slate-500">/ano</div>
                    </div>
                    <div className="text-slate-400 text-xs">ou</div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-blue-600">R$ 720</div>
                      <div className="text-[10px] text-slate-500">plano 2 anos</div>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2">* Pago diretamente à Hostinger (com link de desconto)</p>
                </div>

                {/* Servidor Agzap */}
                <div className="bg-emerald-50 rounded-lg p-3 border-2 border-emerald-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-900">🚀 Assine conosco</span>
                    <Badge className="bg-emerald-500 text-white text-[10px]">Recomendado</Badge>
                  </div>
                  <p className="text-[10px] text-slate-600 mb-2">Deixe a infraestrutura com a Agzap. Servidor pronto, monitorado e sempre atualizado.</p>
                  <div className="text-lg font-bold text-emerald-600">R$ 149,90<span className="text-xs font-normal text-slate-500">/mês</span></div>
                  <p className="text-[10px] text-emerald-700 mt-1">✓ Sem preocupação com manutenção ou atualizações do n8n</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Suporte Opcional */}
          <Card className="mb-4 border border-amber-200 bg-amber-50/50 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <MdSupport className="w-4 h-4 text-amber-600" />
                  Suporte Opcional
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-3 border border-amber-200 text-center">
                  <div className="text-lg font-bold text-amber-600">R$ 600</div>
                  <div className="text-[10px] text-slate-600">/mês contínuo</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-amber-200 text-center">
                  <div className="text-lg font-bold text-amber-600">R$ 180</div>
                  <div className="text-[10px] text-slate-600">/hora sob demanda</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Validade */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-center">
            <p className="text-xs text-red-700 font-medium">
              ⚠ Esta proposta é válida por <strong>2 dias</strong> a contar da data de envio.
            </p>
          </div>

          {/* CTA Compacto */}
          <Card className="mb-4 overflow-hidden border-0 shadow-lg">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-center">
              <h2 className="text-base font-bold text-white mb-2">
                Pronto para automatizar seu atendimento?
              </h2>
              <div className="flex gap-2 justify-center">
                <a 
                  href="https://wa.me/5511914600243?text=Olá!%20Vi%20a%20proposta%20de%20reconhecimento%20de%20imagem%20e%20tenho%20interesse!"
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
                <p className="text-[10px] text-slate-500">Agzap Systems - Automação e IA</p>
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

        {/* Floating Download Button */}
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
