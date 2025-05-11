function Header({title, description}) {
    return ( <div className="pb-2  px-6 pt-10 ">
        <h2 className="text-dark text-center uppercase weight-medium pb-4">{title}</h2>
        <p className="text-grey text-center capitalize weight-regular lg:px-10 ">{description}</p>
    </div> );
}
export default Header;