console.log('chart js')

const build = data => {
  const svg = d3.select('#chart')

  let width = +svg.attr('width')
  let height = +svg.attr('height')

  if (width === undefined || width === null || width <= 0) {
    width = 600
  }

  if (height === undefined || height === null || height <= 0) {
    height = 300
  }

  svg.attr('width', width).attr('height', height)

  data.forEach(d => {
    console.log(d.country)
    d.population = +d.population * 100
  })

  const xValue = d => d.population
  const yValue = d => d.country
  const color = d => d.color

  const margin = { top: 20, right: 30, bottom: 30, left: 20 }
  const innerWidth = width - margin.right - margin.left
  const innerHeight = height - margin.top - margin.bottom

  const xScale = d3.scale.linear().
    domain([0, d3.max(data, xValue)]).
    range([0, innerWidth])

  console.log(xScale.domain())
  console.log(xScale.range())

  const tickFormatXAxix = num => d3.format('.2s')(num)
  const xAxis = d3.axis.orient('bottom').
    scale(xScale).
    tickFormat(tickFormatXAxix)

  const yScale = d3.scale.band().
    domain(data.map(yValue)).
    range([0, innerHeight]).
    padding(0.1)

  console.log(yScale.domain())
  console.log(yScale.range())

  const yAxis = d3.axisLeft(yScale)

  const g = svg.append('g').
    attr('transform', 'translate(' + margin.left + ' , ' + margin.top + ')')

  g.append('g').call(yAxis)
  g.append('g').
    call(xAxis).
    attr('transform', 'translate(' + 0 + ' , ' + innerHeight + ')')

  g.selectAll('rect').
    data(data).
    enter().
    append('rect').
    attr('y', d => yScale(yValue(d))).
    attr('width', d => xScale(xValue(d))).
    attr('height', yScale.bandwidth()).
    attr('fill', color)
}

const rawData = [
  { 'country': 'a', 'population': 123, 'color': 'steelblue' },
  { 'country': 'b', 'population': 231, 'color': 'red' },
  {
    'country': 'c',
    'population': 543,
    'color': 'yellow',
  },
  { 'country': 'd', 'population': 12, 'color': 'green' }]
///build(rawData);

const nvBarChart = data => {
  var chart
  nv.addGraph(function () {
    console.log(nv.models)
    chart = nv.models.multiBarHorizontalChart().
      x(function (d) { return d.label }).
      y(function (d) { return d.value }).
      yErr(function (d) {
        return [
          -Math.abs(d.value * Math.random() * 0.3),
          Math.abs(d.value * Math.random() * 0.3)]
      }).
      barColor(d3.scale.category20().range()).
      duration(250).
      margin({ left: 100 }).
      stacked(true)

    chart.yAxis.tickFormat(d3.format(',.2f'))

    chart.yAxis.axisLabel('Population')
    chart.xAxis.axisLabel('')

    d3.select('#chartnv').datum(data).call(chart)

    nv.utils.windowResize(chart.update)

    chart.dispatch.on('stateChange',
      function (e) { nv.log('New State:', JSON.stringify(e)) })
    chart.state.dispatch.on('change', function (state) {
      nv.log('state', JSON.stringify(state))
    })
    return chart
  })
}

const dataset = [
  {
    key: 'China',
    values: [
      {
        'label': 'Population',
        'value': 432,
      },
    ],
  },
  {
    key: 'India',
    values: [
      {
        'label': 'Population',
        'value': 234,
      },
    ],
  },
  {
    key: 'Nepal',
    values: [
      {
        'label': 'Population',
        'value': 123,
      },
    ],
  },
  {
    key: 'East Timor',
    values: [
      {
        'label': 'Population',
        'value': 120,
      },
    ],
  }
]

nvBarChart(dataset)
