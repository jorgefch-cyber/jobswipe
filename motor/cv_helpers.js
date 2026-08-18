const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  BorderStyle, LevelFormat, convertInchesToTwip, ExternalHyperlink
} = require('docx');
const fs = require('fs');

const NAVY = '1F3864';
const DARK = '222222';
const GREY = '555555';

/* ---------- helpers ---------- */
const name = t => new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 40 },
  children: [new TextRun({ text: t, bold: true, size: 34, font: 'Calibri', color: DARK })]
});

const contact = children => new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 30 },
  children
});

const small = (t, opts = {}) => new TextRun({
  text: t, size: 18, font: 'Calibri', color: GREY, ...opts
});

const sectionTitle = t => new Paragraph({
  spacing: { before: 74, after: 36 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: NAVY, space: 2 } },
  children: [new TextRun({ text: t.toUpperCase(), bold: true, size: 21, font: 'Calibri', color: NAVY, characterSpacing: 20 })]
});

/* company + dates on one line, role beneath */
const job = (company, dates, role) => ([
  new Paragraph({
    spacing: { before: 58, after: 0 },
    tabStops: [{ type: 'right', position: 10080 }],
    children: [
      new TextRun({ text: company, bold: true, size: 21, font: 'Calibri', color: DARK }),
      new TextRun({ text: '\t' + dates, size: 19, font: 'Calibri', color: GREY, bold: true })
    ]
  }),
  new Paragraph({
    spacing: { before: 8, after: 30 },
    children: [new TextRun({ text: role, italics: true, size: 20, font: 'Calibri', color: NAVY })]
  })
]);

const bullet = (lead, rest) => new Paragraph({
  numbering: { reference: 'b', level: 0 },
  spacing: { after: 18, line: 216 },
  children: [
    new TextRun({ text: lead + ': ', bold: true, size: 19, font: 'Calibri', color: DARK }),
    new TextRun({ text: rest, size: 19, font: 'Calibri', color: DARK })
  ]
});

const plain = (t, opts = {}) => new Paragraph({
  spacing: { after: 26, line: 226 },
  children: [new TextRun({ text: t, size: 19, font: 'Calibri', color: DARK, ...opts })]
});

const kv = (k, v) => new Paragraph({
  spacing: { after: 22, line: 224 },
  children: [
    new TextRun({ text: k + ': ', bold: true, size: 19, font: 'Calibri', color: DARK }),
    new TextRun({ text: v, size: 19, font: 'Calibri', color: DARK })
  ]
});

const note = t => new Paragraph({
  spacing: { before: 0, after: 30 },
  children: [new TextRun({ text: t, italics: true, size: 18, font: 'Calibri', color: GREY })]
});

const award = (place, rest) => new Paragraph({
  numbering: { reference: 'b', level: 0 },
  spacing: { after: 30, line: 232 },
  children: [
    new TextRun({ text: place + ' ', bold: true, size: 19, font: 'Calibri', color: NAVY }),
    new TextRun({ text: rest, size: 19, font: 'Calibri', color: DARK })
  ]
});


module.exports = { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, LevelFormat, convertInchesToTwip, ExternalHyperlink, NAVY, DARK, GREY, name, contact, small, sectionTitle, job, bullet, plain, kv, note, award };
