package com.example.demo.model

data class Task(
        val id: Long,
        val name: String,
        val description: String,
        var status: Boolean
)