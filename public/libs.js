$("#trailer").on('hidden.bs.modal', function (e) { 
 $("#trailer iframe").attr("src", $("#trailer iframe").attr("src"));
});

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  var iframe = $(e.relatedTarget.hash).find('iframe'); 
  var src = iframe.attr('src');
  iframe.attr('src', '');
  iframe.attr('src', src);
});

function setOwl(){
	/*var owl = $("#owl-slider");
	owl.owlCarousel({
		autoPlay: 5000,
		stopOnHover: true,
		itemsCustom : [
			[0, 1],
			[468, 2],
			[600, 2],
			[768, 3],
			[992, 5],
			[1200, 5],
			[1400, 5],
			[1600, 5]
		],
		navigation : true,
		navigationText: [
			"<i class='fa fa-angle-left'></i>",
			"<i class='fa fa-angle-right'></i>"
		],
	});
		
	var owl = $("#owl-related, #owl-cat1, #owl-cat2, #owl-cat3, #owl-cat4");
	owl.owlCarousel({
		stopOnHover: true,
		pagination: false,
		itemsCustom : [
			[0, 1],
			[468, 2],
			[768, 3],
			[992, 4]
		],
		navigation : true,
		navigationText: [
			"<i class='fa fa-angle-left'></i>",
			"<i class='fa fa-angle-right'></i>"
		],
	});*/
}

$(window).on("owl-update", setOwl);

$(document).ready(function() {
	setOwl();
	$(window).scroll(function () {if ($(this).scrollTop() > 0) {$('#scroller').fadeIn();} else {$('#scroller').fadeOut();}});
	$('#scroller').click(function () {$('body,html').animate({scrollTop: 0}, 400); return false;});
	var path = window.location.pathname;
	var wasBeen = false;
	$('#menu-bar nav div[class!="searchbar"] a').each(function(){
		if ($(this).attr('href') == path && !wasBeen)
		{
			$(this).parent().addClass("active");
			wasBeen = true;
		}
	});
	if (!wasBeen)
	{
		$('#menu-bar nav div[class!="searchbar"] a').first().parent().addClass("active");
	}
	
	$('.sociallogin a').on('click',function(){
	   var href = $(this).attr('href');
       var width  = 820;
       var height = 420;
       var left   = (screen.width  - width)/2;
       var top   = (screen.height - height)/2-100;   

       auth_window = window.open(href, 'auth_window', "width="+width+",height="+height+",top="+top+",left="+left+"menubar=no,resizable=no,scrollbars=no,status=no,toolbar=no");
       return false;
	})
});


$(function () {
	//$('[data-toggle="tooltip"]').tooltip();
})