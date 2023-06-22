window.addEventListener('DOMContentLoaded',()=>{
    let inputTheme = document.querySelector('.sectionTable__theme') // get the input element
    let advantageChart = document.querySelector('.chart__content--advantages') // get the input element
    let advantageSpan = document.querySelector('.chart__quantity--advantages') // get the input element
    let disadvantageChart = document.querySelector('.chart__content--disadvantages') // get the input element
    let disadvantageSpan = document.querySelector('.chart__quantity--disadvantages') // get the input element
    let btnExportPdfAdvantages = document.querySelector('.btn--exportPDF--advantages') // get the input element
    let btnExportPdfFoda = document.querySelector('.btn--exportPDF--foda') // get the input element

    let resizeWidthInput = () => {
        this.style.width = this.value.length + "ch";
    }

    let calcItems = (query, span) => {
        let advantages = Array.from(document.querySelectorAll(query)).filter(e => e.textContent != '')
        span.innerText = advantages.length
    }
    let convertToPdf = (query, event) => {
        event.preventDefault()
        let $elementoParaConvertir = document.querySelector(query); // <-- Aquí puedes elegir cualquier elemento del DOM
        console.log($elementoParaConvertir)
        html2pdf()
            .set({
                margin: 0,
                filename: 'documento.pdf',
                image: {
                    type: 'jpeg',
                    quality: 0.98
                },
                html2canvas: {
                    scale: 3, // A mayor escala, mejores gráficos, pero más peso
                    letterRendering: true,
                },
                jsPDF: {
                    unit: "in",
                    format: "a3",
                    orientation: 'landscape' // landscape o portrait
                }
            })
            .from($elementoParaConvertir)
            .save()
            .catch(err => console.log(err))
            .then(()=>console.log('pdf generado'))
    }

    inputTheme.addEventListener('input', resizeWidthInput) // bind the "resizeInput" callback on "input" event
    advantageChart.addEventListener('keydown', ()=>calcItems('.chart__content--advantages li',advantageSpan)) // bind the "resizeInput" callback on "input" event
    disadvantageChart.addEventListener('keydown', ()=>calcItems('.chart__content--disadvantages li',disadvantageSpan)) // bind the "resizeInput" callback on "input" event
    btnExportPdfAdvantages.addEventListener('click', (event)=>convertToPdf('.advantageTable', event))// bind the "resizeInput" callback on "input" event
    btnExportPdfFoda.addEventListener('click', (event)=>convertToPdf('.fodaTable', event))// bind the "resizeInput" callback on "input" event

})