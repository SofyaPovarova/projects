package com.example.demo.model

data class TaskList(
        val id: Long,
        val name: String,
        val tasks: MutableList<Task> = mutableListOf()
) : MutableList<Task> by tasks