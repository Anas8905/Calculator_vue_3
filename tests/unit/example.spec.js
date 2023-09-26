import { mount } from '@vue/test-utils'
import BudgetAccountsSettings from '@/components/BudgetAccountsSettings.vue'

describe('Checking', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(BudgetAccountsSettings)
  })

  it('renders', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
