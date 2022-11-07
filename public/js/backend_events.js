//create list
submit_create_list.addEventListener('click', (event) => { 
    http_request('/create_list', 'POST', JSON.stringify({
        name: name_create_list.value,
        parent_space: active_space
    })).onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            json = JSON.parse(this.response)
            name_create_list.value=""
            if(json.status == 'success'){
                create_list_success(active_space)
            }else if(json.status == 'exists'){
                name_create_list.parentElement.appendChild(document.createTextNode(" This text was added to the DIV."));
            }else{
            }
        }
    }
})
//create space
submit_create_space.addEventListener('click', (event) => { 
    http_request('/create_space', 'POST', JSON.stringify({
        name: name_create_space.value,
    })).onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            json = JSON.parse(this.response)
            name_create_list.value=""
            if(json.status == 'success'){
                create_space_success(json)
            }else if(json.status == 'exists'){

            }else{

            }
        }
    }
})





//change types
types_modal_content.addEventListener('click', (event) => {
    if(event.target.classList.contains('selected_type')){
        http_request('/add_type_to_task', 'POST', JSON.stringify({
            selected_task : selected_task_type,
            type_id : event.target.id,
            parent_workspace : active_space,
            parent_list : active_list,
            parent_task_if_exists : selected_task_parent_task
        })).onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                json = JSON.parse(this.response)
                name_create_list.value=""
                console.log(json)
                if(json.status == 'success'){
                    document.getElementById(selected_task_type).getElementsByClassName('toggle_types_modal')[0].style.backgroundColor = json.color
                    document.getElementById(selected_task_type).getElementsByClassName('toggle_types_modal')[0].innerText = json.name
                    types_modal.classList.add('hidden')
                }else if(json.status == 'exists'){
    
                }else{
    
                }
            }
        }
    }
})
//change categories
categories_modal_content.addEventListener('click', (event) => {
    if(event.target.classList.contains('selected_category')){
        http_request('/add_category_to_task', 'POST', JSON.stringify({
            selected_task : selected_task,
            category_id : event.target.id,
            parent_workspace : active_space,
            parent_list : active_list,
            parent_task_if_exists : selected_task_parent_task
        })).onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                json = JSON.parse(this.response)
                name_create_list.value=""
                console.log(json)
                if(json.status == 'success'){
                    document.getElementById(selected_task).firstElementChild.firstElementChild.firstElementChild.style.backgroundColor = json.color
                    document.getElementById(selected_task).firstElementChild.firstElementChild.style.borderColor = json.color
                    categories_modal.classList.add('hidden')
                }else if(json.status == 'exists'){
    
                }else{
    
                }
            }
        }
    }
})





//add tags
tags_modal_content.addEventListener('click', (event) => {
    if(event.target.classList.contains('selected_tag')){
        /*if(document.getElementById(selected_task).getElementsByClassName('tags_container')[0].(event.target.id)){
            console.log('it exist')
        }*/
        http_request('/add_tag_to_task', 'POST', JSON.stringify({
            selected_task : selected_task,
            tag_id : event.target.id,
            parent_workspace : active_space,
            parent_list : active_list,
            parent_task_if_exists : selected_task_parent_task
        })).onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                json = JSON.parse(this.response)
                name_create_list.value=""
                if(json.status == 'success'){
                    document.getElementById(selected_task).getElementsByClassName('tags_container')[0].insertAdjacentHTML('beforeend', '<div class="mx-2 px-1 rounded-md flex flex-row" style="background-color: '+json.color+'"> '+json.name+' <div id="'+json.id+'" class="px-1 ml-1 remove_tag hover:bg-red-600 rounded-md">X</div> </div>')
                    tags_modal.classList.add('hidden')
                }else if(json.status == 'exists'){
    
                }else{
    
                }
            }
        }
    }
})
//remove tags
const remove_tag = (arg) => {
    http_request('/remove_tag_from_task', 'POST', JSON.stringify({
        selected_task : selected_task,
        tag_id : arg.id,
        parent_workspace : active_space,
        parent_list : active_list,
        parent_task_if_exists : selected_task_parent_task
    })).onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            json = JSON.parse(this.response)
            name_create_list.value=""
            console.log(json)
            if(json.status == 'success'){
                arg.parentElement.remove()
                show_success_modal()
            }else if(json.status == 'exists'){

            }else{

            }
        }
    }
}



//create sub task
const create_sub_task_in_list = () => {
    http_request('/create_new_sub_task_in_list', 'POST', JSON.stringify({
        name: new_task_name.value,
        parent_workspace : active_space,
        parent_list : active_list,
        parent_task : selected_task_parent_task,
    })).onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            json = JSON.parse(this.response)
            name_create_list.value=""
            console.log(json)
            if(json.status == 'success'){
                new_task_name.insertAdjacentHTML('beforebegin', new_task_name.value)
                new_task_name.remove()
                document.getElementById('remove_on_error').id = json.id
                show_success_modal()
            }else if(json.status == 'exists'){

            }else{

            }
        }
    }
}





//create task in list of tasks
const create_task_in_list = () => {
    http_request('/create_new_task_in_list', 'POST', JSON.stringify({
        name: new_task_name.value,
        parent_workspace : active_space,
        parent_list : active_list,
    })).onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            json = JSON.parse(this.response)
            name_create_list.value=""
            console.log(json)
            if(json.status == 'success'){
                console.log(json)
                new_task_name.insertAdjacentHTML('beforebegin', new_task_name.value)
                new_task_name.remove()
                document.getElementById('remove_on_error').id = json.id
                success_modal.classList.remove('hidden')
                show_success_modal()
            }else if(json.status == 'denied'){
                document.getElementById('remove_on_error').remove()
            }else{
                alert('error, please check your internet connection')
            }
        }
    }
}