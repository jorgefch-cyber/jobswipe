/* ===========================================================
   Generador de CV adaptado por vacante — JobSwipe
   Uso:  node cv.js perfil-vacante.json
   El JSON define QUÉ se reordena y QUÉ se enfatiza.
   NUNCA inventa habilidades: solo reordena y reencuadra lo real.
   =========================================================== */
const H = require('./cv_helpers.js');
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle,
  LevelFormat, convertInchesToTwip, ExternalHyperlink,
  NAVY, DARK, GREY, name, contact, small, sectionTitle, job, bullet, plain, kv, note
} = H;
const fs = require('fs');

/* ---------- INVENTARIO REAL DE HABILIDADES ----------
   Esto es la única fuente. Adaptar = reordenar y elegir de aquí.
   Si una vacante pide algo que NO está en esta lista, NO se agrega.  */
const HAB = {
  datos: {
    'SQL': ['sql', 'queries', 'consultas'],
    'Advanced Excel (Power Query, VBA & Macros)': ['excel', 'power query', 'vba', 'macros', 'spreadsheet', 'hoja de calculo'],
    'Google Sheets': ['google sheets', 'sheets'],
    'Data Modeling': ['data model', 'modelado', 'modeling'],
    'Reporting Automation': ['reporting', 'reportes', 'automation', 'automatizacion', 'dashboards'],
    'Tableau': ['tableau'],
    'Power BI': ['power bi', 'powerbi', 'bi tools'],
    'Python': ['python'],
    'Database Schema Design': ['database', 'schema', 'base de datos']
  },
  marketing: {
    'CRM & Lifecycle Marketing': ['crm', 'lifecycle', 'ciclo de vida', 'retention', 'retencion', 'churn'],
    'Retention': ['retention', 'retencion', 'reactivacion', 'loyalty'],
    'Meta Ads Manager': ['meta', 'facebook', 'instagram', 'paid social', 'paid media', 'ads'],
    'Audience Segmentation': ['segmentation', 'segmentacion', 'audiences', 'audiencias'],
    'A/B Testing': ['a/b', 'ab test', 'testing', 'experiment'],
    'Campaign Performance Analysis': ['campaign', 'campana', 'performance', 'roas', 'cac', 'cpa', 'funnel', 'embudo'],
    'Lead Generation': ['lead', 'acquisition', 'adquisicion', 'demand gen']
  },
  core: {
    'Team Leadership': ['team', 'equipo', 'leadership', 'lead', 'manage'],
    'Budget Ownership': ['budget', 'presupuesto', 'inversion', 'spend'],
    'Stakeholder Management': ['stakeholder', 'cross-functional', 'cross funcional', 'partners', 'ejecutivo', 'c-level'],
    'Data-Driven Decision Making': ['data-driven', 'insight', 'analytics', 'analisis'],
    'Process Automation': ['process', 'proceso', 'workflow', 'automation', 'operations', 'operaciones'],
    'Operations Management': ['operations', 'operaciones', 'coordination', 'coordinacion', 'project', 'proyecto']
  }
};
const HERR = 'Jira, Asana, ClickUp';

/* ordena las claves de un grupo poniendo primero las que la vacante menciona */
function ordenar(grupo, texto) {
  const t = (texto || '').toLowerCase();
  const puntua = k => (HAB[grupo][k] || []).reduce((n, kw) => n + (t.includes(kw) ? 1 : 0), 0);
  return Object.keys(HAB[grupo]).sort((a, b) => puntua(b) - puntua(a));
}

/* ---------- bullets reales por empleo ---------- */
const BULLETS = {
  uber: [
    ['CRM & Lifecycle Marketing', 'Owned regional in-app, push and email campaigns for portfolio partners and end consumers, driving a 50% increase in active commercial participation.', ['crm','lifecycle','email','push','campaign','retention','marketing','ciclo']],
    ['Process Automation', 'Built a custom Excel VBA/macro communication system that bypassed platform restrictions and digitized account management for 1,500+ regional partners.', ['automation','process','excel','vba','operations','workflow','proceso']],
    ['Analytics & Stakeholder Support', 'Core analytical resource for 4 Account Managers and 1 Regional Lead; wrote SQL queries against the CRM to turn raw tracking data into commercial strategy.', ['sql','analytics','stakeholder','insight','reporting','data','analisis']]
  ],
  pick24: [
    ['Paid Acquisition', 'Own paid campaigns across Meta (Facebook and Instagram Ads) on a ~MXN 60K monthly budget, managing audience segmentation and allocation to generate qualified leads.', ['meta','paid','ads','acquisition','budget','segmentation','lead','presupuesto']],
    ['Digital Infrastructure', 'Co-developed and deployed the company’s web infrastructure with a technical partner, then led a structured handover to the internal IT department.', ['web','infrastructure','technical','product','integration']],
    ['Brand & Content', 'Produce creative assets and direct the brand’s visual identity across digital channels to grow engagement and acquisition.', ['brand','content','creative','social','engagement','marca']]
  ],
  kuvik: [
    ['Client Solutions', 'Design and deliver custom web platforms and apps for clients — multi-stage e-commerce catalogs, lightweight ERP systems, structured service platforms — and structure the development-stage proposals behind them.', ['client','solution','b2b','saas','ecommerce','product','proposal','account']],
    ['Technical Structuring', 'Define software architecture, UI components and database relationship schemas so information flows correctly across each build.', ['technical','architecture','database','schema','integration','api']]
  ],
  pick19: [
    ['Consultative Sales', 'Managed the full customer journey and transaction lifecycle for used-vehicle inventory, using consultative profiling to maximize transaction value.', ['sales','ventas','customer','consultative','journey','account','negotiation']],
    ['Market Intelligence & Valuation', 'Led vehicle appraisal and trade-in, evaluating market pricing data to acquire inventory at optimal price points; built operational protocols for onboarding and delivery that cut closing times.', ['market','pricing','intelligence','analysis','operations','protocol','onboarding']]
  ]
};

function ordenarBullets(lista, texto) {
  const t = (texto || '').toLowerCase();
  return lista.slice().sort((a, b) => {
    const p = x => x[2].reduce((n, kw) => n + (t.includes(kw) ? 1 : 0), 0);
    return p(b) - p(a);
  });
}

/* =================== construcción =================== */
function construir(cfg) {
  const texto = [cfg.role, (cfg.requisitos || []).join(' '), (cfg.resp || []).join(' ')].join(' ');
  const titulo = cfg.titulo || 'Marketing Analytics & Business Intelligence';
  const resumen = cfg.resumen || 'Marketing and Business Intelligence professional with dual bachelor’s degrees from Tec de Monterrey, working where marketing strategy meets data. At Uber, ran regional CRM lifecycle campaigns and automated account management for 1,500+ partners, driving a 50% increase in active commercial participation. Has led teams and owned six-figure MXN budgets. Spanish, English (C2), Italian (C1).';

  const doc = new Document({
    numbering: { config: [{ reference: 'b', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: convertInchesToTwip(0.22), hanging: convertInchesToTwip(0.15) } } } }] }] },
    sections: [{
      properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 540, bottom: 340, left: 840, right: 840 } } },
      children: [
        name('JORGE FABRE CHALLA'),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 30 },
          children: [new TextRun({ text: titulo, size: 21, font: 'Calibri', color: NAVY, bold: true })] }),
        contact([
          small('Mexico City, Mexico'), small('  |  '), small('+52 55 6413 2767'), small('  |  '),
          new ExternalHyperlink({ children: [small('jorgefabre134@gmail.com', { color: NAVY })], link: 'mailto:jorgefabre134@gmail.com' }),
          small('  |  '),
          new ExternalHyperlink({ children: [small('linkedin.com/in/jorgefch', { color: NAVY })], link: 'https://www.linkedin.com/in/jorgefch/' })
        ]),
        contact([
          small('Mexican & French (EU) citizen', { bold: true, color: NAVY }),
          small('  ·  Full work authorization in Mexico and the European Union  ·  ESTA holder')
        ]),

        sectionTitle('Professional Summary'),
        plain(resumen),

        sectionTitle('Professional Experience'),
        ...job('UBER', '2025 – 2026', cfg.tituloUber || 'CRM & Regional Operations Coordinator'),
        ...ordenarBullets(BULLETS.uber, texto).map(b => bullet(b[0], b[1])),

        ...job('PICK UPLANDIA', '2024 – Present', cfg.tituloPick || 'Marketing Operations & Performance Specialist'),
        note('Held part-time on weekends during 2025 – 2026, concurrent with the Uber role.'),
        ...ordenarBullets(BULLETS.pick24, texto).map(b => bullet(b[0], b[1])),

        ...job('KUVIK', '2025 – Present', 'Business Development & Web Solutions'),
        note('Part-time, weekends.'),
        ...ordenarBullets(BULLETS.kuvik, texto).map(b => bullet(b[0], b[1])),

        ...job('PICK UPLANDIA', '2019 – 2023', 'Sales & Business Development Associate'),
        ...ordenarBullets(BULLETS.pick19, texto).map(b => bullet(b[0], b[1])),

        sectionTitle('Education'),
        new Paragraph({ spacing: { before: 60, after: 0 }, tabStops: [{ type: 'right', position: 10080 }],
          children: [ new TextRun({ text: 'TEC DE MONTERREY', bold: true, size: 21, font: 'Calibri', color: DARK }),
                      new TextRun({ text: '\tMexico City', size: 19, font: 'Calibri', color: GREY, bold: true }) ] }),
        new Paragraph({ spacing: { before: 20, after: 30 }, tabStops: [{ type: 'right', position: 10080 }],
          children: [ new TextRun({ text: 'B.A. Business Intelligence', italics: true, size: 20, font: 'Calibri', color: NAVY }),
                      new TextRun({ text: ' — Specialization in AI & Data Science', size: 19, font: 'Calibri', color: DARK }),
                      new TextRun({ text: '\t2019 – 2025', size: 19, font: 'Calibri', color: GREY, bold: true }) ] }),
        new Paragraph({ spacing: { after: 30 }, tabStops: [{ type: 'right', position: 10080 }],
          children: [ new TextRun({ text: 'B.A. Marketing', italics: true, size: 20, font: 'Calibri', color: NAVY }),
                      new TextRun({ text: '\t2019 – 2023', size: 19, font: 'Calibri', color: GREY, bold: true }) ] }),
        plain('Dual degree completed concurrently.  ·  Vice President, Student Executive Committee (2021).', { italics: true, color: GREY, size: 18 }),

        sectionTitle('Skills & Competencies'),
        kv('Languages', 'Spanish (Native), English (C2 – Full Professional Proficiency), Italian (C1)'),
        kv('Data & Tech', ordenar('datos', texto).join(', ')),
        kv('Marketing', ordenar('marketing', texto).join(', ')),
        kv('Core', ordenar('core', texto).join(', ') + '  ·  ' + HERR),

        sectionTitle('Competition Awards'),
        kv('1st Place', 'Krispy Kreme Omnichannel Challenge (2022)  ·  Coppel Inc. State Innovation Challenge (2019).   2nd Place: Puma Marketing & Sales Challenge (2022)  ·  FEMSA Coca-Cola Golden Batch (2021).')
      ]
    }]
  });
  return doc;
}

/* =================== CLI =================== */
if (require.main === module) {
  const cfg = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  const empresa = (cfg.co || 'BASE').toUpperCase().replace(/[\\/:*?"<>|]/g, '').trim();
  const dir = process.env.CV_OUT || 'cvs';
  const out = `${dir}/JORGE FABRE CV - ${empresa}.docx`;
  fs.mkdirSync(dir, { recursive: true });
  Packer.toBuffer(construir(cfg)).then(b => { fs.writeFileSync(out, b); console.log(out); });
}

module.exports = { construir, ordenar, ordenarBullets, HAB, BULLETS };
