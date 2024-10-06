var courseApiUrl = '/api/v1/courses'
var logsApiUrl = '/api/v1/logs'

//load courses
$(function () {
  //jquery ajax
  function getCourses() {
    $.ajax({
      url: courseApiUrl,
      method: 'GET',
      success: function (courses) {
        var select = $('#course');
        $.each(courses, function (i, course) {
          var option = $('<option></option>').text(course.id);
          select.append(option);
        });
      },
      error: function (err) {
        alert(err);
      },
    });
  }

  //textbox hides or displays based on whether course was selected or not
  function handleCourseChange() {
    var selectedOption = $('#course')[0].options[$('#course')[0].selectedIndex];
    selectedOption.value !== '' ? $('#uvuId').show() : $('#uvuId').hide();
  }

  //disable submit till uvuid input
  $('#submit').prop('disabled', true); 
  function validateUVUId() {
    var uvuId = $('#uvuId').val();
    var regex = /^\d{8}$/;
    var submit = $('#submit');
    const error = $('#error');

    if (regex.test(uvuId)) {
      submit.prop('disabled', false).css('background-color', '#275D38');
      error.hide();
      $('ul').show();
      loadLogs(uvuId);
    } else {
      error.show();
      submit.prop('disabled', true).css('background-color', '#a7a8aa');
      $('ul').hide();
    }
  }

  //load logs when it matches correct ID
  async function loadLogs(uvuId) {
    $.ajax({
      url: logsApiUrl,
      method: 'GET',
      success: function (logs) {
        var selectedOption =
          $('#course')[0].options[$('#course')[0].selectedIndex];
        var uvuIdDisplay = $('#uvuIdDisplay');
        $.each(logs, function (i, log) {
          if (uvuId == log.uvuId && selectedOption.value == log.courseId) {
            uvuIdDisplay.text(`Student Logs for ${log.uvuId}`);
            createList(log);
          }
        });
      },
    });
  }

  //display logs
  function createList(log) {
    var dateLi = $('<li></li>').addClass('list-group-item').text(log.date);
    var textLi = $('<li></li>').addClass('list-group-item').text(log.text);
    var listItem = $('<li></li>').append(dateLi, textLi).appendTo($('ul'));

    dateLi.on('click', function () {
      textLi.toggle();
    });
  }

  //create log
  async function submitLog(event) {
    event.preventDefault();
    const text = $('#logInput').val();
    const courseId = $('#course').val()
    const uvuId = $('#uvuId').val()
    if (text !== '') {
      console.log(text)
      //jquery ajax
      $.ajax({
        url: logsApiUrl,
        contentType: 'application/json',
        method: 'POST',
        data: JSON.stringify({
          courseId: courseId,
          uvuId: uvuId,
          date: new Date().toISOString(),
          text: text,
        }),
        success: function () {
          alert('Successfully update log');
        },
        error: function (xhr, status, error) {
          alert('Error:', status, error);
        },
      });
    } else {
      alert('Log cannont be empty');
    }
  }

  //toggle theme
  function toggleTheme() {
    //getting current theme
    var currentTheme = document.body.classList.contains('light-mode')
      ? 'light-mode'
      : 'dark-mode';

    var newTheme = currentTheme === 'light-mode' ? 'dark-mode' : 'light-mode';

    //clearing themes to add new theme
    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add(newTheme);

    //store new theme on local host
    localStorage.setItem('theme', newTheme);

    updateThemeButton(newTheme);
  }

  function updateThemeButton(theme) {
    var toggleButton = $('#lightTheme');
    if (theme === 'light-mode') {
      toggleButton
        .text('Dark')
        .css({ backgroundColor: 'black', color: 'white' });
    } else {
      toggleButton
        .text('Light')
        .css({ backgroundColor: 'white', color: 'black' });
    }
  }

  function applyStoredTheme() {
    const storedTheme = localStorage.getItem('theme') || 'light-mode';
    document.body.classList.add(storedTheme);
    updateThemeButton(storedTheme);
  }

  //initial setup
  function init() {
    getCourses();
    applyStoredTheme();

    $('#course').on('change', handleCourseChange);
    $('#uvuId').on('input', validateUVUId);
    $('#submit').on('click', submitLog);
    $('#lightTheme').on('click', toggleTheme);
  }
  init();
});
