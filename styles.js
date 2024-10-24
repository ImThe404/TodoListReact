// styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#110e76',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin: 10,
    width: '85%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  TodoLists: {
    flexDirection: 'row',
    alignItems: 'left',
  },
  list: {
    marginTop: 20,
    alignItems: 'left',
  },
  choix: {
    backgroundColor: '#0378b2',
    width: '30%',
    aspectRatio: 1,
    marginBottom: 10, 
    borderRadius: 5, 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  choixMultiple: {
    flex: 1, 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    padding: 10, 
  },
  progressBarContainer: {
    backgroundColor: 'gray',
    borderRadius: 10,
    height: 20,
    overflow: 'hidden',
    width: '80%',
    margin: '10%',
  },
  progressBar: {
    backgroundColor: '#2196f3',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    position: 'absolute',
    align: 'center',
    color: 'black',
    fontSize: 12,
  },

});
