const SkillCard = props => {
  const {item} = props
  const {imageUrl, name} = item
  return (
    <li className="li1">
      <img src={imageUrl} alt={name} className="img12245" />
      <h1 className="h112">{name}</h1>
    </li>
  )
}
export default SkillCard
