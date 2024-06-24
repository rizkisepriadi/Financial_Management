// eslint-disable-next-line react/prop-types
export default function NavBtn({ Link, icon, text, ...props }) {
  return (
    <button 
      className="flex mb-2 rounded w-full text-white focus:bg-primary py-3 px-4 items-center"
      {...props}
    >
      <a href={Link} className="flex gap-4 items-center">
        <img src={icon} alt="" />
        <p className="font-semibold text-base">{text}</p>
      </a>
    </button> 
  );
}
 