type PROPS = {
  city: string;
  findCity: (value: string) => void;
};

export default function SearchHistory({ city, findCity }: PROPS) {
  return (
    <button
      className="w-[96%] p-1 m-2 rounded-lg bg-none hover:bg-[hsl(243,23%,24%)] cursor-pointer"
      onClick={() => findCity(city)}
    >
      <h1 className="text-xs text-start p-1">{city}</h1>
    </button>
  );
}
