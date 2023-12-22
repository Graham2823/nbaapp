import 'bootstrap/dist/css/bootstrap.css';
import { UserProvider } from '@/context/userContext';
import 'bootstrap/dist/css/bootstrap.min.css'

export default function App({ Component, pageProps }) {
    return(
        <UserProvider>
            <Component {...pageProps} />
        </UserProvider>
        
         )
  }