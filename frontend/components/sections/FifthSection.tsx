"use client";

/**
 * Seção de Cases (parallax de produtos).
 * - Usa HeroParallax para filas animadas de cards; alimentado por lista estática.
 * - Mantém layout estável (altura via parallax interno) e linka CTA para contato.
 */
import { HeroParallax } from "../ui/HeroParallax";

export default function FifthSection() {
    return (
        <section
            id="cases"
            className="relative overflow-hidden bg-transparent -mt-64"
        >
            <HeroParallax products={projects} />
        </section>
    );
}

// Projetos da Inteli Júnior - Cases de Sucesso
const projects = [
    {
        title: "BTG Pactual - Dashboard Financeiro",
        link: "#contato",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        description: "Dashboard interativo para visualização de dados financeiros em tempo real, otimizando a tomada de decisão.",
        renderLink: true,
    },
    {
        title: "Meta - Analytics Platform",
        link: "#contato",
        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        description: "Plataforma de análise de dados para campanhas de marketing, com relatórios automatizados e insights preditivos.",
        renderLink: false,
    },
    {
        title: "BCG - Business Intelligence",
        link: "#contato",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&sat=-100",
        description: "Sistema de BI para consultoria estratégica, integrando múltiplas fontes de dados para análises complexas.",
        renderLink: true,
    },
    {
        title: "Dell - Sistema de Gestão",
        link: "#contato",
        thumbnail: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop",
        description: "ERP customizado para gestão de inventário e logística, reduzindo custos operacionais em 15%.",
        renderLink: true,
    },
    {
        title: "Banco Pan - Plataforma Digital",
        link: "#contato",
        thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
        description: "Reformulação da experiência do usuário no banking digital, focada em acessibilidade e performance.",
        renderLink: false,
    },
    {
        title: "CPTM - Sistema de Monitoramento",
        link: "#contato",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&hue=180",
        description: "Painel de controle para monitoramento de tráfego e incidentes em tempo real.",
        renderLink: true,
    },
    {
        title: "Uber - Analytics Dashboard",
        link: "#contato",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&hue=270",
        description: "Ferramenta interna para análise de métricas de performance de motoristas e parceiros.",
        renderLink: false,
    },
    {
        title: "Ambev - Sistema de Dados",
        link: "#contato",
        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&hue=120",
        description: "Plataforma de dados para otimização da cadeia de suprimentos e previsão de demanda.",
        renderLink: true,
    },
    {
        title: "Google - ML Platform",
        link: "#contato",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&hue=90",
        description: "Interface para gerenciamento de modelos de Machine Learning e visualização de resultados.",
        renderLink: false,
    },
    {
        title: "Bank of America - FinTech Solution",
        link: "#contato",
        thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop&hue=200",
        description: "Solução fintech para automação de processos bancários e segurança de transações.",
        renderLink: true,
    },
    {
        title: "Sírio Libanês - Health Tech",
        link: "#contato",
        thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
        description: "Aplicativo para gestão de pacientes e agendamento de consultas com integração de prontuário.",
        renderLink: true,
    },
    {
        title: "Startup Tech - MVP Development",
        link: "#contato",
        thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
        description: "Desenvolvimento rápido de MVP para validação de mercado e captação de investimento.",
        renderLink: true,
    },
    {
        title: "E-commerce - Full Stack Solution",
        link: "#contato",
        thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop&hue=300",
        description: "Plataforma de e-commerce completa com gestão de estoque, pagamentos e logística.",
        renderLink: false,
    },
    {
        title: "EdTech Platform - Learning System",
        link: "#contato",
        thumbnail: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop",
        description: "Sistema de gestão de aprendizado (LMS) com recursos de gamificação e acompanhamento.",
        renderLink: true,
    },
    {
        title: "IoT Dashboard - Real-time Analytics",
        link: "#contato",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&hue=45",
        description: "Dashboard para monitoramento de dispositivos IoT industriais em tempo real.",
        renderLink: true,
    },
];