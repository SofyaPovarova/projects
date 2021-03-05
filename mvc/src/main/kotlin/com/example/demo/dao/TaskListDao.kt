package com.example.demo.dao

import com.example.demo.model.Task
import com.example.demo.model.TaskList


interface TaskListDao {
    fun getAllLists(): List<TaskList>
    fun getList(taskListId: Long): TaskList?
    fun createTaskList(name: String)
    fun deleteTaskList(taskListId: Long)

    fun getTask(taskId: Long): Task?
    fun createTask(taskListId: Long, name: String, description: String)
    fun deleteTask(taskId: Long)
    fun updateTaskStatus(taskId: Long, taskStatus: Boolean)

}