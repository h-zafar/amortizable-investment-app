export const ProductImage = ({ offer, classes }) => {
  return (
    <div className={`p-4 m-4 flex items-center justify-center ${classes}`}>
      <img
        src={offer?.images[0]?.originalSrc}
        className="w-full h-96 object-contain"
      />
    </div>
  );
};
