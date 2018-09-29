$(document).ready(function(){        
    $('#Home').load('home.html');
    $('#Brands').load('brands.html');
    $('#Devices').load('devices.html'); 
    $('#internal').load('internal.html'); 
    
});

var stamp = 0;
jQuery(function ($) {
   
    $(document).click(function(){ 
    if($('#Devices').hasClass('active'))
    {
        $(document).on('scroll', function () {
            //console.log(($("#pe_device_container").innerHeight()-$(".navbar").innerHeight()-$(".header-container").innerHeight()-//$("#device_search").innerHeight()-$(".pe_divider").innerHeight()-31)-$(this).scrollTop());
            
            if(($("#pe_device_container").innerHeight()-$(".navbar").innerHeight()-$(".header-container").innerHeight()-$("#device_search").innerHeight()-$(".pe_divider").innerHeight()-31)-$(this).scrollTop()<100){
                if(stamp == 0){
                    getDevices(false);  
                    stamp = 1;
                }
            }                                            
        });
    }
    });
    
});