// @ts-check
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
    // @ts-ignore
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

    // @ts-ignore
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
          // @ts-ignore
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
  async function createList(log) {
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
    const courseId = $('#course').val()
    const uvuId = $('#uvuId').val()
    const date = formatDate(new Date().toISOString())
    const text = $('#logInput').val();
    if (text !== '') {
      //jquery ajax
      try {
        await $.ajax({
          url: logsApiUrl,
          contentType: 'application/json',
          method: 'POST',
          data: JSON.stringify({
            courseId: courseId,
            uvuId: uvuId,
            date: date,
            text: text,
          }),
          success: function () {
            alert('Successfully update log');
        }
      })
      loadLogs(uvuId)
      } catch (error) {
          // @ts-ignore
          alert('Error:', error);
      };
    } 
    else {
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

  //update theme button based on current theme
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

  //format date (mm/dd/yyyy, time)
  function formatDate(isoString) {
    const date = new Date(isoString);
  
    // Extract date components
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
  
    // Determine AM/PM suffix
    const ampm = hours >= 12 ? 'PM' : 'AM';

    const formattedHours = hours % 12 || 12; 
    const formattedMinutes = String(minutes).padStart(2, '0'); 
  
    // Construct the formatted date string
    return `${month}/${day}/${year}, ${formattedHours}:${formattedMinutes}:${seconds} ${ampm}`;
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
