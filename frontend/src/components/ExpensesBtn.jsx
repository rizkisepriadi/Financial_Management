import Up from '../assets/Up.svg';
import Right from '../assets/Right.svg';

// eslint-disable-next-line react/prop-types
export default function   ExpensesBtn({ img }) {
  return (
    <>
      <div className="flex items-center py-6">
        <div className="flex gap-3 items-center">
          <div className="p-2 h-[56px] w-[40px] bg-[#D2D2D2] bg-opacity-25 flex">
            <img src={img} alt="" />
          </div>
          <div className="flex gap-1 flex-col">
            <div>
              <h2 className="text-base font-bold capitalize">Housing</h2>
              <h1 className="font-semibold">$160.00</h1>
              <div className='flex gap-2'>
                <p className="text-xs font-normal">15%</p>
                <img src={Up} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="py-2 px-3">
          <img src={Right} alt="" />
        </div>
      </div>
    </>
  );
}
