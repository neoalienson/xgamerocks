import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  formView: {
    width: 300,
  },
  text: { 
    backgroundColor: 'transparent',
    color: 'black',
    marginTop : 10,
    marginBottom: 20,
    fontSize : 28,
  },
  textHero: { 
    backgroundColor: 'transparent',
    color: 'white',
    fontWeight : '800',
    fontSize : 40,
    textShadowColor: 'grey',
    textShadowOffset: { width: 1, height: 1 } ,
    textShadowRadius: 2,    
  },
  textInfo: { 
    backgroundColor: 'transparent',
    color: 'grey',
    marginTop : 10,
    marginBottom: 20,
    fontSize : 16,
  },
  textInput: { 
    backgroundColor: 'white',
    height: 50,
    flex: 1,
    fontSize: 35,
    marginTop: 20,
    padding: 10,
    textAlign: 'center',
  },
  textInputSmall: { 
    backgroundColor: 'white',
    height: 40,
    flex: 1,
    fontSize: 25,
    marginTop: 20,
    padding: 10,
    textAlign: 'left',
  },
  textInputTiny: { 
    backgroundColor: 'white',
    height: 30,
    flex: 1,
    fontSize: 16,
    marginTop: 20,
    padding: 5,
    textAlign: 'left',
  },

})
