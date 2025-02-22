// TodoForm.spec.js
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import TodoForm from '@/components/TodoForm.vue'

describe('TodoForm.vue', () => {
  it('Show input "title" and checkbox "completed", do not show textarea "notes" when userRole is "free"', () => {
    const wrapper = mount(TodoForm, {
      props: { userRole: 'free' },
    })
    const titleInput = wrapper.find('input[name="title"]')
    expect(titleInput.exists()).toBe(true)

    const completedInput = wrapper.find('input[type="checkbox"][name="completed"]')
    expect(completedInput.exists()).toBe(true)

    const notesTextarea = wrapper.find('textarea[name="notes"]')
    expect(notesTextarea.exists()).toBe(false)
  })

  it('Show textarea "notes" when userRole is "paid"', () => {
    const wrapper = mount(TodoForm, {
      props: { userRole: 'paid' },
    })
    const notesTextarea = wrapper.find('textarea[name="notes"]')
    expect(notesTextarea.exists()).toBe(true)
  })
})
