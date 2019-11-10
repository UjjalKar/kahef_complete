import React from 'react';
import ToggleSwitch from 'toggle-switch-react-native';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      resultText: '',
      output: '',
      isOn: false,
    };
  }

  calculateResult() {
    if (['+', '-', '/', '*'].indexOf(this.state.resultText.slice(-1)) !== -1)
      return;
    const expression = this.state.resultText;
    this.setState({
      output: eval(expression),
    });
  }

  buttonPressed(num) {
    if (num == '=') {
      return this.calculateResult();
    }
    if (num == '.' && this.state.resultText.split('').pop() == '.') return;
    this.setState({
      resultText: this.state.resultText + num,
    });
  }

  operate(op) {
    switch (op) {
      case 'Del':
        this.setState({
          resultText: this.state.resultText.slice(0, -1),
        });
        break;
      case '+':
        if (!this.state.resultText) return;
        if (
          ['+', '-', '/', '*'].indexOf(this.state.resultText.slice(-1)) !== -1
        )
          return;
        this.setState({
          resultText: this.state.resultText + '+',
        });
        break;
      case '*':
        if (!this.state.resultText) return;
        if (
          ['+', '-', '/', '*'].indexOf(this.state.resultText.slice(-1)) !== -1
        )
          return;
        this.setState({
          resultText: this.state.resultText + '*',
        });
        break;
      case '-':
        if (!this.state.resultText) return;
        if (
          ['+', '-', '/', '*'].indexOf(this.state.resultText.slice(-1)) !== -1
        )
          return;
        this.setState({
          resultText: this.state.resultText + '-',
        });
        break;
      case '/':
        if (!this.state.resultText) return;
        if (
          ['+', '-', '/', '*'].indexOf(this.state.resultText.slice(-1)) !== -1
        )
          return;
        this.setState({
          resultText: this.state.resultText + '/',
        });
        break;
    }
  }

  render() {
    const {isOn, resultText, output} = this.state;

    let rows = [];
    let buttons = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['.', '0', '='],
    ];
    buttons.forEach(elems => {
      let row = [];
      elems.forEach(elem => {
        row.push(
          <TouchableOpacity
            key={elem}
            onPress={() => this.buttonPressed(elem)}
            style={styles.btn}>
            <Text
              style={{
                color: `${isOn ? 'white' : 'black'}`,
                fontSize: 24,
                alignContent: 'stretch',
              }}>
              {elem}
            </Text>
          </TouchableOpacity>,
        );
      });
      rows.push(
        <View key={elems[0]} style={styles.row}>
          {row}
        </View>,
      );
    });

    let operations = ['Del', '+', '-', '*', '/'];
    let ops = [];
    operations.forEach(button => {
      ops.push(
        <TouchableOpacity
          key={button}
          onPress={() => this.operate(button)}
          style={styles.btn}>
          <Text
            style={{
              color: `${isOn ? 'white' : 'black'}`,
              fontSize: 24,
              alignContent: 'stretch',
            }}>
            {button}
          </Text>
        </TouchableOpacity>,
      );
    });

    return (
      <View style={styles.container}>
        <View style={styles.togk}>
          <ToggleSwitch
            isOn={isOn}
            onColor="green"
            offColor="red"
            label=""
            labelStyle={{color: 'black', fontWeight: '900'}}
            size="small"
            onToggle={() => this.setState({isOn: !isOn})}
          />
        </View>
        <View
          style={{
            flex: 2,
            padding: 10,
            backgroundColor: `${isOn ? '#333' : 'lightgrey'}`,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <Text
            style={{
              color: `${isOn ? 'white' : 'black'}`,
              fontSize: 30,
            }}>
            {resultText}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            padding: 10,
            backgroundColor: `${isOn ? '#8d6e63' : '#fafafa'}`,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <Text
            style={{
              color: `${isOn ? 'white' : 'black'}`,
              fontSize: 24,
            }}>
            {output}
          </Text>
        </View>
        <View style={styles.buttons}>
          <View
            style={{
              flex: 3,
              backgroundColor: `${isOn ? 'black' : 'white'}`,
              justifyContent: 'space-around',
              color: `${isOn ? 'white' : 'black'}`,
            }}>
            {rows}
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: `${isOn ? '#333' : '#f1f1f1'}`,
              justifyContent: 'space-around',
            }}>
            {ops}
          </View>
        </View>
      </View>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  buttons: {
    flex: 7,
    flexDirection: 'row',
  },
  numbersred: {
    flex: 3,
    backgroundColor: 'red',
    justifyContent: 'space-around',
  },
  numbersgreen: {
    flex: 3,
    backgroundColor: 'green',
    justifyContent: 'space-around',
  },
  togk: {
    flex: 0,
    marginTop: 10,
    justifyContent: 'space-evenly',
    position: 'absolute',
    zIndex: 100,
    right: 10,
  },
});

export default App;
