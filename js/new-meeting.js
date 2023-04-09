$(document).ready(function(){
    $('#meetingstart').datetimepicker({
        format: 'YYYY-MM-DD hh:mm'
    });
    $('#meetingend').datetimepicker({
        format: 'hh:mm a'
    });
});