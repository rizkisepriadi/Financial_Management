// eslint-disable-next-line react/prop-types
export default function RecentTransBtn({ img, items, tag, amount, date }) {
  return (
    <>
      <div className="flex justify-between items-center py-6">
        <div className="flex gap-3 items-center">
          <div className="p-2 bg-[#D2D2D2] bg-opacity-25 flex">
            <img src={img} alt="" />
          </div>
          <div className="flex gap-1 flex-col">
            <div>
              <h2 className="text-base font-bold capitalize">{items}</h2>
              <p className="text-xs font-normal capitalize">{tag}</p>
            </div>
          </div>
        </div>
        <div className="py-2 px-3">
          <h1 className="font-semibold">${amount}</h1> 
          <p className="text-xs">{new Date(date).toLocaleDateString()}</p>
        </div>
      </div>
    </>
  );
}
