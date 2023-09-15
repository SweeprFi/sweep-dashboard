const InputBox = ({ className, title, value, minValue, maxValue, setValue, pending }) => {
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
                    className={`relative w-full rounded-md py-1 text-left text-white focus:outline-none leading-6 ${className} ${pending ? 'opacity-70 cursor-not-allowed' : 'cursor-text'}`}
                    value={value}
                    onChange={(e) => changeHandler(e)}
                />
            </div>
        </>
    )
}

export default InputBox;