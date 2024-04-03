import {PieChart, Pie, Cell, Legend} from 'recharts'

import './index.css'

const VaccinationByAge = props => {
  const {vaccinationByAge} = props
  const COLORS = ['#a3df9f', '#f54394', '#5a8dee', '#2cc6c6']

  return (
    <div className="vaccination-by-age-container">
      <h1 className="chart-name">Vaccination by age</h1>
      <PieChart width={1000} height={300}>
        <Legend
          data={vaccinationByAge}
          dataKey="age"
          verticalAlign="bottom"
          align="center"
          iconType="circle"
          wrapperStyle={{fontSize: 12, fontFamily: 'Roboto'}}
        />
        <Pie
          data={vaccinationByAge}
          cx="50%"
          cy="30%"
          outerRadius="60%"
          dataKey="count"
        >
          {vaccinationByAge.map((entry, index) => (
            <Cell
              name={`${entry.age}`}
              key={`cell-${entry}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
      </PieChart>
    </div>
  )
}

export default VaccinationByAge
