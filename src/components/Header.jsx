import logo from "../assets/images/Peas_of_Mind_resize.png"

export const Header = () => {
    return (
        <div className="flex flex-col items-center h-96 justify-evenly mt-10 mx-2">
            <img src={logo} alt="logo" className="w-96"/>
            <h2 className="text-left bg-green-800/30 rounded-lg p-5 border-t border-l shadow-2xl shadow-cyan-800">
            <strong className="text-lg">È ora di esplorare il mondo delle ricette vegetariane!</strong> <br />
            Trova la tua prossima ricetta preferita, sperimenta nuovi sapori e trasforma il tuo modo di mangiare. <br />
            Clicca qui in basso e lasciati guidare per scoprire piatti deliziosi, sani e sostenibili. <br />
            <strong className="text-lg">Dai un tocco verde alla tua tavola!</strong>
            </h2>
        </div>
    )
}
