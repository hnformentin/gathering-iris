const lat = document.querySelector('#lat');
const long = document.querySelector('#long');

function geoFindMe() {

    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');

    mapLink.href = '';
    mapLink.textContent = '';

    function success(position) {
        var latitude  = position.coords.latitude;
        var longitude = position.coords.longitude;
        status.textContent = '';
        mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;

        lat.value = latitude;
        long.value = longitude;
    }

    function error() {
        status.textContent = 'Unable to retrieve your location';
    }

    if(!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
    } else {
        status.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, (err) => {
            console.log(err);
        });
    }
}

geoFindMe()

function make_series(o) {
    return Object.keys(o).sort().map(key => [key, o[key]])
}

const url = "/uploadUserData";
const form = document.querySelector('#userFileForm');

// add event listener
form.addEventListener('submit', e => {

    // disable default action
    e.preventDefault();

    // collect files
    const files = document.querySelector('[name=file]').files;
    const formData = new FormData();
    formData.append('userData', files[0]);

    // post form data
    const xhr = new XMLHttpRequest();

    // log response
    xhr.onload = () => {
        j = JSON.parse(xhr.responseText);
        for (let key in j) {
            console.log(key);
            console.log(j[key]);
            timeseries = make_series(j[key]);
            console.log(timeseries);
            chart(key, timeseries);
        }
    };

    // create and send the reqeust
    xhr.open('POST', url + "?" + "lat=" + lat.value + "&long=" + long.value);
    xhr.send(formData);
    console.log(xhr);
});

data = [
    {x: 0, y: 0},
    {x: 1, y: 4},
    {x: 2, y: 3},
    {x: 3, y: 6},
    {x: 4, y: 3},
    {x: 5, y: 2},
    {x: 6, y: 1},
];


function chart(key, timeseries) {
    width = 500;
    height = 100;
    margin = ({top: 20, right: 30, bottom: 30, left: 40})

    line = d3.line()
        .defined(d => !isNaN(d[1]))
        .x(d => x(d[0]))
        .y(d => y(d[1]))

    // x = d3.scaleUtc()
    //     .domain(d3.extent(data, d => d.date))
    //     .range([margin.left, width - margin.right])

    x = d3.scaleLinear()
        .domain([0, d3.max(timeseries, t => t[0])]).nice()
        .range([width - margin.left, margin.right])

    y = d3.scaleLinear()
        .domain([0, d3.max(timeseries, t => t[1])]).nice()
        .range([height - margin.bottom, margin.top])


    // y = d3.scaleLinear()
    //     .domain(d3.extent(timeseries, t => t[1])).nice()
    //     .range([height - margin.bottom, margin.top])

    xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))

    yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select(".domain").remove())
        .call(g => g.select(".tick:last-of-type text").clone()
            .attr("x", 3)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold"))
            // .text("))

  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  svg.append("path")
      .datum(timeseries)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);

   document.body.appendChild(svg.node());
}

chart("asd", [[0, 0], [1, 1]])
