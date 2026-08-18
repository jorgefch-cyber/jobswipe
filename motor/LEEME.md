# Motor de CV adaptado — JobSwipe

Genera `JORGE FABRE CV - (EMPRESA).docx` reordenado según lo que pide cada vacante.

## Cómo se usa

```bash
npm install
node cv.js vacante.json
```

`vacante.json` acepta:

| campo | qué hace |
|---|---|
| `co` | nombre de la empresa — define el nombre del archivo |
| `role` | puesto, se usa para reordenar |
| `titulo` | la línea bajo el nombre. Si se omite: "Marketing Analytics & Business Intelligence" |
| `resumen` | el resumen profesional. Si se omite, usa el base |
| `tituloUber` | el título del puesto en Uber, por si conviene reencuadrarlo |
| `tituloPick` | igual para Pick Uplandia |
| `requisitos` | lista — con esto se reordenan bullets y habilidades |
| `resp` | lista de responsabilidades — mismo uso |

## La regla que no se rompe

El archivo `cv.js` tiene un inventario cerrado de habilidades reales de Jorge.
**Adaptar significa reordenar y reencuadrar, nunca agregar.**
Si una vacante pide algo que no está en ese inventario, no se inventa:
se deja fuera y se le avisa a Jorge que ahí hay un hueco.

Nivel real declarado por Jorge (18-ago-2026):
- Fuerte: coordinación, ventas e influencia, stakeholders, Meta Ads, Excel/Sheets con Power Query, CRM y lifecycle como disciplina, inglés C2, manejo de equipo y presupuesto.
- Medio: SQL (lee todo, escribe con esfuerzo), Tableau y Power BI (académico + casos reales).
- Cero: Salesforce, HubSpot, Braze y cualquier plataforma comercial de CRM. GA4, Google Ads, ERP, ingeniería de datos.
- No habla francés ni portugués. El pasaporte francés es solo ciudadanía.
