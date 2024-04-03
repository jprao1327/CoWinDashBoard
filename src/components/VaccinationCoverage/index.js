import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {last7DaysVaccinationDetails} = props

  const dataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="vaccination-by-coverage-container">
      <h1 className="chart-name">Vaccination Coverage</h1>
      <BarChart
        data={last7DaysVaccinationDetails}
        margin={{
          top: 5,
        }}
        width={1000}
        height={300}
      >
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: 'gray',
            strokeWidth: 1,
            fontFamily: 'Roboto',
            fontSize: 15,
          }}
        />
        <YAxis
          tickFormatter={dataFormatter}
          tick={{
            stroke: 'gray',
            strokeWidth: 0,
            fontFamily: 'Roboto',
            fontSize: 15,
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
            fontFamily: 'Roboto',
            fontSize: 15,
            textAlign: 'center',
          }}
        />
        <Bar
          dataKey="dose1"
          name="Dose 1"
          fill="#5a8dee"
          barSize="20%"
          radius={[10, 10, 0, 0]}
        />
        <Bar
          dataKey="dose2"
          name="Dose 2"
          fill=" #f54394"
          barSize="20%"
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
