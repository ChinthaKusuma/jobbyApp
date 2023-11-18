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
const FilterGroups = props => {
  const {activeSalary, changeSalary, changeType} = props
  //   console.log(activeSalary)
  const getType2 = each => {
    const changeType2 = () => {
      changeType(each.employmentTypeId)
    }
    return (
      <li>
        <form>
          <>
            <input
              type="checkbox"
              id={each.employmentTypeId}
              onChange={changeType2}
            />
            <label htmlFor={each.employmentTypeId} className="label1">
              {each.label}
            </label>
            <br />
          </>
        </form>
      </li>
    )
  }

  const getSalary2 = each => {
    const changeSalary1 = () => {
      console.log(each.salaryRangeId)
      changeSalary(each.salaryRangeId)
    }
    return (
      <li>
        <input
          type="radio"
          id={each.salaryRangeId}
          name="label1"
          onChange={changeSalary1}
        />
        <label htmlFor={each.salaryRangeId} className="label1">
          {each.label}
        </label>
        <br />
      </li>
    )
  }
  return (
    <div>
      <form>
        <h1 className="h11">Type of Employment</h1>
        <ul>{employmentTypesList.map(each => getType2(each))}</ul>
        <hr className="hr1" />
        <h1 className="h11">Salary Range</h1>
        <ul>{salaryRangesList.map(each => getSalary2(each))}</ul>
      </form>
    </div>
  )
}
export default FilterGroups
