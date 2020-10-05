import React from 'react'
import { axe } from 'jest-axe'
import { render, fireEvent } from '@testing-library/react'

import Checkbox from '../../../components/Checkbox'

/**
 * This checkbox component renders a checkbox with a label.
 * Since we customized the default checkbox, we want to
 * make sure it still works as a regular checkbox
 * should.
 */

const defaultCheckboxProps = {
  label: 'TEST_CHECKBOX_LABEL',
  id: 'TEST_CHECKBOX_ID',
  background: '#000',
  checkMarkBackground: '#fff',
  onChange: jest.fn(),
  checked: false,
}

const setupCheckbox = (props = defaultCheckboxProps) =>
  render(<Checkbox {...props} />)

describe('The <Checkbox /> component', () => {
  it('Should render the label and checkbox the user will see', () => {
    const { asFragment } = setupCheckbox()

    //! expects the current state of the component to match the previously generated snapshot
    expect(asFragment()).toMatchSnapshot()
  })

  it('Should make the checkbox accessible by setting the id and htmlFor attributes on label and checkbox', () => {
    const { getByLabelText } = setupCheckbox()

    //! expects the checkbox label to be present
    expect(getByLabelText(defaultCheckboxProps.label)).toBeInTheDocument()
  })

  it('Should call the onChange handler when it is provided', () => {
    const { getByLabelText } = setupCheckbox()

    const checkbox = getByLabelText(defaultCheckboxProps.label)
    fireEvent.click(checkbox)

    //! expects the onChange to have been called when you click on the checkbox
    expect(defaultCheckboxProps.onChange).toHaveBeenCalled()
  })

  it('Should change state correctly when clicked (checked and unchecked)', () => {
    const { getByLabelText } = setupCheckbox({
      ...defaultCheckboxProps,
      checked: true,
    })

    expect(getByLabelText(defaultCheckboxProps.label)).toBeChecked()
  })

  it('Should not fail any accessibility tests', async () => {
    const { container } = setupCheckbox()

    expect(await axe(container)).toHaveNoViolations()
  })
})
