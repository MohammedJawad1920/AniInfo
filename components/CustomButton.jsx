

const CustomButton = ({className, title, handleClick}) => {
  return (
    <button className={className} onClick={handleClick}>
      {title}
    </button>
  )
}

export default CustomButton