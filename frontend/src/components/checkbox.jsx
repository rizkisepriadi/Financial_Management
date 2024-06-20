export default function checkbox() {
  return (
    <div className="form-control">
      <label className="label cursor-pointer justify-start gap-2">
        <input
          type="checkbox"
          defaultChecked
          className="checkbox checkbox-primary [--chkfg:white]"
        />
        <span className="label-text">Remember me</span>
      </label>
    </div>
  );
}
