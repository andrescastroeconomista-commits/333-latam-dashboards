# 333 LATAM Dashboards — Monorepo

Repositorio central del Departamento de Economía y Sostenibilidad · 333 Corporate LATAM.
Contiene el hub de inteligencia y los dashboards sectoriales, organizados por cómo están
desplegados realmente hoy (Opción B: mismo repo, sitios de Netlify independientes por carpeta,
sin romper URLs existentes).

## Estructura

```
333-latam-dashboards/
├── hub/                              → Sitio Netlify: 333-hub-economic-latam.netlify.app
│   ├── index.html                    → El hub (landing con las 7 tarjetas)
│   ├── dashboard_porcino_latam/      → Ruta interna del mismo sitio
│   ├── dashboard_indicadores_latam/  → Ruta interna del mismo sitio
│   └── dashboard_msd_chile/          → Ruta interna del mismo sitio
│
├── res-cerdo-pollo/                  → Sitio Netlify: indicadoresrescerdopollousda.netlify.app
├── brujula-pib-fmi/                  → Sitio Netlify: pibmundialproyectado.netlify.app
├── variables-fundamentales/          → Sitio Netlify: avancevariablesfundamentaleslatam.netlify.app
└── pork-economics/                   → Sitio Netlify: webporkeconomics.netlify.app
```

**Por qué esta división:** Panorama Porcino, Indicadores Productivos y MSD Chile ya viven como
rutas del mismo sitio del hub (un solo dominio). Los otros 4 tableros son sitios Netlify
independientes con su propio dominio — por eso quedan como carpetas de primer nivel, cada una
apuntando a su propio sitio en Netlify.

## Estado actual

✅ `hub/index.html` — listo, con las 7 tarjetas ya integradas.
⏳ El resto de carpetas solo tienen un `README.md` de referencia — debes copiar ahí el código
fuente real de cada dashboard (donde sea que lo tengas guardado hoy: tu máquina, otro repo,
descargado desde Netlify, etc.). Yo no tengo acceso al código fuente de esos 4 dashboards
externos, solo vi su contenido renderizado.

## Cómo conectar esto a Netlify (una vez subido a GitHub)

Para cada sitio, en Netlify: **Site settings → Build & deploy → Continuous deployment → Link
repository**, y configura el **"Base directory"** así:

| Sitio Netlify actual | Base directory en este repo |
|---|---|
| 333-hub-economic-latam | `hub` |
| indicadoresrescerdopollousda | `res-cerdo-pollo` |
| pibmundialproyectado | `brujula-pib-fmi` |
| avancevariablesfundamentaleslatam | `variables-fundamentales` |
| webporkeconomics | `pork-economics` |

Con eso, cada `git push` a este repo republica automáticamente el sitio correspondiente —
sin tocar los dominios/URLs actuales.

## Primeros pasos

```bash
cd 333-latam-dashboards
git init
git add .
git commit -m "Estructura inicial del monorepo"
git branch -M main
git remote add origin https://github.com/<tu-org>/333-latam-dashboards.git
git push -u origin main
```

Luego repite la vinculación de "Base directory" descrita arriba para cada sitio en Netlify.

## URLs oficiales (GitHub Pages)

- Hub: https://andrescastroeconomista-commits.github.io/333-latam-dashboards/hub/
- Panorama Porcino LATAM: https://andrescastroeconomista-commits.github.io/333-latam-dashboards/panorama-porcino-latam/
- Indicadores Productivos LATAM: https://andrescastroeconomista-commits.github.io/333-latam-dashboards/indicadores-productivos-latam/
- Variables Fundamentales LATAM: https://andrescastroeconomista-commits.github.io/333-latam-dashboards/variables-fundamentales/
- Res, Cerdo y Pollo Mundial: https://andrescastroeconomista-commits.github.io/333-latam-dashboards/res-cerdo-pollo/
- Brújula PIB FMI: https://andrescastroeconomista-commits.github.io/333-latam-dashboards/brujula-pib-fmi/
- Costos de Producción LATAM: https://andrescastroeconomista-commits.github.io/333-latam-dashboards/costos-produccion-latam/
- Indicadores Colombia: https://andrescastroeconomista-commits.github.io/333-latam-dashboards/indicadores-colombia/

> Nota: Pork Economics sigue temporalmente en Netlify (https://porkeconomics.netlify.app/) — falta subir al repo los PDFs de boletines y las fotos de líderes (los audios ya están). La carpeta `pork-economics/` de este repo aún está incompleta.
>
> MSD Chile no está enlazado en el hub por decisión editorial, pero el archivo vive en `00_Dashboards_ACTUAL/4_MSD_Chile.html` sin subir al repo todavía.
