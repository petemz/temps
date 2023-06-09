const SearchBar = ({keyword, onChange}) => {;
    return (
        <div className="mb-4 lg:mb-0">
            <input 
                className="px-8 h-11 w-full md:64 lg:w-80 border-2 outline-lime-500"
                value={keyword}
                onChange={(e) => onChange(e.target.value)}
                placeholder={'Search Templates'}
            />
        </div>
    );
}
  
export default SearchBar;