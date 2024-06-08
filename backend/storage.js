import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY='@todoList'

export const saveTodos = async (newTodos) => {
  try {
    const data = JSON.stringify(newTodos);
    
    await AsyncStorage.setItem(STORAGE_KEY, data)
    .then(()=> {return 'success'})
    .catch((e)=>{return "error "+e})
  } catch (error) {
    console.error('Error saving to-dos:', error);
    return error
  }
};


export const loadTodos = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (data) {
      return data;
    }
  } catch (error) {
    console.error('Error loading to-dos:', error);
    return error
  }
};
