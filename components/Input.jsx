export const Input = ({ type, value , ...rest }) => {
    return (
        <input type={type || 'text'}  value={value} className='rounded-full w-11/12 py-3 mb-6 px-6 outline-none text-[#00070d] md:max-lg:py-2' {...rest} />
    )
}
