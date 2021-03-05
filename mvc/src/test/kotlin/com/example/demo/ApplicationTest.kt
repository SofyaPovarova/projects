package com.example.demo

import org.assertj.core.api.Assertions
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.client.getForEntity
import org.springframework.http.HttpStatus

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
internal class ApplicationTest(@Autowired val restTemplate: TestRestTemplate) {

    @Test
    @kotlin.jvm.Throws(Exception::class)
    fun shouldReturnDefaultMessage() {
        val entity = restTemplate.getForEntity<String>("/")
        Assertions.assertThat(entity.statusCode).isEqualTo(HttpStatus.OK)
        Assertions.assertThat(entity.body).contains("ToDo lists")
    }
}