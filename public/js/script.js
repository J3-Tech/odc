$(document).ready(function(){
    var form = $('form');
    var output = $('#output');
    var info = $('#info');
    var progress = $('.progress');
    form.on('submit', function(e) {
        e.preventDefault();
        progress.removeClass('hide');
        $(this).ajaxSubmit({
            error: function(xhr) {
                output.html('Error: ' + xhr.status);
            },
            success: function(data) {
                output.html(data.response).removeClass('hide');
                output.slider();
                progress.addClass('hide');
                info.addClass('hide');
            }
        });
    });
    $('#document-input').on('change', function(e){
        e.preventDefault();
        form.submit();
        form.addClass('hide');
    });
});
