import { useState } from "react";
import { 
  FaBuilding, FaWhatsapp, FaRobot, FaCheckCircle, FaCheck,
  FaEnvelope, FaPhone, FaDownload, FaStar, FaArrowRight,
  FaPlane, FaDatabase, FaCalendarAlt, FaUsers, FaChartBar,
  FaShieldAlt, FaBolt, FaBullseye, FaChartLine, FaClock,
  FaDollarSign, FaExclamationTriangle, FaEye
} from "react-icons/fa";
import { 
  MdSupportAgent, MdAutoAwesome 
} from "react-icons/md";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import toast, { Toaster } from 'react-hot-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Index = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [showPrices, setShowPrices] = useState({ completo: false, ia: false });

  const handleShowPrice = (planType: 'completo' | 'ia') => {
    setShowPrices(prev => ({ ...prev, [planType]: true }));
  };

  const handlePlanSelection = (planType: string, planName: string) => {
    setSelectedPlan(planType);
    toast.success(`Plano Selecionado! ${planName}`, {
      duration: 3000,
      position: 'top-center',
      icon: '✅',
    });
  };

  const handleDownloadClick = () => {
    if (selectedPlan) {
      setShowDownloadDialog(true);
    } else {
      // Gerar PDF diretamente quando nenhum plano estiver selecionado
      handleConfirmDownload();
    }
  };

  const handleConfirmDownload = async () => {
    setShowDownloadDialog(false);
    try {
      if (selectedPlan) {
        toast.loading("Gerando PDF... Por favor, aguarde alguns segundos.", {
          duration: 3000,
          position: 'top-center',
        });
      }

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Professional design setup
      pdf.setFont('helvetica', 'normal');

      let y = 25;
      const margin = 20;
      const pageWidth = 170;
      const cardWidth = 75;
      const cardHeight = 45;
      const col1 = margin;
      const col2 = 110;

      // Modern gradient header
      pdf.setFillColor(37, 99, 235);
      pdf.rect(0, 0, 210, 35, 'F');
      pdf.setFillColor(59, 130, 246);
      pdf.rect(0, 0, 210, 30, 'F');
      
      // Header with modern typography
      pdf.setFontSize(20);
      pdf.setTextColor(255, 255, 255);
      pdf.text('PROPOSTA COMERCIAL', 105, 15, { align: 'center' });
      pdf.setFontSize(11);
      pdf.setTextColor(226, 232, 255);
      pdf.text('Sistema Inteligente para Agência de Viagens', 105, 25, { align: 'center' });
      y += 20;

      // Selected Plan Section - Modern Card Design
      if (selectedPlan) {
        const planTitle = selectedPlan === 'completo' ? 'SISTEMA COMPLETO' : 'ATENDIMENTO IA';
        const planDesc = selectedPlan === 'completo' 
          ? 'Aplicativo Web + IA WhatsApp' 
          : 'Apenas WhatsApp com IA';
        
        // Main card with rounded corners effect
        pdf.setFillColor(255, 255, 255);
        pdf.roundedRect(margin, y, pageWidth, 50, 3, 3, 'F');
        pdf.setDrawColor(226, 232, 240);
        pdf.setLineWidth(0.5);
        pdf.roundedRect(margin, y, pageWidth, 50, 3, 3, 'S');
        
        // Plan header with gradient
        const planColor = selectedPlan === 'completo' ? [37, 99, 235] : [13, 148, 136];
        pdf.setFillColor(planColor[0], planColor[1], planColor[2]);
        pdf.roundedRect(margin + 3, y + 3, pageWidth - 6, 12, 2, 2, 'F');
        
        pdf.setFontSize(14);
        pdf.setTextColor(255, 255, 255);
        pdf.text(planTitle, margin + 8, y + 12);
        
        // Plan description
        pdf.setFontSize(10);
        pdf.setTextColor(100, 116, 139);
        pdf.text(planDesc, margin + 8, y + 22);
        
        // Investment section
        const priceBoxX = margin + pageWidth - 70;
        pdf.setFillColor(16, 185, 129);
        pdf.roundedRect(priceBoxX, y + 5, 65, 30, 2, 2, 'F');
        
        pdf.setFontSize(10);
        pdf.setTextColor(255, 255, 255);
        pdf.text('INVESTIMENTO', priceBoxX + 5, y + 15);
        
        if (selectedPlan === 'completo') {
          pdf.setFontSize(16);
          pdf.setTextColor(255, 255, 255);
          pdf.text('R$ 6.500', priceBoxX + 5, y + 25);
          pdf.setFontSize(8);
          pdf.text('PIX: R$ 5.200', priceBoxX + 5, y + 30);
        } else {
          pdf.setFontSize(16);
          pdf.setTextColor(255, 255, 255);
          pdf.text('R$ 1.500', priceBoxX + 5, y + 25);
          pdf.setFontSize(8);
          pdf.text('+ R$ 297/mês', priceBoxX + 5, y + 30);
        }
        
        y += 55;
      } else {
        // Beautiful two-column card layout
        pdf.setFontSize(16);
        pdf.setTextColor(51, 65, 85);
        pdf.text('ESCOLHA SUA SOLUÇÃO IDEAL', 105, y, { align: 'center' });
        y += 8;
        
        pdf.setFontSize(11);
        pdf.setTextColor(100, 116, 139);
        pdf.text('Selecione a opção que melhor se adapta às suas necessidades', 105, y, { align: 'center' });
        y += 20;

        // Card 1: Sistema Completo
        const card1X = margin;
        const card1W = 80;
        
        // Card shadow effect
        pdf.setFillColor(0, 0, 0, 0.1);
        pdf.roundedRect(card1X + 1, y + 1, card1W, 60, 4, 4, 'F');
        
        // Main card
        pdf.setFillColor(255, 255, 255);
        pdf.roundedRect(card1X, y, card1W, 60, 4, 4, 'F');
        pdf.setDrawColor(59, 130, 246);
        pdf.setLineWidth(2);
        pdf.roundedRect(card1X, y, card1W, 60, 4, 4, 'S');
        
        // Header gradient
        pdf.setFillColor(37, 99, 235);
        pdf.roundedRect(card1X + 2, y + 2, card1W - 4, 15, 3, 3, 'F');
        
        // Popular badge
        pdf.setFillColor(16, 185, 129);
        pdf.roundedRect(card1X + card1W - 25, y - 3, 25, 8, 2, 2, 'F');
        pdf.setFontSize(7);
        pdf.setTextColor(255, 255, 255);
        pdf.text('POPULAR', card1X + card1W - 23, y + 2);
        
        pdf.setFontSize(12);
        pdf.setTextColor(255, 255, 255);
        pdf.text('SISTEMA COMPLETO', card1X + 5, y + 12);
        
        pdf.setFontSize(9);
        pdf.setTextColor(71, 85, 105);
        pdf.text('Aplicativo Web + IA WhatsApp', card1X + 5, y + 23);
        
        // Price section
        pdf.setFontSize(20);
        pdf.setTextColor(37, 99, 235);
        pdf.text('R$ 6.500', card1X + 5, y + 35);
        pdf.setFontSize(8);
        pdf.setTextColor(100, 116, 139);
        pdf.text('PIX: R$ 5.200', card1X + 5, y + 42);
        pdf.text('10x sem juros', card1X + 5, y + 48);
        pdf.text('R$ 197,90/mês', card1X + 5, y + 54);

        // "OU" separator between plans
        const separatorX = margin + 82;
        pdf.setFillColor(245, 158, 11);
        pdf.circle(separatorX, y + 30, 12, 'F');
        pdf.setFontSize(14);
        pdf.setTextColor(255, 255, 255);
        pdf.text('OU', separatorX - 6, y + 33);

        // Card 2: Atendimento IA
        const card2X = margin + 90;
        const card2W = 80;
        
        // Card shadow effect
        pdf.setFillColor(0, 0, 0, 0.1);
        pdf.roundedRect(card2X + 1, y + 1, card2W, 60, 4, 4, 'F');
        
        // Main card
        pdf.setFillColor(255, 255, 255);
        pdf.roundedRect(card2X, y, card2W, 60, 4, 4, 'F');
        pdf.setDrawColor(13, 148, 136);
        pdf.setLineWidth(2);
        pdf.roundedRect(card2X, y, card2W, 60, 4, 4, 'S');
        
        // Header gradient
        pdf.setFillColor(13, 148, 136);
        pdf.roundedRect(card2X + 2, y + 2, card2W - 4, 15, 3, 3, 'F');
        
        pdf.setFontSize(12);
        pdf.setTextColor(255, 255, 255);
        pdf.text('ATENDIMENTO IA', card2X + 5, y + 12);
        
        pdf.setFontSize(9);
        pdf.setTextColor(71, 85, 105);
        pdf.text('Apenas WhatsApp (sem app)', card2X + 5, y + 23);
        
        // Price section
        pdf.setFontSize(20);
        pdf.setTextColor(13, 148, 136);
        pdf.text('R$ 1.500', card2X + 5, y + 35);
        pdf.setFontSize(8);
        pdf.setTextColor(100, 116, 139);
        pdf.text('Implementação única', card2X + 5, y + 42);
        pdf.text('+ R$ 297,00/mês', card2X + 5, y + 48);
        
        y += 70;
      }

      // Elegant What's Included Section
      if (selectedPlan) {
        // Single plan features in elegant card
        pdf.setFillColor(248, 250, 252);
        pdf.roundedRect(margin, y, pageWidth, 35, 3, 3, 'F');
        pdf.setDrawColor(226, 232, 240);
        pdf.setLineWidth(0.3);
        pdf.roundedRect(margin, y, pageWidth, 35, 3, 3, 'S');
        
        pdf.setFontSize(12);
        pdf.setTextColor(51, 65, 85);
        pdf.text('O QUE ESTÁ INCLUÍDO', margin + 5, y + 10);
        
        const items = selectedPlan === 'completo' ? [
          'Aplicativo Web Responsivo', 'IA integrada ao WhatsApp', 'Banco de dados seguro',
          'Sistema de login', 'Relatórios personalizados', 'Suporte pré-implementação'
        ] : [
          'IA integrada ao WhatsApp', 'Coleta automatizada de dados', 
          'Atendimento 24 horas', 'Configuração personalizada', 'Suporte pré-implementação'
        ];
        
        pdf.setFontSize(9);
        pdf.setTextColor(100, 116, 139);
        
        const itemsPerRow = 3;
        items.forEach((item, idx) => {
          const row = Math.floor(idx / itemsPerRow);
          const col = idx % itemsPerRow;
          const itemX = margin + 8 + (col * 55);
          const itemY = y + 18 + (row * 6);
          
          pdf.setTextColor(16, 185, 129);
          pdf.text('✓', itemX, itemY);
          pdf.setTextColor(71, 85, 105);
          pdf.text(item, itemX + 5, itemY);
        });
        
        y += 40;
      } else {
        // Comparison section with modern design
        pdf.setFillColor(255, 251, 235);
        pdf.roundedRect(margin, y, pageWidth, 25, 3, 3, 'F');
        pdf.setDrawColor(245, 158, 11);
        pdf.setLineWidth(0.5);
        pdf.roundedRect(margin, y, pageWidth, 25, 3, 3, 'S');
        
        pdf.setFontSize(12);
        pdf.setTextColor(180, 83, 9);
        pdf.text('PRINCIPAL DIFERENÇA', margin + 5, y + 8);
        
        pdf.setFontSize(10);
        pdf.setTextColor(120, 113, 108);
        pdf.text('• Sistema Completo: Aplicativo web + IA WhatsApp', margin + 5, y + 15);
        pdf.text('• Atendimento IA: Apenas IA WhatsApp (mais simples)', margin + 5, y + 20);
        
        y += 30;
      }

      // Features Card - organized and contained
      pdf.setFillColor(239, 246, 255);
      pdf.roundedRect(margin, y, pageWidth, 25, 3, 3, 'F');
      pdf.setDrawColor(226, 232, 240);
      pdf.setLineWidth(0.3);
      pdf.roundedRect(margin, y, pageWidth, 25, 3, 3, 'S');
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.setTextColor(37, 99, 235);
      pdf.text('RECURSOS GERAIS', margin + 8, y + 10);
      
      // Features in organized rows
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.setTextColor(71, 85, 105);
      
      const features = ['IA WhatsApp 24h', 'Coleta automática', 'Relatórios inteligentes'];
      features.forEach((feature, idx) => {
        const featureX = margin + 10 + (idx * 55);
        if (featureX + 50 <= margin + pageWidth - 10) { // Check if fits within bounds
          pdf.setTextColor(16, 185, 129);
          pdf.text('✓', featureX, y + 18);
          pdf.setTextColor(71, 85, 105);
          pdf.text(feature, featureX + 5, y + 18);
        }
      });
      
      // Second row
      const moreFeatures = ['Suporte pré-implementação', 'Sistema seguro'];
      moreFeatures.forEach((feature, idx) => {
        const featureX = margin + 10 + (idx * 55);
        if (featureX + 50 <= margin + pageWidth - 10) {
          pdf.setTextColor(16, 185, 129);
          pdf.text('✓', featureX, y + 22);
          pdf.setTextColor(71, 85, 105);
          pdf.text(feature, featureX + 5, y + 22);
        }
      });
      
      y += 30;

      // Benefits Card - organized and contained
      pdf.setFillColor(236, 253, 245);
      pdf.roundedRect(margin, y, pageWidth, 22, 3, 3, 'F');
      pdf.setDrawColor(226, 232, 240);
      pdf.setLineWidth(0.3);
      pdf.roundedRect(margin, y, pageWidth, 22, 3, 3, 'S');
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.setTextColor(16, 185, 129);
      pdf.text('PRINCIPAIS BENEFÍCIOS', margin + 8, y + 10);
      
      // Benefits in organized layout
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.setTextColor(71, 85, 105);
      
      const benefits = [
        'Atendimento 10x mais rápido',
        'Zero erros de digitação', 
        'Economia de tempo diária'
      ];
      
      benefits.forEach((benefit, idx) => {
        const benefitX = margin + 10 + (idx * 55);
        if (benefitX + 50 <= margin + pageWidth - 10) { // Check bounds
          pdf.setTextColor(16, 185, 129);
          pdf.text('✓', benefitX, y + 18);
          pdf.setTextColor(71, 85, 105);
          pdf.text(benefit, benefitX + 5, y + 18);
        }
      });
      
      y += 27;

      // Contact Section with background
      pdf.setDrawColor(37, 99, 235);
      pdf.setLineWidth(1);
      pdf.line(margin, y, 210 - margin, y);
      y += 8;

      pdf.setFillColor(245, 250, 255);
      pdf.rect(col1, y - 2, 180, 12, 'F');

      pdf.setFontSize(11);
      pdf.setTextColor(37, 99, 235);
      pdf.setFont(undefined, 'bold');
      pdf.text('CONTATO', col1, y + 2);
      pdf.setFont(undefined, 'normal');
      y += 8;

      // Modern Contact Section
      pdf.setDrawColor(226, 232, 240);
      pdf.setLineWidth(0.5);
      pdf.line(margin, y, margin + pageWidth, y);
      y += 8;

      // Contact card
      pdf.setFillColor(248, 250, 252);
      pdf.roundedRect(margin, y, pageWidth, 20, 3, 3, 'F');
      pdf.setDrawColor(226, 232, 240);
      pdf.setLineWidth(0.3);
      pdf.roundedRect(margin, y, pageWidth, 20, 3, 3, 'S');
      
      pdf.setFontSize(12);
      pdf.setTextColor(51, 65, 85);
      pdf.text('ENTRE EM CONTATO', margin + 5, y + 8);
      
      pdf.setFontSize(10);
      pdf.setTextColor(100, 116, 139);
      pdf.text('contato@agzap.com.br', margin + 5, y + 15);
      pdf.text('WhatsApp: (11) 91460-0243', margin + 90, y + 15);
      
      y += 25;
      
      // Professional footer
      pdf.setFillColor(37, 99, 235);
      pdf.roundedRect(margin, y, pageWidth, 12, 2, 2, 'F');
      
      pdf.setFontSize(11);
      pdf.setTextColor(255, 255, 255);
      pdf.text('Wanderson Silveira - Desenvolvedor de Soluções Digitais', 105, y + 8, { align: 'center' });

      const planName = selectedPlan === 'completo' ? 'Sistema_Completo' : 
                       selectedPlan === 'ia' ? 'Atendimento_IA' : 
                       'Proposta';
      pdf.save(`Proposta_${planName}_AgZap.pdf`);

      if (selectedPlan) {
        toast.success("PDF gerado com sucesso! O download deve iniciar automaticamente.", {
          duration: 4000,
          position: 'top-center',
          icon: '📄',
        });
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      if (selectedPlan) {
        toast.error("Erro ao gerar PDF. Tente novamente em alguns instantes.", {
          duration: 4000,
          position: 'top-center',
          icon: '❌',
        });
      }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-40 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div id="proposal-content" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 relative z-10">
          {/* Header */}
          <header className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12 animate-in fade-in slide-in-from-bottom duration-1000">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight tracking-tight px-4">
              Sistema Inteligente para<br className="hidden sm:block" />
              <span className="sm:inline"> </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent animate-gradient">
                Agência de Viagens
              </span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Transforme seu atendimento com automação inteligente via WhatsApp e aplicativo web completo
            </p>
          </header>

          {/* Pricing Cards */}
          <section className="mb-8 sm:mb-12">
            <div className="text-center mb-6 sm:mb-8 px-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-gray-900">Escolha a Opção Ideal</h2>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-4">
                Duas soluções pensadas para diferentes necessidades do seu negócio
              </p>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 max-w-3xl mx-auto">
                <p className="text-sm font-medium text-blue-800 mb-2">
                  💡 <strong>Como funciona:</strong>
                </p>
                <p className="text-xs sm:text-sm text-blue-700 leading-relaxed">
                  Clique em qualquer plano para selecioná-lo e visualizar automaticamente suas vantagens e entregáveis específicos na seção "O Que Você Receberá" logo abaixo.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row items-stretch gap-6 sm:gap-8 max-w-6xl mx-auto">
              {/* Sistema Completo - COM APLICATIVO */}
              <Card 
                onClick={() => handlePlanSelection('completo', 'Sistema Completo (Aplicativo Web + IA WhatsApp)')}
                className={`flex-1 max-w-md relative overflow-hidden border-2 bg-gradient-to-br from-primary/5 to-secondary/5 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] animate-in fade-in slide-in-from-left duration-700 cursor-pointer ${
                  selectedPlan === 'completo' ? 'border-orange-500 ring-4 ring-orange-200 shadow-2xl transform scale-105' : 'border-primary hover:border-blue-300'
                }`} 
                style={{ boxShadow: 'var(--shadow-featured)' }}
              >
                <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-primary via-purple-500 to-secondary animate-gradient"></div>
                <div className="absolute top-4 right-4 animate-bounce">
                  <Badge className="bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg hover:shadow-xl transition-all">
                    <FaStar className="w-3 h-3 mr-1" />
                    Mais Completo
                  </Badge>
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none"></div>
                <CardHeader className="pt-6 sm:pt-8 pb-4 sm:pb-6 pointer-events-none">
                  <div className="flex items-start sm:items-center gap-3 mb-3">
                    <div className="p-2.5 sm:p-3 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl shrink-0">
                      <MdAutoAwesome className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="min-w-0">
                      <CardTitle className="text-lg sm:text-xl md:text-2xl text-gray-900">Sistema Completo</CardTitle>
                      <CardDescription className="text-xs sm:text-sm mt-1 text-gray-600">COM Aplicativo Web + IA WhatsApp</CardDescription>
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                    <p className="text-xs sm:text-sm font-medium text-blue-700">✓ Inclui Aplicativo Profissional</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 pb-6 pointer-events-none">
                  <div className="space-y-4">
                    {!showPrices.completo ? (
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 text-center">
                        <div className="space-y-4">
                          <div className="text-2xl font-bold text-blue-600 mb-2">💰 Investimento</div>
                          <p className="text-gray-600 mb-4">Conheça primeiro todas as vantagens do sistema completo</p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShowPrice('completo');
                            }}
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl pointer-events-auto"
                          >
                            <FaEye className="w-4 h-4 mr-2 inline" />
                            Ver Preços
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="bg-white rounded-xl p-4 sm:p-5 border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-lg group">
                          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3 mb-2">
                            <span className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform">R$ 6.500</span>
                            <span className="text-sm sm:text-base text-gray-500 line-through">R$ 10.900</span>
                          </div>
                          <p className="text-sm sm:text-base text-gray-600">
                            Em até <span className="font-semibold text-gray-900">10x sem juros</span> no cartão
                          </p>
                        </div>
                        
                        <div className="bg-gradient-to-r from-emerald-100 to-emerald-50 p-4 sm:p-5 rounded-xl border-2 border-emerald-300 hover:border-emerald-500 transition-all hover:shadow-lg hover:scale-[1.02] group relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-200/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <p className="text-lg sm:text-xl font-bold text-emerald-700 mb-1 relative z-10">
                            💰 PIX: R$ 5.200
                          </p>
                          <p className="text-xs sm:text-sm text-emerald-700 relative z-10">
                            Economize R$ 1.300 pagando à vista
                          </p>
                        </div>
                        
                        <div className="bg-gray-100 p-3 sm:p-4 rounded-lg border border-gray-200">
                          <p className="text-sm sm:text-base text-gray-600">
                            Mensalidade: <span className="text-lg sm:text-xl font-bold text-gray-900">R$ 197,90</span>/mês
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="space-y-3 pt-4 border-t-2 border-gray-200">
                    <p className="font-bold text-sm sm:text-base text-gray-900 mb-3 sm:mb-4">O que está incluído:</p>
                    {[
                      { text: "Aplicativo Web Completo", highlight: true },
                      { text: "Sistema de IA no WhatsApp", highlight: true },
                      { text: "Banco de dados integrado", highlight: false },
                      { text: "Relatórios e dashboards", highlight: false },
                      { text: "Sistema de login seguro", highlight: false },
                      { text: "Suporte pós-implantação", highlight: false }
                    ].map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 sm:gap-3">
                        <div className="mt-0.5 shrink-0">
                          <FaCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                        </div>
                        <span className={`text-xs sm:text-sm ${feature.highlight ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 pointer-events-auto">
                    <a 
                      href="https://wa.me/5511914600243?text=Olá!%20Tenho%20interesse%20no%20*Sistema%20Completo*%20(Aplicativo%20Web%20%2B%20IA%20WhatsApp)%20por%20R$%206.500%20ou%20R$%205.200%20no%20PIX.%20Gostaria%20de%20mais%20informações!"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all hover:scale-105">
                        <FaWhatsapp className="w-5 h-5" />
                        Contratar via WhatsApp
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Separador OU */}
              <div className="flex items-center justify-center lg:flex-col lg:mx-4">
                <div className="relative">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-pulse">
                    <span className="text-white font-bold text-lg lg:text-xl">OU</span>
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full opacity-20 animate-ping"></div>
                </div>
                <div className="hidden lg:block w-px h-8 bg-gradient-to-b from-orange-300 to-orange-500 mt-2"></div>
                <div className="lg:hidden h-px w-8 bg-gradient-to-r from-orange-300 to-orange-500 mx-2"></div>
              </div>

              {/* Sistema de Atendimento - SEM APLICATIVO */}
              <Card 
                onClick={() => handlePlanSelection('ia', 'Atendimento IA (Apenas WhatsApp)')}
                className={`flex-1 max-w-md relative overflow-hidden border-2 hover:border-teal-300 transition-all duration-500 hover:shadow-xl hover:scale-[1.02] animate-in fade-in slide-in-from-right duration-700 cursor-pointer ${
                  selectedPlan === 'ia' ? 'border-orange-500 ring-4 ring-orange-200 shadow-2xl transform scale-105' : 'border-gray-200 hover:border-teal-300'
                }`} 
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <CardHeader className="pt-6 sm:pt-8 pb-4 sm:pb-6 pointer-events-none">
                  <div className="flex items-start sm:items-center gap-3 mb-3">
                    <div className="p-2.5 sm:p-3 bg-gradient-to-br from-teal-100 to-teal-50 rounded-xl border border-teal-200 shrink-0">
                      <FaRobot className="w-5 h-5 sm:w-6 sm:h-6 text-teal-700" />
                    </div>
                    <div className="min-w-0">
                      <CardTitle className="text-lg sm:text-xl md:text-2xl text-gray-900">Atendimento IA</CardTitle>
                      <CardDescription className="text-xs sm:text-sm mt-1 text-gray-600">SEM Aplicativo - Apenas WhatsApp</CardDescription>
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 mt-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">✗ Não inclui aplicativo web</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 pb-6 pointer-events-none">
                  <div className="space-y-4">
                    {!showPrices.ia ? (
                      <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-6 border-2 border-teal-200 text-center">
                        <div className="space-y-4">
                          <div className="text-2xl font-bold text-teal-600 mb-2">💰 Investimento</div>
                          <p className="text-gray-600 mb-4">Veja primeiro todos os benefícios do atendimento IA</p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShowPrice('ia');
                            }}
                            className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-teal-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl pointer-events-auto"
                          >
                            <FaEye className="w-4 h-4 mr-2 inline" />
                            Ver Preços
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="bg-white rounded-xl p-4 sm:p-5 border-2 border-gray-200 hover:border-gray-300 transition-all hover:shadow-lg group">
                          <div className="flex items-baseline gap-3 mb-2">
                            <span className="text-2xl sm:text-3xl font-bold text-gray-900 group-hover:scale-105 transition-transform">R$ 1.500</span>
                          </div>
                          <p className="text-sm sm:text-base text-gray-600">
                            Implementação única
                          </p>
                        </div>
                        
                        <div className="bg-gray-100 p-3 sm:p-4 rounded-lg border border-gray-200">
                          <p className="text-sm sm:text-base text-gray-600">
                            Mensalidade: <span className="text-lg sm:text-xl font-bold text-gray-900">R$ 297,00</span>/mês
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="space-y-3 pt-4 border-t-2 border-gray-200">
                    <p className="font-bold text-sm sm:text-base text-gray-900 mb-3 sm:mb-4">O que está incluído:</p>
                    {[
                      "IA integrada ao WhatsApp",
                      "Coleta automatizada de dados",
                      "Atendimento 24 horas por dia",
                      "Configuração personalizada"
                    ].map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 sm:gap-3">
                        <div className="mt-0.5 shrink-0">
                          <FaCheck className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
                        </div>
                        <span className="text-xs sm:text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                    
                    <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-amber-50 border border-amber-300 rounded-lg">
                      <p className="text-xs sm:text-sm text-gray-800 font-medium">
                        ⚠️ Não inclui: Aplicativo web, relatórios e banco de dados
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-4 pointer-events-auto">
                    <a 
                      href="https://wa.me/5511914600243?text=Olá!%20Tenho%20interesse%20no%20plano%20*Atendimento%20IA*%20(Apenas%20WhatsApp)%20por%20R$%201.500%20de%20implementação.%20Gostaria%20de%20mais%20informações!"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all hover:scale-105">
                        <FaWhatsapp className="w-5 h-5" />
                        Contratar via WhatsApp
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Deliverables */}
          <section className="mb-8 sm:mb-12 animate-in fade-in duration-1000">
            <div className="text-center mb-6 sm:mb-8 px-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 tracking-tight text-gray-900">O Que Você Receberá</h2>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base">Tudo pronto para começar a usar imediatamente</p>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 border-2 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 max-w-4xl mx-auto hover:border-blue-300 transition-all duration-500 hover:shadow-2xl" style={{ boxShadow: 'var(--shadow-card)' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {(selectedPlan === 'completo' ? [
                  { item: "Aplicativo web responsivo", description: "Funciona perfeitamente em celular, tablet e computador" },
                  { item: "IA integrada ao WhatsApp", description: "Atendimento automático configurado e pronto" },
                  { item: "Banco de dados seguro", description: "Todas as informações protegidas e organizadas" },
                  { item: "Sistema de login", description: "Controle total de quem acessa o sistema" },
                  { item: "Relatórios personalizados", description: "Visualize dados do jeito que você precisa" },
                  { item: "Suporte pré-implementação", description: "Ajuda na implantação e treinamento da equipe" }
                ] : selectedPlan === 'ia' ? [
                  { item: "IA integrada ao WhatsApp", description: "Atendimento automático configurado e pronto" },
                  { item: "Coleta automatizada de dados", description: "Sistema coleta informações dos clientes automaticamente" },
                  { item: "Atendimento 24 horas por dia", description: "Responde clientes a qualquer hora, sem parar" },
                  { item: "Configuração personalizada", description: "IA ajustada para o perfil da sua agência" },
                  { item: "Suporte pré-implementação", description: "Ajuda na implantação e treinamento da equipe" }
                ] : [
                  { item: "Aplicativo web responsivo", description: "Funciona perfeitamente em celular, tablet e computador" },
                  { item: "IA integrada ao WhatsApp", description: "Atendimento automático configurado e pronto" },
                  { item: "Banco de dados seguro", description: "Todas as informações protegidas e organizadas" },
                  { item: "Sistema de login", description: "Controle total de quem acessa o sistema" },
                  { item: "Relatórios personalizados", description: "Visualize dados do jeito que você precisa" },
                  { item: "Suporte pré-implementação", description: "Ajuda na implantação e treinamento da equipe" }
                ]).map((deliverable, i) => (
                  <div 
                    key={i} 
                    className="flex items-start gap-3 sm:gap-4 bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl border-2 border-gray-200 hover:border-emerald-400 transition-all duration-300 group hover:shadow-lg hover:-translate-y-1 cursor-pointer animate-in fade-in slide-in-from-left"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="shrink-0 mt-0.5 sm:mt-1">
                      <div className="bg-emerald-100 p-2 sm:p-3 rounded-lg sm:rounded-xl group-hover:bg-emerald-200 transition-all duration-300 group-hover:scale-110">
                        <FaCheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-700" />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors">{deliverable.item}</h3>
                      <p className="text-xs text-gray-600 leading-relaxed">{deliverable.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="mb-8 sm:mb-12 animate-in fade-in duration-1000">
            <div className="text-center mb-6 sm:mb-8 px-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 tracking-tight text-gray-900">Funcionalidades Poderosas</h2>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
                Tudo que você precisa para transformar o atendimento da sua agência de viagens
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                { icon: FaDatabase, title: "Registro Completo", description: "Nome, telefone, e-mail e todas as informações do cliente perfeitamente organizadas", color: "from-blue-500/10 to-blue-600/10" },
                { icon: FaWhatsapp, title: "WhatsApp com IA", description: "Atendimento inteligente 24/7 que coleta dados automaticamente", color: "from-green-500/10 to-green-600/10" },
                { icon: FaCalendarAlt, title: "Gestão de Viagens", description: "Controle completo de destinos, datas e número de passageiros", color: "from-purple-500/10 to-purple-600/10" },
                { icon: FaUsers, title: "Perfil Detalhado", description: "Registre adultos, crianças e suas idades para cada reserva", color: "from-orange-500/10 to-orange-600/10" },
                { icon: FaChartBar, title: "Relatórios Inteligentes", description: "Filtragem por período, destino e perfil com visualização clara", color: "from-cyan-500/10 to-cyan-600/10" },
                { icon: FaShieldAlt, title: "100% Seguro", description: "Sistema de login protegido e controle total de acesso aos dados", color: "from-red-500/10 to-red-600/10" }
              ].map((feature, i) => (
                <div
                  key={i}
                  className="group bg-white border-2 border-gray-200 rounded-xl p-5 sm:p-6 hover:border-blue-300 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 sm:hover:-translate-y-3 cursor-pointer animate-in fade-in slide-in-from-bottom"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className={`bg-gradient-to-br ${feature.color} w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                    <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-blue-700" />
                  </div>
                  <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits */}
          <section className="mb-8 sm:mb-12 animate-in fade-in duration-1000">
            <div className="bg-gradient-to-br from-blue-50 via-teal-50 to-blue-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 border-2 border-blue-200 hover:border-blue-300 transition-all duration-500 relative overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/30 to-transparent animate-gradient"></div>
              <div className="text-center mb-6 sm:mb-8 relative z-10 px-4">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 tracking-tight text-gray-900">Por Que Investir Neste Sistema?</h2>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base">Resultados reais para o seu negócio</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto relative z-10">
                {[
                  { icon: FaBolt, title: "Atendimento 10x Mais Rápido", description: "Responda todos os clientes instantaneamente, sem espera, com automação inteligente 24 horas por dia", color: "from-yellow-500 to-orange-500" },
                  { icon: FaBullseye, title: "Zero Erros de Digitação", description: "A IA coleta os dados com precisão absoluta, eliminando retrabalho e garantindo informações sempre corretas", color: "from-blue-500 to-cyan-500" },
                  { icon: FaChartLine, title: "Decisões Baseadas em Dados", description: "Relatórios claros e visuais mostram exatamente o que está funcionando no seu negócio", color: "from-green-500 to-emerald-500" },
                  { icon: FaClock, title: "Economize Horas Todo Dia", description: "Reduza em até 80% o tempo gasto com atendimento manual e foque no que realmente importa", color: "from-purple-500 to-pink-500" }
                ].map((benefit, i) => (
                  <div 
                    key={i} 
                    className="flex gap-4 sm:gap-5 bg-white p-5 sm:p-7 rounded-xl sm:rounded-2xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 group cursor-pointer animate-in fade-in slide-in-from-bottom"
                    style={{ animationDelay: `${i * 150}ms` }}
                  >
                    <div className="shrink-0">
                      <div className={`bg-gradient-to-br ${benefit.color} p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                        <benefit.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm sm:text-base md:text-lg mb-2 sm:mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">{benefit.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center space-y-4 sm:space-y-6 py-8 sm:py-12 border-t-2 border-gray-200 animate-in fade-in duration-1000">
            <div className="space-y-4 sm:space-y-6 max-w-3xl mx-auto px-4">
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Obrigado pela oportunidade de apresentar esta proposta. Estamos à disposição para esclarecer qualquer dúvida e ajustar conforme suas necessidades.
              </p>
              <div className="glass-effect rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-2 border-blue-200 hover:border-blue-400 transition-all duration-500 hover:shadow-2xl group">
                <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-2 sm:mb-3">Atenciosamente,</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-2 sm:mb-3 group-hover:scale-105 transition-transform animate-gradient">
                  Wanderson Silveira
                </p>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">Desenvolvedor de Soluções Digitais</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6 sm:pt-8 px-4">
              <a href="mailto:contato@agzap.com.br" className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-all duration-300 group hover:scale-105">
                <div className="bg-blue-100 p-2.5 sm:p-3 rounded-lg sm:rounded-xl group-hover:bg-blue-200 transition-all duration-300 group-hover:scale-110 shadow-lg">
                  <FaEnvelope className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <span className="font-semibold text-xs sm:text-sm md:text-base break-all">contato@agzap.com.br</span>
              </a>
              <a href="tel:+5511914600243" className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-all duration-300 group hover:scale-105">
                <div className="bg-blue-100 p-2.5 sm:p-3 rounded-lg sm:rounded-xl group-hover:bg-blue-200 transition-all duration-300 group-hover:scale-110 shadow-lg">
                  <FaPhone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <span className="font-semibold text-xs sm:text-sm md:text-base">(11) 91460-0243</span>
              </a>
            </div>
          </footer>
        </div>
      </div>
      
      <div id="download-section" className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-50 animate-in slide-in-from-bottom duration-500">
        <AlertDialog open={showDownloadDialog && selectedPlan !== null} onOpenChange={setShowDownloadDialog}>
          <Button
            onClick={handleDownloadClick}
            size="default"
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 hover:opacity-90 text-white shadow-2xl gap-2 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-bold hover:scale-105 sm:hover:scale-110 transition-all duration-300 rounded-lg sm:rounded-xl animate-glow group"
          >
            <FaDownload className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce" />
            <span className="hidden sm:inline">Baixar Proposta em PDF</span>
            <span className="sm:hidden">Baixar PDF</span>
          </Button>
          {selectedPlan && (
            <AlertDialogTrigger asChild>
              <div style={{ display: 'none' }} />
            </AlertDialogTrigger>
          )}
          <AlertDialogContent className="max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-full">
                  <FaDownload className="w-5 h-5 text-orange-600" />
                </div>
                Baixar Proposta em PDF
              </AlertDialogTitle>
              <AlertDialogDescription className="space-y-3">
                {selectedPlan ? (
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="font-medium text-gray-900 mb-2">
                      📄 Você está baixando a proposta:
                    </p>
                    <p className="text-orange-700 font-bold">
                      {selectedPlan === 'completo' 
                        ? '🟠 Sistema Completo (Aplicativo Web + IA WhatsApp)'
                        : '🟠 Atendimento IA (Apenas WhatsApp)'}
                    </p>
                  </div>
                ) : (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="font-medium text-gray-900 mb-2">
                      📄 Proposta Geral
                    </p>
                    <p className="text-blue-700">
                      Nenhum plano específico selecionado
                    </p>
                  </div>
                )}
                <p className="text-sm text-gray-600">
                  {selectedPlan 
                    ? 'Para alterar, basta selecionar outro card antes de baixar.'
                    : 'Selecione um plano nos cards acima para uma proposta personalizada.'}
                </p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleConfirmDownload}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Baixar PDF
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      
      {/* Toaster component for react-hot-toast */}
      <Toaster 
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
          },
          success: {
            duration: 3000,
            style: {
              background: '#10b981',
              color: '#fff',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: '#ef4444',
              color: '#fff',
            },
          },
          loading: {
            style: {
              background: '#3b82f6',
              color: '#fff',
            },
          },
        }}
      />
    </>
  );
};

export default Index;
