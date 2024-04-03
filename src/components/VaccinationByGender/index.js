import {PieChart, Pie, Cell, Legend} from 'recharts'
import './index.css'

const VaccinationByGender = props => {
  const {vaccinationByGender} = props
  const COLORS = ['#f54394', '#5a8dee', '#2cc6c6']

  return (
    <div className="vaccination-bg-gender-container">
      <h1 className="chart-name">Vaccination by gender</h1>
      <PieChart width={1000} height={300}>
        <Legend
          verticalAlign="bottom"
          align="center"
          iconType="circle"
          layout="horizontal"
          wrapperStyle={{fontSize: 12, fontFamily: 'Roboto'}}
        />
        <Pie
          dataKey="count"
          startAngle={180}
          endAngle={0}
          data={vaccinationByGender}
          cx="50%"
          cy="50%"
          outerRadius="60%"
          innerRadius="30%"
          label
        >
          {vaccinationByGender.map((entry, index) => (
            <Cell
              key={`cell-${entry}`}
              name={entry.gender}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
      </PieChart>
    </div>
  )
}

export default VaccinationByGender
