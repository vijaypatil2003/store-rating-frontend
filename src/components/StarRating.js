function StarRating({ value, onChange, readOnly }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-[22px] leading-none transition-colors duration-100
            ${star <= value ? "text-amber-400" : "text-gray-300"}
            ${readOnly ? "cursor-default" : "cursor-pointer hover:text-amber-400"}
          `}
          onClick={() => !readOnly && onChange && onChange(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default StarRating;
