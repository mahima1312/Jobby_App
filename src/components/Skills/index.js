import './index.css'

const Skills = props => {
  const {skillDetails} = props
  const {name, imageUrl} = skillDetails
  return (
    <li className="skill-list-container">
      <img className="skill-img" src={imageUrl} alt={name} />
      <p className="skill-name">{name}</p>
    </li>
  )
}
export default Skills
