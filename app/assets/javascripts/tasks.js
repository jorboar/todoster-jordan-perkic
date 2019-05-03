  var idArray = new Array();
$(function() {

    // The taskHtml method takes in a JavaScript representation
    // of the task and produces an HTML representation using
    // <li> tags
    function taskHtml(task) {
        console.log("RUNNING TASTHTML");

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
            console.log(t1);

        return liElement;
    }


    // toggleTask takes in an HTML representation of the
    // an event that fires from an HTML representation of
    // the toggle checkbox and  performs an API request to toggle
    // the value of the `done` field
    function toggleTask(e) {
      console.log("RUNNING TOGGLE");
      

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
        console.log(task.id);

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
                console.log("i is now: " + i);

                console.log(temp);

                temp.addEventListener('click', function(){
                    
                    console.log("yes");

                    $.ajax({
                        url: ["/tasks/" + data.id],
                        type: 'DELETE',
                            success: function(result) {
                                console.log("did it " + data.id);
                            }
                    });
                    divSelect.style.display = 'none';
                });

        
    	});
    });

  });