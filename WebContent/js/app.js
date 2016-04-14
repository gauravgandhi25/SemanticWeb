$(document)
		.ready(
				function() {
					Materialize.showStaggeredList('#staggered-list')
					$('select').material_select();
					$('ul.tabs').tabs();

					$('nav').addClass("red darken-1");

					$("#expenditureSelect").change(function() {
						var str = "";
						str = $("#expenditureSelect option:selected").val();
						displayExpenditureGraph(str);
					});

					function displayExpenditureGraph(str) {
						if (str == '1')
							stateWiseExpRatio();
						else
							stateWiseExpTotal();
					}

					function stateWiseExpRatio() {
						var queryurl = "http://localhost:3030/dataset-1154/query?query=PREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX+uri%3A+%3Chttp%3A%2F%2Fdata-gov.tw.rpi.edu%2Fvocab%2Fp%2F1150%2F%3E%0APREFIX+xsd%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%0A%0ASELECT+%3Fstate+(SUM(xsd%3Afloat(%3Ftotal_expenditure))+as+%3Fexpenditure)+%0AWHERE+%7B%0A++%3Fs+uri%3Astate+%3Fstate+.%0A++%3Fs+uri%3Atotal_expenditure+%3Ftotal_expenditure+.%0A%7D%0Agroup+by+%3Fstate%0Aorder+by+%3Fstate&output=json";
						var xmlhttp = new XMLHttpRequest();
						xmlhttp.open("GET", queryurl, true);
						xmlhttp.send();

						xmlhttp.onreadystatechange = function() {
							if (xmlhttp.readyState == 4
									&& xmlhttp.status == 200) {
								prepareDataFromJSON(JSON.parse(xmlhttp.responseText));
							}
						};

						function prepareDataFromJSON(jsonArray) {

							var length = jsonArray.results.bindings.length;
							var newdata = new google.visualization.DataTable();
							newdata.addColumn('string', 'State');
							newdata.addColumn('number', 'Expenditure');

							for (var i = 0; i < length; i++) {
								var stateObject = jsonArray.results.bindings[i];
								var stateName = 'US-' + stateObject.state.value;
								var expenditure = Math
										.round(stateObject.expenditure.value);
								newdata.addRow([ stateName, expenditure ]);
							}
							drawPieChart(newdata)
						}
						;

					}

					function stateWiseExpTotal() {

						var queryurl = "http://localhost:3030/dataset-1154/query?query=PREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX+uri%3A+%3Chttp%3A%2F%2Fdata-gov.tw.rpi.edu%2Fvocab%2Fp%2F1150%2F%3E%0APREFIX+xsd%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%0A%0ASELECT+%3Fstate+(SUM(xsd%3Afloat(%3Ftotal_expenditure))+as+%3Fexpenditure)+%0AWHERE+%7B%0A++%3Fs+uri%3Astate+%3Fstate+.%0A++%3Fs+uri%3Atotal_expenditure+%3Ftotal_expenditure+.%0A%7D%0Agroup+by+%3Fstate%0Aorder+by+%3Fstate&output=json";
						var xmlhttp = new XMLHttpRequest();
						xmlhttp.open("GET", queryurl, true);
						xmlhttp.send();

						xmlhttp.onreadystatechange = function() {
							if (xmlhttp.readyState == 4
									&& xmlhttp.status == 200) {
								prepareDataFromJSON(JSON.parse(xmlhttp.responseText));
							}
						};

						function prepareDataFromJSON(jsonArray) {

							var length = jsonArray.results.bindings.length;
							var newdata = new google.visualization.DataTable();
							newdata.addColumn('string', 'State');
							newdata.addColumn('number', 'Expenditure');

							for (var i = 0; i < length; i++) {
								var stateObject = jsonArray.results.bindings[i];
								var stateName = 'US-' + stateObject.state.value;
								var expenditure = Math
										.round(stateObject.expenditure.value);
								newdata.addRow([ stateName, expenditure ]);
							}
							drawchart(newdata)
						}
						;
					}

					function drawchart(newdata) {

						var options = {};
						options['region'] = 'US';
						options['displayMode'] = 'regions';
						options['resolution'] = 'provinces';
						options['width'] = 900;
						options['height'] = 550;
						

						var geochart = new google.visualization.GeoChart(
								document.getElementById('map_canvas'));
						geochart.draw(newdata, options);
					}
					
					
					function drawPieChart(newdata) {

						var options = {};
						options['region'] = 'US';
						options['displayMode'] = 'regions';
						options['resolution'] = 'provinces';
						options['width'] = 900;
						options['height'] = 550;
					

						var pieChart = new google.visualization.PieChart(
								document.getElementById('map_canvas'));
						pieChart.draw(newdata, options);
					}								
				});