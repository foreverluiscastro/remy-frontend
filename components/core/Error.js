export default function Error({ err }) {
  return (
    <div className="flex bg-red-300 rounded-lg gap-2 mb-4 p-4 text-red-900 items-center">
      <span className=" bg-white rounded-xl font-bold grid place-content-center w-5 h-5">
        !
      </span>
      <p>{err}</p>
    </div>
  );
}