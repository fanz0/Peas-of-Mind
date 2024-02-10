export const Card = ({id, title, imageSrc}) => {
    return(
        <div key={id} className="shadow-lg shadow-green-500 rounded-lg p-5 mx-2 max-w-80 flex flex-col items-center justify-between hover:scale-105 transition-all duration-105">
            <h2 className="text-center font-bold mb-5">{title}</h2>
            <img className="rounded-xl" src={imageSrc} alt={`${title}-image`} />
        </div>
    )
}