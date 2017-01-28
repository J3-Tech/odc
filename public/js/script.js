$(document).ready(function(){
    var form = $('form');
    var output = $('#output');
    var info = $('#info');
    var progress = $('.progress');
    var slider = $('.slider');
    if(slider.length){
        slider.slider();
    }
    $('#document-input').on('change', function(e){
        e.preventDefault();
        form.submit();
        progress.removeClass('hide');
    });
});
