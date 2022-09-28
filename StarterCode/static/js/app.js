var jsonPromise = d3.json("./data/samples.json");

// Get the current value of the dropdown menu
jsonPromise.then((data) => {
    // Get dropdown
    var dropdown = d3.select("#selDataset");
    var names = data.names;

    // Fill dropdown with name IDs
    names.forEach((item) => {
        dropdown.append("option")
            .attr("value", item)
            .text(item);
    });

    // Fill in Demographic Info panel with initial data
    var firstMetaData = data.metadata.filter(metadata => metadata.id === parseInt(names[0]));
    demoInfo(firstMetaData);

    // Generate initial horizontal bar graph and bubble chart
    var firstDatum = data.samples.filter(sample => sample.id === names[0]);
    initBar(firstDatum);
    initBubble(firstDatum);
});
