// import { useEffect, useState } from 'react';
// import { Text, View, Pressable } from 'react-native';
// import Header from './Header';
// import Footer from './Footer';
// import { 
//   NBR_OF_DICES,
//   NBR_OF_THROWS,
//   MIN_SPOT,
//   MAX_SPOT,
//   BONUS_POINTS_LIMIT,
//   BONUS_POINTS } from '../constants/Game';
// import { Container, Row, Col } from 'react-native-flex-grid';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import styles from '../style/style';

// let board = [];

// export default function Gameboard({ navigation, route }) {

//   const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS); // Tämä miinuksen estämiseksi
//   const [status, setStatus] = useState('Throw dices');
//   const [gameEndStatus, setGameEndStatus] = useState(false);


// // If dices are selected or not
//   const [selectedDices, setSelectedDices] = 
//    useState(new Array(NBR_OF_DICES).fill(false));

// // Dice spots
//   const [diceSpots, setDiceSpots] =
//     useState(new Array(NBR_OF_DICES).fill(0));

// // If dice points are selected or not for spots
//   const [selectedDicePoints, setSelectedDicePoints] =
//     useState(new Array(MAX_SPOT).fill(false));

// // Total points for different spots
//   const [dicePointsTotal, setDicePointsTotal] = 
//     useState(new Array(MAX_SPOT).fill(0));

//   const [playerName, setPlayerName] = useState('');

//   useEffect(() => {
//     if (playerName === '' && route.params?. player) {
//       setPlayerName(route.params.player);
//     }
//   }, []);

//   const row = [];
//   for (let dice = 0; dice < NBR_OF_DICES; dice++) {
//     row.push(
//       <Col key={"dice" + dice}>
//         <Pressable 
//             key={"dice" + dice}
//             onPress={() => selectDice(dice)}
//             >
//           <MaterialCommunityIcons
//             name={board[dice]}
//             key={"dice" + dice}
//             size={50} 
//             color={getDiceColor(dice)}
//             >
//           </MaterialCommunityIcons>
//         </Pressable>
//       </Col>
//     );
//   }
  
//   const pointsRow = [];
//   for (let spot = 0; spot < MAX_SPOT; spot++) {
//     pointsRow.push(
//       <Col key={'points-row' + spot}>
//         <Text key={'points-row' + spot}>{getSpotTotal(spot)}</Text>
//       </Col>
//     );
//   }

//   const pointsToSelectRow = [];
//     for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++){
//     pointsToSelectRow.push(
//       <Col key={'buttonsRow' + diceButton}>
//         <Pressable
//          key={'buttonsRow' + diceButton}
//          onPress={() => selectDicePoints(diceButton)}
//          >
//           <MaterialCommunityIcons 
//             key={'buttonsRow' + diceButton}
//             name={'numeric-' + (diceButton + 1) + '-circle'}
//             size= {35}
//             color={getDicePointsColor(diceButton)}
//           >
//           </MaterialCommunityIcons>
//         </Pressable>
//       </Col>
//       );
//     }

//   const selectDice = (i) => {
//     let dices = [...selectedDices];
//     dices[i] = selectedDices[i] ? false : true;
//     setSelectedDices(dices);
//   }

//   function getDiceColor(i) {
//     return selectedDices[i] ? 'black' : 'steelblue' 
//   }

//   function getDicePointsColor(i) {
//     return selectedDicePoints[i] ? 'black' : 'steelblue' 
//   }

//   const selectDicePoints = (i) => {
//     if (nbrOfThrowsLeft === 0) {
//     let selected = [...selectedDices];
//     let selectedPoints = [...selectedDicePoints];
//     let points = [...dicePointsTotal];
//     if(!selectedPoints[i]) {
//       setSelectedDices(new Array(NBR_OF_DICES).fill(false));

//       selectedPoints[i] = true;
//       let nbrOfDices =
//       diceSpots.reduce(
//         ( total, x) => ( x=== (i + 1) ? total + 1 : total), 0);
//       points[i] = nbrOfDices * (i + 1);
//       setDicePointsTotal(points);
//       setSelectedDicePoints(selectedPoints);
//       setNbrOfThrowsLeft(NBR_OF_THROWS);
//       return points[i];
//     }
//     else {
//       setStatus('You already selected points for ' + (i + 1));
//     }
//   }
//   else {
//     setStatus('Throw ' + NBR_OF_THROWS + ' times before setting points.')
//   } 
// } 


//   const throwDices = () => {

//     if (nbrOfThrowsLeft === 0) {
//       setStatus('Please select points before throwing dice again.');
//       return;
//     }

//     let spots = [...diceSpots]
//     for (let i = 0; i < NBR_OF_DICES; i++) {
//       if (!selectedDices[i]) {
//         let randomNumber = Math.floor(Math.random() * MAX_SPOT + 1);
//         spots[i] = randomNumber;
//         board[i] = 'dice-' + randomNumber;
//       }
//     }
//     setDiceSpots(spots);
//     setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
//   }

//   function getSpotTotal(i) {
//     return dicePointsTotal[i];
//   }

//   const calculateTotalPoints = () => {
//     return dicePointsTotal.reduce((total, points) => total + points, 0);
//   }

//   const allCirclePointsSelected = () => {
//     // Iterate through the circle points and check if any is not selected
//     for (let i = 0; i < MAX_SPOT; i++) {
//       if (!selectedDicePoints[i]) {
//         return false;
//       }
//     }
//     return true;
//   };

//   // Function to reset the game
//   const resetGame = () => {
//     // Reset all game states here
//     setNbrOfThrowsLeft(NBR_OF_THROWS);
//     setStatus('Throw dices');
//     setGameEndStatus(false);
//     setSelectedDices(new Array(NBR_OF_DICES).fill(false));
//     setDiceSpots(new Array(NBR_OF_DICES).fill(0));
//     setSelectedDicePoints(new Array(MAX_SPOT).fill(false));
//     setDicePointsTotal(new Array(MAX_SPOT).fill(0));
//   };

//   return (
//     <>
//     <Header/>
//     <View >
//       <Container>
//         <Row>{row}</Row>
//       </Container>
//       <Text>Throws left: {nbrOfThrowsLeft}</Text>
//       <Text>{status}</Text>
//       {allCirclePointsSelected() && (
//         <Pressable onPress={resetGame}>
//           <Text>Start Again</Text>
//         </Pressable>
//       )}
//       <Container>
//         <Row>{pointsRow}</Row>
//       </Container>
//       <Container>
//         <Row>{pointsToSelectRow}</Row>
//       </Container>
//       <Text>Player name: {playerName}</Text>
//     </View>
//     <Text>Total Points: {calculateTotalPoints()}</Text>
//         {/* <Pressable onPress={resetGame}>
//           <Text>Start Again</Text>
//         </Pressable> */}
//     <Footer/>
//     </>
//   )
// }

import { useEffect, useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import { 
  NBR_OF_DICES,
  NBR_OF_THROWS,
  MIN_SPOT,
  MAX_SPOT,
  BONUS_POINTS_LIMIT,
  BONUS_POINTS } from '../constants/Game';
import { Container, Row, Col } from 'react-native-flex-grid';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../style/style';

let board = [];

export default function Gameboard({ navigation, route }) {

  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState('Throw dices');
  const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
  const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));
  const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false));
  const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0));
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    if (playerName === '' && route.params?. player) {
      setPlayerName(route.params.player);
    }
  }, []);

  const row = [];
  for (let dice = 0; dice < NBR_OF_DICES; dice++) {
    row.push(
      <Col key={"dice" + dice}>
        <Pressable 
            key={"dice" + dice}
            onPress={() => selectDice(dice)}
            >
          <MaterialCommunityIcons
            name={board[dice]}
            key={"dice" + dice}
            size={50} 
            color={selectedDices[dice] ? 'black' : 'steelblue'}
          />
        </Pressable>
      </Col>
    );
  }
  
  const pointsRow = [];
  for (let spot = 0; spot < MAX_SPOT; spot++) {
    pointsRow.push(
      <Col key={'points-row' + spot}>
        <Text key={'points-row' + spot}>{getSpotTotal(spot)}</Text>
      </Col>
    );
  }

  const pointsToSelectRow = [];
  for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++){
    pointsToSelectRow.push(
      <Col key={'buttonsRow' + diceButton}>
        <Pressable
          key={'buttonsRow' + diceButton}
          onPress={() => selectDicePoints(diceButton)}
        >
          <MaterialCommunityIcons 
            key={'buttonsRow' + diceButton}
            name={'numeric-' + (diceButton + 1) + '-circle'}
            size= {35}
            color={selectedDicePoints[diceButton] ? 'black' : 'steelblue'}
          />
        </Pressable>
      </Col>
    );
  }

  const selectDice = (i) => {
    let dices = [...selectedDices];
    dices[i] = !dices[i];
    setSelectedDices(dices);
  }

  const selectDicePoints = (i) => {
    if (nbrOfThrowsLeft === 0) {
      let selectedPoints = [...selectedDicePoints];
      if (!selectedPoints[i]) {
        setSelectedDicePoints(new Array(MAX_SPOT).fill(false));
        selectedPoints[i] = true;
        let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0);
        let points = [...dicePointsTotal];
        points[i] = nbrOfDices * (i + 1);
        setDicePointsTotal(points);
        setStatus(`Points ${i + 1} selected.`);
        setNbrOfThrowsLeft(NBR_OF_THROWS);
      } else {
        setStatus(`You already selected points for ${i + 1}`);
      }
    } else {
      setStatus(`Throw ${NBR_OF_THROWS} times before setting points.`);
    }
  }

  const throwDices = () => {
    if (nbrOfThrowsLeft === 0) {
      setStatus('Please select points before throwing dice again.');
      return;
    }

    let spots = [...diceSpots]
    for (let i = 0; i < NBR_OF_DICES; i++) {
      if (!selectedDices[i]) {
        let randomNumber = Math.floor(Math.random() * MAX_SPOT + 1);
        spots[i] = randomNumber;
        board[i] = 'dice-' + randomNumber;
      }
    }
    setDiceSpots(spots);
    setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
  }

  function getSpotTotal(i) {
    return dicePointsTotal[i];
  }

  return (
    <>
      <Header/>
      <View>
        <Container>
          <Row>{row}</Row>
        </Container>
        <Text>Throws left: {nbrOfThrowsLeft}</Text>
        <Text>{status}</Text>
        <Pressable onPress={() => throwDices()}>
          <Text>THROW DICES</Text>
        </Pressable>
        <Container>
          <Row>{pointsRow}</Row>
        </Container>
        <Container>
          <Row>{pointsToSelectRow}</Row>
        </Container>
        <Text>Player name: {playerName}</Text>
      </View>
      <Text>Total Points: {dicePointsTotal.reduce((total, points) => total + points, 0)}</Text>
      {dicePointsTotal.every(points => points !== 0) && (
        <Pressable onPress={resetGame}>
          <Text>Start Again</Text>
        </Pressable>
      )}
      <Footer/>
    </>
  )
}
