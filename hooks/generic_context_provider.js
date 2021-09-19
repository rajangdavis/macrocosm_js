import {createContext, useState} from 'react';

export default function GenericContextProvider(initialState, updateState){
	const GenericContext = createContext(initialState);

	const GenericProvider = ({children, initialConfig=initialState })=>{
		
		return (
			<GenericContext.Provider value={{ initialConfig, updateState}}>
				{children}
			</GenericContext.Provider>
		)
	}

	return {context: GenericContext, provider: GenericProvider};
}