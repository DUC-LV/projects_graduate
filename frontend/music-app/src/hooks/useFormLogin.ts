import React, { useState } from 'react';

const useFormLogin = (initialValue: string) => {

	const [value, setValue] = useState(initialValue);
	const handleChange = (e:any) => {
		setValue(e.target.value);
	}
	return {
		value,
		onChange: handleChange
	}

}

export default useFormLogin;
