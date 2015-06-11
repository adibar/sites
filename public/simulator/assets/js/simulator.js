// This is the links:
// iphone:
// http://127.0.0.1:8000/static/simulator/index.html?viewas=iphone5-portrait&site=http://127.0.0.1:8000/static/index.html
// ipad:
// http://127.0.0.1:8000/static/simulator/index.html?viewas=ipad-portrait&site=http://127.0.0.1:8000/static/index.html

$(function(){
	var simulator = getUrlParameter('viewas');
	var site = getUrlParameter('site');

	// set simulator style
	$('#simulator_aio').removeClass();
	$('#simulator_aio').addClass('simulator ' + simulator);

	// set simulator url 
	$('#simulatorPage').attr('src', site);

	// simulatorStyle = $("#cboSimulatorStyle").on('change', function(){
	// 	setSimulatorStyle();
	// });
	
	// orientation = $("#cboOrientation").on('change', function(){
	// 	setSimulatorStyle();
	// });
	
	// $('#btnIFrmSrc').on('click',function(e){
	// 	if(confirm("Do you Want to change the simulator's page?")){
	// 		$('#simulatorPage').attr('src', $('#txtIFrmSrc').val());
	// 	}
	// 	e.preventDefault();
	// 	return false;
	// });
	
});

function setSimulatorStyle(){
	var styleClass;
	styleClass = simulatorStyle.val() + '-' + orientation.val();
	$('#simulator_aio').removeClass();
	$('#simulator_aio').addClass('simulator ' + styleClass);
}

function getUrlParameter(sParam)
{
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++) 
  {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == sParam) 
    {
        return sParameterName[1];
    }
  }
}   