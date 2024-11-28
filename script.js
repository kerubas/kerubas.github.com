document.addEventListener('DOMContentLoaded', () => {
    // Animação de scroll suave para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animação de entrada para elementos quando ficam visíveis
    const observador = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
            }
        });
    }, {
        threshold: 0.1
    });

    // Elementos para animar
    const elementosParaAnimar = document.querySelectorAll(
        '.lider-card, .proposta-card, .hero-content, .contato-container'
    );
    
    elementosParaAnimar.forEach(elemento => {
        observador.observe(elemento);
    });

    // Header transparente que muda com scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 
                'rgba(0, 31, 63, 0.95)';
        } else {
            header.style.background = 
                'linear-gradient(to bottom, rgba(0, 31, 63, 0.95), rgba(0, 31, 63, 0.8))';
        }
    });

    // Dados das propostas
    const propostasDetalhadas = {
        interclasse: {
            titulo: "Evento Esportivo Escolar",
            conteudo: `
                <p>Um campeonato que reúne todas as turmas, promovendo integração, 
                espírito esportivo e diversão.</p>
                <h4>Detalhes:</h4>
                <ul>
                    <li>Modalidades: Futebol, Vôlei, Basquete e Handebol</li>
                    <li>Times mistos e inclusivos</li>
                    <li>Premiações e certificados</li>
                    <li>Atividades paralelas: jogos de tabuleiro e xadrez</li>
                </ul>`
        },
        feira: {
            titulo: "Feira de Talentos e Profissões",
            conteudo: `
                <p>Evento para apresentação de habilidades e descoberta de 
                carreiras profissionais.</p>
                <h4>Detalhes:</h4>
                <ul>
                    <li>Apresentações artísticas diversas</li>
                    <li>Oficinas práticas: culinária, artesanato, programação e fotografia</li>
                    <li>Palestras com ex-alunos</li>
                    <li>Espaço "Descubra sua Carreira"</li>
                </ul>
                <p>Impacto: Incentiva o autoconhecimento, a valorização de talentos 
                individuais e a descoberta de novas oportunidades.</p>`
        },
        voz: {
            titulo: "Debate 'Voz dos Alunos'",
            conteudo: `
                <p>Um espaço regular para discutir ideias, problemas e soluções 
                para a escola.</p>
                <h4>Detalhes:</h4>
                <ul>
                    <li>Reuniões mensais com representantes de cada turma</li>
                    <li>Pauta aberta para sugestões de melhorias</li>
                    <li>Registro oficial das demandas pela Laura</li>
                    <li>Transparência nos resultados e ações realizadas</li>
                </ul>
                <p>Impacto: Dá aos alunos mais voz e participação ativa na escola, 
                promovendo mudanças significativas.</p>`
        },
        "escola-limpa": {
            titulo: "Escola Limpa, Consciência Verde",
            conteudo: `
                <p>Campanha de sustentabilidade e cuidados com o ambiente escolar.</p>
                <h4>Detalhes:</h4>
                <ul>
                    <li>Mutirão mensal para limpeza e organização</li>
                    <li>Coleta seletiva com lixeiras coloridas no pátio</li>
                    <li>Oficina de reciclagem e reaproveitamento</li>
                    <li>Competição "A turma mais ecológica" com premiação anual</li>
                </ul>
                <p>Impacto: Ensina responsabilidade ambiental e melhora a 
                convivência no espaço escolar.</p>`
        },
        palestras: {
            titulo: "Ciclo de Palestras 'Empodere-se'",
            conteudo: `
                <p>Série de palestras inspiradoras com profissionais e ex-alunos 
                para orientar os estudantes.</p>
                <h4>Detalhes:</h4>
                <ul>
                    <li>Temas: Carreiras, desenvolvimento pessoal e empreendedorismo</li>
                    <li>Palestrantes especiais incluindo Gabriel e Laura</li>
                    <li>Sessões interativas de perguntas e respostas</li>
                    <li>Networking com profissionais experientes</li>
                </ul>
                <p>Impacto: Promove inspiração e orientação prática para os alunos 
                planejarem seus futuros.</p>`
        },
        diversidade: {
            titulo: "Dia da Diversidade Cultural",
            conteudo: `
                <p>Uma celebração das diversas culturas e origens dos alunos.</p>
                <h4>Detalhes:</h4>
                <ul>
                    <li>Apresentações culturais (danças típicas, músicas regionais)</li>
                    <li>Barracas com comidas típicas de diferentes regiões</li>
                    <li>Mural de histórias e tradições familiares</li>
                    <li>Atividades interculturais e exposições</li>
                </ul>
                <p>Impacto: Reforça a igualdade, o respeito e a valorização das 
                diferenças culturais.</p>`
        },
        "aluno-professor": {
            titulo: "Aluno e Professor Juntos",
            conteudo: `
                <p>Fortalecer a relação aluno-professor através de atividades 
                colaborativas.</p>
                <h4>Detalhes:</h4>
                <ul>
                    <li>"Professor por um dia": Alunos compartilham experiências</li>
                    <li>Dinâmicas e jogos integradores</li>
                    <li>Mural de reconhecimento para professores destaque</li>
                    <li>Eventos de integração e colaboração</li>
                </ul>
                <p>Impacto: Promove um ambiente de respeito e cooperação entre 
                alunos e professores, melhorando o processo de aprendizagem.</p>`
        }
    };

    // Funcionalidade do Modal
    const modalContainer = document.getElementById('modal-container');
    const modalTitulo = document.querySelector('.modal-titulo');
    const modalConteudo = document.querySelector('.modal-conteudo');
    
    // Abrir Modal
    document.querySelectorAll('.btn-saiba-mais').forEach(botao => {
        botao.addEventListener('click', () => {
            const proposta = propostasDetalhadas[botao.dataset.proposta];
            modalTitulo.textContent = proposta.titulo;
            modalConteudo.innerHTML = proposta.conteudo;
            modalContainer.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Fechar Modal
    document.querySelector('.modal-fechar').addEventListener('click', () => {
        modalContainer.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Fechar Modal clicando fora
    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
            modalContainer.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}); 