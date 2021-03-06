$(document).ready(function () {
  $.get(
    'actions.php',
    { action: 'get' },
    function (tasks) {
      $.each(tasks, function (index, task) {
        if (task.status == 1)
          buildTask(task.subject, task.id).appendTo('#done');
        else buildTask(task.subject, task.id).appendTo('#tasks');
      });

      $('#done input').attr('checked', 'checked');
      $('h1 span').html($('#tasks li').length);
    },
    'json'
  );

  $('#new-task button').click(function () {
    var task = $('#new-task input').val();

    if (!task) return false;

    $.post(
      'actions.php',
      { action: 'add', subject: task },
      function (res) {
        if (res.err == 1) alert(res.msg);
        else buildTask(task, res.id).appendTo('#tasks');
      },
      'json'
    );

    $('h1 span').html($('#tasks li').length);
    $('#new-task input').val('').focus();
  });

  $('#new-task input').keydown(function (e) {
    if (e.which == 13) $('#new-task button').click();
  });
});

function buildTask(msg, id) {
  var checkbox = $('<input>', {
    type: 'checkbox',
  }).click(function () {
    var task = $(this).parent();
    var task_id = task.data('id');

    if ($(this).is(':checked')) {
      $.post('actions.php', { action: 'done', id: task_id }, function () {
        task.prependTo('#done');
        $('h1 span').html($('#tasks li').length);
      });
    } else {
      $.post('actions.php', { action: 'undo', id: task_id }, function () {
        task.appendTo('#tasks');
        $('h1 span').html($('#tasks li').length);
      });
    }
  });

  var task = $('<span>').text(msg);

  var del = $('<a>', {
    href: '#',
  })
    .html('&times;')
    .click(function () {
      var task = $(this).parent();
      var task_id = task.data('id');
      $.post(
        'actions.php',
        { action: 'del', id: task_id },
        function (res) {
          task.remove();
          $('h1 span').html($('#tasks li').length);
        },
        'json'
      );
    });

  return $('<li>').data('id', id).append(checkbox).append(task).append(del);
}
