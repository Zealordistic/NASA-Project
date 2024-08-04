import React, {useEffect, useState} from 'react';
import * as d3 from 'd3'
import * as topojson from "topojson-client";

class USMap extends React.Component {
    constructor(props) {
        super(props);
        this.data = d3.json('https://d3js.org/us-10m.v2.json');
        this.width = 960;
        this.height = 600;
        this.svg = undefined;
        this.path = d3.geoPath();
        // this.projection = d3.geoAlbersUsa().scale(1280).translate([480, 300]);
    }

    createSvg() {
        this.svg = d3.select('.visualResult')
        .append('svg')
        .attr('width', this.width)
        .attr('height', this.height);
    }

    drawMap() {
        d3.json('https://d3js.org/us-10m.v2.json').then(
            data => { 
                let t_data = topojson.feature(data, data.objects.states).features;
                this.svg.selectAll('path')
                .data(t_data)
                .enter()
                .append('path')
                .attr('d', this.path)
            }
        );
        
    }

    plotPowerPlantPoints() {
        console.log("pp");
        var uri = `https://powerpuffs-group-project.eastus.cloudapp.azure.com/node/api/getPowerPlantData?`
        const queryString = window.location.search;
        // console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        for(const key of urlParams.keys()) {
            // console.log(key + " " + urlParams.get(key));
            uri += `${key}=${urlParams.get(key)}&`
        }
        uri = uri.substring(0, uri.length-1);
        d3.json(uri).then(
            data => {
                let projection = d3.geoAlbersUsa()
                    .scale(1300)
                    .translate([this.width/2, this.height/2])

                var markers = this.svg.selectAll("g")
                    .data(data)
                    .enter()
                    .append("g")
                    .attr("class", "marker");
                
                markers.append("circle")
                    .attr("cx", function(d) { return projection(d.geometry.coordinates)[0]; })
                    .attr("cy", function(d) { return projection(d.geometry.coordinates)[1]; })
                    .attr("r", 2);
            }
        )

    }

    plotPrecipitationPoints() {
        console.log("plotting points...");
        d3.json('https://powerpuffs-group-project.eastus.cloudapp.azure.com/node/api/getPrecipitationPoints').then(
            data => {
                let projection = d3.geoAlbersUsa()
                    .scale(1300)
                    .translate([this.width/2, this.height/2])

                let t_data = [];
                for(let i = 0; i < data.length; i++) {
                    // console.log(projection(data[i].geometry.coordinates));
                    if(projection(data[i].geometry.coordinates) !== null) {
                        t_data.push(data[i]);
                    }
                }
                
                // console.log(t_data);
                var markers = this.svg.selectAll("g")
                    .data(t_data)
                    .enter()
                    .append("g")
                    .attr("class", "per-marker");
                
                var colors = d3.scaleLinear()
                .domain(d3.extent(t_data, function(d) { return d.properties.precipitationCal; }))
                .range(["#caf0f8", "#0a9396", "#ee9b00", "#bb3e03", "#9b2226"])

                markers.append("circle")
                    .attr("cx", function(d) { return projection(d.geometry.coordinates)[0]; })
                    .attr("cy", function(d) { return projection(d.geometry.coordinates)[1]; })
                    .attr("r", 7)
                    .attr("fill", function(d){
                        if(d.properties.precipitationCal) {
                            return colors(d.properties.precipitationCal)
                        } else {
                            return "#e0e1dd";
                        }
                    });
                
            }
        )
    }

    componentDidMount() {
        this.createSvg();
        this.drawMap();
        this.plotPrecipitationPoints();
        this.plotPowerPlantPoints();
        
    }

    render() {
        return <div id={"#" + this.props.id}></div>
    }
}

export default USMap;