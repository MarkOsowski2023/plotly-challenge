function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata= data.metadata;
      var resultsarray= metadata.filter(sampleobject => 
        sampleobject.id == sample);
      var result= resultsarray[0]
      var panel = d3.select("#sample-metadata");
      panel.html("");
      Object.entries(result).forEach([key, value]) => {
        panel.append("h6").text(`${key}: ${value}`);
      };