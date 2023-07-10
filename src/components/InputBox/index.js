const InputBox = ({ title, value, minValue, maxValue, setValue, pending }) => {
    const changeHandler = (e) => {
        if(pending) return;
        
        let val = Number(e.target.value);
        val = val < minValue ? minValue : val > maxValue ? maxValue : Number(val.toFixed(2)).toString();
        setValue(val)
    }

    return (
        <>
            <label className="block text-sm md:text-base font-medium leading-6 text-white">{title}</label>
            <div className="relative mt-2">
                <input 
                    type="number" 
                    className={`relative w-full rounded-md bg-white py-1.5 md:py-2 px-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none text-sm md:text-base leading-6 ${pending ? 'opacity-70 cursor-not-allowed' : 'cursor-default focus:ring-2 focus:ring-indigo-500'}`}
                    value={value}
                    onChange={(e) => changeHandler(e)}
                />
            </div>
        </>
    )
}

export default InputBox;