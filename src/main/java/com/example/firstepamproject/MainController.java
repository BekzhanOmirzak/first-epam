package com.example.firstepamproject;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Controller
public class MainController {


    @RequestMapping
    private String mainPage() {
        return "index";
    }

    private List<Student> students = new ArrayList<>(Arrays.asList(
            new Student(UUID.randomUUID(), "Bekzhan", "bekjan.omirzak98@gmail.com", "3655665"),
            new Student(UUID.randomUUID(), "Beksultan", "beksultan.omirzak98@gmail.com", "3655665"),
            new Student(UUID.randomUUID(), "Aydana", "aydana.omirzak98@gmail.com", "3655665"),
            new Student(UUID.randomUUID(), "Balzhan", "balzhan.omirzak98@gmail.com", "3655665"),
            new Student(UUID.randomUUID(), "Balzhan", "balzhan.omirzak98@gmail.com", "3655665"),
            new Student(UUID.randomUUID(), "Balzhan", "balzhan.omirzak98@gmail.com", "3655665"),
            new Student(UUID.randomUUID(), "Balzhan", "balzhan.omirzak98@gmail.com", "3655665"),
            new Student(UUID.randomUUID(), "Aizhan", "aizhan.omirzak98@gmail.com", "3655665")));


    @GetMapping("/list")
    @ResponseBody
    @CrossOrigin
    private List<Student> list() {
        return students;
    }

    @DeleteMapping("/delete")
    @ResponseBody
    @CrossOrigin
    private void deleteStudentByID(@RequestParam UUID uuid) {

        Optional<Student> element = students.stream().filter(s -> s.getUuid().equals(uuid))
                .findFirst();
        students.remove(element.get());

    }

    @GetMapping("/student")
    @ResponseBody
    @CrossOrigin
    private Student student(@RequestParam UUID uuid) {
        Optional<Student> optionalStudent = students.stream().filter(s -> s.getUuid().equals(uuid))
                .findFirst();
        return optionalStudent.get();
    }


    @PutMapping("/update/{uuid}")
    @CrossOrigin
    @ResponseBody
    private void updatingStudent(@RequestBody Student student, @PathVariable("uuid") UUID uuid) {
        Optional<Student> optionalStudent = students.stream().filter(s -> s.getUuid().equals(uuid))
                .findFirst();
        students.remove(optionalStudent.get());
        student.setUuid(uuid);
        students.add(student);
    }

    @PostMapping("/create")
    @CrossOrigin
    @ResponseBody
    private String createStudent(@RequestBody Student student) {
        student.setUuid(UUID.randomUUID());
        students.add(student);
        System.out.println("Response string : " + student.getUuid());
        return student.getUuid() + "";
    }


}
