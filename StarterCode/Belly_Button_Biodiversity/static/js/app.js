const json_url = "../../samples.json";

const bio_data = d3.json(json_url);

// console.log(bio_data);

var data = bio_data;


function DrawBubbleChart(sampleId) {

    console.log(`Calling DrawBubbleChart ${sampleId}`);
 

    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);

        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();

        var bubbleData = {
            x: otu_ids.slice(0, 10).reverse(),
            y: sample_values.slice(0, 10).reverse(),
            type: "scattergl",
            mode: "markers",
            marker: {
                size: sample_values.slice(0, 10).reverse(),
                color: otu_ids.slice(0, 10).reverse()
            },
            text: otu_labels.slice(0, 10).reverse()
        };

        bubbleArray = [bubbleData];

        var bubbleLayout = {
            xaxis: {
                title: "OTU ID"
            }
        };

        Plotly.newPlot("bubble", bubbleArray, bubbleLayout);
    });

}

function DrawBargraph(sampleId) {

    console.log(`Calling DrawBargraph ${sampleId}`);

    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);

        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();

        var barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0, 10).reverse(),
            orientation: "h"
        };

        barArray = [barData];

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: { t: 30, l: 150 }
        };

        Plotly.newPlot("bar", barArray, barLayout);


    });

}

function ShowMetadata(sampleId) {

    console.log(`Calling ShowMetadata ${sampleId}`);

    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var resultArray = metadata.filter(md => md.id == sampleId);
        var result = resultArray[0];

        var PANEL = d3.select("#sample-metadata");

        PANEL.html("");

        Object.entries(result).forEach(([key, value]) => {
            var textToShow = `${key}: ${value}`;
            PANEL.append("h6").text(textToShow);
        });
    });

}

function DrawGauge(sampleId) {
    console.log(`Calling DrawGuage ${sampleId}`);
}

function optionChanged(newSampleId) {
    console.log(`User selected ${newSampleId}`);

    DrawBubbleChart(newSampleId);
    DrawBargraph(newSampleId);
    ShowMetadata(newSampleId);
    DrawGauge(newSampleId);
}


function InitDashboard() {
    console.log("Initializing Dashboard");
    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        console.log(data);

        var sampleNames = data.names;

        sampleNames.forEach((sampleId) =>
            selector.append("option")
                .text(sampleId)
                .property("value", sampleId));

        var sampleId = sampleNames[0];

        DrawBargraph(sampleId);
        DrawBubbleChart(sampleId);
        DrawGauge(sampleId);
        ShowMetadata(sampleId);
    });
}

InitDashboard();