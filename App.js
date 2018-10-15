import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView, AsyncStorage } from 'react-native';
import { AppLoading } from "expo";
import Todo from "./Todo";
import uuidv1 from "uuid/v1"

const { height, width } = Dimensions.get( "window" );

export default class App extends React.Component {
  state = {
    newToDo: "",
    loadedTodos: false,
    Todos: {}
  };
  componentDidMount = () => {
    this._loadTodos();
  }
  render() {
    const { newToDo, loadedTodos, Todos } = this.state;
    console.log(Todos);
    if( !loadedTodos ) {
      return <AppLoading />;
    }
    return (
      <View style={ styles.container }>
        <StatusBar barStyle="light-content" />
        <Text style={ styles.title }>To Do</Text>
        <View style={ styles.card }>
          <TextInput
            style={ styles.input } 
            placeholder={ "New To Do" } 
            value={ newToDo } 
            onChangeText={ this._crontollNewToDo } 
            returnKeyType={ "done" } 
            autoCorrect={ false}
            onSubmitEditing={ this._addTodos }
          />
          <ScrollView contentContainerStyle={ styles.Todos }>
            {Object.values(Todos).reverse().map( toDo => 
              <Todo key={ toDo.id }  
                deleteTodo={ this._deleteTodo } 
                uncompleteTodo={ this._uncompleteTodo } 
                completeTodo={ this._completeTodo }
                updateTodo={ this._updateTodo }
                { ...toDo }
              />
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
  _crontollNewToDo = text => {
    this.setState({
      newToDo: text
    })
  }

  _loadTodos = async () => {
    try {
      const Todos = await AsyncStorage.getItem("Todos");
      const parsedTodos = JSON.parse(Todos);
      this.setState({ loadedTodos: true, Todos: parsedTodos })
    }
    catch(err) {
      console.log(err);
    }
  }

  _addTodos = () => {
    const { newToDo } = this.state;
    if( newToDo !== "" ){
      this.setState( prevState => {
        const ID = uuidv1();
        const newToDoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newToDo,
            createdAt: Date.now()
          }
        };
        const newState = {
          ...prevState,
          newToDo: "",
          Todos: {
            ...prevState.Todos,
            ...newToDoObject
          }
        }
        this._saveTodos( newState.Todos );
        return { ...newState };
      });
    }
  };
  _deleteTodo = (id) => {
    this.setState( prevState => {
      const Todos = prevState.Todos;
      delete Todos[id];
      const newState = {
        ...prevState,
        ...Todos
      }
      this._saveTodos( newState.Todos );
      return { ...newState };
    })
  }
  _uncompleteTodo = id => {
    this.setState( prevState => {
      const newState = {
        ...prevState,
        Todos: {
          ...prevState.Todos,
          [id]: {
            ...prevState.Todos[id],
            isCompleted: false
          }
        }
      };
      this._saveTodos( newState.Todos );
      return { ...newState };
    });
  };
  _completeTodo = (id) => {
    this.setState( prevState => {
      const newState = {
        ...prevState,
        Todos: {
          ...prevState.Todos,
          [id]: {
            ...prevState.Todos[id],
            isCompleted: true
          }
        }
      };
      this._saveTodos( newState.Todos );
      return { ...newState };
    });
  }
  _updateTodo = (id, text) => {
    this.setState( prevState => {
      const newState = {
        ...prevState,
        Todos: {
          ...prevState.Todos,
          [id]: {
            ...prevState.Todos[id],
            text: text
          }
        }
      };
      this._saveTodos( newState.Todos );
      return { ...newState };
    });
  }
  _saveTodos = (newToDos) => {
    const saveTodos = AsyncStorage.setItem( "Todos", JSON.stringify(newToDos) );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3C75E0",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "200",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 60,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        },
      },
      android: {
        elevatopm: 3,
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 15,
  },
  Todos: {
    alignItems: "center"
  },
});
