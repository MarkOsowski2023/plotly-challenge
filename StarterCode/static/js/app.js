// Start function
function dashboardPlots(id) {
    
    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
    
    d3.json(url).then((data) => {
        
        console.log(data);


        var samples = data.samples.filter(sample => sample.id.toString() === id)[0];
        console.log(samples);

        var top_sample_values = (samples.sample_values.slice(0, 10)).reverse();
        console.log('Top Sample Values: ${top_sample_values}')

        var top_OTU = (samples.otu_ids.slice(0, 10)).reverse();
        console.log('Top OTU IDs: ${top_OTU}');

        var OTU_id = top_OTU.map(d => "OTU" + d);
        console.log('OTU Ids: ${OTU_id}');

        var top_labels = samples.otu_labels.slice(0, 10);

        var washfreq = data.metadata.map(d => d.washfreq);
        console.log("Wash Frequency: ${washfreq}");

        var trace = {
            x: top_sample_values,
            y: OTU_id,
            text: top_labels,
            marker: {
                color: 'rbg(125, 150, 175)'
            },
            type: 'bar',
            orientation: "h",
        };

        var data = [trace];

        var layout = {
            title: "Top 10 OTU",
            yaxis: {
                tickmode: "linear"
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 50,
            }
        };

        Plotly.newPlot("bar", data, layout);

        console.log('Id: ${samples.otu_ids}')

        var trace2 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.out_labels
        };

        var layout2 = {
            xaxis: {title: "OTU Id"},
            height: 600,
            width: 1000
        };

        var data2 = [trace2];

        Plotly.newPlot("bubble", data2, layout2);

        // BONUS Guage
        
        var data3 = [
            {
                domain: {x: [0, 1], y: [0, 1]},
                value: parseFloat(washfreq),
                title: {text: 'Washing Frequency'},
                type: "indicator",
                mode: "gauge+number",
                guage: {axis:{range: [null, 9]}, steps: [
                    {range: [0, 2], color: "yellow"},
                    {range: [2, 4], color: "blue"},
                    {range: [4, 6], color: "lightblue"},
                    {range: [6, 8], color: "lightgreen"},
                    {range: [8, 9], color: "green"},
                ]}

            }
        ];

        var layout3 = {
            width: 750,
            height: 650,
            margin: {t: 25, b: 50, l: 100, r: 100}
        };

        Plotly.newPlot("gauge", data3, layout3);
    
    
    
    });

}

d3.selectAll("#selDataset").on("change", getDATA);

function getDATA() {
    
    
    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

    d3.json(url).then((data) => {
        
        var metadata = data.metadata;
        console.log(metadata);

        var result = metadata.filter(mdata => mdata.id.toString() === id)[0];

        var demographics = d3.select("#sample-metadata");

        demographics.html("");

        Object.entries(result).forEach((key) => {
            demographics.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    
    });
}

// create the function for the change event
function optionChanged(id) {
    dashboardPlots(id);
    getDATA(id);
}

// create the function for the initial data rendering
function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


    // read the data 
    d3.json(url).then((data)=> {
        var metadata = data.metadata;
        console.log(metadata);

        var id = metadata.filter(mdata => mdata.id.toString() === id)[0];

        // get the id data to the dropdwown menu
        data.names.forEach(function(names) {
            dropdown.append("option").text(names).property("value");
        });

        // call the functions to display the data and the plots to the page
        dashboardPlots(id);
        getDATA(id);
    });
}

init();