"use client"

export const initialStateRecording = {
    userRecording:false,
    iaPlayerAudio:false,
    userPlayerAudio:false,
  }


export const recordingReducer = (state, action)=>{
    switch (action.type) {
      case "USER-START-RECORDING":
        return{
          ...state,
          userRecording:true,
          iaPlayerAudio:false,
          userPlayerAudio:false,
        }

        case "USER-STOP-RECORDING":
            return{
              ...state,
              userRecording:false,
              iaPlayerAudio:false,
              userPlayerAudio:false,
            }
     
      case "RESTART":
        return initialStateRecording;
      default:
        //Lanzar un error
        return state;
    }
  }