$(document)
		.ready(
				function() {
					Materialize.showStaggeredList('#staggered-list')
					$('select').material_select();
					$('ul.tabs').tabs();

					$('nav').addClass("purple darken-1");
					$('footer.page-footer').addClass("purple darken-3");

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
								prepareDataFromJSON(JSON
										.parse(xmlhttp.responseText));
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
								prepareDataFromJSON(JSON
										.parse(xmlhttp.responseText));
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

					function drawBarChart(newdata) {

						var options = {
							'chartArea' : {
								'width' : '55%',
								'height' : '95%'
							},
						};
						options['region'] = 'US';
						options['displayMode'] = 'regions';
						options['resolution'] = 'provinces';
						options['width'] = 900;
						options['height'] = 1850;
						options['isStacked'] = true;
						options['bar'] = "groupWidth: '75%'";
						var barChart = new google.visualization.BarChart(
								document.getElementById('map_canvas'));
						barChart.draw(newdata, options);
					}

					$("#statewiseSelect").change(function() {
						var str = "";
						str = $("#statewiseSelect option:selected").val();
						displayStatewiseGraph(str);
					});

					function displayStatewiseGraph(str) {
						if (str == '1')
							vetaranPopulation();
						else
							statewiseMedicalStaff();
					}

					function vetaranPopulation() {

						var queryurl = "http://localhost:3030/dataset-1154/query?query=PREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX+uri%3A+%3Chttp%3A%2F%2Fdata-gov.tw.rpi.edu%2Fvocab%2Fp%2F1150%2F%3E%0APREFIX+xsd%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%0A%0ASELECT+%3Fstate+(SUM(xsd%3Afloat(%3Fveteran_population))+as+%3Fveteran_state_population)%0AWHERE+%7B%0A++%3Fs+uri%3Astate+%3Fstate+.%0A++%3Fs+uri%3Aveteran_population+%3Fveteran_population+.%0A%7D%0Agroup+by+%3Fstate%0Aorder+by+%3Fstate&output=json";
						var xmlhttp = new XMLHttpRequest();
						xmlhttp.open("GET", queryurl, true);
						xmlhttp.send();

						xmlhttp.onreadystatechange = function() {
							if (xmlhttp.readyState == 4
									&& xmlhttp.status == 200) {
								prepareDataFromJSON(JSON
										.parse(xmlhttp.responseText));
							}
						};

						function prepareDataFromJSON(jsonArray) {

							var length = jsonArray.results.bindings.length;
							var newdata = new google.visualization.DataTable();
							newdata.addColumn('string', 'State');
							newdata.addColumn('number', 'Vetaran Population');

							for (var i = 0; i < length; i++) {
								var stateObject = jsonArray.results.bindings[i];
								var stateName = 'US-' + stateObject.state.value;
								var population = Math
										.round(stateObject.veteran_state_population.value);
								newdata.addRow([ stateName, population ]);
							}
							drawPieChart(newdata)
						}
						;
					}

					function statewiseMedicalStaff() {

						var queryurl = "http://localhost:3030/dataset-1205/query?query=PREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX+uri%3A+%3Chttp%3A%2F%2Fdata-gov.tw.rpi.edu%2Fvocab%2Fp%2F1150%2F%3E%0APREFIX+base%3A+%3Chttp%3A%2F%2Fdata-gov.tw.rpi.edu%2Fvocab%2Fp%2F1202%2F%3E%0APREFIX+xsd%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%0A%0A%0ASELECT+%3Fstate+(SUM(xsd%3Afloat(%3Fstaffing_nursing))+as+%3Fstaff_nursing)+(SUM(xsd%3Afloat(%3Fstaffing_physicians))+as+%3Fstaff_physicians)+(SUM(xsd%3Afloat(%3Fstaffing_other_health_professionals))+as+%3Fstaff_other_health_professionals)%0AWHERE+%7B%0A++%3Fs+base%3Astate+%3Fstate+.%0A++%3Fs+base%3Astaffing_nursing+%3Fstaffing_nursing+.%0A++%3Fs+base%3Astaffing_physicians+%3Fstaffing_physicians+.%0A++%3Fs+base%3Astaffing_other_health_professionals+%3Fstaffing_other_health_professionals+.%0A%7D%0Agroup+by+%3Fstate%0Aorder+by+%3Fstate&output=json";
						var xmlhttp = new XMLHttpRequest();
						xmlhttp.open("GET", queryurl, true);
						xmlhttp.send();

						xmlhttp.onreadystatechange = function() {
							if (xmlhttp.readyState == 4
									&& xmlhttp.status == 200) {
								prepareDataFromJSON(JSON
										.parse(xmlhttp.responseText));
							}
						};

						function prepareDataFromJSON(jsonArray) {

							var length = jsonArray.results.bindings.length;
							var newdata = new google.visualization.DataTable();
							newdata.addColumn('string', 'State');
							newdata.addColumn('number', 'Nursing Staff');
							newdata.addColumn('number', 'Physician Staff');
							newdata.addColumn('number',
									'Other Health Professionals');

							for (var i = 0; i < length; i++) {
								var stateObject = jsonArray.results.bindings[i];
								var stateName = 'US-' + stateObject.state.value;

								var nursingStaff;
								var phyStaff;
								var otherStaff;

								if (typeof (stateObject.staff_nursing) == "undefined")
									nursingStaff = 0;
								else
									nursingStaff = Math
											.round(stateObject.staff_nursing.value);

								if (typeof (stateObject.staff_physicians) == "undefined")
									phyStaff = 0;
								else
									phyStaff = Math
											.round(stateObject.staff_physicians.value);

								if (typeof stateObject.staff_other_health_professionals == "undefined")
									otherStaff = 0;
								else
									otherStaff = Math
											.round(stateObject.staff_other_health_professionals.value);

								newdata.addRow([ stateName, nursingStaff,
										phyStaff, otherStaff ]);
							}
							drawBarChart(newdata)
						}
						;
					}

					$("#compensationSelect").change(function() {
						var str = "";
						str = $("#compensationSelect option:selected").val();
						displayCompensationGraph(str);
					});

					function displayCompensationGraph(str) {
						if (str == '1')
							compensationRatio();
					}

					function compensationRatio() {

						var stateStaff = "http://localhost:3030/dataset-1205/query?query=+%0APREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX+uri%3A+%3Chttp%3A%2F%2Fdata-gov.tw.rpi.edu%2Fvocab%2Fp%2F1150%2F%3E%0APREFIX+base%3A+%3Chttp%3A%2F%2Fdata-gov.tw.rpi.edu%2Fvocab%2Fp%2F1202%2F%3E%0APREFIX+xsd%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%0A%0ASELECT+%3Fstate+(SUM(xsd%3Afloat(%3Fstaffing_nursing))+%2B+SUM(xsd%3Afloat(%3Fstaffing_physicians))+%2B+SUM(xsd%3Afloat(%3Fstaffing_other_health_professionals))+as+%3Ftotal_staffing)%0AWHERE+%7B%0A++%3Fs+base%3Astate+%3Fstate+.%0A++%3Fs+base%3Astaffing_nursing+%3Fstaffing_nursing+.%0A++%3Fs+base%3Astaffing_physicians+%3Fstaffing_physicians+.%0A++%3Fs+base%3Astaffing_other_health_professionals+%3Fstaffing_other_health_professionals+.%0A%7D%0Agroup+by+%3Fstate%0Aorder+by+%3Fstate%0A&output=json";
						var stateComp = "http://localhost:3030/dataset-1154/query?query=PREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX+uri%3A+%3Chttp%3A%2F%2Fdata-gov.tw.rpi.edu%2Fvocab%2Fp%2F1150%2F%3E%0APREFIX+xsd%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%0A%0ASELECT+%3Fstate+(SUM(xsd%3Afloat(%3Fcompensation_pensions))+as+%3FcompensationAndpensions)%0AWHERE+%7B%0A++%3Fs+uri%3Astate+%3Fstate+.%0A++%3Fs+uri%3Acompensation_pensions+%3Fcompensation_pensions+.%0A%7D%0Agroup+by+%3Fstate%0Aorder+by+%3Fstate&output=json";

						var xmlhttp = new XMLHttpRequest();
						xmlhttp.open("GET", stateStaff, true);
						xmlhttp.send();

						var staff;
						var comp;

						xmlhttp.onreadystatechange = function() {
							if (xmlhttp.readyState == 4
									&& xmlhttp.status == 200) {
								var stateStaffJSON = JSON
										.parse(xmlhttp.responseText);
								staff = prepareDataFromJSON1(stateStaffJSON);
							}

						};

						var newdata = new google.visualization.DataTable();
						newdata.addColumn('string', 'State');
						newdata.addColumn('number', 'Per Staff Compensation');

						var xmlhttp1 = new XMLHttpRequest();
						xmlhttp1.open("GET", stateComp, true);
						xmlhttp1.send();

						xmlhttp1.onreadystatechange = function() {
							if (xmlhttp1.readyState == 4
									&& xmlhttp1.status == 200) {
								var stateCompJSON = JSON
										.parse(xmlhttp1.responseText);
								comp = prepareDataFromJSON2(stateCompJSON);

								for (key in staff) {
									if (staff[key] == 0) {
										newdata.addRow([ key, 0 ]);
										// console.log(key + " " + 0);
										continue;
									}

									if (typeof (comp[key]) == "undefined")
										continue;
									newdata
											.addRow([
													key,
													Math.round(comp[key]
															/ staff[key]) ]);
									console.log(key
											+ " "
											+ Math
													.round(comp[key]
															/ staff[key]));
								}
								drawchart(newdata);
							}
						};

						function prepareDataFromJSON1(stateStaffJSON) {

							var stateStaff = new Array();

							var length = stateStaffJSON.results.bindings.length;
							for (var i = 0; i < length; i++) {
								var stateObject = stateStaffJSON.results.bindings[i];
								var stateName = stateObject.state.value;
								var totalStaff;
								if (typeof (stateObject.total_staffing) == "undefined")
									totalStaff = 0;
								else
									totalStaff = Math
											.round(stateObject.total_staffing.value);

								var abbr = getStateAbbr(stateName);
								stateStaff[abbr] = totalStaff;
							}
							return stateStaff;
						}

						function prepareDataFromJSON2(stateCompJSON) {

							var newdata = new google.visualization.DataTable();
							newdata.addColumn('string', 'State');
							newdata.addColumn('number', 'CompensationRatio');

							var stateComp = new Array();

							var length = stateCompJSON.results.bindings.length;

							for (var i = 0; i < length; i++) {
								var stateObject = stateCompJSON.results.bindings[i];
								var stateName = 'US-' + stateObject.state.value;
								var compensation = Math
										.round(stateObject.compensationAndpensions.value);

								stateComp[stateName] = compensation;
							}
							return stateComp;
						}
						;
					}

					$("#patientSelect").change(function() {
						var str = "";
						str = $("#patientSelect option:selected").val();
						displayPatientGraph(str);
					});

					function displayPatientGraph(str) {
						if (str == '1')
							staffRatio();
					}

					function staffRatio() {

						var stateStaff = "http://localhost:3030/dataset-1205/query?query=+%0APREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX+uri%3A+%3Chttp%3A%2F%2Fdata-gov.tw.rpi.edu%2Fvocab%2Fp%2F1150%2F%3E%0APREFIX+base%3A+%3Chttp%3A%2F%2Fdata-gov.tw.rpi.edu%2Fvocab%2Fp%2F1202%2F%3E%0APREFIX+xsd%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%0A%0ASELECT+%3Fstate+(SUM(xsd%3Afloat(%3Fstaffing_nursing))+%2B+SUM(xsd%3Afloat(%3Fstaffing_physicians))+%2B+SUM(xsd%3Afloat(%3Fstaffing_other_health_professionals))+as+%3Ftotal_staffing)%0AWHERE+%7B%0A++%3Fs+base%3Astate+%3Fstate+.%0A++%3Fs+base%3Astaffing_nursing+%3Fstaffing_nursing+.%0A++%3Fs+base%3Astaffing_physicians+%3Fstaffing_physicians+.%0A++%3Fs+base%3Astaffing_other_health_professionals+%3Fstaffing_other_health_professionals+.%0A%7D%0Agroup+by+%3Fstate%0Aorder+by+%3Fstate%0A&output=json";
						var statePatient = "http://localhost:3030/dataset-1154/query?query=PREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX+uri%3A+%3Chttp%3A%2F%2Fdata-gov.tw.rpi.edu%2Fvocab%2Fp%2F1150%2F%3E%0APREFIX+xsd%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%0A%0ASELECT+%3Fstate+(SUM(xsd%3Afloat(%3Funique_patients))+as+%3Funique_patient)%0AWHERE+%7B%0A++%3Fs+uri%3Astate+%3Fstate+.%0A++%3Fs+uri%3Aunique_patients+%3Funique_patients+.%0A%7D%0Agroup+by+%3Fstate%0Aorder+by+%3Fstate%0A&output=json";

						var xmlhttp = new XMLHttpRequest();
						xmlhttp.open("GET", stateStaff, true);
						xmlhttp.send();

						var staff;
						var patient;

						xmlhttp.onreadystatechange = function() {
							if (xmlhttp.readyState == 4
									&& xmlhttp.status == 200) {
								var stateStaffJSON = JSON
										.parse(xmlhttp.responseText);
								staff = prepareDataFromJSON1(stateStaffJSON);
							}

						};

						var newdata = new google.visualization.DataTable();
						newdata.addColumn('string', 'State');
						newdata.addColumn('number', 'Per Staff Patients');

						var xmlhttp1 = new XMLHttpRequest();
						xmlhttp1.open("GET", statePatient, true);
						xmlhttp1.send();

						xmlhttp1.onreadystatechange = function() {
							if (xmlhttp1.readyState == 4
									&& xmlhttp1.status == 200) {
								var statePatientJSON = JSON
										.parse(xmlhttp1.responseText);
								patient = prepareDataFromJSON2(statePatientJSON);

								for (key in staff) {

									if (staff[key] == 0) {
										newdata.addRow([ key, 0 ]);
										continue;
									}

									if (typeof (patient[key]) == "undefined"
											|| typeof (staff[key]) == "undefined")
										continue;

									newdata.addRow([
											key,
											Math.round(patient[key]
													/ staff[key]) ]);
								}

								drawchart(newdata);
							}
						};

						function prepareDataFromJSON1(stateStaffJSON) {

							var stateStaff = new Array();

							var length = stateStaffJSON.results.bindings.length;
							for (var i = 0; i < length; i++) {
								var stateObject = stateStaffJSON.results.bindings[i];
								var stateName = stateObject.state.value;
								var totalStaff;
								if (typeof (stateObject.total_staffing) == "undefined")
									totalStaff = 0;
								else
									totalStaff = Math
											.round(stateObject.total_staffing.value);

								var abbr = getStateAbbr(stateName);
								stateStaff[abbr] = totalStaff;
							}
							return stateStaff;
						}

						function prepareDataFromJSON2(statePatientJSON) {

							var patients = new Array();

							var length = statePatientJSON.results.bindings.length;

							for (var i = 0; i < length; i++) {
								var stateObject = statePatientJSON.results.bindings[i];
								var stateName = 'US-' + stateObject.state.value;
								var unique_patient = Math
										.round(stateObject.unique_patient.value);

								patients[stateName] = unique_patient;
							}
							return patients;
						}
						;
					}

					function getStateAbbr(name) {
						var dict = {};
						dict["AL"] = 'ALABAMA';
						dict["AK"] = 'ALASKA';
						dict["AZ"] = 'ARIZONA';
						dict["AR"] = 'ARKANSAS';
						dict["CA"] = 'CALIFORNIA';
						dict["CO"] = 'COLORADO';
						dict["CT"] = 'CONNECTICUT';
						dict["DE"] = 'DELAWARE';
						dict["FL"] = 'FLORIDA';
						dict["GA"] = 'GEORGIA';
						dict["HI"] = 'HAWAII';
						dict["ID"] = 'IDAHO';
						dict["IL"] = 'ILLINOIS';
						dict["IN"] = 'INDIANA';
						dict["IA"] = 'IOWA';
						dict["KS"] = 'KANSAS';
						dict["KY"] = 'KENTUCKY';
						dict["LA"] = 'LOUISIANA';
						dict["ME"] = 'MAINE';
						dict["MD"] = 'MARYLAND';
						dict["MA"] = 'MASSACHUSETTS';
						dict["MI"] = 'MICHIGAN';
						dict["MN"] = 'MINNESOTA';
						dict["MS"] = 'MISSISSIPPI';
						dict["MO"] = 'MISSOURI';
						dict["MT"] = 'MONTANA';
						dict["NE"] = 'NEBRASKA';
						dict["NV"] = 'NEVADA';
						dict["NH"] = 'NEW HAMPSHIRE';
						dict["NJ"] = 'NEW JERSEY';
						dict["NM"] = 'NEW MEXICO';
						dict["NY"] = 'NEW YORK';
						dict["NC"] = 'NORTH CAROLINA';
						dict["ND"] = 'NORTH DAKOTA';
						dict["OH"] = 'OHIO';
						dict["OK"] = 'OKLAHOMA';
						dict["OR"] = 'OREGON';
						dict["PA"] = 'PENNSYLVANIA';
						dict["RI"] = 'RHODE ISLAND';
						dict["SC"] = 'SOUTH CAROLINA';
						dict["SD"] = 'SOUTH DAKOTA';
						dict["TN"] = 'TENNESSEE';
						dict["TX"] = 'TEXAS';
						dict["UT"] = 'UTAH';
						dict["VT"] = 'VERMONT';
						dict["VA"] = 'VIRGINIA';
						dict["WA"] = 'WASHINGTON';
						dict["WV"] = 'WEST VIRGINIA';
						dict["WI"] = 'WISCONSIN';
						dict["WY"] = 'WYOMING';
						dict["DC"] = 'DISTRICT OF COLUMBIA';
						dict["PR"] = 'PUERTO RICO';

						if (typeof (dict[name]) == "undefined")
							console.log(name);

						return 'US-' + dict[name];
					}

				});