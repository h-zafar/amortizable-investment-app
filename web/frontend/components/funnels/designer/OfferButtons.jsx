export const OfferButtons = () => {
  return (
    <div className="p-4 m-4 flex flex-col lg:flex-row gap-4 items-center justify-center ">
      <button className="flex-1 p-4 rounded border font-bold text-[#3579b9]">
        No Thanks
      </button>
      <button className="flex-1 p-4 rounded bg-[#3579b9] text-white font-bold">
        Pay Now . {"{total price}"}
      </button>
    </div>
  );
};
