<<<<<<< HEAD
$(function() {
    var Mustache = require('mustache');

    $.getJSON('js/data.json', function(data) {
        var template = $('#speakerstpl').html();
        var html = Mustache.to_html(template, data);
        $('#speakers').html(html);
    }); //getJSON

=======
$(function() {
    var Mustache = require('mustache');

    $.getJSON('js/data.json', function(data) {
        var template = $('#speakerstpl').html();
        var html = Mustache.to_html(template, data);
        $('#speakers').html(html);
    }); //getJSON

>>>>>>> 722ae7c22ad5cc8f894a710f58662c9ca7538a2d
}); //function