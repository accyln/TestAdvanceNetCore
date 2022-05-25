import React,{ useContext,useReducer,useState,createContext } from "react";

export const AdvanceLayerContext=createContext();

export const AdvanceLayer= ({initialState,reducer,children})=> (
    <AdvanceLayerContext.Provider value={useReducer(reducer,initialState)}>
         {children}
    </AdvanceLayerContext.Provider>
)

export const useAdvanceLayerValue=()=>useContext(AdvanceLayerContext);