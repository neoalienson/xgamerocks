import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  button: {
    backgroundColor: '#3b5998',
    fontSize: 25,
    marginTop: 40,
    marginBottom: 40,
    padding: 10,
    textAlign: 'center',
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
    fontSize : 16,
  },
  textInput: { 
    backgroundColor: 'white',
    height: 60,
    fontSize: 40,
    marginTop: 40,
    padding: 10,
    textAlign: 'center',
  },

});