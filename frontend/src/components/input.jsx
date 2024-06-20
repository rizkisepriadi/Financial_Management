// eslint-disable-next-line react/prop-types
export default function Input({ label, ...rest }) {
  return (
    <input
      type="text"
      placeholder={label}
      className="input input-bordered w-[400px] max-w-xs"
      {...rest}
    />
  );
}
