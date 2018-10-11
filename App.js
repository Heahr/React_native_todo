import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView} from 'react-native';
import { AppLoading } from "expo";
import Todo from "./Todo";
import uuidv1 from "uuid/v1"

const { height, width } = Dimensions.get("window");

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
    if(!loadedTodos) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>To Do</Text>
        <View style={styles.card}>
          <TextInput 
            style={styles.input} 
            placeholder={"New To Do"} 
            value={newToDo} 
            onChangeText={this._crontollNewToDo} 
            returnKeyType={"done"} 
            autoCorrect={false}
            onSubmitEditing={this._addTodos}
          />
          <ScrollView contentContainerStyle={styles.Todos}>
            {Object.values(Todos).map(toDo => <Todo key={toDo.id} {...toDo} />)}
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

  _loadTodos = () => {
    this.setState({
      loadedTodos: true
    })
  }

  _addTodos = () => {
    const { newToDo } = this.state;
    if(newToDo !== ""){
      this.setState(prevState => {
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
        return { ...newState };
      });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f23657',
    alignItems: 'center',
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
