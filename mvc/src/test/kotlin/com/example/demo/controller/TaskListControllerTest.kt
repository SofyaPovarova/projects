package com.example.demo.controller

import org.hamcrest.CoreMatchers.containsString
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.context.annotation.ComponentScan
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import org.springframework.http.MediaType.*
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*


@WebMvcTest
@ComponentScan("com.example.demo")
class TaskListControllerTest(@Autowired val mockMvc: MockMvc) {

    @Test
    fun `add list`() {
        val name = "List1"

        mockMvc.perform(post("/task_list_put").contentType(APPLICATION_FORM_URLENCODED)
            .content("name=$name"))
            .andExpect(status().is3xxRedirection)

        mockMvc.perform(get("/task_lists"))
            .andExpect(status().isOk)
            .andExpect(
                content().string(org.hamcrest.Matchers.containsString("name"))
            )
    }

    @Test
    fun `add several lists`() {
        listOf(1, 2, 3).forEach {
            mockMvc.perform(post("/task_list_put").contentType(APPLICATION_FORM_URLENCODED)
                .content("name=${it}List"))
                .andExpect(status().is3xxRedirection)
        }

        listOf(1, 2, 3).forEach {
            mockMvc.perform(get("/task_lists"))
                .andExpect(status().isOk)
                .andExpect(
                    content().string(org.hamcrest.Matchers.containsString("${it}List"))
                )
        }
    }

    @Test
    fun `add tasks`() {
        listOf(1, 2, 3).forEach {
            mockMvc.perform(post("/task_list_put").contentType(APPLICATION_FORM_URLENCODED)
                .content("name=${it}List"))
                .andExpect(status().is3xxRedirection)
        }

        listOf(1, 2, 3).forEach {
            mockMvc.perform(post("/task_put").contentType(APPLICATION_FORM_URLENCODED)
                .content("taskListId=${it-1}&name=${it}Task&description=description"))
                .andExpect(status().is3xxRedirection)
        }

        listOf(1, 2, 3).forEach {
            mockMvc.perform(get("/task_lists"))
                .andExpect(status().isOk)
                .andExpect(
                    content().string(org.hamcrest.Matchers.containsString("${it}Task"))
                )
        }
    }

    @Test
    fun `delete tasks`() {
        listOf(1, 2, 3).forEach {
            mockMvc.perform(post("/task_list_put").contentType(APPLICATION_FORM_URLENCODED)
                .content("name=${it}List"))
                .andExpect(status().is3xxRedirection)
        }

        listOf(1, 2, 3).forEach {
            mockMvc.perform(post("/task_put").contentType(APPLICATION_FORM_URLENCODED)
                .content("taskListId=${it-1}&name=${it}Task&description=description"))
                .andExpect(status().is3xxRedirection)
        }

        listOf(1, 2, 3).forEach {
            mockMvc.perform(post("/task_delete").contentType(APPLICATION_FORM_URLENCODED)
                .content("taskId=${it-1}"))
                .andExpect(status().is3xxRedirection)
        }

        listOf(1, 2, 3).forEach {
            mockMvc.perform(get("/task_lists"))
                .andExpect(status().isOk)
                .andExpect(
                    content().string(org.hamcrest.Matchers.not(containsString("${it}Task")))
                )
        }
    }

    @Test
    fun `delete task list`() {
        listOf(1, 2, 3).forEach {
            mockMvc.perform(post("/task_list_put").contentType(APPLICATION_FORM_URLENCODED)
                .content("name=${it}List"))
                .andExpect(status().is3xxRedirection)
        }

        listOf(1, 2, 3).forEach {
            mockMvc.perform(post("/task_put").contentType(APPLICATION_FORM_URLENCODED)
                .content("taskListId=${it-1}&name=${it}Task&description=description"))
                .andExpect(status().is3xxRedirection)
        }

        mockMvc.perform(post("/task_list_delete").contentType(APPLICATION_FORM_URLENCODED)
            .content("taskListId=0"))
            .andExpect(status().is3xxRedirection)

        mockMvc.perform(get("/task_lists"))
            .andExpect(status().isOk)
            .andExpect(
                content().string(org.hamcrest.Matchers.not(containsString("1Task")))
            )

        listOf(2, 3).forEach {
            mockMvc.perform(get("/task_lists"))
                .andExpect(status().isOk)
                .andExpect(
                    content().string(org.hamcrest.Matchers.containsString("${it}Task"))
                )
        }
    }
}