package com.example.demo.dao

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

internal class TaskListInMemoryDaoTest {
    private lateinit var dao: TaskListInMemoryDao

    @BeforeEach
    fun setUp () {
        dao = TaskListInMemoryDao()
    }

    //@Epic("JDJDJ")
    @Test
    fun `empty state`() {
        val allLists = dao.getAllLists()
        assertEquals(0, allLists.size)
    }

    @Test
    fun `add a list`() {
        dao.createTaskList("firstList")
        val allLists = dao.getAllLists()
        assertEquals(1, allLists.size)
        assertEquals(allLists[0].name, "firstList")
    }

    @Test
    fun `add a list and a task`() {
        dao.createTaskList("firstList")
        val id = dao.getAllLists()[0].id

        dao.createTask(id, "1Task", "description")
        assertEquals(1,  dao.getAllLists().size)
        val taskId = 0L
        assertNotNull(dao.getTask(taskId))
        dao.getTask(taskId)?.let {
            assertEquals("1Task",  it.name)
        }
    }

    @Test
    fun `add several tasks in 2 lists`() {
        dao.createTaskList("firstList")
        val idFirst = dao.getAllLists()[0].id
        dao.createTaskList("secondList")
        val idSecond = dao.getAllLists()[1].id

        for (i in 0..10) {
            val selectedId = if (i % 2 == 0) idFirst else idSecond
            dao.createTask(selectedId, "${i}Task", "description")
        }

        assertEquals(2,  dao.getAllLists().size)
        for (i in 0L..10L) {
            val selectedId = if (i % 2 == 0L) idFirst else idSecond
            val taskId = 0
            assertNotNull(dao.getTask(i))
            dao.getTask(i)?.let {
                assertEquals("${i}Task",  it.name)
                assertEquals(false,  it.status)
                assertEquals("description",  it.description)
            }
        }
    }

    @Test
    fun `update task status`() {
        dao.createTaskList("firstList")
        val idFirst = dao.getAllLists()[0].id
        for (i in 0..10) {
            dao.createTask(idFirst, "${i}Task", "description")
        }

        for (i in 0L..10L) {
            dao.updateTaskStatus(i, true)
            assertNotNull(dao.getTask(i))
            dao.getTask(i)?.let {
                assertEquals("${i}Task",  it.name)
                assertEquals(true,  it.status)
                assertEquals("description",  it.description)
            }
        }
    }

    @Test
    fun `add several tasks in 2 lists and delete 1 list`() {
        dao.createTaskList("firstList")
        val idFirst = dao.getAllLists()[0].id //таски с четными номерами
        dao.createTaskList("secondList")
        val idSecond = dao.getAllLists()[1].id

        for (i in 0..10) {
            val selectedId = if (i % 2 == 0) idFirst else idSecond
            dao.createTask(selectedId, "${i}Task", "description")
        }

        dao.deleteTaskList(idSecond)
        assertEquals(1,  dao.getAllLists().size)
        for (i in 0L..10L) {
            if (i % 2 == 0L) {
                assertNotNull(dao.getTask(i))
                dao.getTask(i)?.let {
                    assertEquals("${i}Task",  it.name)
                    assertEquals(false,  it.status)
                    assertEquals("description",  it.description)
                }
            } else {
                assertNull(dao.getTask(i))
            }
        }
    }
}