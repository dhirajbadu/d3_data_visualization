console.log("chart js");


const pieChart = data => {
    const svg = d3.select('#piechart');

    let width = +svg.attr("width");
    let height = +svg.attr("height");

    if (width === undefined || width === null || width <= 0) {
        width = 600;
    }

    if (height === undefined || height === null || height <= 0) {
        height = 300;
    }

    const xValue = d => d.population;
    const yValue = d => d.country;
    const href = d => "#"+d.country;
    const color = d => d.color;
    const r = 40;


    const padding = {top:10,right:10,bottom:10,left:10};
    let innerWidth = width - padding.right - padding.left + (r*data.length-r);
    let innerHeight = height - padding.top - padding.bottom;


    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, xValue)])
        .range([padding.right, width - padding.right]);

    svg.attr("width", innerWidth)
        .attr("height", innerHeight);

    const g = svg.append('g');
    const cx = d => xScale(xValue(d))  + padding.right + r;
    const cy = 100;

    g.selectAll('circle')
        .data(data)
        .enter()
        .append("a")
        .attr("href", d=>href(d))
        .attr('data-toggle', 'tooltip')
        .attr('data-placement', 'top')
        .attr('title', yValue)
        .append("circle")
        .attr("cx", cx)
        .attr("cy", cy)
        .attr("r", r)
        .attr('fill', "#f0b7a5")
        .attr('class', 'crl');

    g.selectAll('text')
        .data(data)
        .enter()
        .append("text")
        .text(yValue)
        .attr("x", cx)
        .attr("y", cy)
        .attr('class', 'txt')
        .attr('data-toggle', 'tooltip')
        .attr('data-placement', 'top')
        .attr('title', yValue);

};


const rawPieData = [
    {'country': 'Pakistan', 'population': 123, 'color' : 'steelblue'},
    {'country': 'India', 'population': 231, 'color' : 'red'},
    {'country': 'China', 'population': 543, 'color' : 'yellow'},
    {'country': 'Nepal', 'population': 12, 'color' : 'green'}
    ];
pieChart(rawPieData);



$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})