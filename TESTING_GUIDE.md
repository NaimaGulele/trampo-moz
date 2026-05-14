# Guia de Testes - TrampoMoz

## 📱 Testes Mobile-First

### Responsividade
- [ ] Testar em smartphone (iPhone 12, Samsung Galaxy S21)
- [ ] Testar em tablet (iPad, Samsung Galaxy Tab)
- [ ] Verificar que não há scroll horizontal em nenhuma resolução
- [ ] Validar que touch targets têm mínimo 44x44px
- [ ] Testar orientações portrait e landscape

### Navegação Mobile
- [ ] Hamburger menu abre/fecha corretamente
- [ ] Menu mobile é dismissível ao clicar num link
- [ ] Navbar fica sticky ao scrollar
- [ ] Botões têm espaçamento adequado para toque

### Teclado
- [ ] Inputs aumentam para mínimo 16px (previne zoom no iOS)
- [ ] Tab navigation funciona em todos os campos
- [ ] Enter submit funciona em formulários
- [ ] Campos de número aceitam MZN corretamente

---

## 🇲🇿 Testes Contexto Moçambique

### Linguagem Portuguesa
- [ ] Todo o conteúdo está em português claro
- [ ] Cidades mencionadas: Maputo, Matola, Beira
- [ ] Moeda MZN usada corretamente
- [ ] Formato de data em português

### Velocidade de Conexão
- [ ] Testar em 3G (velocidade simulada)
- [ ] Verificar tamanho das imagens
- [ ] Assets carregam rapidamente
- [ ] Sem dependências externas pesadas

### Localização
- [ ] Links de contato com +258 (código Moçambique)
- [ ] Referências a cidades/províncias moçambicanas
- [ ] Contexto culturalmente apropriado

---

## ✅ Testes de Funcionalidade

### Páginas Principais
- [ ] Home carrega sem erros
- [ ] Navbar renderiza corretamente
- [ ] Footer aparece em todas as páginas
- [ ] Todos os links funcionam

### Formulários
- [ ] Login valida email corretamente
- [ ] SignUp requer senha mínimo 6 caracteres
- [ ] SignUp valida confirmação de senha
- [ ] Post Job valida salário como número
- [ ] Mensagens de erro aparecem em português
- [ ] Botões de submit desabilitam durante submit

### Busca
- [ ] Campo de busca filtra por título
- [ ] Campo de busca filtra por localidade
- [ ] Mensagem "nenhuma vaga" apareça quando apropriado

### Navegação
- [ ] Todos os links internos funcionam
- [ ] Logo volta para home
- [ ] Breadcrumb "Voltar aos Empregos" funciona

---

## ♿ Testes de Acessibilidade

### Cores e Contraste
- [ ] Verificar contraste WCAG AA em todo texto
- [ ] Botões têm cores suficientemente diferentes
- [ ] Hover states são claramente visíveis
- [ ] Não há informação codificada apenas por cor

### Navegação por Teclado
- [ ] Tab funciona em todos os elementos interativos
- [ ] Focus outline é visível
- [ ] Ordem de tab é lógica
- [ ] Pode-se submeter formulários via teclado

### Screen Reader
- [ ] Imagens têm alt text apropriado
- [ ] Labels estão associadas a inputs
- [ ] Buttons têm aria-labels quando necessário
- [ ] Headings estão em ordem hierárquica (h1→h2→h3)

### Redução de Movimento
- [ ] Animações respeitam prefers-reduced-motion
- [ ] Usuários com motion sensitivity conseguem usar o app

---

## 🎨 Testes de Design

### Consistência Visual
- [ ] Cores são consistentes (#0070f3, #10b981, #f5f7fb)
- [ ] Tipografia é consistente (Arial)
- [ ] Espaçamento é uniforme
- [ ] Bordas arredondadas são 6px/8px

### Carregamento
- [ ] Layouts não "saltam" enquanto carregam
- [ ] Sem flickering de elementos
- [ ] Estados de loading são claros
- [ ] Sem layout shift inesperado

---

## 📝 Testes de Conteúdo

### Exatidão
- [ ] Nomes de cidades/empresas estão corretos
- [ ] Informações são relevantes para Moçambique
- [ ] Não há typos em português
- [ ] Formatação de MZN está correta

### Ausência de Placeholders
- [ ] Nenhum "lorem ipsum"
- [ ] Nenhum "TODO" ou "FIXME" no código visível
- [ ] Mensagens de erro são reais

---

## 🔒 Testes de Segurança

### Validação
- [ ] Inputs validam tipos corretamente
- [ ] Email deve conter @
- [ ] Senha mínimo 6 caracteres
- [ ] Salário deve ser positivo

### XSS Prevention
- [ ] Nenhum código user-input renderizado diretamente
- [ ] Formulários têm proteção CSRF
- [ ] Sem console errors relacionados a segurança

---

## 📊 Checklist Final

### Desktop
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Mobile
- [ ] iOS Safari (iPhone 12, iPhone SE)
- [ ] Android Chrome (Samsung S21, Pixel)
- [ ] iOS Chrome
- [ ] Samsung Internet

### Tablets
- [ ] iPad (landscape e portrait)
- [ ] Android tablet

### Velocidades
- [ ] 5G (simulado)
- [ ] 4G (simulado)
- [ ] 3G (simulado)

---

## 🚀 Performance Checklist

- [ ] Lighthouse score > 90
- [ ] Primeiro contentful paint < 2s
- [ ] Time to interactive < 3s
- [ ] Cumulative Layout Shift < 0.1

---

## 📸 Testes em Dispositivos Reais

**Recomendado:**
1. iPhone 12 (iOS)
2. Samsung Galaxy S21 (Android)
3. iPad Air (Tablet)

**Testar especificamente:**
- [ ] Zoom funciona
- [ ] Rotação de tela funciona
- [ ] Toque em links/botões funciona
- [ ] Teclado não cobre inputs importante
- [ ] App funciona offline (PWA)

---

## ✨ Boas Práticas Validadas

- [ ] Sem console errors/warnings
- [ ] Sem broken images/links
- [ ] Sem flash of unstyled content
- [ ] PWA manifest válido
- [ ] Robots.txt presente
- [ ] Favicons carregam
- [ ] Meta tags corretas

---

**Última Atualização:** 2024
**Responsável:** Equipe TrampoMoz
