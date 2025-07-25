import React from 'react';

function StarRating({ value = 0, onChange = () => {}, readOnly = false }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`text-2xl ${i < value ? 'text-yellow-400' : 'text-white'} ${readOnly ? '' : 'cursor-pointer'}`}
          onClick={() => {
            if (!readOnly) onChange(i + 1);
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default StarRating;
