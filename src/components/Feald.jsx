const Field = ({ gridSize, cellSize }) => {
   const cells = [];
   for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
         cells.push(
            <div
               key={`${x}-${y}`}
               className="absolute border border-gray-600 bg-gray-800/50"
               style={{
                  left: x * cellSize,
                  top: y * cellSize,
                  width: cellSize,
                  height: cellSize,
               }}
            />
         );
      }
   }

   return <div className="relative rounded-lg overflow-hidden">{cells}</div>;
};

export default Field;
