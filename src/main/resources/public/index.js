var myBlock = (function () {

    let table = document.querySelector(".table-content")
    let name = document.querySelector('.name')
    let email = document.querySelector('.email')
    let phone_number = document.querySelector('.phone_number')
    let button = document.querySelector('.save')
    let add_button = document.querySelector('.add');
    let add_or_edit = document.querySelector('.adding')
    let cur_user_id = ''


    function getListOfStudent() {

        fetch("http://localhost:8080/list").then(response => {
            return response.json()
        }).then(jsons => {

            jsons.forEach(json => {
                insertIntoHTML(json);
            })
        }).catch(reason => {
            console.log('Reason for failure is as follows : ')
            console.log(reason)
        })

    }

    getListOfStudent();

    table.addEventListener('click', event => {
        var id = event.target.id;
        if (id.substring(0, 2) === 'de')
            deleteStudent(id)
        else
            editAddHtml(id);
    });


    var deleteStudent = function (id) {

        var element = document.getElementById(id).parentNode.parentNode.parentNode;

        const url = `http://localhost:8080/delete?uuid=${id.substring(3)}`
        fetch(url, {
            method: 'DELETE'
        }).then(() => {
            table.removeChild(element);
        }).catch(reason => {
            console.log('Reason for failure when making delete request')
            console.log(reason)
        })

    }

    var editAddHtml = function (id) {

        fetch(`http://localhost:8080/student?uuid=${id.substring(3)}`)
            .then(response => {
                return response.json();
            }).then(res => {
                name.value = res.name;
                email.value = res.email;
                phone_number.value = res.phone_number;
                add_or_edit.textContent = 'EDITING'
                cur_user_id = res.uuid;
            }
        ).catch(failure => {
            console.log(failure)
        })

    }
    button.addEventListener('click', function () {

        var cur_student = {
            name: name.value,
            email: email.value,
            phone_number: phone_number.value
        }
        switch (add_or_edit.textContent) {
            case 'ADDING': {

                fetch(`http://localhost:8080/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(cur_student)
                }).then(res => {
                    return res.text()
                }).then(str => {
                    cur_student.uuid = str;
                    insertIntoHTML(cur_student)
                });

            }
                break;
            case 'EDITING': {

                const url = 'http://localhost:8080/update/' + `${cur_user_id}`;

                fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(cur_student)
                }).catch(failure => {
                    console.log(failure)
                })
                updateParticularRowInTable(cur_user_id, cur_student);

            }
                break;
        }

        name.value = ''
        email.value = ''
        phone_number.value = ''


    }, false);

    var insertIntoHTML = function (cur_student) {
        var html = `<tr">
                <td>${cur_student.name}</td>
                <td>${cur_student.email}</td>
                <td>${cur_student.phone_number}</td>
                <td>
                    <button class="edit" id="ed-${cur_student.uuid}">Edit</button>
                    <button class="delete" id="de-${cur_student.uuid}">Delete</button>
                </td>
            </tr>`;
        table.insertAdjacentHTML('beforeend', html)
    }


    add_button.addEventListener('click', function () {

        add_or_edit.textContent = 'ADDING';
        name.value = ''
        email.value = ''
        phone_number.value = ''
    })


    var updateParticularRowInTable = function (id, student) {
        var row = document.getElementById('ed-' + id).parentNode.parentNode;
        row.innerHTML = `<tr>
                    <td>${student.name}</td>
                    <td>${student.email}</td>
                    <td>${student.phone_number}</td>
                    <td>
                        <button class="edit" id="ed-${id}">Edit</button>
                        <button class="delete" id="de-${id}">Delete</button>
                    </td>
                </tr>`
    }



})();
