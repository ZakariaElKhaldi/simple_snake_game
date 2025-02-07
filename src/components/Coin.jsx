const Coin = ({ position, cellSize }) => {
   return (
      <div
         className="absolute bg-yellow-400 rounded-full transform 
                    animate-pulse shadow-lg shadow-yellow-400/50
                    border-2 border-yellow-300"
         style={{
            left: position.x * cellSize,
            top: position.y * cellSize,
            width: cellSize,
            height: cellSize,
            zIndex: 2,
         }}
      />
   );
};

export default Coin;
