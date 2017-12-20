//Create a new Vue instance
new Vue({
    el: "#app",
    data: {
        newTodo: "",
        todoList: [],
        removed: null
    },
    computed: {
        areAllSelected: function() {
            return this.todoList.every(function(todo) {
                return todo.checked;
            }) && this.todoList.length > 0;
        },
    },
    methods: {
        getAllTodo: function () {
            this.todoList = [];
            axios.get('http://127.0.0.1:8000/getall').then((res) => {
                for(var i of res.data) {
                    this.todoList.push({ 
                        id: i._id,
                        text: i.text,
                        label: i.label,
                        checked: i.status || false
                    }); 
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        addTodo: function() {
            var todo = this.newTodo.trim();
            if (todo) {
                var newDo = { 
                    text: todo,
                    label: "",
                    checked: false
                }
                axios({
                    method: 'post',
                    url: 'http://127.0.0.1:8000/push',
                    data: newDo
                }).then((res) => {
                    console.log(res);
                    this.getAllTodo();
                }).catch((err) => {
                    console.log(err);
                })
                // this.todoList.push(newDo);
                // this.newTodo = "";
            }
        },
        removeTodo: function (todo) {
            var index = this.todoList.indexOf(todo);
            var id = this.todoList[index].id;
            axios.delete('http:127.0.0.1:8000/pop/'+id).then((res) => {
                this.removed = res.data.text;
                this.getAllTodo();
            }).catch((err) => {
                this.removed = "none!"
            })
            
            // this.todoList.splice(index, 1);
        },
        clearList: function () {
            alert('Do you really want to clear ?');
            this.todoList = [];
        },
        selectAll: function(todo) {
            var targetValue = this.areAllSelected ? false : true;
            var length = this.todoList.length;
            for (var i = 0; i < length; i++) {
                this.todoList[i].checked = targetValue;
            }
        }
    },
    beforeMount () {
        this.getAllTodo();
    }
});