package com.example.todobackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class TaskController {

    @Autowired
    TaskRepository taskRepository;

    @GetMapping("/task/getAll")
    public List<Task> getAllTasks(){
        final List<Task> tasklist = new ArrayList<>();
        Iterable<Task> iterable = taskRepository.findAll();
        iterable.forEach(tasklist::add);
        for(Task t : tasklist){
            System.out.println(t.getTask());
        }
        return tasklist;

    }

    @PostMapping("/task")
    public Task createTask(@RequestBody Task task){
        return taskRepository.save(task);
    }

    @PostMapping("/task/completed")
    public ResponseEntity<Task> completedTask(@RequestBody List<Task> tasklist){
        taskRepository.deleteAll();

        for(Task t:tasklist){
            taskRepository.save(t);
        }
        Iterable<Task> task= taskRepository.findAll();
        Iterator<Task> tasklist1 = tasklist.iterator();
        int check=0;
        while(tasklist1.hasNext()){
            Task t1 = task.iterator().next();
            Task t2 = tasklist.iterator().next();
            if(t1.getTask().equals(t2.getTask())){
                check++;
            }
        }
        if(check==tasklist.size()){
            return new ResponseEntity("task has been added", HttpStatus.OK);
        }
        return new ResponseEntity("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);

    }

    @DeleteMapping("/task/{id}")
    public ResponseEntity<Task> deleteTask(@PathVariable(value = "id") Long id){
        Optional<Task> task= taskRepository.findById(id);

        if(task.isPresent()){
            taskRepository.delete(task.get());
            return new ResponseEntity("task has been deleted", HttpStatus.OK);
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }
}
