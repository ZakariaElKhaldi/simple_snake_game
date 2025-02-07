const Snake = ({ segments, cellSize }) => {
   return segments.map((segment, index) => {
      const isHead = index === 0;
      return (
         <div
            key={index}
            className={`absolute ${isHead ? 'bg-green-400' : 'bg-green-500'} 
                       rounded-sm transform transition-all duration-100
                       shadow-lg ${isHead ? 'scale-105' : ''}`}
            style={{
               left: segment.x * cellSize,
               top: segment.y * cellSize,
               width: cellSize,
               height: cellSize,
               zIndex: isHead ? 3 : 2,
            }}
         />
      );
   });
};

export default Snake;
