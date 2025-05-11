import React from "react";
import { useState } from "react";
import "@material/web/ripple/ripple.js";
import "@material/web/button/filled-tonal-button.js";

const ExportPdfButton = ({ markdownContent }) => {
    const [isFilled, setIsFilled] = useState(false);

    const handleExport = async () => {
        const [{ marked }, {default: DOMPurify}, {default: html2pdf}] = await Promise.all([
          import('marked'),
          import('dompurify'),
          import('html2pdf.js'),
        ]);

    // Convertir y sanitizar el markdown
    const rawHtml = await marked.parse(markdownContent);
    const cleanHtml = DOMPurify.sanitize(rawHtml);

    // Contenedor PDF con estilos del editor
    const container = document.createElement('div');
    container.innerHTML = cleanHtml;
    
    // Aplicar estilos consistentes con el editor
    const styles = document.createElement('style');
    styles.innerHTML = `
            * {
        box-sizing: border-box;
      }

      html {
        font-size: 100%;
      }

      body {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
          'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        line-height: 1.6;
        font-size: 0.6875em; /* 11 pt */
        color: #111;
        margin: 0;
      }

      body > :first-child {
        padding-top: 0;
        margin-top: 0;
      }

      body > :last-child {
        margin-bottom: 0;
        padding-bottom: 0;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-weight: 600;
        margin: 0;
        padding: 0.5em 0 0.25em;
      }

      h5,
      h6 {
        padding: 0;
      }

      h5 {
        font-size: 1em;
      }

      h6 {
        font-size: 0.875em;
        text-transform: uppercase;
      }

      p {
        margin: 0.25em 0 1em;
      }

      blockquote {
        margin: 0.5em 0 1em;
        padding-left: 0.5em;
        padding-right: 1em;
        border-left: 4px solid gainsboro;
        font-style: italic;
      }

      ul,
      ol {
        margin: 0;
        margin-left: 1em;
        padding: 0 1.5em 0.5em;
      }

      pre {
        white-space: pre-wrap;
      }

      h1 code,
      h2 code,
      h3 code,
      h4 code,
      h5 code,
      h6 code,
      p code,
      li code,
      pre code {
        background-color: #f8f8f8;
        padding: 0.1em 0.375em;
        border: 1px solid #f8f8f8;
        border-radius: 0.25em;
        font-family: monospace;
        font-size: 1.2em;
      }

      pre code {
        display: block;
        padding: 0.5em;
      }

      .page-break {
        page-break-after: always;
      }

      img {
        max-width: 100%;
        margin: 1em 0;
      }

      table {
        border-spacing: 0;
        border-collapse: collapse;
        display: block;
        margin: 0 0 1em;
        width: 100%;
        overflow: auto;
      }

      table th,
      table td {
        padding: 0.5em 1em;
        border: 1px solid gainsboro;
      }

      table th {
        font-weight: 600;
      }

      table tr {
        background-color: white;
        border-top: 1px solid gainsboro;
      }

      table tr:nth-child(2n) {
        background-color: whitesmoke;
      }
    `;

    const pdfContainer = document.createElement('div');
    pdfContainer.appendChild(styles);
    pdfContainer.appendChild(container);

    // Configuración de PDF
    const options = {
      margin: [15, 15],
      filename: 'markdown-export.pdf',
      image: { type: 'jpeg', quality: 0.95 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: true,
        windowWidth: 1280,
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait',
      },
    };

    // Generar PDF
    return html2pdf().set(options).from(pdfContainer).save();
  };

    const handleClick = async (e) => {
      e.stopPropagation();
      setIsFilled(true);

      const container = document.createElement('div');

      handleExport(container)
        .finally(() => {
          setTimeout(() => setIsFilled(false), 1000);
        });

    }



  return (
    <button
      onClick={handleClick}
      className="
        animate-tab-in
        relative 
        group flex
        items-center 
        justify-center
        bg-[#e4e2e5] dark:bg-[#343537] dark:hover:bg-[#ffffff28]
        text-[#44474e] dark:text-[#c5c6ce]
        w-[40px] h-[40px] 
        cursor-pointer 
        rounded-[64px]
        hover:rounded-[14px]
        hover:scale-[1.15]
        transition-all
        ease-in-out
        duration-300
        "
    >
      <md-ripple aria-hidden="true" className=" hover:blur-sm"></md-ripple>
      <span title="Exportar a pdf" className="material-symbols-outlined  transition-all  duration-500 ease-in-out text-[#1b1b1e] dark:text-[#e4e2e5]" style={{ 
        fontVariationSettings: `'FILL' ${isFilled ? 1 : 0}`,
       }}>
        sim_card_download
      </span>
      {/* <span className='
            bg-black
            absolute
            left-[80px]  origin-bottom-left ease-linear duration-300 
            invisible group-hover:visible 
            flex items-center justify-center  
            w-auto h-[10px] 
            p-[10px 10px]'>
                exportar a pdf
            </span> */}
    </button>
  );
};

export default ExportPdfButton;
