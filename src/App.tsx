import './style/App.scss'
import { Button, Typography } from '@mui/material'
import { increment} from "./services/counter.tsx";;
import { useDispatch, useSelector } from 'react-redux'
import { useLazyLoginQuery } from './services/auth.tsx';
import { RootState } from './services/store.tsx';


const App = () => {
  const dispatch = useDispatch();
  const [ trigger, { data } ] = useLazyLoginQuery();

  const counterValue: number = useSelector((state: RootState) => state.counter.value);

  return (
    <>
      <Typography variant="h1">Hello Vite + React!</Typography>
      <Button onClick={() => {dispatch(increment());  trigger('');}} color="primary" variant="contained"> Press me </Button>
      <Typography variant="h2"> {counterValue} </Typography>

    </>
  )
}

export default App;
