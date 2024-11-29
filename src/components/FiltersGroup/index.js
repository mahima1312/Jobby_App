import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FiltersGroup = props => {
  const renderTypeOfEmploymentCheckBoxes = () => {
    const {updateEmploymentTypesChecked} = props
    return employmentTypesList.map(eachType => {
      const onChangeType = () =>
        updateEmploymentTypesChecked(eachType.employmentTypeId)

      return (
        <li className="checked-list" key={eachType.employmentTypeId}>
          <input
            className="checked"
            id={eachType.employmentTypeId}
            type="checkbox"
            onChange={onChangeType}
          />
          <label className="label" htmlFor={eachType.employmentTypeId}>
            {eachType.label}
          </label>
        </li>
      )
    })
  }

  const renderTypeOfEmployment = () => (
    <>
      <h1 className="filters-group-heading">Type of Employment</h1>
      <ul className="list-container">{renderTypeOfEmploymentCheckBoxes()}</ul>
    </>
  )

  const renderSalarayRanges = () => {
    const {updateSalaryRange, activeSalaryRangeId} = props
    return salaryRangesList.map(eachSalary => {
      const onChangeRange = () => updateSalaryRange(eachSalary.salaryRangeId)

      const isChecked = eachSalary.salaryRangeId === activeSalaryRangeId

      return (
        <li className="radio-list" key={eachSalary.salaryRangeId}>
          <input
            className="radio"
            id={eachSalary.salaryRangeId}
            type="radio"
            onChange={onChangeRange}
            checked={isChecked}
          />
          <label className="label" htmlFor={eachSalary.salaryRangeId}>
            {eachSalary.label}
          </label>
        </li>
      )
    })
  }

  const renderSalarayRangesList = () => (
    <>
      <h1 className="filters-group-heading">Salary Range</h1>
      <ul className="list-container">{renderSalarayRanges()}</ul>
    </>
  )

  return (
    <div>
      <hr />
      {renderTypeOfEmployment()}
      <hr />
      {renderSalarayRangesList()}
    </div>
  )
}
export default FiltersGroup
