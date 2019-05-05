var idArray = new Array();
var t1 = document.getElementsByClassName("taskbutton"); //taskbutton array
var t2 = document.getElementsByClassName("view"); //view class array
var i = 0;

$(window).bind("load", function() {

    for(i = 0; i < t1.length; i++){
      
      let idNumber = idArray[i];
      let divSelect = t2[i];

      t1[i].addEventListener('click', function(){
    
        $.ajax({
            url: ["/tasks/" + idNumber],
            type: 'DELETE',
              success: function(result) {
                  
              }
        });
        divSelect.style.display = 'none';
      });
    }
});


$(function() {
    // takes in a JavaScript representation of the task and produces an HTML 
    // representation using <li> tags
    function taskHtml(task) {
        var checkedStatus = task.done ? "checked" : "";
        var liClass = task.done ? "completed" : "";
        var liElement = '<li id="listItem-' + task.id +'" class="' + liClass + '">' +
          '<div class="view"><input class="toggle" type="checkbox"' +
            " data-id='" + task.id + "'" +
            checkedStatus +
            '><label>' +
             task.title +
             '</label><button class="taskbutton">DELETE</button></div></li>';

            idArray.push(task.id);
            var t1 = document.getElementsByClassName("taskbutton");

        return liElement;
    }


    function toggleTask(e) {

      var itemId = $(e.target).data("id");
      var doneValue = Boolean($(e.target).is(':checked'));

      $.post("/tasks/" + itemId, {
        _method: "PUT",
        task: {
          done: doneValue
        }
      }).success(function(data) {
        var liHtml = taskHtml(data);
        var $li = $("#listItem-" + data.id);
        $li.replaceWith(liHtml);
        $('.toggle').change(toggleTask);
      });
    }

    $.get("/tasks").success( function( data ) {
      var htmlString = "";

      $.each(data, function(index,  task) {
        htmlString += taskHtml(task);

      });
      var ulTodos = $('.todo-list');
      ulTodos.html(htmlString);

      $('.toggle').change(toggleTask);

    });

    $('#new-form').submit(function(event){
    	event.preventDefault();
    	var textbox = $('.new-todo');
    	var payload = {
    		task: {
    			title: textbox.val()
    		}
    	};
    	$.post("/tasks", payload).success(function(data){
    		
            var htmlString = taskHtml(data);
    		
            var ulTodos = $('.todo-list');
            ulTodos.append(htmlString);
            $('.toggle').click(toggleTask);
            $('.new-todo').val('');


            let temp = t1[i];
            let divSelect = t2[i];
                i++;

                temp.addEventListener('click', function(){
            
                    $.ajax({
                        url: ["/tasks/" + data.id],
                        type: 'DELETE',
                            success: function(result) {
               
                            }
                    });
                    divSelect.style.display = 'none';
                });

        
    	});
    });

  });