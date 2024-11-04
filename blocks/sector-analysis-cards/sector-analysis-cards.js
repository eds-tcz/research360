// export default function decorate(block) {
//     stockanalysisdata();
//     // [...block.children].forEach((row, r) => {
//     // });
// }


async function stockanalysisdata() {
    let s = 0, str = '', index = 0, exchangeName = 'NSE';
    let base_url_web = 'https://www.research360.in/';
    try {
        const response = await fetch('https://www.research360.in/ajax/markets/indexApiHandler.php?' +
            new URLSearchParams({
                tbl_flag: 'stockanalysisdata'
            }));
        const data = await response.json();
        const snapData = data.data.stockanalysisdata;

        const seccode = snapData.map(stock => stock.sector_code).join(',');

        const response2 = await fetch('https://www.research360.in/ajax/markets/indexApiHandler.php?' +
            new URLSearchParams({
                tbl_flag: 'stockanalysisdataOptimize',
                sector_code: seccode,
                exchangeName: exchangeName
            }));
        const data2 = await response2.json();

        let html = '<section class="owl-carousel owl-theme SectorPerformance" id="SectorPerformance">';

        snapData.forEach(stockanalysis => {
            const total = parseInt(stockanalysis.advance) + parseInt(stockanalysis.decline) + parseInt(stockanalysis.nochanges);
            index++;

            let innerData = [];
            if (data2.data.stockanalysisdata1) {
                innerData = data2.data.stockanalysisdata1.filter(v =>
                    v.sector_code === stockanalysis.sector_code
                );
            }

            const snapData1 = innerData;
            html += `
                <div class="item">
                    <div class="owl-item-inner p-3">
                        <div class="row">
                            <div class="col">
                                <div class="h-100 d-flex flex-column flex-wrap">
                                    <div class="divider-bottom-1 pb-1 mb-1">
                                        <div class="sector-header d-flex align-items-center align-items-center justify-content-start mb-0">
                                            <p class="font-medium16 font-wt-medium me-auto">
                                                <a href="sector-analysis/nse/${stockanalysis.sect_name}/overview" 
                                                   class="fontwt-medium sorting_1 text-black">
                                                    ${stockanalysis.sect_name}
                                                </a>
                                            </p>
                                            <p class="font-CaribbeanGreen">
                                                <span class="d-inline-flex align-items-center">
                                                    <em class="triangle-${parseFloat(stockanalysis.per_change) >= 0 ? 'up' : 'down'} me-2"></em>
                                                </span>
                                                <span>
                                                    <div class="${parseFloat(stockanalysis.per_change) >= 0 ? 'font-CaribbeanGreen' : 'font-InfraRed'}">
                                                        ${parseFloat(stockanalysis.per_change) >= 0 ? '+' : ''}${parseFloat(stockanalysis.per_change).toFixed(2)}%
                                                    </div>
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    <div class="mb-2">
                                        <div class="progressBar">
                                            <div class="progress mt-1 sector-change">
                                                <div class="" role="progressbar" 
                                                     style="width: ${((total - parseInt(stockanalysis.decline)) / total) * 100}%;background: #06c39b" 
                                                     aria-valuenow="${((total - parseInt(stockanalysis.decline)) / total) * 100}" 
                                                     aria-valuemin="0" 
                                                     aria-valuemax="${((total - parseInt(stockanalysis.decline)) / total) * 100}">
                                                </div>
                                                <div class="" role="progressbar" 
                                                     style="width:${(stockanalysis.decline / total) * 100}%;background: #ff4f6a;" 
                                                     aria-valuenow="${(stockanalysis.decline / total) * 100}" 
                                                     aria-valuemin="0" 
                                                     aria-valuemax="100">
                                                </div>
                                            </div>
                                        </div>

                                        <div class="stats-container d-flex justify-content-between align-items-center lineheight-26 ">
                                            ${stockanalysis.advance > 0 ? `
                                                <div>
                                                    <small>Advance</small>
                                                    <b class="font-CaribbeanGreen"> ${(Math.round(total - parseInt(stockanalysis.decline))).toString().slice(0, 2)}</b>
                                                </div>
                                            ` : ''}
                                            ${stockanalysis.decline > 0 ? `
                                                <div>
                                                    <small>Decline</small>
                                                    <b class="font-InfraRed"> ${parseInt(stockanalysis.decline)}</b>
                                                </div>
                                            ` : ''}
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-12">
                                            <table class="table stock-table table-borderless ht-46 TableRowShadow TableFixedHeaderColumn TableFirstColEllipsis table-fixed">
                                                <thead class="font-GraniteGray">
                                                    <tr>
                                                        <th>Symbol</th>
                                                        <th class="text-end">PRICE</th>
                                                        <th class="text-end">CHANGE %</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    ${snapData1 ? snapData1.map(sectoranalysisoverview => {
                const ltp = sectoranalysisoverview.ltp !== "" ? parseFloat(sectoranalysisoverview.ltp).toFixed(2) : "-";
                const perChangeVal = sectoranalysisoverview.per_change !== "" ?
                    (sectoranalysisoverview.per_change >= 0 ? '+' : '') + sectoranalysisoverview.per_change :
                    "-";
                return `
                                                            <tr>
                                                                <td>
                                                                    <a href="${base_url_web}stocks/${sectoranalysisoverview.lname}" 
                                                                       class="stock-symbol font-dark">
                                                                        ${sectoranalysisoverview.symbol}
                                                                    </a>
                                                                </td>
                                                                <td class="stock-symbol text-end">${ltp}</td>
                                                                <td class="text-end">
                                                                    <p class="change-value font-CaribbeanGreen font-wt-medium text-nowrap">
                                                                        <span class="d-inline-flex align-items-center">
                                                                            <em class="triangle-${sectoranalysisoverview.per_change >= 0 ? 'up' : 'down'} me-2"></em>
                                                                        </span>
                                                                        <span class="${sectoranalysisoverview.per_change >= 0 ? 'font-CaribbeanGreen' : 'font-InfraRed'}">
                                                                            ${parseFloat(perChangeVal).toFixed(2)}%
                                                                        </span>
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                        `;
            }).join('') : ''}
                                                </tbody>
                                            </table>
                                        </div>
                                          <a href="${base_url_web}sector-analysis" 
                                       class="btn w-100 border BorderBrightYellow font-medium16 font-wt-medium mt-auto">
                                        <span>View more</span>
                                    </a>
                                    </div>

                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        html += '</section>';

        // Update DOM
        document.querySelector(".sector-analysis-cards").innerHTML = html;

        // Initialize Owl Carousel
        // $('.SectorPerformance').owlCarousel({
        //     loop: false,
        //     margin: 15,
        //     autoHeight: true,
        //     dots: false,
        //     nav: true,
        //     responsiveClass: true,
        //     responsive: {
        //         0: { items: 1 },
        //         768: { items: 2 },
        //         992: { items: 3 },
        //         1200: { items: 3 }
        //     }
        // });

    } catch (error) {
        console.error('Error fetching stock analysis data:', error);
    }
}