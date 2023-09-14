import { useState, useEffect } from "react";

const App = () => {
  const [enable, setEnable] = useState(false);
  const [position, setPosition] = useState({x: 0, y: 0})


  useEffect(() => {
    const handleMove = (e) => {
      const { clientY, clientX } = e
      setPosition({x: clientX, y:clientY})//una buena practica es inicialzar los estados con valores que sabemos que vamos a manejar con ese estado. en el caso de que no sepamos que valor vamos a manejar, ponemos null
    } 
    
    if(enable) window.addEventListener("pointermove", handleMove)
    
    //cleanup
    return () => window.removeEventListener('pointermove', handleMove)//esto funciona como cleaner, limpiar una suscripcion de evento anterior. se ejecuta cada vez que se desmonta el componente y cada vez que la dependencia cambie
  }, [enable]);//se ejecuta el efecto cada vez que cambie el estado de enable

  const handlePointer = () => {
    setEnable(!enable);
  };


  useEffect(() => {
    document.body.classList.toggle('no-cursor', enable)//cuando enable sea true

    return () => document.body.classList.remove('no-cursor')//cleanup

  }, [enable])

  return (
    <div className="h-[100vh] w-[100vw] bg-green-200 flex justify-center items-center">
      <div className="absolute -left-20 -top-20 w-10 h-10 opacity-[0.8] pointer-events-none bg-blue-500 rounded-[50%]  " style={{transform: `translate(${position.x}px, ${position.y}px)`}}/>
      <button
        onClick={handlePointer}
        className="p-4 rounded-lg bg-gray-600 text-white"
      >
        {enable ? "Desactivate " : "Activate "}follow pointer
      </button>
    </div>
  );
};

export default App;
