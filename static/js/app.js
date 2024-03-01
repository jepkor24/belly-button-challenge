const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
const dataPromise = d3.json(url);

d3.json(url).then(function(data){
	console.log(data);

// dropdown select element
        let dropDownElement = d3.select("#selDataset");

        // populate the dropdown
        let sample = data.names;
    
            for (let i = 0; i < sample.length; i++){
                dropDownElement
                    .append("option")
                    .text(sample[i])
                    .property("value", sample[i]);
            };

// bar chart 	

let samples = data.samples
let resultsArray= samples.filter(x=> x.id = sample)
let results = resultsArray[0]
let otu_ids = results.otu_ids
let otu_labels = results.otu_labels
let sample_values = results.sample_values


let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    let barData = [
      {
        y: yticks,
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      }
    ];

    let barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 30, l: 150 }
    };

    Plotly.newPlot("bar", barData, barLayout);

// bubble chart
let trace ={
		x: otu_ids,
		y: sample_values,
		text: otu_labels,
		mode: 'markers',
		marker: {
			size: sample_values,
			color: otu_ids,
			colorscale: 'virdis',
			opacity: 0.7
			

		}

};
let bubble1 = [trace];

let bubblelayout = {

		title: "Bubble Chart for Sample Data",
		xaxis: {title: 'OTU ID'},
		yaxis: {title: " Sample Values"}

};
Plotly.newPlot('bubble',bubble1,bubblelayout)


// metadata visual

let metadata = data.metadata;
let metadataIndex =0;
let metadataObject = metadata[metadataIndex];

let metadataContainer = document.getElementById('sample-metadata');
metadataContainer.innerHTML = '';

Object.entries(metadataObject).forEach(([key,value])=> {
	let metadataItem =document.createElement('p');
	metadataItem.textContent = `${key}: ${value}`;
	metadataContainer.appendChild(metadataItem);
});



/// Using the dropdown to change the metadata, bar and bubble chart based on what is selected in the dropdown


});

function updatePlots(sample){
console.log(sample)
d3.json(url).then(function(data){

// bar chart updates
let samples = data.samples
let resultsArray= samples.filter(x=> x.id == sample)
let results = resultsArray[0]
let otu_ids = results.otu_ids
let otu_labels = results.otu_labels
let sample_values = results.sample_values


let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    let barData = [
      {
        y: yticks,
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      }
    ];

    let barLayout = {
      title: `Top 10 Bacteria Cultures Found in Sample ID ${sample}`,
      margin: { t: 30, l: 150 }
    };

    Plotly.newPlot("bar", barData, barLayout);

// bubble chart updates
let trace ={
		x: otu_ids,
		y: sample_values,
		text: otu_labels,
		mode: 'markers',
		marker: {
			size: sample_values,
			color: otu_ids,
			colorscale: 'virdis',
			opacity: 0.7,
			width: 100,
			height: 40
		}

};
let bubble1 = [trace];

let bubblelayout = {

		title: `Bubble Chart for Sample ID ${sample}`,
		xaxis: {title: 'OTU ID'},
		yaxis: {title: " Sample Values"}

};
Plotly.newPlot('bubble',bubble1,bubblelayout)


// metadata

let metadata = data.metadata;
let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
let metadataObject = resultArray[0];

let metadataContainer = document.getElementById('sample-metadata');
metadataContainer.innerHTML = '';

Object.entries(metadataObject).forEach(([key,value])=> {
	let metadataItem =document.createElement('p');
	metadataItem.textContent = `${key}: ${value}`;
	metadataContainer.appendChild(metadataItem);
});


});
	
}