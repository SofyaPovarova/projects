package com.example.demo.controller

import com.example.demo.dao.TaskListDao
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestParam

@Controller
class TaskListController(private val dao: TaskListDao) {

    @GetMapping("/task_lists")
    fun getTaskLists(model: Model): String {
        model.addAttribute("task_lists", dao.getAllLists())
        return "index"
    }

    @GetMapping("/task_list")
    fun getTaskList(model: Model, @RequestParam taskListId: Long): String {
        model.addAttribute("task_lists", listOf(dao.getList(taskListId)))
        return "index"
    }

    @PostMapping("/task_list_put")
    fun putTaskList(@RequestParam name: String): String {
        dao.createTaskList(name)
        return "redirect:/task_lists"
    }

    @PostMapping("/task_list_delete")
    fun deleteTaskList(@RequestParam taskListId: Long): String {
        dao.deleteTaskList(taskListId)
        return "redirect:/task_lists"
    }

    @PostMapping("/task_put")
    fun putTask(
            @RequestParam taskListId: Long,
            @RequestParam name: String,
            @RequestParam description: String
    ): String {
        dao.createTask(taskListId, name, description)
        return "redirect:/task_lists"
    }

    @PostMapping("/task_delete")
    fun deleteTask(@RequestParam taskId: Long): String {
        dao.deleteTask(taskId)
        return "redirect:/task_lists"
    }

    @PostMapping("/task")
    fun updateTaskStatus(@RequestParam taskId: Long, @RequestParam taskStatus: Boolean): String {
        dao.updateTaskStatus(taskId, taskStatus)
        return "redirect:/task_lists"
    }

}