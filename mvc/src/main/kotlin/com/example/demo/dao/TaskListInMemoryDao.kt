package com.example.demo.dao

import com.example.demo.model.Task
import com.example.demo.model.TaskList
import org.springframework.stereotype.Component

@Component
class TaskListInMemoryDao : TaskListDao {
    private var nextTaskListId:Long = 0
    private var nextTaskId:Long = 0

    private val storage = HashMap<Long, TaskList>()
    private val taskIdToListId = HashMap<Long, Long>()

    override fun getAllLists(): List<TaskList> = storage.values.sortedBy { it.id }

    override fun getList(taskListId: Long): TaskList? = storage[taskListId]

    override fun createTaskList(name: String) {
        val taskListId = nextTaskListId++
        storage[taskListId] = TaskList(taskListId, name)
    }

    override fun deleteTaskList(taskListId: Long) {
        storage.remove(taskListId)
    }

    override fun getTask(taskId: Long): Task? {
        val taskIdStorage = taskIdToListId[taskId] ?: 0

        return storage[taskIdStorage]?.tasks?.first { it.id == taskId }
    }

    override fun createTask(taskListId: Long, name: String, description: String) {
        val taskId = nextTaskId++
        storage[taskListId]?.add(Task(taskId, name, description, false))
        taskIdToListId[taskId] = taskListId
    }

    override fun deleteTask(taskId: Long) {
        val taskIdStorage = taskIdToListId[taskId] ?: 0
        storage[taskIdStorage]?.removeIf { it.id == taskId }
        taskIdToListId.remove(taskId)
    }

    override fun updateTaskStatus(taskId: Long, taskStatus: Boolean) {
        getTask(taskId)?.status = taskStatus
    }

}